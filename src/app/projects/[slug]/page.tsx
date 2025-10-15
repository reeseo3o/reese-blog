import { notFound } from 'next/navigation';
import { getProjectBySlug, getAllProjects } from '@/lib/projects';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 86400;

export const dynamicParams = false;

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://reese-blog.com';
  const url = `${siteUrl}/projects/${project.slug}`;

  return {
    title: project.title,
    description: project.description || project.title,
    keywords: project.tags?.join(', '),
    authors: [{ name: 'Reese' }],
    openGraph: {
      title: project.title,
      description: project.description || project.title,
      url,
      type: 'website',
      images: project.thumbnail
        ? [
            {
              url: project.thumbnail,
              width: 1200,
              height: 630,
              alt: project.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description || project.title,
      images: project.thumbnail ? [project.thumbnail] : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const formattedDate = new Date(project.date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
  });

  return (
    <article className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <div className="text-sm text-muted mb-4">
            <time dateTime={project.date}>{formattedDate}</time>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">{project.title}</h1>

          {project.description && <p className="text-xl text-muted mb-6">{project.description}</p>}

          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm px-3 py-1 rounded-full bg-accent/10 text-accent font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {(project.githubUrl || project.demoUrl) && (
          <div className="flex gap-4 mb-8">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors font-medium text-white"
              >
                GitHub →
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 rounded-lg bg-accent hover:bg-accent/80 transition-colors font-medium text-white"
              >
                Live Demo →
              </a>
            )}
          </div>
        )}

        <hr className="border-border mb-12" />

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <ReactMarkdown>{project.content}</ReactMarkdown>
        </div>

        {Array.isArray(project.images) && project.images.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-semibold mb-4">Screenshots</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.images.map((src) => (
                <div
                  key={src}
                  className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-muted/10"
                >
                  <Image src={src} alt={project.title} fill className="object-cover" />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
