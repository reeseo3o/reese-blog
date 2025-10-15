import { Project } from '@/lib/types';
import projectsData from '@/data/projects/projects.json';

const projects = projectsData as Project[];

export function getAllProjects(): Project[] {
  return projects.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });
}

export function getProjectBySlug(slug: string): Project | null {
  const project = projects.find((p) => p.slug === slug);
  return project || null;
}

export function getRecentProjects(limit: number = 3): Project[] {
  return getAllProjects().slice(0, limit);
}

export function getProjectsByCategory(category: string): Project[] {
  return projects.filter((p) => p.category === category);
}

export function getProjectsByTag(tag: string): Project[] {
  return projects.filter((p) => p.tags?.includes(tag));
}

export function getAllCategories(): string[] {
  const categories = projects.map((p) => p.category).filter((c): c is string => !!c);
  return Array.from(new Set(categories));
}

export function getAllTags(): string[] {
  const tags = projects.flatMap((p) => p.tags || []);
  return Array.from(new Set(tags));
}
