'use client';

import { NotionBlock as NotionBlockType } from '@/lib/types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useEffect, useState, useRef } from 'react';
import mermaid from 'mermaid';
import Image from 'next/image';

interface NotionRendererProps {
  blocks: NotionBlockType[];
}

interface BlockValue {
  rich_text?: RichTextItem[];
  file?: { url: string };
  external?: { url: string };
  caption?: RichTextItem[];
  language?: string;
}

interface RichTextItem {
  plain_text: string;
  annotations: {
    bold?: boolean;
    italic?: boolean;
    strikethrough?: boolean;
    underline?: boolean;
    code?: boolean;
  };
  href?: string | null;
}

export default function NotionRenderer({ blocks }: NotionRendererProps) {
  if (!blocks || blocks.length === 0) {
    return <div className="text-muted">콘텐츠가 없습니다.</div>;
  }

  return (
    <div className="notion-content prose prose-lg dark:prose-invert max-w-none">
      {blocks.map((block) => (
        <NotionBlock key={block.id} block={block} />
      ))}
    </div>
  );
}

function NotionBlock({ block }: { block: NotionBlockType }) {
  const { type } = block;
  const value = block[type] as BlockValue | undefined;
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    checkDarkMode();

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  switch (type) {
    case 'paragraph':
      return (
        <p className="my-4">
          <RichText richText={value?.rich_text} />
        </p>
      );

    case 'heading_1':
      return (
        <h1 className="text-4xl font-bold mt-8 mb-4">
          <RichText richText={value?.rich_text} />
        </h1>
      );

    case 'heading_2':
      return (
        <h2 className="text-3xl font-bold mt-6 mb-3">
          <RichText richText={value?.rich_text} />
        </h2>
      );

    case 'heading_3':
      return (
        <h3 className="text-2xl font-semibold mt-5 mb-2">
          <RichText richText={value?.rich_text} />
        </h3>
      );

    case 'bulleted_list_item':
      return (
        <li className="ml-4">
          <RichText richText={value?.rich_text} />
        </li>
      );

    case 'numbered_list_item':
      return (
        <li className="ml-4">
          <RichText richText={value?.rich_text} />
        </li>
      );

    case 'code':
      const codeText = value?.rich_text?.map((t) => t.plain_text).join('') || '';
      const language = value?.language || 'text';

      return <CodeBlock code={codeText} language={language} isDark={isDark} />;

    case 'quote':
      return (
        <blockquote className="border-l-4 border-accent pl-4 italic my-4 text-muted">
          <RichText richText={value?.rich_text} />
        </blockquote>
      );

    case 'divider':
      return <hr className="my-8 border-border" />;

    case 'image':
      const src = value?.file?.url || value?.external?.url;
      const caption = value?.caption?.[0]?.plain_text;
      return (
        <figure className="my-6">
          {src && (
            <Image
              src={src}
              alt={caption || ''}
              width={800}
              height={600}
              className="rounded-lg mx-auto max-w-full h-auto max-h-[70vh] object-contain"
              unoptimized
            />
          )}
          {caption && (
            <figcaption className="text-center text-sm text-muted mt-2">{caption}</figcaption>
          )}
        </figure>
      );

    default:
      return null;
  }
}

function CodeBlock({
  code,
  language,
  isDark,
}: {
  code: string;
  language: string;
  isDark: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (language.toLowerCase() === 'mermaid') {
    return <MermaidDiagram chart={code} isDark={isDark} />;
  }

  return (
    <div className="my-6 rounded-lg overflow-hidden border border-border/50">
      <div className="bg-muted/10 px-4 py-2 flex items-center justify-between">
        <span className="text-xs font-mono text-muted uppercase">{language}</span>
        <button
          onClick={handleCopy}
          className="text-xs px-3 py-1 rounded bg-accent/10 hover:bg-accent/20 text-accent transition-colors"
          aria-label="코드 복사"
        >
          {copied ? '✓ 복사됨' : '복사'}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={isDark ? oneDark : oneLight}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          fontSize: '0.875rem',
          padding: '1.25rem',
        }}
        showLineNumbers={code.split('\n').length > 5}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

function MermaidDiagram({ chart, isDark }: { chart: string; isDark: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: isDark ? 'dark' : 'default',
      securityLevel: 'loose',
      fontFamily: 'ui-sans-serif, system-ui, sans-serif',
    });

    const renderDiagram = async () => {
      try {
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        const { svg: renderedSvg } = await mermaid.render(id, chart);
        setSvg(renderedSvg);
      } catch (error) {
        console.error('Mermaid rendering error:', error);
        setSvg(`<pre class="text-red-500">Mermaid 렌더링 오류: ${error}</pre>`);
      }
    };

    renderDiagram();
  }, [chart, isDark]);

  return (
    <div className="my-6 rounded-lg overflow-hidden border border-border/50 bg-white dark:bg-gray-900">
      <div className="bg-muted/10 px-4 py-2 border-b border-border/50">
        <span className="text-xs font-mono text-muted uppercase">MERMAID</span>
      </div>
      <div
        ref={ref}
        className="p-6 flex items-center justify-center overflow-x-auto"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );
}

function RichText({ richText }: { richText?: RichTextItem[] }) {
  if (!richText) return null;

  return (
    <>
      {richText.map((text, index) => {
        const {
          annotations: { bold, italic, strikethrough, underline, code },
          plain_text,
          href,
        } = text;

        let content = <>{plain_text}</>;

        if (code) {
          content = (
            <code
              className="relative px-2 py-1 mx-0.5 font-medium text-sm"
              style={{ backgroundColor: 'var(--code-highlight)' }}
            >
              {content}
            </code>
          );
        }
        if (bold) {
          content = <strong>{content}</strong>;
        }
        if (italic) {
          content = <em>{content}</em>;
        }
        if (strikethrough) {
          content = <s>{content}</s>;
        }
        if (underline) {
          content = <u>{content}</u>;
        }
        if (href) {
          content = (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              {content}
            </a>
          );
        }

        return <span key={index}>{content}</span>;
      })}
    </>
  );
}
