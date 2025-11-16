import { notFound } from 'next/navigation';
import { getPostBySlug, getPageBlocks, getPosts } from '@/lib/notion';
import NotionRenderer from '@/components/notion/NotionRenderer';
import Comments from '@/components/Comments';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 1800;

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://reese-blog.com';
  const url = `${siteUrl}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description || post.title,
    keywords: post.tags?.join(', '),
    authors: [{ name: 'Reese' }],
    openGraph: {
      title: post.title,
      description: post.description || post.title,
      url,
      type: 'article',
      publishedTime: post.date,
      authors: ['Reese'],
      tags: post.tags,
      images: post.thumbnail
        ? [
            {
              url: post.thumbnail,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description || post.title,
      images: post.thumbnail ? [post.thumbnail] : undefined,
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const blocks = await getPageBlocks(post.id);

  const formattedDate = new Date(post.date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <div className="flex items-center gap-2 text-sm text-muted mb-4">
            {post.category && (
              <>
                <span>{post.category}</span>
                <span>•</span>
              </>
            )}
            <time dateTime={post.date}>{formattedDate}</time>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>

          {post.description && <p className="text-xl text-muted">{post.description}</p>}

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((tag) => (
                <span key={tag} className="text-sm px-3 py-1 rounded-full bg-accent/10 text-accent">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <hr className="border-border mb-12" />

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <NotionRenderer blocks={blocks} />
        </div>

        <div className="max-w-4xl mx-auto">
          <Comments />
        </div>
      </div>
    </article>
  );
}
