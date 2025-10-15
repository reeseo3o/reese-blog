'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`}>
      <motion.article
        className="group cursor-pointer h-full"
        whileHover={{ y: -12 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      >
        <div
          className="h-full gradient-border glass-strong rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-accent/40"
          style={{ boxShadow: '0 8px 30px var(--hover-shadow)' }}
        >
          {project.thumbnail && (
            <div className="relative w-full h-56 bg-muted/10 overflow-hidden">
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-xs font-semibold text-white/80 uppercase tracking-widest">
                  View Project →
                </span>
              </div>
            </div>
          )}

          <div className="p-8 space-y-4">
            <h3 className="text-2xl font-bold group-hover:gradient-text transition-all duration-300">
              {project.title}
            </h3>

            {project.description && (
              <p className="text-sm text-muted line-clamp-3 leading-relaxed">
                {project.description}
              </p>
            )}

            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-4 py-1.5 rounded-full bg-accent/15 text-accent-bright font-semibold uppercase tracking-wide hover:bg-accent/25 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
