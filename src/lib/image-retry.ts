export function buildRetryImageSrc(original: string, timestamp: number, baseUrl: string): string {
  const url = new URL(original, baseUrl);
  url.searchParams.set('_t', timestamp.toString());

  const isRootRelativePath = original.startsWith('/') && !original.startsWith('//');

  if (isRootRelativePath) {
    return `${url.pathname}${url.search}${url.hash}`;
  }

  return url.toString();
}
