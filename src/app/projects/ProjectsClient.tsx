'use client';

import { motion } from 'framer-motion';
import ProjectCard from '@/components/cards/ProjectCard';
import { Project } from '@/lib/types';

interface ProjectsClientProps {
  projects: Project[];
}

export default function ProjectsClient({ projects }: ProjectsClientProps) {
  return (
    <div className="py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Projects.</h1>
          <p className="text-xl text-muted">진행했던 프로젝트들을 소개합니다</p>
        </motion.div>

        {projects.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16 text-muted">
            <p>아직 등록된 프로젝트가 없습니다.</p>
            <p className="text-sm mt-2">
              data/projects/projects.json 파일에 프로젝트를 추가해보세요!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
