'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import PostCard from '@/components/cards/PostCard';
import PostCardSkeleton from '@/components/cards/PostCardSkeleton';
import { Post } from '@/lib/types';

const PAGE_SIZE = 9;

interface BlogClientProps {
  tags: string[];
  initialSelectedTag?: string | null;
}

export default function BlogClient({ tags, initialSelectedTag }: BlogClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedTag = searchParams.get('tag') || initialSelectedTag || null;

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const pageRef = useRef(1);

  const observerTarget = useRef<HTMLDivElement>(null);

  const fetchPosts = useCallback(
    async (pageNum: number, isInitial: boolean = false, tag: string | null = null) => {
      try {
        if (isInitial) {
          setLoading(true);
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
        }
      }
    },
    [],
  );

  useEffect(() => {
    pageRef.current = 1;
    fetchPosts(1, true, selectedTag);
  }, []);

  useEffect(() => {
    pageRef.current = 1;
    fetchPosts(1, true, selectedTag);
  }, [selectedTag, fetchPosts]);

  useEffect(() => {
    if (!hasMore || loading) return;

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
  }, [hasMore, loading, selectedTag, fetchPosts]);

  const handleTagSelect = (tag: string | null) => {
    if (tag) {
      router.push(`/blog?tag=${encodeURIComponent(tag)}`);
    } else {
      router.push('/blog');
    }
  };

  return (
    <div className="min-h-screen">
      <div className="lg:hidden fixed top-20 left-6 z-50">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-3 glass rounded-lg hover:bg-accent/10 transition-colors"
          aria-label="태그 필터 토글"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isSidebarOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      <div className="flex">
        <aside
          className={`
            fixed lg:sticky top-0 left-0 h-screen lg:h-auto
            w-64 lg:w-72 transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            z-40 overflow-y-auto
            pt-32 lg:pt-24 pb-8 px-6
          `}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-lg font-bold mb-6">태그 필터</h2>

            {tags.length > 0 && (
              <div className="space-y-2">
                <button
                  onClick={() => {
                    handleTagSelect(null);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    !selectedTag ? 'bg-accent text-white' : 'hover:bg-accent/10'
                  }`}
                >
                  전체
                </button>
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      handleTagSelect(tag);
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedTag === tag ? 'bg-accent text-white' : 'hover:bg-accent/10'
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </aside>

        {isSidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-30"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <main className="flex-1 py-16 px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Blog.</h1>
            <p className="text-xl text-muted">개발 경험과 학습한 내용을 기록합니다</p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: PAGE_SIZE }).map((_, index) => (
                <PostCardSkeleton key={index} />
              ))}
            </div>
          ) : posts.length > 0 ? (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {posts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: Math.min(index * 0.1, 0.5) }}
                  >
                    <PostCard post={post} />
                  </motion.div>
                ))}
              </motion.div>

              {hasMore && <div ref={observerTarget} className="h-20" aria-hidden="true" />}

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
        </main>
      </div>
    </div>
  );
}
