import Link from 'next/link';
import SocialLinks from '@/components/common/SocialLinks';

const aboutCopy = {
  ko: {
    languageLabel: '소개 언어',
    role: 'Frontend Engineer',
    title: 'About.',
    headline: '복잡한 비즈니스 요구를 단순하고 탄탄한 제품으로 만듭니다.',
    introduction:
      '아이디어가 실제로 쓰이는 제품이 되는 과정을 좋아합니다. 비즈니스 맥락을 이해하고 복잡도를 구조화하며, 팀이 자신 있게 확장할 수 있는 예측 가능한 프론트엔드 기반을 만드는 데 집중합니다.',
    profileLabel: '프로필',
    profile: [
      { term: '역할', description: '프론트엔드 엔지니어' },
      { term: '집중', description: '제품 인터페이스 · UI 아키텍처' },
      { term: '주요 기술', description: 'React · Next.js · TypeScript' },
      { term: '관심', description: '디자인 시스템 · 개발자 경험' },
    ],
    principlesTitle: '제가 중요하게 생각하는 것.',
    principles: [
      {
        number: '01',
        title: '영리함보다 명료함',
        description:
          '좋은 인터페이스는 다음 행동을 자연스럽게 이해하게 합니다. 중요한 복잡성을 감추지 않으면서 사용자의 마찰을 줄이는 설계를 추구합니다.',
      },
      {
        number: '02',
        title: '오래 유용한 시스템',
        description:
          '팀이 자신 있게 움직일 수 있도록 재사용 가능한 UI 기반과 예측 가능한 아키텍처를 설계하는 일을 좋아합니다.',
      },
      {
        number: '03',
        title: '배움을 기록으로',
        description:
          '글쓰기를 통해 경험을 오래 남는 지식으로 바꾸고, 그 지식이 다른 사람에게도 도움이 될 기회를 만듭니다.',
      },
    ],
    ctaEyebrow: '배움을 기록합니다',
    ctaTitle: '작업 뒤에 있었던 문제와 결정, 그리고 배움을 기록합니다.',
    ctaLabel: '글 읽기',
  },
  en: {
    languageLabel: 'About language',
    role: 'Frontend Engineer',
    title: 'About.',
    headline: 'I turn complex business needs into simple, resilient products.',
    introduction:
      'I enjoy turning ideas into products people can actually use. I focus on understanding the business context, structuring complexity, and building predictable frontend foundations that teams can extend with confidence.',
    profileLabel: 'Profile',
    profile: [
      { term: 'Role', description: 'Frontend Engineer' },
      { term: 'Focus', description: 'Product interfaces · UI architecture' },
      { term: 'Core', description: 'React · Next.js · TypeScript' },
      { term: 'Curious about', description: 'Design systems · Developer experience' },
    ],
    principlesTitle: 'What I care about.',
    principles: [
      {
        number: '01',
        title: 'Clarity over cleverness',
        description:
          'The best interface makes the next step feel obvious. I care about reducing friction without hiding important complexity.',
      },
      {
        number: '02',
        title: 'Systems that stay useful',
        description:
          'I enjoy shaping reusable UI foundations and predictable architecture that help teams move with confidence.',
      },
      {
        number: '03',
        title: 'Learning in public',
        description:
          'Writing helps me turn experience into durable knowledge—and gives that knowledge a chance to help someone else.',
      },
    ],
    ctaEyebrow: 'Keep learning',
    ctaTitle: 'I write about the problems, decisions, and lessons behind the work.',
    ctaLabel: 'Read the blog',
  },
} as const;

const languageOptions = [
  { code: 'ko', label: 'KR', href: '/about' },
  { code: 'en', label: 'EN', href: '/about?lang=en' },
] as const;

interface AboutPageProps {
  searchParams: Promise<{ lang?: string }>;
}

export default async function AboutPage({ searchParams }: AboutPageProps) {
  const { lang } = await searchParams;
  const language = lang === 'en' ? 'en' : 'ko';
  const copy = aboutCopy[language];

  return (
    <main lang={language} className="px-6 py-14 md:px-12 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex justify-end" role="group" aria-label={copy.languageLabel}>
          <div className="inline-flex rounded-full border border-border p-1 font-mono text-[0.7rem] tracking-[0.12em]">
            {languageOptions.map((option) => (
              <Link
                key={option.code}
                href={option.href}
                replace
                scroll={false}
                aria-current={language === option.code ? 'page' : undefined}
                className={`rounded-full px-3 py-1.5 transition-colors ${
                  language === option.code
                    ? 'bg-foreground text-background'
                    : 'text-muted hover:text-foreground'
                }`}
              >
                {option.label}
              </Link>
            ))}
          </div>
        </div>

        <header className="grid gap-12 border-b border-border pb-16 lg:grid-cols-12 lg:gap-16 lg:pb-24">
          <div className="lg:col-span-7">
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.22em] text-muted">
              {copy.role}
            </p>
            <h1 className="mb-8 text-5xl font-semibold tracking-[-0.055em] md:text-7xl">
              {copy.title}
            </h1>
            <p className="max-w-3xl text-2xl font-medium leading-snug tracking-[-0.025em] md:text-4xl md:leading-tight">
              {copy.headline}
            </p>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
              {copy.introduction}
            </p>
          </div>

          <aside className="self-end lg:col-span-5" aria-label={copy.profileLabel}>
            <dl className="border-t border-foreground">
              {copy.profile.map(({ term, description }) => (
                <div
                  key={term}
                  className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-border py-4 text-sm"
                >
                  <dt className="font-mono text-xs uppercase tracking-wider text-muted">{term}</dt>
                  <dd className="font-medium">{description}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </header>

        <section className="py-16 md:py-24">
          <h2 className="mb-10 text-3xl font-semibold tracking-[-0.035em] md:text-4xl">
            {copy.principlesTitle}
          </h2>

          <div className="grid border-t border-border md:grid-cols-3">
            {copy.principles.map((principle) => (
              <article
                key={principle.number}
                className="border-b border-border py-8 md:border-r md:px-8 md:last:border-r-0 md:first:pl-0 md:last:pr-0"
              >
                <span className="font-mono text-xs text-muted">{principle.number}</span>
                <h3 className="mt-8 text-xl font-semibold tracking-[-0.02em]">{principle.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted">{principle.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-8 rounded-3xl border border-border bg-foreground p-8 text-background md:grid-cols-[1fr_auto] md:items-end md:p-12">
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] opacity-60">
              {copy.ctaEyebrow}
            </p>
            <h2 className="max-w-2xl text-2xl font-semibold leading-tight tracking-[-0.03em] md:text-4xl">
              {copy.ctaTitle}
            </h2>
          </div>
          <Link href="/blog" className="group inline-flex items-center gap-3 text-sm font-semibold">
            {copy.ctaLabel}
            <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
              →
            </span>
          </Link>
        </section>

        <div className="mt-16 flex justify-center">
          <SocialLinks />
        </div>
      </div>
    </main>
  );
}
