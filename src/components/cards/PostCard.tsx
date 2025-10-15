'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Post } from '@/lib/types';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const router = useRouter();

  const formattedDate = new Date(post.date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleTagClick = (e: React.MouseEvent, tag: string) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/blog?tag=${encodeURIComponent(tag)}`);
  };

  return (
    <Link href={`/blog/${post.slug}`}>
      <motion.article
        className="group cursor-pointer h-full"
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <div
          className="h-full glass rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-accent/30"
          style={{ boxShadow: '0 4px 20px var(--hover-shadow)' }}
        >
          {post.thumbnail && (
            <div className="relative w-full h-48 overflow-hidden bg-muted/10">
              <Image
                src={post.thumbnail}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          )}

          <div className="p-8 space-y-4 w-full">
            <div className="flex items-center gap-2 text-xs text-muted font-medium">
              {post.category && (
                <>
                  <span className="uppercase tracking-wider">{post.category}</span>
                  <span>•</span>
                </>
              )}
              <time dateTime={post.date}>{formattedDate}</time>
            </div>

            <h3 className="text-xl font-bold line-clamp-2 group-hover:text-accent-bright transition-colors duration-300">
              {post.title}
            </h3>

            {post.description && (
              <p className="text-sm text-muted line-clamp-3 leading-relaxed">{post.description}</p>
            )}

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <button
                    key={tag}
                    onClick={(e) => handleTagClick(e, tag)}
                    className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent font-medium hover:bg-accent/20 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
