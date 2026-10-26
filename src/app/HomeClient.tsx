'use client';

import Link from 'next/link';
import PostCard from '@/components/cards/PostCard';
import OrbBackground from '@/components/three/Background';
import AnimatedSection from '@/components/common/AnimatedSection';
import SectionHeader from '@/components/common/SectionHeader';
import SocialLinks from '@/components/common/SocialLinks';
import { Post, Project } from '@/lib/types';

interface HomeClientProps {
  posts: Post[];
  projects: Project[];
}

export default function HomeClient({ posts }: HomeClientProps) {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[calc(82svh-5rem)] flex items-center justify-center overflow-hidden mb-12 md:mb-16">
        <OrbBackground />
        <div className="relative z-20 max-w-[620px] mx-auto px-6 sm:px-8 md:px-10 pt-8 md:pt-12 space-y-7 text-center pointer-events-none">
          <p className="font-mono text-[0.7rem] sm:text-xs font-medium uppercase tracking-[0.24em] text-muted">
            Frontend Engineer
          </p>
          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-semibold tracking-[-0.04em] leading-[1.12]">
            <span className="block">I turn complex business</span>
            <span className="block">needs into simple,</span>
            <span className="block">resilient products.</span>
          </h1>

          <div className="flex items-center justify-center gap-6 pointer-events-auto">
            <Link
              href="/blog"
              className="group relative font-medium text-sm sm:text-base transition-colors duration-300"
            >
              <span className="flex items-center gap-2">
                Blog
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-foreground group-hover:w-full transition-all duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="py-16 mb-20">
        <div className="mx-auto px-6 md:px-12">
          <SectionHeader title="Recent Posts." linkHref="/blog" />
          <AnimatedSection>
            {posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 glass rounded-2xl">
                <p className="text-xl text-muted">아직 작성된 글이 없습니다.</p>
                <p className="text-sm text-muted mt-3">Notion에서 블로그 포스트를 작성해보세요!</p>
              </div>
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 mb-20">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <AnimatedSection>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Contact.</h2>
            <SocialLinks />
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
