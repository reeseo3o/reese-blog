'use client';

import { NotionBlock as NotionBlockType } from '@/lib/types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useEffect, useState, useRef } from 'react';
import mermaid from 'mermaid';
import SafeImage from '@/components/SafeImage';

interface NotionRendererProps {
  blocks: NotionBlockType[];
}

interface BlockValue {
  rich_text?: RichTextItem[];
  file?: { url: string };
  external?: { url: string };
  caption?: RichTextItem[];
  language?: string;
  cells?: RichTextItem[][];
  checked?: boolean;
  icon?: { emoji?: string };
  color?: string;
  url?: string;
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
  const children = (block.children as NotionBlockType[] | undefined) ?? [];

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
      if ((value as any)?.is_toggleable && children.length > 0) {
        return (
          <details className="group my-6 rounded-lg border border-border/50 bg-muted/5 transition-all hover:bg-muted/10">
            <summary className="flex cursor-pointer list-none items-center gap-3 px-5 py-4 text-3xl font-bold hover:bg-accent/5 rounded-lg transition-colors">
              <span className="text-2xl text-accent transition-transform duration-200 group-open:rotate-90 flex-shrink-0">
                ▶
              </span>
              <span className="flex-1">
                <RichText richText={value?.rich_text} />
              </span>
            </summary>
            <div className="px-5 pb-4 pt-2 space-y-3 border-t border-border/30 mt-2">
              {children.map((child) => (
                <NotionBlock key={child.id} block={child} />
              ))}
            </div>
          </details>
        );
      }
      return (
        <h1 className="text-4xl font-bold mt-8 mb-4">
          <RichText richText={value?.rich_text} />
        </h1>
      );

    case 'heading_2':
      if ((value as any)?.is_toggleable && children.length > 0) {
        return (
          <details className="group my-5 rounded-lg border border-border/50 bg-muted/5 transition-all hover:bg-muted/10">
            <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-3 text-2xl font-bold hover:bg-accent/5 rounded-lg transition-colors">
              <span className="text-xl text-accent transition-transform duration-200 group-open:rotate-90 flex-shrink-0">
                ▶
              </span>
              <span className="flex-1">
                <RichText richText={value?.rich_text} />
              </span>
            </summary>
            <div className="px-4 pb-3 pt-2 space-y-3 border-t border-border/30 mt-2">
              {children.map((child) => (
                <NotionBlock key={child.id} block={child} />
              ))}
            </div>
          </details>
        );
      }
      return (
        <h2 className="text-3xl font-bold mt-6 mb-3">
          <RichText richText={value?.rich_text} />
        </h2>
      );

