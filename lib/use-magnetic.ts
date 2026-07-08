"use client";

import { useRef } from "react";
import { useMotionValue, useReducedMotion, useSpring } from "framer-motion";

/**
 * Shared magnetic-hover behavior: the element leans toward the cursor
 * and springs back on leave. No-ops under prefers-reduced-motion.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.25) {
  const ref = useRef<T>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18 });
  const springY = useSpring(y, { stiffness: 200, damping: 18 });
  const reduce = useReducedMotion();

  function onMouseMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return { ref, x: springX, y: springY, onMouseMove, onMouseLeave };
}
