import { getAllTags, getPostsPaginated } from '@/lib/notion';
import BlogClient from '@/app/blog/BlogClient';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import PostCardSkeleton from '@/components/cards/PostCardSkeleton';

export const metadata: Metadata = {
  title: 'Blog - Reese',
  description: '학습한 내용들을 기록합니다',
};

export const revalidate = 1800;

function BlogLoadingFallback() {
  return (
    <div className="min-h-screen">
      <div className="flex">
        <aside className="hidden lg:block w-72 pt-24 pb-8 px-6">
          <div className="h-6 w-16 bg-muted/20 rounded animate-pulse mb-6" />
          <div className="space-y-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-10 w-full bg-muted/20 rounded-lg animate-pulse" />
            ))}
          </div>
        </aside>

        <main className="flex-1 py-16 px-6 lg:px-12">
          <div className="mb-12">
            <div className="h-14 w-32 bg-muted/20 rounded animate-pulse mb-6" />
            <div className="h-6 w-64 bg-muted/20 rounded animate-pulse" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 9 }).map((_, index) => (
              <PostCardSkeleton key={index} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default async function BlogPage() {
  const tags = await getAllTags();
  const initialData = await getPostsPaginated(1, 9, undefined);

  return (
    <Suspense fallback={<BlogLoadingFallback />}>
      <BlogClient
        tags={tags}
        initialPosts={initialData.posts}
        initialHasMore={initialData.hasMore}
      />
    </Suspense>
  );
}
