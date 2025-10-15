import { Suspense } from 'react';

function BlogDetailLoadingSkeleton() {
  return (
    <article className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 w-1 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>

          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-6 animate-pulse"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse"></div>
        </header>

        <hr className="border-gray-200 dark:border-gray-700 mb-12" />

        <div className="space-y-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
              style={{ width: `${Math.random() * 40 + 60}%` }}
            ></div>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function BlogDetailLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<BlogDetailLoadingSkeleton />}>{children}</Suspense>;
}
