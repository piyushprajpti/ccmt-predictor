"use client";

import React, { useState } from 'react';
import { Institute } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, GraduationCap, Building2, MapPin, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import nirfData from '@/public/nirf_rank.json';

interface InstituteCardProps {
  institute: Institute;
}

export function InstituteCard({ institute }: InstituteCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      onClick={() => setIsExpanded(!isExpanded)}
      className={cn(
        "group relative overflow-hidden rounded-3xl border transition-all duration-500 cursor-pointer",
        isExpanded
          ? "bg-surface-container-lowest border-primary/30 shadow-2xl shadow-primary/10"
          : "bg-surface-container-low/50 border-outline-variant/20 hover:border-primary/20 hover:bg-surface-container-lowest hover:shadow-xl"
      )}
    >
      {/* Background Decor */}
      <div className={cn(
        "absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full -mr-16 -mt-16 transition-opacity duration-500",
        isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"
      )} />

      <div className="p-6 relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2">
              <span className={cn(
                "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border",
                institute.category === "NIT" ? "bg-primary/10 text-primary border-primary/20" :
                  institute.category === "IIIT" ? "bg-blue-500/10 text-blue-600 border-blue-500/20" :
                    "bg-green-500/10 text-green-600 border-green-500/20"
              )}>
                {institute.category}
              </span>
            </div>
            <h3 className="text-lg font-semibold leading-tight text-on-surface group-hover:text-primary transition-colors">
              {institute.name}
            </h3>
          </div>
          <div
            className={cn(
              "size-10 rounded-2xl flex items-center justify-center transition-all duration-300 shrink-0",
              isExpanded
                ? "bg-primary text-primary-foreground rotate-180"
                : "bg-surface-container text-on-surface-variant hover:bg-primary/10 hover:text-primary"
            )}
          >
            <ChevronDown className="size-5" />
          </div>
        </div>

        <div className="mt-4 flex items-center gap-4 text-xs font-medium text-on-surface-variant">
          <div className="flex items-center gap-1.5">
            <GraduationCap className="size-4 text-primary" />
            <span>{institute.programs.length} Programs</span>
          </div>
          {/* NIRF Rank Display */}
          {(() => {
            const instName = institute.name.trim().replace(/\s+/g, ' ');
            const rankData = (nirfData.institutes as any)[instName];
            if (!rankData) return null;
            return (
              <div className="flex items-center gap-1.5 bg-surface-container-highest/50 px-2.5 py-1 rounded-md border border-outline-variant/10">
                <span className="text-[11px] font-bold text-on-surface-variant/70 uppercase tracking-tighter">NIRF</span>
                <span className="text-sm font-bold text-primary">
                  {rankData.display}
                </span>
              </div>
            );
          })()}
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mt-6 pt-6 border-t border-outline-variant/10 space-y-4">
                <h4 className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant/70">Offered Programs</h4>
                <div className="grid grid-cols-1 gap-2">
                  {institute.programs.map((program, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: idx * 0.03 }}
                      className="flex items-start gap-3 p-2.5 rounded-xl bg-surface-container/30 border border-transparent hover:border-primary/10 hover:bg-primary/5 transition-all group/item"
                    >
                      <div className="size-1.5 rounded-full bg-primary/40 mt-1.5 group-hover/item:scale-150 transition-transform" />
                      <span className="text-sm font-medium text-on-surface-variant leading-snug group-hover/item:text-primary transition-colors">
                        {program}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
