import Link from 'next/link';

interface SectionHeaderProps {
  title: string;
  linkHref?: string;
  linkText?: string;
}

export default function SectionHeader({ title, linkHref, linkText = '전체 보기' }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-12">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
      {linkHref && (
        <Link
          href={linkHref}
          className="text-accent hover:text-accent-bright font-medium text-sm flex items-center gap-2 group transition-all"
        >
          {linkText}
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      )}
    </div>
  );
}

