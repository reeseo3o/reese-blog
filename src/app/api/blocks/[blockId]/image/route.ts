import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_TOKEN || process.env.NOTION_API_KEY,
});

type BlockType = 'image' | 'video' | 'file' | 'pdf';

interface FileBlock {
  type: BlockType;
  [key: string]: unknown;
  image?: { file?: { url: string }; external?: { url: string } };
  video?: { file?: { url: string }; external?: { url: string } };
  file?: { file?: { url: string }; external?: { url: string } };
  pdf?: { file?: { url: string }; external?: { url: string } };
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ blockId: string }> }
) {
  try {
    const { blockId } = await params;

    const block = await notion.blocks.retrieve({ block_id: blockId }) as FileBlock;
    
    const blockType = block.type;
    const blockData = block[blockType] as { file?: { url: string }; external?: { url: string } } | undefined;
    
    if (!blockData) {
      return NextResponse.json({ error: 'Block data not found' }, { status: 404 });
    }

    const fileUrl = blockData.file?.url || blockData.external?.url;
    
    if (!fileUrl) {
      return NextResponse.json({ error: 'No file URL found' }, { status: 404 });
    }

    const fileResponse = await fetch(fileUrl);
    
    if (!fileResponse.ok) {
      return NextResponse.json({ error: 'Failed to fetch file' }, { status: 500 });
    }

    const fileBuffer = await fileResponse.arrayBuffer();
    const contentType = fileResponse.headers.get('content-type') || 'application/octet-stream';

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('[API] Block file fetch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

