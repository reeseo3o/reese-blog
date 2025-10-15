import { getPosts } from '@/lib/notion';
import { getRecentProjects } from '@/lib/projects';
import HomeClient from '@/app/HomeClient';
import type { Metadata } from 'next';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Reese-log',
  description:
    '프로덕트를 설계하고 구현합니다. 사용자 경험과 기술적 완성도, 두 가지를 모두 고민합니다.',
};

export default async function HomePage() {
  const allPosts = await getPosts();
  const posts = allPosts.slice(0, 3);
  const projects = getRecentProjects(3);

  return <HomeClient posts={posts} projects={projects} />;
}

