import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@notionhq/client';
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

const notion = new Client({
  auth: process.env.NOTION_TOKEN || process.env.NOTION_API_KEY,
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ pageId: string }> }
) {
  try {
    const { pageId } = await params;

    const page = await notion.pages.retrieve({ page_id: pageId }) as PageObjectResponse;
    
    const thumbnailProp = page.properties.Thumbnail || page.properties.thumbnail;
    
    if (!thumbnailProp || thumbnailProp.type !== 'files') {
      return NextResponse.json({ error: 'No thumbnail found' }, { status: 404 });
    }

    const files = thumbnailProp.files;
    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No thumbnail file' }, { status: 404 });
    }

    const file = files[0];
    const imageUrl = 'external' in file ? file.external.url : file.file.url;

    const imageResponse = await fetch(imageUrl);
    
    if (!imageResponse.ok) {
      return NextResponse.json({ error: 'Failed to fetch image' }, { status: 500 });
    }

    const imageBuffer = await imageResponse.arrayBuffer();
    const contentType = imageResponse.headers.get('content-type') || 'image/jpeg';

    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('[API] Thumbnail fetch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

