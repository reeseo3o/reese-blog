'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import PostCard from '@/components/cards/PostCard';
// import ProjectCard from '@/components/cards/ProjectCard';
import OrbBackground from '@/components/three/Background';
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

export default function HomeClient({ posts, projects }: HomeClientProps) {
  return (
    <div className="relative">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden mb-24">
        <OrbBackground />
        <motion.div
          className="relative z-10 max-w-[680px] md:max-w-2xl mx-auto px-5 sm:px-6 md:px-12 pt-10 md:pt-14 space-y-6 text-center"
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

          <motion.div className="flex items-center justify-center gap-6" variants={fadeInUp}>
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
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-foreground group-hover:w-full transition-all duration-300"></span>
            </Link>
            {/* <Link
              href="/projects"
              className="group relative font-medium text-base transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                Projects
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
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-foreground group-hover:w-full transition-all duration-300"></span>
            </Link> */}
          </motion.div>
        </motion.div>
      </section>

      <section className="py-16 mb-20">
        <div className="mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Recent Posts.</h2>
              <Link
                href="/blog"
                className="text-accent hover:text-accent-bright font-medium text-sm flex items-center gap-2 group transition-all"
              >
                전체 보기
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

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
          </motion.div>
        </div>
      </section>

      {/* <section className="py-16 mb-20">
        <div className="mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Recent Projects.</h2>
              <Link
                href="/projects"
                className="text-accent hover:text-accent-bright font-medium text-sm flex items-center gap-2 group transition-all"
              >
                전체 보기
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            {projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 glass rounded-2xl">
                <p className="text-xl text-muted">아직 등록된 프로젝트가 없습니다.</p>
                <p className="text-sm text-muted mt-3">첫 번째 프로젝트를 등록해보세요!</p>
              </div>
            )}
          </motion.div>
        </div>
      </section> */}

      <section className="py-16 mb-20">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Contact.</h2>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              <a
                href="https://github.com/reeseo3o"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-5 py-2.5 glass rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <svg
                  className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium text-sm">GitHub</span>
              </a>

              <a
                href="https://x.com/nunnu099"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-2 px-5 py-2.5 glass rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 overflow-visible"
              >
                <svg
                  className="w-5 h-5 group-hover:-translate-y-4 group-hover:translate-x-3 transition-all duration-500 ease-out"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
                <span className="font-medium text-sm">Twitter</span>
              </a>

              <a
                href="mailto:notyaeji@gmail.com"
                className="group flex items-center gap-2 px-5 py-2.5 glass rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <svg
                  className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="font-medium text-sm">Email</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
