"use client";

import React, { useState } from 'react';
import { Program } from '@/app/institutes_and_programs/page';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, School, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProgramCardProps {
  program: Program;
}

export function ProgramCard({ program }: ProgramCardProps) {
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
      <div className="p-6 relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <h3 className="text-md font-semibold leading-tight text-on-surface group-hover:text-primary transition-colors">
              {program.name}
            </h3>
            <div className="flex items-center gap-2 text-xs font-medium text-on-surface-variant">
              <School className="size-4 text-primary" />
              <span>{program.institutes.length} Institutes offering this course</span>
            </div>
          </div>
          <div 
            className={cn(
              "size-9 rounded-xl flex items-center justify-center transition-all duration-300 shrink-0",
              isExpanded 
                ? "bg-primary text-primary-foreground rotate-180" 
                : "bg-surface-container text-on-surface-variant hover:bg-primary/10 hover:text-primary"
            )}
          >
            <ChevronDown className="size-4" />
          </div>
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
              <div className="mt-5 pt-5 border-t border-outline-variant/10">
                <div className="grid grid-cols-1 gap-2">
                  {program.institutes.map((institute, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: idx * 0.02 }}
                      className="flex items-center gap-3 p-2 rounded-xl bg-surface-container/20 hover:bg-primary/5 transition-colors group/inst"
                    >
                      <Building2 className="size-3.5 text-primary/60 group-hover/inst:text-primary transition-colors" />
                      <span className="text-xs font-medium text-on-surface-variant leading-snug group-hover/inst:text-primary transition-colors">
                        {institute}
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
