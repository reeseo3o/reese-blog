import { NextResponse } from 'next/server';
import { getAllTags } from '@/lib/notion';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const tags = await getAllTags();

    return NextResponse.json({ tags });
  } catch (error) {
    console.error('[API Route] /api/tags 에러:', error);
    return NextResponse.json({ error: 'Failed to fetch tags' }, { status: 500 });
  }
}
