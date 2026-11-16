const PARAGRAPH_LINES = ['w-full', 'w-[92%]', 'w-[97%]', 'w-3/4'] as const;

function ParagraphSkeleton() {
  return (
    <div className="space-y-3">
      {PARAGRAPH_LINES.map((width, index) => (
        <div key={`${width}-${index}`} className={`skeleton-shimmer h-4 rounded ${width}`} />
      ))}
    </div>
  );
}

export default function BlogDetailSkeleton() {
  return (
    <article className="px-6 py-14 md:py-20" aria-busy="true">
      <span className="sr-only" role="status" aria-live="polite">
        블로그 글을 불러오는 중입니다.
      </span>
      <div className="mx-auto max-w-5xl" aria-hidden="true">
        <header className="mb-14 max-w-4xl md:mb-16">
          <div className="mb-5 flex items-center gap-2">
            <div className="skeleton-shimmer h-3 w-20 rounded-full" />
            <div className="skeleton-shimmer h-1 w-1 rounded-full" />
            <div className="skeleton-shimmer h-3 w-28 rounded-full" />
          </div>

          <div className="max-w-3xl space-y-3">
            <div className="skeleton-shimmer h-10 w-full rounded-lg md:h-12" />
            <div className="skeleton-shimmer h-10 w-4/5 rounded-lg md:h-12" />
          </div>

          <div className="mt-7 max-w-2xl space-y-2.5">
            <div className="skeleton-shimmer h-5 w-full rounded" />
            <div className="skeleton-shimmer h-5 w-2/3 rounded" />
          </div>

          <div className="mt-7 flex gap-2">
            <div className="skeleton-shimmer h-7 w-20 rounded-full" />
            <div className="skeleton-shimmer h-7 w-24 rounded-full" />
            <div className="skeleton-shimmer h-7 w-16 rounded-full" />
          </div>
        </header>

        <div className="mb-14 border-t border-border md:mb-16" />

        <div className="mx-auto max-w-[72ch] space-y-10">
          <ParagraphSkeleton />

          <div className="skeleton-shimmer h-8 w-2/5 rounded-md" />
          <ParagraphSkeleton />

          <div className="skeleton-shimmer h-8 w-1/3 rounded-md" />
          <ParagraphSkeleton />
        </div>
      </div>
    </article>
  );
}
