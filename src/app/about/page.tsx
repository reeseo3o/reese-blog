import Link from 'next/link';
import SocialLinks from '@/components/common/SocialLinks';

const principles = [
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
];

const profile = [
  { term: 'Role', description: 'Frontend Engineer' },
  { term: 'Focus', description: 'Product interfaces · UI architecture' },
  { term: 'Core', description: 'React · Next.js · TypeScript' },
  { term: 'Curious about', description: 'Design systems · Developer experience' },
];

export default function AboutPage() {
  return (
    <main className="px-6 py-14 md:px-12 md:py-20">
      <div className="mx-auto max-w-6xl">
        <header className="grid gap-12 border-b border-border pb-16 lg:grid-cols-12 lg:gap-16 lg:pb-24">
          <div className="lg:col-span-7">
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.22em] text-muted">
              Frontend Engineer
            </p>
            <h1 className="mb-8 text-5xl font-semibold tracking-[-0.055em] md:text-7xl">About.</h1>
            <p className="max-w-3xl text-2xl font-medium leading-snug tracking-[-0.025em] md:text-4xl md:leading-tight">
              I build thoughtful interfaces where product intent, design, and engineering meet.
            </p>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
              I started building products because I love the moment an idea becomes something people
              can actually use. I care about sharing what I learn, working with kind people, and
              making complex experiences feel clear.
            </p>
          </div>

          <aside className="self-end lg:col-span-5" aria-label="Profile">
            <dl className="border-t border-foreground">
              {profile.map(({ term, description }) => (
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
            What I care about.
          </h2>

          <div className="grid border-t border-border md:grid-cols-3">
            {principles.map((principle) => (
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
              Keep learning
            </p>
            <h2 className="max-w-2xl text-2xl font-semibold leading-tight tracking-[-0.03em] md:text-4xl">
              I write about the problems, decisions, and lessons behind the work.
            </h2>
          </div>
          <Link href="/blog" className="group inline-flex items-center gap-3 text-sm font-semibold">
            Read the blog
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