    case 'heading_3':
      if ((value as any)?.is_toggleable && children.length > 0) {
        return (
          <details className="group my-4 rounded-lg border border-border/50 bg-muted/5 transition-all hover:bg-muted/10">
            <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-3 text-xl font-semibold hover:bg-accent/5 rounded-lg transition-colors">
              <span className="text-lg text-accent transition-transform duration-200 group-open:rotate-90 flex-shrink-0">
                ▶
              </span>
              <span className="flex-1">
                <RichText richText={value?.rich_text} />
              </span>
            </summary>
            <div className="px-4 pb-3 pt-2 space-y-3 border-t border-border/30 mt-2">
              {children.map((child) => (
                <NotionBlock key={child.id} block={child} />
              ))}
            </div>
          </details>
        );
      }
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
            <SafeImage
              src={src}
              alt={caption || ''}
              width={800}
              height={600}
              className="rounded-lg mx-auto max-w-full h-auto max-h-[70vh] object-contain"
              maxRetries={2}
              retryDelayMs={800}
              unoptimized
            />
          )}
          {caption && (
            <figcaption className="text-center text-sm text-muted mt-2">{caption}</figcaption>
          )}
        </figure>
      );

    case 'toggle':
      return (
        <details className="group my-4 rounded-lg border border-border/50 bg-muted/10 transition-colors open:bg-muted/20">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3">
            <span className="text-lg font-bold leading-relaxed">
              <RichText richText={value?.rich_text} />
            </span>
            <span className="text-sm text-muted transition-transform duration-200 group-open:rotate-180 flex-shrink-0">
              ▾
            </span>
          </summary>
          {children && children.length > 0 && (
            <div className="space-y-3 border-t border-border/50 px-4 py-4">
              {children.map((child) => (
                <NotionBlock key={child.id} block={child} />
              ))}
            </div>
          )}
        </details>
      );

    case 'table':
      if (!children || children.length === 0) return null;
      
      const tableRows = children.filter((row) => row.type === 'table_row');
      if (tableRows.length === 0) return null;
      
      const headerRow = tableRows[0];
      const bodyRows = tableRows.slice(1);
      const headerRowValue = headerRow[headerRow.type] as BlockValue | undefined;
      const headerCells = headerRowValue?.cells || [];
      
      return (
        <div className="my-6 overflow-x-auto">
          <table className="w-full border-collapse border border-border/50 rounded-lg overflow-hidden">
            {headerCells.length > 0 && (
              <thead>
                <tr className="bg-muted/20 border-b border-border/50">
                  {headerCells.map((cell, cellIndex) => (
                    <th
                      key={cellIndex}
                      className="px-4 py-3 border-r border-border/50 last:border-r-0 font-semibold text-left"
                    >
                      <RichText richText={cell} />
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {bodyRows.map((row) => {
                const rowValue = row[row.type] as BlockValue | undefined;
                const cells = rowValue?.cells || [];
                
                return (
                  <tr key={row.id} className="border-b border-border/50 last:border-b-0 hover:bg-muted/10 transition-colors">
                    {cells.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="px-4 py-3 border-r border-border/50 last:border-r-0"
                      >
                        <RichText richText={cell} />
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );

    case 'table_row':
      // table_row는 table의 children으로만 렌더링되므로 여기서는 처리하지 않음
      return null;

    case 'to_do':
      const isChecked = (value as any)?.checked || false;
      return (
        <div className="flex items-start gap-3 my-2">
          <input
            type="checkbox"
            checked={isChecked}
            readOnly
            className="mt-1.5 w-4 h-4 rounded border-border cursor-default"
          />
          <span className={isChecked ? 'line-through text-muted' : ''}>
            <RichText richText={value?.rich_text} />
          </span>
        </div>
      );

    case 'callout':
      const icon = (value as any)?.icon?.emoji || '💡';
      const calloutColor = (value as any)?.color || 'default';
      const calloutBgClass =
        calloutColor === 'gray_background'
          ? 'bg-gray-100 dark:bg-gray-800'
          : calloutColor === 'blue_background'
            ? 'bg-blue-50 dark:bg-blue-900/20'
            : calloutColor === 'yellow_background'
              ? 'bg-yellow-50 dark:bg-yellow-900/20'
              : 'bg-muted/20';

      return (
        <div className={`flex gap-3 p-4 my-4 rounded-lg border border-border/50 ${calloutBgClass}`}>
          <span className="text-2xl flex-shrink-0">{icon}</span>
          <div className="flex-1">
            <RichText richText={value?.rich_text} />
            {children && children.length > 0 && (
              <div className="mt-2 space-y-2">
                {children.map((child) => (
                  <NotionBlock key={child.id} block={child} />
                ))}
              </div>
            )}
          </div>
        </div>
      );

    case 'column_list':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
          {children.map((child) => (
            <NotionBlock key={child.id} block={child} />
          ))}
        </div>
      );

    case 'column':
      return (
        <div className="space-y-3">
          {children.map((child) => (
            <NotionBlock key={child.id} block={child} />
          ))}
        </div>
      );

    case 'video':
      const videoSrc = value?.file?.url || value?.external?.url;
      if (!videoSrc) return null;
      
      return (
        <figure className="my-6">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src={videoSrc}
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              allowFullScreen
              title="Video"
            />
          </div>
          {value?.caption?.[0]?.plain_text && (
            <figcaption className="text-center text-sm text-muted mt-2">
              {value.caption[0].plain_text}
            </figcaption>
          )}
        </figure>
      );

    case 'bookmark':
    case 'link_preview':
      const bookmarkUrl = (value as any)?.url;
      if (!bookmarkUrl) return null;

      return (
        <a
          href={bookmarkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block my-4 p-4 border border-border/50 rounded-lg hover:bg-muted/10 transition-colors"
        >
          <div className="flex items-center gap-2 text-accent hover:underline">
            <span>🔗</span>
            <span className="truncate">{bookmarkUrl}</span>
          </div>
        </a>
      );

    case 'embed':
      const embedUrl = value?.url;
      if (!embedUrl) return null;

      return (
        <div className="my-6 border border-border/50 rounded-lg overflow-hidden">
          <iframe
            src={embedUrl}
            className="w-full h-96"
            allowFullScreen
            title="Embed"
          />
        </div>
      );

    case 'file':
    case 'pdf':
      const fileUrl = value?.file?.url || value?.external?.url;
      const fileName = value?.caption?.[0]?.plain_text || 'Download File';
      
      if (!fileUrl) return null;

      return (
        <a
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 my-4 px-4 py-3 bg-muted/20 hover:bg-muted/30 border border-border/50 rounded-lg transition-colors"
        >
          <span>📎</span>
          <span className="text-accent">{fileName}</span>
        </a>
      );

    case 'breadcrumb':
    case 'table_of_contents':
    case 'child_page':
    case 'child_database':
    case 'template':
    case 'synced_block':
    case 'unsupported':
      // 위 블록들은 블로그 콘텐츠에서 일반적으로 필요하지 않기에 무시
      return null;

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
        style={oneDark}
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
