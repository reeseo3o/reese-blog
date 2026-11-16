'use client';

import Image, { ImageProps } from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { buildRetryImageSrc } from '@/lib/image-retry';

type Props = Omit<ImageProps, 'onError' | 'onLoad'> & {
  fallbackSrc?: string;
  maxRetries?: number;
  retryDelayMs?: number;
  onLoadingStateChange?: (isLoading: boolean) => void;
};

export default function SafeImage({
  src,
  alt,
  fallbackSrc,
  maxRetries = 2,
  retryDelayMs = 800,
  onLoadingStateChange,
  ...rest
}: Props) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const retryCountRef = useRef(0);
  const imageKeyRef = useRef(0);

  const resolvedFallback = useMemo(() => fallbackSrc ?? '/images/og-image.png', [fallbackSrc]);

  useEffect(() => {
    setCurrentSrc(src);
    setIsLoading(true);
    retryCountRef.current = 0;
    imageKeyRef.current += 1;
  }, [src]);

  useEffect(() => {
    onLoadingStateChange?.(isLoading);
  }, [isLoading, onLoadingStateChange]);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const scheduleRetry = useCallback(() => {
    if (retryCountRef.current >= maxRetries) {
      setCurrentSrc(resolvedFallback);
      setIsLoading(true);
      return;
    }

    retryCountRef.current += 1;
    setIsLoading(true);

    // URL에 타임스탬프 추가하여 재시도
    const original = typeof src === 'string' ? src : String(src);
    try {
      const next = buildRetryImageSrc(
        original,
        Date.now(),
        typeof window !== 'undefined' ? window.location.origin : 'http://localhost',
      );

      setTimeout(() => {
        setCurrentSrc(next);
        imageKeyRef.current += 1;
      }, retryDelayMs);
    } catch {
      // URL 파싱 실패 시 즉시 fallback
      setCurrentSrc(resolvedFallback);
      setIsLoading(true);
    }
  }, [maxRetries, retryDelayMs, resolvedFallback, src]);

  return (
    <Image
      {...rest}
      key={imageKeyRef.current}
      src={currentSrc}
      alt={alt}
      onLoad={handleLoad}
      onError={scheduleRetry}
    />
  );
}
