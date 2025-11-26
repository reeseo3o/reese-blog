'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import PostCard from '@/components/cards/PostCard';
import OrbBackground from '@/components/three/Background';
import AnimatedSection from '@/components/common/AnimatedSection';
import SectionHeader from '@/components/common/SectionHeader';
import SocialLinks from '@/components/common/SocialLinks';
import { Post, Project } from '@/lib/types';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

interface HomeClientProps {
  posts: Post[];
  projects: Project[];
}

export default function HomeClient({ posts }: HomeClientProps) {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden mb-24">
        <OrbBackground />
        <motion.div
          className="relative z-20 max-w-[680px] md:max-w-2xl mx-auto px-5 sm:px-6 md:px-12 pt-10 md:pt-14 space-y-6 text-center pointer-events-none"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.p
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight sm:leading-tight md:leading-snug [text-wrap:balance]"
            variants={fadeInUp}
          >
            Learning through problems growing through learning.
          </motion.p>

          <motion.div className="flex items-center justify-center gap-6 pointer-events-auto" variants={fadeInUp}>
            <Link
              href="/blog"
              className="group relative font-medium text-base transition-all duration-300"
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
          </motion.div>
        </motion.div>
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
