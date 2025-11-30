import { Client, APIErrorCode, isNotionClientError } from '@notionhq/client';
import type {
  DatabaseObjectResponse,
  PageObjectResponse,
  QueryDataSourceResponse,
  DataSourceObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { Post, NotionBlock as NotionBlockType } from '@/lib/types';

const notion = new Client({
  auth: process.env.NOTION_TOKEN || process.env.NOTION_API_KEY,
  notionVersion: '2025-09-03',
});

const DATABASE_ID = process.env.NOTION_DATABASE_ID || '';

let propertyNamesCache: { [key: string]: string } | null = null;

async function getPropertyNamesFromActualData(
  dataSourceId: string,
): Promise<{ [key: string]: string }> {
  try {
    const response: QueryDataSourceResponse = await notion.dataSources.query({
      data_source_id: dataSourceId,
      page_size: 1,
    });

    if (response.results.length === 0) {
      console.error('⚠️ [Notion] 데이터베이스에 페이지가 없습니다.');
      return {};
    }

    const firstPage = response.results[0] as PageObjectResponse;
    const properties = firstPage.properties;

    const mapping: { [key: string]: string } = {};

    for (const propName in properties) {
      const lowerName = propName.toLowerCase();
      mapping[lowerName] = propName;
    }

    return mapping;
  } catch (error) {
    console.error('[Notion] 실제 데이터에서 속성 이름 추출 실패:', error);
    return {};
  }
}

async function getDatabasePropertyNames(databaseId: string): Promise<{ [key: string]: string }> {
  if (propertyNamesCache) {
    return propertyNamesCache;
  }

  try {
    await notion.databases.retrieve({
      database_id: databaseId,
    });

    const dataSourceId = await getDataSourceId(databaseId);
    const dataSource = await notion.dataSources.retrieve({
      data_source_id: dataSourceId,
    });
    const properties = (dataSource as DataSourceObjectResponse).properties;

    if (!properties || typeof properties !== 'object' || Object.keys(properties).length === 0) {
      console.warn('⚠️ [Notion] databases.retrieve에서 properties를 가져올 수 없습니다.');
      const dataSourceId = await getDataSourceId(databaseId);
      const mapping = await getPropertyNamesFromActualData(dataSourceId);

      if (Object.keys(mapping).length > 0) {
        propertyNamesCache = mapping;
        return mapping;
      }

      return {};
    }

    const mapping: { [key: string]: string } = {};

    for (const propName in properties) {
      const lowerName = propName.toLowerCase();
      mapping[lowerName] = propName;
    }

    propertyNamesCache = mapping;
    return mapping;
  } catch (error) {
    console.error('❌ [Notion] Database 속성 이름 가져오기 실패:', error);

    try {
      const dataSourceId = await getDataSourceId(databaseId);
      const mapping = await getPropertyNamesFromActualData(dataSourceId);
      if (Object.keys(mapping).length > 0) {
        propertyNamesCache = mapping;
        return mapping;
      }
    } catch (fallbackError) {
      console.error('❌ [Notion] Fallback도 실패:', fallbackError);
    }

    return {};
  }
}

async function getDataSourceId(databaseId: string): Promise<string> {
  try {
    const response = await notion.databases.retrieve({
      database_id: databaseId,
    });

    const dataSources = (response as DatabaseObjectResponse).data_sources;

    if (!dataSources || dataSources.length === 0) {
      throw new Error('데이터베이스에 data source가 없습니다.');
    }

    return dataSources[0].id;
  } catch (error) {
    console.error('❌ [Notion] Data Source ID 가져오기 실패:', error);
    throw error;
  }
}


function getStringPropertyValue(property: PageObjectResponse['properties'][string]): string {
  if (!property) return '';
  
  switch (property.type) {
    case 'title':
      return property.title?.map((t) => t.plain_text).join('') || '';
    case 'rich_text':
      return property.rich_text?.map((t) => t.plain_text).join('') || '';
    case 'select':
      return property.select?.name || '';
    case 'files':
      if (property.files && property.files.length > 0) {
        const file = property.files[0];
        return 'external' in file ? file.external.url : file.file.url;
      }
      return '';
    default:
      return '';
  }
}

function getStringArrayPropertyValue(property: PageObjectResponse['properties'][string]): string[] {
  if (!property) return [];
  
  switch (property.type) {
    case 'multi_select':
      return property.multi_select?.map((s) => s.name) || [];
    default:
      return [];
  }
}

function getDatePropertyValue(property: PageObjectResponse['properties'][string]): { start: string } | null {
  if (!property) return null;
  
  switch (property.type) {
    case 'date':
      return property.date;
    default:
      return null;
  }
}

export async function getPosts(): Promise<Post[]> {
  try {
    if (!DATABASE_ID) {
      throw new Error('NOTION_DATABASE_ID가 설정되지 않았습니다.');
    }

    const dataSourceId = await getDataSourceId(DATABASE_ID);

    let allPages: PageObjectResponse[] = [];
    let hasMore = true;
    let startCursor: string | undefined = undefined;

    while (hasMore) {
      const response: QueryDataSourceResponse = await notion.dataSources.query({
        data_source_id: dataSourceId,
        start_cursor: startCursor,
        page_size: 100,
      });

      const pages = response.results.filter(
        (page): page is PageObjectResponse => 'properties' in page,
      );

      allPages = allPages.concat(pages);
      hasMore = response.has_more;
      startCursor = response.next_cursor || undefined;

      
    }

    

    const posts = allPages.map((page) => {
      const props = page.properties;

      const title = getStringPropertyValue(props.Title || props.Name || props.title);
      const slug = getStringPropertyValue(props.Slug || props.slug);
      const description = getStringPropertyValue(props.Description || props.description);
      const date = getDatePropertyValue(props.Date || props.date);
      const tags = getStringArrayPropertyValue(props.Tags || props.tags);
      const category = getStringPropertyValue(props.Category || props.category);
      const thumbnail = getStringPropertyValue(props.Thumbnail || props.thumbnail);

      return {
        id: page.id,
        title: title,
        slug: slug,
        description: description,
        date: date?.start || page.created_time,
        tags: tags,
        category: category,
        thumbnail: thumbnail,
      };
    });

    const sortedPosts = posts.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });

    

    return sortedPosts;
  } catch (error: unknown) {
    if (isNotionClientError(error)) {
      console.error('❌ [Notion API Error] getPosts 실패:', error.message);
      if (error.code === APIErrorCode.Unauthorized) {
        console.error('→ NOTION_TOKEN 또는 NOTION_API_KEY를 확인하세요.');
      } else if (error.code === APIErrorCode.ObjectNotFound) {
        console.error(
          '→ NOTION_DATABASE_ID를 확인하고, Integration이 데이터베이스에 연결되었는지 확인하세요.',
        );
      }
      console.error('❌ [Notion] 에러 코드:', error.code);
    } else {
      console.error('❌ [Notion] 알 수 없는 에러:', error);
    }
    throw error;
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    if (!DATABASE_ID) {
      throw new Error('NOTION_DATABASE_ID가 설정되지 않았습니다.');
    }

    const dataSourceId = await getDataSourceId(DATABASE_ID);
    const propertyNames = await getDatabasePropertyNames(DATABASE_ID);
    const slugPropertyName = propertyNames['slug'];

    if (!slugPropertyName) {
      console.error('⚠️ [Notion] Slug 속성을 찾을 수 없습니다.');
      console.error('    사용 가능한 속성:', Object.keys(propertyNames));
      const allPosts = await getPosts();
      return allPosts.find((p) => p.slug === slug) || null;
    }

    const sampleResponse: QueryDataSourceResponse = await notion.dataSources.query({
      data_source_id: dataSourceId,
      page_size: 1,
    });

    if (sampleResponse.results.length === 0) {
      console.error('⚠️ [Notion] 데이터베이스에 페이지가 없습니다.');
      return null;
    }

    const samplePage = sampleResponse.results[0] as PageObjectResponse;
    const slugProperty = samplePage.properties[slugPropertyName];
    const slugPropertyType = slugProperty?.type;

    let filter;
    if (slugPropertyType === 'rich_text') {
      filter = {
        property: slugPropertyName,
        rich_text: { equals: slug },
      };
    } else if (slugPropertyType === 'title') {
      filter = {
        property: slugPropertyName,
        title: { equals: slug },
      };
    } else {
      console.warn('⚠️ [Notion] 알 수 없는 Slug 속성 타입:', slugPropertyType);
      const allPosts = await getPosts();
      return allPosts.find((p) => p.slug === slug) || null;
    }

    const response: QueryDataSourceResponse = await notion.dataSources.query({
      data_source_id: dataSourceId,
      filter,
    });

    if (response.results.length === 0) {
      
      return null;
    }

    const page = response.results[0] as PageObjectResponse;
    const props = page.properties;

    const title = getStringPropertyValue(props.Title || props.Name || props.title);
    const description = getStringPropertyValue(props.Description || props.description);
    const date = getDatePropertyValue(props.Date || props.date);
    const tags = getStringArrayPropertyValue(props.Tags || props.tags);
    const category = getStringPropertyValue(props.Category || props.category);
    const thumbnail = getStringPropertyValue(props.Thumbnail || props.thumbnail);

    return {
      id: page.id,
      title: title,
      slug: slug,
      description: description,
      date: date?.start || page.created_time,
      tags: tags,
      category: category,
      thumbnail: thumbnail,
    };
  } catch (error: unknown) {
    if (isNotionClientError(error)) {
      console.error('❌ [Notion API Error] getPostBySlug 실패:', error.message);
      console.error('❌ [Notion] 에러 코드:', error.code);
    } else {
      console.error('❌ [Notion] 알 수 없는 에러:', error);
    }
    return null;
  }
}

