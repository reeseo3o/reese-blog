'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PostCard from '@/components/cards/PostCard';
import PostCardSkeleton from '@/components/cards/PostCardSkeleton';
import { Post } from '@/lib/types';

const PAGE_SIZE = 9;

interface BlogClientProps {
  tags: string[];
  initialPosts?: Post[];
  initialHasMore?: boolean;
}

export default function BlogClient({
  tags,
  initialPosts = [],
  initialHasMore = true,
}: BlogClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedTag = searchParams.get('tag') || null;

  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const pageRef = useRef(1);
  const initialLoadRef = useRef(false);

  const observerTarget = useRef<HTMLDivElement>(null);

  const fetchPosts = useCallback(
    async (pageNum: number, isInitial: boolean = false, tag: string | null = null) => {
      try {
        if (isInitial) {
          setLoading(true);
        } else {
          setLoadingMore(true);
        }

        const url = tag
          ? `/api/posts?page=${pageNum}&pageSize=${PAGE_SIZE}&tag=${encodeURIComponent(tag)}`
          : `/api/posts?page=${pageNum}&pageSize=${PAGE_SIZE}`;

        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();

          if (isInitial) {
            setPosts(data.posts);
          } else {
            setPosts((prev) => [...prev, ...data.posts]);
          }

          setHasMore(data.hasMore);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        if (isInitial) {
          setLoading(false);
        } else {
          setLoadingMore(false);
        }
      }
    },
    [],
  );

  // 태그가 변경되었을 때만 fetch
  useEffect(() => {
    // 초기 로드 체크
    if (!initialLoadRef.current) {
      initialLoadRef.current = true;

      // 초기 상태 (태그 없음)이고 initialPosts가 있으면 skip
      if (initialPosts.length > 0 && !selectedTag) {
        return;
      }
    }

    // 태그가 변경되었거나 데이터가 없으면 fetch
    pageRef.current = 1;
    fetchPosts(1, true, selectedTag);
  }, [selectedTag, initialPosts.length, fetchPosts]);

  useEffect(() => {
    if (!hasMore || loading || loadingMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          pageRef.current += 1;
          fetchPosts(pageRef.current, false, selectedTag);
        }
      },
      { threshold: 0.1 },
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, loading, loadingMore, fetchPosts, selectedTag]);

  const handleTagSelect = (tag: string | null) => {
    if (tag) {
      router.push(`/blog?tag=${encodeURIComponent(tag)}`);
    } else {
      router.push('/blog');
    }
  };

  return (
    <main className="min-h-screen px-6 py-14 md:px-12 md:py-20">
      <div className="mx-auto max-w-[1400px]">
        <header className="mb-10 border-b border-border pb-10 md:mb-12 md:pb-12">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-muted">
            Notes on building
          </p>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h1 className="text-5xl font-semibold tracking-[-0.055em] md:text-7xl">Blog.</h1>
            <p className="max-w-md text-base text-muted md:text-right md:text-lg">
              개발 경험과 학습한 내용을 기록합니다.
            </p>
          </div>
        </header>

        {tags.length > 0 && (
          <nav aria-label="게시글 태그" className="mb-10 md:mb-12">
            <div className="tag-scroll -mx-6 flex gap-2 overflow-x-auto px-6 pb-2 md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
              <button
                onClick={() => handleTagSelect(null)}
                aria-pressed={!selectedTag}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
                  !selectedTag
                    ? 'border-foreground bg-foreground text-background'
                    : 'border-border text-muted hover:border-foreground hover:text-foreground'
                }`}
              >
                All
              </button>
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagSelect(tag)}
                  aria-pressed={selectedTag === tag}
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
                    selectedTag === tag
                      ? 'border-foreground bg-foreground text-background'
                      : 'border-border text-muted hover:border-foreground hover:text-foreground'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </nav>
        )}

        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: PAGE_SIZE }).map((_, index) => (
              <PostCardSkeleton key={index} />
            ))}
          </div>
        ) : posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <PostCard key={post.id} post={post} priority={index === 0} />
              ))}
            </div>

            {hasMore && <div ref={observerTarget} className="h-20" aria-hidden="true" />}

            {loadingMore && hasMore && (
              <div className="flex justify-center items-center py-8">
                <div className="flex items-center space-x-2 text-muted">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-accent border-t-transparent"></div>
                  <span className="text-sm">더 많은 포스트를 불러오는 중...</span>
                </div>
              </div>
            )}

            {!hasMore && posts.length > PAGE_SIZE && (
              <div className="text-center py-8 text-muted">
                <p className="text-sm">모든 포스트를 확인했습니다 ✨</p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 text-muted">
            <p>아직 작성된 글이 없습니다.</p>
            <p className="text-sm mt-2">
              Notion 데이터베이스에 Type을 &apos;blog&apos;로 설정한 페이지를 추가해보세요!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
