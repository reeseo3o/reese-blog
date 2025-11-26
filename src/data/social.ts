import { ReactNode } from 'react';

export interface SocialLink {
  name: string;
  href: string;
  icon: 'github' | 'twitter' | 'email';
  hoverAnimation?: 'rotate' | 'fly' | 'bounce';
}

export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    href: 'https://github.com/reeseo3o',
    icon: 'github',
    hoverAnimation: 'rotate',
  },
  {
    name: 'Twitter',
    href: 'https://x.com/nunnu099',
    icon: 'twitter',
    hoverAnimation: 'fly',
  },
  {
    name: 'Email',
    href: 'mailto:notyaeji@gmail.com',
    icon: 'email',
    hoverAnimation: 'rotate',
  },
];

