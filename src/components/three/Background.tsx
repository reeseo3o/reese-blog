'use client';

import { useEffect, useState } from 'react';
import Orb from '@/components/three/Orb';

export default function OrbBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none opacity-80 md:opacity-90">
      <Orb hue={-10} hoverIntensity={0.35} rotateOnHover={false} forceHoverState={false} />
    </div>
  );
}
