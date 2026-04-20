"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useNavigation } from "./navigation-provider";

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const { direction } = useNavigation();

  const variants = {
    initial: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 20 : dir < 0 ? -20 : 0,
      y: dir === 0 ? 8 : 0,
    }),
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -20 : dir < 0 ? 20 : 0,
      y: dir === 0 ? -8 : 0,
    }),
  };

  return (
    <AnimatePresence mode="wait" initial={false} custom={direction}>
      <motion.div
        key={pathname}
        custom={direction}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ 
          duration: 0.35, 
          ease: [0.22, 1, 0.36, 1] 
        }}
        className="flex-1 flex flex-col"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
