"use client";

import React from "react";
import { motion } from "framer-motion";
import { BarChart3, Info, Sparkles } from "lucide-react";

export function PredictorHeader() {
  return (
    <div className="mb-16">
      <div className="flex flex-col gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 w-fit"
        >
          <Sparkles className="size-4 text-primary" />
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-primary">Admission Insights</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <h1 className="text-4xl md:text-6xl font-display font-black tracking-tight text-foreground leading-[1.1]">
            Predict Your <span className="text-primary">Future</span> <br className="hidden md:block" /> 
            College & Program.
          </h1>
          <p className="text-on-surface-variant text-lg md:text-xl max-w-3xl leading-relaxed font-medium">
            Analyze your admission chances across <span className="text-on-surface font-bold">NITs, IIITs, and GFTIs</span> using multi-year historical cutoffs and CCMT's specialized group eligibility system.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-10 flex items-start gap-5 p-6 md:p-8 rounded-[2rem] bg-surface-container-high border border-outline-variant/10 shadow-2xl shadow-black/5 relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors" />
        <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/10">
          <Info className="size-6" />
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-black uppercase tracking-widest text-on-surface">The CCMT Group System</h4>
          <p className="text-sm md:text-base text-on-surface-variant leading-relaxed font-medium">
            Admission depends on your <span className="text-on-surface font-bold">Qualifying Degree</span> and <span className="text-on-surface font-bold">GATE Paper</span> combination. 
            We analyze every program group and highlight those where your score exceeds the Closing Rank. 
            Final eligibility is subject to fulfilling specific institute criteria.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
