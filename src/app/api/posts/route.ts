import { NextResponse } from 'next/server';
import { getPostsPaginated } from '@/lib/notion';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10); 
    const pageSize = parseInt(searchParams.get('pageSize') || '9', 10);
    const tag = searchParams.get('tag') || undefined;

    const result = await getPostsPaginated(page, pageSize, tag);

    return NextResponse.json(result);
  } catch (error) {
    console.error('[API Route] 에러 발생:', error);
    if (error instanceof Error) {
      console.error('[API Route] 에러 메시지:', error.message);
      console.error('[API Route] 에러 스택:', error.stack);
    }
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}
