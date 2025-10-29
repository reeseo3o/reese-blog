'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const navigation = [
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
  // { name: 'Projects', href: '/projects' }, // temporarily hidden
];

export default function Header() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const currentTheme = document.documentElement.getAttribute('data-theme') as 'light' | 'dark';
    setTheme(currentTheme || 'light');

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          const newTheme = document.documentElement.getAttribute('data-theme') as 'light' | 'dark';
          setTheme(newTheme || 'light');
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <nav className="mx-auto px-6 md:px-12 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-sm md:text-xl font-bold relative group overflow-hidden">
            <span className="relative inline-block bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-foreground group-hover:from-foreground group-hover:via-accent group-hover:to-foreground group-hover:bg-[length:200%_100%] group-hover:animate-[shimmer_2s_ease-in-out_infinite] transition-all duration-300">
              Reese-log
            </span>
          </Link>

          <div className="flex items-center gap-8">
            <ul className="flex items-center gap-8">
              {navigation.map((item) => {
                const isActive =
                  pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));

                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`relative text-sm font-medium transition-colors hover:text-accent ${
                        isActive ? 'text-foreground' : 'text-muted'
                      }`}
                    >
                      {item.name}
                      {isActive && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg glass hover:glass-strong transition-all duration-300 group cursor-pointer"
              aria-label="테마 전환"
            >
              {theme === 'light' ? (
                <svg
                  className="w-5 h-5 text-foreground group-hover:rotate-12 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-foreground group-hover:rotate-12 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
