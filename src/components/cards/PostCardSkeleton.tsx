'use client';

export default function PostCardSkeleton() {
  return (
    <div className="h-full glass rounded-xl overflow-hidden border-2 border-transparent">
      <div className="relative w-full h-48 bg-muted/20 animate-pulse" />

      <div className="p-8 space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-20 bg-muted/20 rounded animate-pulse" />
          <div className="h-3 w-3 bg-muted/20 rounded-full animate-pulse" />
          <div className="h-3 w-24 bg-muted/20 rounded animate-pulse" />
        </div>

        <div className="space-y-2">
          <div className="h-6 bg-muted/20 rounded animate-pulse" />
          <div className="h-6 w-3/4 bg-muted/20 rounded animate-pulse" />
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          <div className="h-6 w-16 bg-muted/20 rounded-full animate-pulse" />
          <div className="h-6 w-20 bg-muted/20 rounded-full animate-pulse" />
          <div className="h-6 w-14 bg-muted/20 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}
