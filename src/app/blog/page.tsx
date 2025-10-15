import { getAllTags } from '@/lib/notion';
import BlogClient from '@/app/blog/BlogClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Reese',
  description: '개발 경험과 학습한 내용을 기록합니다',
};

export const dynamic = 'force-dynamic';

interface BlogPageProps {
  searchParams: Promise<{ tag?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const selectedTag = params.tag;

  const tags = await getAllTags();

  return <BlogClient tags={tags} initialSelectedTag={selectedTag} />;
}
