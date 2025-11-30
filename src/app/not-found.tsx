'use client';

import { motion, Variants, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';

const containerVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.8,
    },
  },
};

const itemVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const floatingOrbs = [
  { size: 300, x: '10%', y: '20%', duration: 20, delay: 0 },
  { size: 200, x: '70%', y: '60%', duration: 25, delay: 2 },
  { size: 150, x: '80%', y: '10%', duration: 18, delay: 1 },
  { size: 250, x: '20%', y: '70%', duration: 22, delay: 3 },
  { size: 180, x: '50%', y: '40%', duration: 28, delay: 0.5 },
];

export default function NotFound() {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isTypingDone, setIsTypingDone] = useState(false);
  const fullText = '404';
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const fastSpring = { damping: 20, stiffness: 300 };
  const slowSpring = { damping: 30, stiffness: 100 };

  const rotateX = useSpring(0, fastSpring);
  const rotateY = useSpring(0, fastSpring);

  const translateX = useSpring(0, fastSpring);
  const translateY = useSpring(0, fastSpring);
  const translateZ = useSpring(0, fastSpring);

  const scale = useSpring(1, fastSpring);

  const bgX = useSpring(0, slowSpring);
  const bgY = useSpring(0, slowSpring);

  const shadowX = useTransform(rotateY, (value) => value * -1.5);
  const shadowY = useTransform(rotateX, (value) => value * 1.5);
  const shadowBlur = useTransform(
    [rotateX, rotateY],
    ([rx, ry]: number[]) => Math.abs(rx) + Math.abs(ry) + 4
  );

  // 하이라이트용
  const highlightX = useTransform(rotateY, (v) => v * 0.5);

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTypingDone(true);
        setTimeout(() => setShowCursor(false), 1500);
      }
    }, 150);

    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    if (!showCursor) return;
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, [showCursor]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // -1 ~ 1 범위로 정규화
      const normalizedX = (e.clientX - centerX) / (rect.width / 2);
      const normalizedY = (e.clientY - centerY) / (rect.height / 2);

      // 클램핑 (-1 ~ 1)
      const clampedX = Math.max(-1, Math.min(1, normalizedX));
      const clampedY = Math.max(-1, Math.min(1, normalizedY));

      mouseX.set(clampedX);
      mouseY.set(clampedY);

      // 3D tilt 효과 (최대 25도 - 더 역동적!)
      rotateY.set(clampedX * 25);
      rotateX.set(-clampedY * 25);

      // 위치 이동 (마우스 방향으로 살짝 따라감)
      translateX.set(clampedX * 20);
      translateY.set(clampedY * 15);

      // Z축 이동 (마우스가 중앙에서 멀어질수록 앞으로 튀어나옴)
      const distance = Math.sqrt(clampedX ** 2 + clampedY ** 2);
      translateZ.set(distance * 30);

      // 스케일 (마우스가 중앙에서 멀어질수록 약간 커짐)
      scale.set(1 + distance * 0.08);

      bgX.set(clampedX * 60);
      bgY.set(clampedY * 60);
    };

    const handleMouseLeave = () => {
      rotateX.set(0);
      rotateY.set(0);
      translateX.set(0);
      translateY.set(0);
      translateZ.set(0);
      scale.set(1);
      bgX.set(0);
      bgY.set(0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    containerRef.current?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY, rotateX, rotateY, translateX, translateY, translateZ, scale, bgX, bgY]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden -mt-20"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-background" />
        {floatingOrbs.map((orb, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full bg-gradient-to-br from-accent/10 to-accent/5 blur-3xl"
            style={{
              width: orb.size,
              height: orb.size,
              left: orb.x,
              top: orb.y,
            }}
            animate={{
              x: [0, 30, -20, 10, 0],
              y: [0, -40, 20, -30, 0],
              scale: [1, 1.1, 0.95, 1.05, 1],
            }}
            transition={{
              duration: orb.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: orb.delay,
            }}
          />
        ))}

        <motion.div
          className="absolute w-80 h-80 rounded-full bg-gradient-radial from-accent/15 via-accent/5 to-transparent blur-3xl pointer-events-none"
          style={{
            x: bgX,
            y: bgY,
            left: '50%',
            top: '50%',
            marginLeft: -160,
            marginTop: -160,
          }}
        />
      </div>

      <motion.div
        className="relative z-20 text-center px-6"
        initial="initial"
        animate="animate"
        variants={containerVariants}
      >
        {/* Typing 404 with 3D tilt */}
        <motion.div
          className="relative mb-8"
          style={{
            rotateX: isTypingDone ? rotateX : 0,
            rotateY: isTypingDone ? rotateY : 0,
            x: isTypingDone ? translateX : 0,
            y: isTypingDone ? translateY : 0,
            z: isTypingDone ? translateZ : 0,
            scale: isTypingDone ? scale : 1,
            transformPerspective: 1200,
            transformStyle: 'preserve-3d',
          }}
        >
          <h1 className="text-[120px] sm:text-[160px] md:text-[200px] font-mono font-bold leading-none select-none text-foreground/90 transition-colors">
            {displayText}
            <span
              className={`inline-block w-[3px] sm:w-[4px] h-[100px] sm:h-[130px] md:h-[160px] ml-2 bg-accent align-middle transition-opacity duration-100 ${
                showCursor ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </h1>

          <motion.div
            className="absolute inset-0 text-[120px] sm:text-[160px] md:text-[200px] font-mono font-bold leading-none select-none text-accent/20 -z-10 pointer-events-none"
            style={{
              x: shadowX,
              y: shadowY,
              filter: `blur(${shadowBlur}px)`,
              opacity: isTypingDone ? 0.6 : 0,
              transform: 'translateZ(-50px)',
            }}
          >
            404
          </motion.div>

          <motion.div
            className="absolute inset-0 text-[120px] sm:text-[160px] md:text-[200px] font-mono font-bold leading-none select-none bg-gradient-to-r from-accent/0 via-accent/10 to-accent/0 bg-clip-text text-transparent -z-5 pointer-events-none"
            style={{
              x: highlightX,
              opacity: isTypingDone ? 0.5 : 0,
            }}
          >
            404
          </motion.div>
        </motion.div>

        <motion.div className="space-y-4 mb-10" variants={itemVariants}>
          <p className="text-xl sm:text-2xl md:text-3xl font-medium text-foreground/90">
            페이지를 찾을 수 없습니다
          </p>
          <p className="text-sm sm:text-base text-muted max-w-md mx-auto">
            요청하신 페이지가 삭제되었거나, 잘못된 경로로 접근하셨습니다.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={itemVariants}
        >
          <Link
            href="/"
            className="group relative px-8 py-3 rounded-full glass hover:glass-strong transition-all duration-300 font-medium"
          >
            <span className="flex items-center gap-2">
              <svg
                className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              홈으로 돌아가기
            </span>
          </Link>

          <Link
            href="/blog"
            className="group relative px-8 py-3 font-medium text-muted hover:text-foreground transition-colors duration-300"
          >
            <span className="flex items-center gap-2">
              블로그 둘러보기
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-foreground group-hover:w-full transition-all duration-300" />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
