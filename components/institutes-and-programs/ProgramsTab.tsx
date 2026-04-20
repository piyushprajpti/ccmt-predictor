"use client";

import React from 'react';
import { Program } from '@/app/institutes_and_programs/page';
import { ProgramCard } from './ProgramCard';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

interface ProgramsTabProps {
  programs: Program[];
  searchQuery: string;
}

export function ProgramsTab({ programs, searchQuery }: ProgramsTabProps) {
  const filteredPrograms = programs.filter(prog => 
    prog.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const hasResults = filteredPrograms.length > 0;

  if (!hasResults) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="size-16 rounded-3xl bg-surface-container-high border border-outline-variant/20 flex items-center justify-center mb-4">
          <AlertCircle className="size-8 text-on-surface-variant" />
        </div>
        <h3 className="text-xl font-bold text-foreground">No programs found</h3>
        <p className="text-on-surface-variant mt-2 max-w-xs">
          Try searching for a different course name.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="md:hidden mb-4">
        <p className="text-xs font-black uppercase tracking-widest text-primary/60 px-1">Browse academic programs</p>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1.5 rounded-full bg-primary" />
          <h2 className="text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
            Available Programs
            <span className="text-sm font-medium text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded-md">
              {filteredPrograms.length}
            </span>
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPrograms.map((program, index) => (
          <motion.div
            key={program.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.02, duration: 0.3 }}
          >
            <ProgramCard program={program} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
