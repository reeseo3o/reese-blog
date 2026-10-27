export default function PostCardSkeleton() {
  return (
    <div
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-background"
      aria-hidden="true"
    >
      <div className="skeleton-shimmer aspect-[16/10] w-full" />

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <div className="mb-4 flex items-center gap-2">
          <div className="skeleton-shimmer h-2.5 w-16 rounded-full" />
          <div className="skeleton-shimmer h-1 w-1 rounded-full" />
          <div className="skeleton-shimmer h-2.5 w-24 rounded-full" />
        </div>

        <div className="space-y-2.5">
          <div className="skeleton-shimmer h-6 w-full rounded-md" />
          <div className="skeleton-shimmer h-6 w-3/4 rounded-md" />
        </div>

        <div className="mt-4 space-y-2">
          <div className="skeleton-shimmer h-3.5 w-full rounded-md" />
          <div className="skeleton-shimmer h-3.5 w-5/6 rounded-md" />
        </div>

        <div className="mt-auto flex gap-3 pt-6">
          <div className="skeleton-shimmer h-3 w-14 rounded-full" />
          <div className="skeleton-shimmer h-3 w-20 rounded-full" />
          <div className="skeleton-shimmer h-3 w-12 rounded-full" />
        </div>
      </div>
    </div>
  );
}
