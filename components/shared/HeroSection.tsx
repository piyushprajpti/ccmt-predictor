"use client";

import React from "react";
import { motion } from "framer-motion";
import { Info, Sparkles } from "lucide-react";

interface HeroSectionProps {
  title: React.ReactNode;
  description: React.ReactNode;
}

export function HeroSection({ title, description }: HeroSectionProps) {
  return (
    <div className="mb-6 grid grid-cols-1 lg:grid-cols-12 lg:items-center gap-10 lg:gap-16">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.1
            }
          }
        }}
        className="flex flex-col gap-6 lg:col-span-7"
      >
        <div className="space-y-4">
          <motion.h1 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className="text-[32px] md:text-[48px] font-display font-black tracking-tight text-foreground leading-[1.1]"
          >
            {title}
          </motion.h1>
          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className="text-on-surface-variant text-[16px] md:text-[18px] leading-relaxed font-medium"
          >
            {description}
          </motion.p>
        </div>
      </motion.div>

      {/* Shared Info Box: The CCMT Group System */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
        className="lg:col-span-5 w-full flex items-start gap-5 p-6 md:p-8 rounded-[2rem] bg-surface-container-high border border-outline-variant/20 shadow-2xl shadow-primary/5 relative overflow-hidden group backdrop-blur-sm"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-primary/20 transition-colors" />
        
        <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20 group-hover:scale-110 transition-transform duration-300">
          <Info className="size-6" />
        </div>
        <div className="space-y-2 relative z-10">
          <h4 className="text-sm font-black uppercase tracking-widest text-on-surface group-hover:text-primary transition-colors">The CCMT Group System</h4>
          <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed font-medium">
            Admission depends on your <span className="text-on-surface font-bold">Qualifying Degree</span> and <span className="text-on-surface font-bold">GATE Paper</span> combination. 
            CCMT groups programs based on these factors to determine eligibility for specific institutes.
            Final eligibility is subject to fulfilling specific institute criteria.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
