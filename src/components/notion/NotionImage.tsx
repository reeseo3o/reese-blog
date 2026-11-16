'use client';

import { useState } from 'react';
import SafeImage from '@/components/SafeImage';

interface NotionImageProps {
  src: string;
  alt: string;
}

export default function NotionImage({ src, alt }: NotionImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className="relative mx-auto w-fit max-w-full overflow-hidden rounded-lg bg-muted/10"
      aria-busy={isLoading}
    >
      {isLoading && <div className="skeleton-shimmer absolute inset-0" aria-hidden="true" />}

      <SafeImage
        src={src}
        alt={alt}
        width={800}
        height={600}
        className={`block h-auto max-h-[70vh] max-w-full object-contain transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        maxRetries={2}
        retryDelayMs={800}
        onLoadingStateChange={setIsLoading}
      />
    </div>
  );
}