async function getBlocksRecursively(blockId: string): Promise<NotionBlockType[]> {
  const blocks: NotionBlockType[] = [];
  let cursor: string | undefined = undefined;

  while (true) {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
    });

    for (const block of response.results as NotionBlockType[]) {
      // has_children이 true인 블록은 항상 children을 가져옴
      // 토글 블록, 토글 헤딩 등을 포함
      if (block.has_children) {
        try {
          block.children = await getBlocksRecursively(block.id);
        } catch (error) {
          // children이 없거나 가져올 수 없는 경우 빈 배열로 설정
          console.warn(`[Notion] Failed to fetch children for block ${block.id}:`, error);
          block.children = [];
        }
      }
      blocks.push(block);
    }

    if (!response.has_more) {
      break;
    }

    cursor = response.next_cursor ?? undefined;
  }

  return blocks;
}

export async function getPageBlocks(pageId: string): Promise<NotionBlockType[]> {
  try {
    return await getBlocksRecursively(pageId);
  } catch (error) {
    console.error('Error fetching page blocks:', error);
    return [];
  }
}

export function extractDescriptionFromBlocks(blocks: NotionBlockType[], maxLength: number = 160): string {
  for (const block of blocks) {
    if (block.type === 'paragraph') {
      const paragraph = block as unknown as { 
        type: 'paragraph'; 
        paragraph: { rich_text: Array<{ plain_text: string }> } 
      };
      const text = paragraph.paragraph?.rich_text?.map(t => t.plain_text).join('') || '';
      if (text.trim()) {
        const trimmedText = text.trim();
        return trimmedText.length > maxLength 
          ? trimmedText.slice(0, maxLength) + '...' 
          : trimmedText;
      }
    }
  }
  return '';
}

export async function getRecentPosts(limit: number = 3): Promise<Post[]> {
  const posts = await getPosts();
  return posts.slice(0, limit);
}

export async function getPostsPaginated(
  page: number = 1,
  pageSize: number = 9,
  tag?: string,
): Promise<{ posts: Post[]; hasMore: boolean; total: number }> {
  try {
    let allPosts = await getPosts();

    if (tag) {
      allPosts = allPosts.filter((post) => post.tags?.includes(tag));
    }

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedPosts = allPosts.slice(startIndex, endIndex);
    const hasMore = endIndex < allPosts.length;

    return {
      posts: paginatedPosts,
      hasMore,
      total: allPosts.length,
    };
  } catch (error) {
    console.error('❌ [Notion] getPostsPaginated 에러:', error);
    throw error;
  }
}

export async function getAllTags(): Promise<string[]> {
  try {
    const allPosts = await getPosts();

    const tags = allPosts
      .flatMap((post) => post.tags || [])
      .filter((tag): tag is string => !!tag && tag.trim() !== '');

    const uniqueTags = Array.from(new Set(tags));

    return uniqueTags;
  } catch (error) {
    console.error('❌ [Notion] getAllTags 에러:', error);
    return [];
  }
}
