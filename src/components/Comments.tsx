'use client';

import Giscus from '@giscus/react';
import { useMemo } from 'react';

export default function Comments() {
  const config = useMemo(
    () => ({
      repo: 'reeseo3o/reese-blog',
      repoId: process.env.NEXT_PUBLIC_GISCUS_REPO_ID,
      category: 'Comments',
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'pathname',
      reactionsEnabled: '1',
      emitMetadata: '0',
      inputPosition: 'bottom' as 'top' | 'bottom',
      lang: 'ko',
      loading: 'lazy' as 'lazy' | 'eager',
      theme: 'noborder_light',
    }),
    [],
  );

  return (
    <section className="mt-16">
      <Giscus
        id="comments"
        repo={config.repo as `${string}/${string}`}
        repoId={config.repoId as string}
        category={config.category as string}
        categoryId={config.categoryId as string}
        mapping={config.mapping as 'pathname' | 'url' | 'title' | 'og:title' | 'specific'}
        reactionsEnabled={config.reactionsEnabled as '0' | '1'}
        emitMetadata={config.emitMetadata as '0' | '1'}
        inputPosition={config.inputPosition}
        theme={config.theme as string}
        lang={config.lang as string}
        loading={config.loading as 'lazy' | 'eager'}
      />
    </section>
  );
}
