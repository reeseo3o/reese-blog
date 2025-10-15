import { getAllProjects } from '@/lib/projects';
import ProjectsClient from '@/app/projects/ProjectsClient';
import type { Metadata } from 'next';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Projects - Reese',
  description: '진행했던 프로젝트들을 소개합니다',
  openGraph: {
    title: 'Projects - Reese',
    description: '진행했던 프로젝트들을 소개합니다',
    type: 'website',
  },
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return <ProjectsClient projects={projects} />;
}
