import PostCardSkeleton from '@/components/cards/PostCardSkeleton';

const TAG_WIDTHS = ['w-14', 'w-20', 'w-24', 'w-16', 'w-28'];

export default function BlogListSkeleton() {
  return (
    <main className="min-h-screen px-6 py-14 md:px-12 md:py-20" aria-busy="true">
      <span className="sr-only" role="status" aria-live="polite">
        블로그 포스트를 불러오는 중입니다.
      </span>
      <div className="mx-auto max-w-[1400px]" aria-hidden="true">
        <header className="mb-10 border-b border-border pb-10 md:mb-12 md:pb-12">
          <div className="skeleton-shimmer mb-4 h-3 w-36 rounded-full" />
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="skeleton-shimmer h-14 w-36 rounded-lg md:h-[4.5rem] md:w-44" />
            <div className="space-y-2 md:flex md:flex-col md:items-end">
              <div className="skeleton-shimmer h-4 w-72 max-w-full rounded-full" />
              <div className="skeleton-shimmer h-4 w-52 max-w-full rounded-full" />
            </div>
          </div>
        </header>

        <div className="tag-scroll -mx-6 mb-10 flex gap-2 overflow-hidden px-6 pb-2 md:mx-0 md:mb-12 md:px-0">
          {TAG_WIDTHS.map((width, index) => (
            <div
              key={`${width}-${index}`}
              className={`skeleton-shimmer h-10 shrink-0 rounded-full ${width}`}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, index) => (
            <PostCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </main>
  );
}
