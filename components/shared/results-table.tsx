"use client";

import React from 'react';
import { MapPin, BookOpen, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface ResultItem {
  year: number;
  round: string;
  institute: string;
  program: string;
  group: string;
  category: string;
  openingRank: number;
  closingRank: number;
  [key: string]: any;
}

interface ResultsTableProps {
  results: ResultItem[];
  startIndex?: number;
  type?: 'explorer' | 'predictor';
  userScores?: { code: string; score: number }[];
  checkEligibility?: (program: string, codes: string[]) => boolean;
}

export function ResultsTable({
  results,
  startIndex = 0,
  type = 'explorer',
  userScores = [],
  checkEligibility
}: ResultsTableProps) {
  return (
    <div className="w-full overflow-x-auto pb-4 custom-scrollbar max-w-full">
      <div className="min-w-[850px]">
        {/* Table Header */}
        <div className="grid grid-cols-[minmax(50px,5%)_minmax(250px,40%)_minmax(180px,25%)_minmax(90px,10%)_minmax(90px,10%)_minmax(90px,10%)] gap-4 px-6 py-4 text-sm font-bold uppercase tracking-tight text-on-surface border-b border-outline-variant/5">
          <div className="text-center">SR. No.</div>
          <div className="text-left">Institution</div>
          <div className="text-left">Program</div>
          <div className="text-left">Category</div>
          <div className="whitespace-nowrap text-center">Max Score</div>
          <div className="whitespace-nowrap text-center">Min Score</div>
        </div>

        {/* Results List */}
        <div className="flex flex-col gap-px bg-outline-variant/10 rounded-2xl overflow-hidden border border-outline-variant/20 shadow-sm">
          <AnimatePresence mode="popLayout">
            {results.map((item, idx) => (
              <motion.div
                key={`${item.institute}-${item.program}-${item.category}-${item.round}-${idx}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2, delay: idx * 0.02 }}
                className="grid grid-cols-[minmax(50px,5%)_minmax(250px,40%)_minmax(180px,25%)_minmax(90px,10%)_minmax(90px,10%)_minmax(90px,10%)] gap-4 bg-surface-container-low hover:bg-surface-container transition-colors px-6 py-4 group"
              >
                {/* SR No. */}
                <div className="flex items-center justify-center">
                  <span className="text-sm font-bold text-on-surface-variant/50 tabular-nums">
                    {startIndex + idx + 1}
                  </span>
                </div>

                {/* Institution */}
                <div className="flex flex-col gap-2 overflow-hidden">
                  <span className="text-base font-semibold text-on-surface leading-tight group-hover:text-primary transition-colors line-clamp-2 text-left">
                    {item.institute}
                  </span>
                  <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                    <MapPin className="size-3.5" />
                    <span className="truncate">{item.round}</span>
                  </div>
                </div>

                {/* Program */}
                <div className="flex flex-col gap-2 overflow-hidden">
                  <span className="text-base font-medium text-on-surface leading-tight line-clamp-2 text-left">
                    {item.program}
                  </span>
                  <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                    <BookOpen className="size-3.5" />
                    <span>{item.group}</span>
                  </div>
                </div>

                {/* Category */}
                <div className="flex items-center">
                  <span className="text-sm font-semibold text-on-surface-variant uppercase tracking-normal text-left">
                    {item.category}
                  </span>
                </div>

                {/* Max Score */}
                <div className="flex flex-col items-center justify-center gap-1">
                  <span className="text-base font-medium text-on-surface tabular-nums whitespace-nowrap">
                    {item.openingRank}
                  </span>
                </div>

                {/* Min Score / Your Score for Predictor */}
                <div className="flex flex-col items-center justify-center gap-1">
                  <span className={cn(
                    "text-base font-medium tabular-nums whitespace-nowrap",
                    type === 'predictor' ? "text-primary font-bold" : "text-on-surface-variant"
                  )}>
                    {item.closingRank}
                  </span>
                  {type === 'predictor' && (
                    <div className="flex flex-col items-center gap-1">
                      {userScores.length > 0 && checkEligibility && (
                        <div className="mt-1 flex flex-col items-center gap-1">
                          {(() => {
                            const eligibleEntries = userScores.filter(s => checkEligibility(item.program, [s.code]));
                            const maxEligibleScore = eligibleEntries.length > 0
                              ? Math.max(...eligibleEntries.map(e => e.score))
                              : 0;
                            return (
                              <span className="text-[10px] font-bold text-on-surface-variant/60 bg-surface-container-highest/50 px-2 py-0.5 rounded border border-outline-variant/10 whitespace-nowrap">
                                Yours: <span className="text-primary font-black">{maxEligibleScore}</span>
                              </span>
                            );
                          })()}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
