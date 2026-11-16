import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { NOTION_BLOCKS_CACHE_TAG, NOTION_POSTS_CACHE_TAG } from '@/lib/notion-cache';

interface RevalidateBody {
  slug?: string;
}

export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;

  if (!secret) {
    return NextResponse.json({ error: 'Revalidation is not configured' }, { status: 503 });
  }

  if (request.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: RevalidateBody = {};

  try {
    body = (await request.json()) as RevalidateBody;
  } catch {
    // A body is optional when all blog caches should be invalidated.
  }

  revalidateTag(NOTION_POSTS_CACHE_TAG);
  revalidateTag(NOTION_BLOCKS_CACHE_TAG);
  revalidatePath('/');
  revalidatePath('/blog');
  revalidatePath('/blog/[slug]', 'page');
  revalidatePath('/sitemap.xml');

  if (body.slug) {
    revalidatePath(`/blog/${body.slug}`);
  }

  return NextResponse.json({
    revalidated: true,
    slug: body.slug ?? null,
    revalidatedAt: new Date().toISOString(),
  });
}
