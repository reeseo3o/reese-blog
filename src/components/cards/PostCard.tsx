'use client';

import Link from 'next/link';
import SafeImage from '@/components/SafeImage';
import { Post } from '@/lib/types';
import { useState } from 'react';

interface PostCardProps {
  post: Post;
  priority?: boolean;
}

export default function PostCard({ post, priority = false }: PostCardProps) {
  const [isImageLoading, setIsImageLoading] = useState(true);

  const formattedDate = new Date(post.date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-background transition-[border-color,transform] duration-300 group-hover:-translate-y-1 group-hover:border-accent/50">
        {post.thumbnail && (
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted/10">
            <SafeImage
              src={`/api/thumbnail/${post.id}`}
              alt={post.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              priority={priority}
              className={`object-cover transition-[transform,opacity] duration-500 group-hover:scale-[1.03] ${
                isImageLoading ? 'opacity-0' : 'opacity-100'
              }`}
              maxRetries={2}
              retryDelayMs={800}
              onLoadingStateChange={setIsImageLoading}
            />
          </div>
        )}

        <div className="flex flex-1 flex-col p-6 md:p-7">
          <div className="mb-4 flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-muted">
            {post.category && (
              <>
                <span className="uppercase tracking-wider">{post.category}</span>
                <span>•</span>
              </>
            )}
            <time dateTime={post.date}>{formattedDate}</time>
          </div>

          <h3 className="text-xl font-semibold leading-snug tracking-[-0.02em] line-clamp-2 group-hover:text-accent-bright transition-colors duration-300">
            {post.title}
          </h3>

          {post.description && (
            <p className="mt-3 text-sm text-muted line-clamp-2 leading-relaxed">
              {post.description}
            </p>
          )}

          {post.tags && post.tags.length > 0 && (
            <div className="mt-auto flex flex-wrap gap-2 pt-6">
              {post.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-xs text-muted">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
