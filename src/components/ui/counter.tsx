"use client";

import React, { useEffect, useState, useRef } from "react";
import { useInView } from "motion/react";

interface CounterProps {
  end: number;
  start?: number;
  duration?: number; // duration in seconds
  decimals?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
  className?: string;
}

export function Counter({
  end,
  start = 0,
  duration = 2,
  decimals = 0,
  prefix = "",
  suffix = "",
  separator = ".",
  className,
}: CounterProps) {
  const [count, setCount] = useState(start);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      // Smooth easeOutCubic / easeOutExpo curve
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      const currentCount = start + (end - start) * easeProgress;
      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, end, start, duration]);

  const formattedNumber = () => {
    const fixed = count.toFixed(decimals);
    const parts = fixed.split(".");
    // Format thousands separator
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return parts.join(",");
  };

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formattedNumber()}
      {suffix}
    </span>
  );
}
