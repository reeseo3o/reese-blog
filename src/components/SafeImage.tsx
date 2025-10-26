'use client';

import Image, { ImageProps } from 'next/image';
import { useCallback, useMemo, useRef, useState } from 'react';

type Props = Omit<ImageProps, 'onError'> & {
  fallbackSrc?: string;
  maxRetries?: number;
  retryDelayMs?: number;
};

export default function SafeImage({
  src,
  alt,
  fallbackSrc,
  maxRetries = 2,
  retryDelayMs = 800,
  ...rest
}: Props) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const retryCountRef = useRef(0);

  const resolvedFallback = useMemo(() => fallbackSrc ?? '/images/og-image.png', [fallbackSrc]);

  const scheduleRetry = useCallback(() => {
    // 재시도 횟수 초과 시 fallback
    if (retryCountRef.current >= maxRetries) {
      setCurrentSrc(resolvedFallback);
      return;
    }
    
    retryCountRef.current += 1;
    
    // URL에 타임스탬프 추가하여 재시도
    const original = typeof src === 'string' ? src : String(src);
    try {
      const url = new URL(original, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
      url.searchParams.set('_t', Date.now().toString());
      const next = url.toString();

      setTimeout(() => {
        setCurrentSrc(next);
      }, retryDelayMs);
    } catch {
      // URL 파싱 실패 시 즉시 fallback
      setCurrentSrc(resolvedFallback);
    }
  }, [maxRetries, retryDelayMs, resolvedFallback, src]);

  return (
    <Image
      {...rest}
      src={currentSrc}
      alt={alt}
      onError={scheduleRetry}
    />
  );
}


