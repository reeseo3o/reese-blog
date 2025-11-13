import { getAllTags, getPostsPaginated } from '@/lib/notion';
import BlogClient from '@/app/blog/BlogClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Reese',
  description: '개발 경험과 학습한 내용을 기록합니다',
};

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  const tags = await getAllTags();
  const initialData = await getPostsPaginated(1, 9, undefined);

  return (
    <BlogClient
      tags={tags}
      initialPosts={initialData.posts}
      initialHasMore={initialData.hasMore}
    />
  );
}
