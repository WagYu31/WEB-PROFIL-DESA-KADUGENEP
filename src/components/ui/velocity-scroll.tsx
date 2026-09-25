"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { cn } from "@/lib/utils";

interface VelocityScrollProps {
  text: string;
  defaultVelocity?: number;
  className?: string;
  badge?: string;
}

interface ParallaxProps {
  children: React.ReactNode;
  baseVelocity: number;
  className?: string;
}

function wrap(min: number, max: number, v: number) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

function ParallaxText({ children, baseVelocity = 3, className }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  const directionFactor = useRef<number>(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap flex flex-nowrap select-none py-2.5">
      <motion.div className={cn("flex flex-nowrap font-bold tracking-tight text-white", className)} style={{ x }}>
        <span className="flex items-center gap-6 mr-6">{children}</span>
        <span className="flex items-center gap-6 mr-6">{children}</span>
        <span className="flex items-center gap-6 mr-6">{children}</span>
        <span className="flex items-center gap-6 mr-6">{children}</span>
      </motion.div>
    </div>
  );
}

export function VelocityScroll({
  text,
  defaultVelocity = 1.6,
  className,
  badge = "KADUGENEP · SERANG",
}: VelocityScrollProps) {
  const isReduced = useReducedMotion();

  if (isReduced) {
    return (
      <div className="w-full bg-[#0a192f] border-y border-sky-900/40 py-3.5 px-6 overflow-x-auto text-sky-100 flex items-center justify-between text-xs font-semibold">
        <span className="tracking-wider uppercase text-amber-400">{badge}</span>
        <span className="text-slate-300">{text}</span>
      </div>
    );
  }

  const items = text.split("•").map((item) => item.trim()).filter(Boolean);

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-r from-[#071324] via-[#0f2744] to-[#071324] border-y border-sky-500/20 shadow-inner py-1.5 my-0">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.1),transparent_70%)]" />

      {/* Row 1 moving left */}
      <ParallaxText baseVelocity={defaultVelocity} className={className}>
        {items.map((item, idx) => (
          <span key={idx} className="inline-flex items-center gap-4 text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-white/95">
            <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
            <span className="hover:text-sky-300 transition-colors">{item}</span>
          </span>
        ))}
      </ParallaxText>

      {/* Row 2 moving opposite right */}
      <ParallaxText baseVelocity={-defaultVelocity * 0.85} className={className}>
        {items.slice().reverse().map((item, idx) => (
          <span key={idx} className="inline-flex items-center gap-4 text-[11px] sm:text-xs uppercase tracking-[0.25em] font-semibold text-sky-200/80">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            <span>{item}</span>
          </span>
        ))}
      </ParallaxText>
    </section>
  );
}
