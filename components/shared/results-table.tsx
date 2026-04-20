"use client";

import React from 'react';
import { MapPin, BookOpen, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import nirfData from '@/public/nirf_rank.json';

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

// Memoize individual row component for performance
const ResultRow = React.memo(function ResultRow({
  item,
  idx,
  startIndex,
  type,
  userScores,
  checkEligibility
}: {
  item: ResultItem;
  idx: number;
  startIndex: number;
  type: 'explorer' | 'predictor';
  userScores: { code: string; score: number }[];
  checkEligibility?: (program: string, codes: string[]) => boolean;
}) {
  // Safety check: ensure required fields exist
  if (!item?.institute || !item?.program || !item?.category) {
    return null;
  }

  const safeInstitute = String(item.institute).slice(0, 300);
  const safeProgram = String(item.program).slice(0, 300);
  const safeCategory = String(item.category).slice(0, 50);
  const safeRound = String(item.round || 'Unknown').slice(0, 100);
  const safeGroup = String(item.group || 'N/A').slice(0, 100);
  const openingRank = Number(item.openingRank) || 0;
  const closingRank = Number(item.closingRank) || 0;

  return (
    <motion.div
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
          {safeInstitute}
        </span>
        <div className="flex items-center gap-3 text-sm text-on-surface-variant">
          <div className="flex items-center gap-1.5">
            <MapPin className="size-3.5 text-primary/70" />
            <span className="truncate">{safeRound}</span>
          </div>
          {/* NIRF Rank Display */}
          {(() => {
            try {
              const instName = safeInstitute.trim().replace(/\s+/g, ' ');
              const rankData = (nirfData.institutes as any)?.[instName];
              if (!rankData) return null;
              return (
                <div className="flex items-center gap-1.5 bg-surface-container-highest/50 px-2.5 py-1 rounded-md border border-outline-variant/10">
                  <span className="text-[11px] font-bold text-on-surface-variant/70 uppercase tracking-tighter">NIRF</span>
                  <span className="text-sm font-bold text-primary">
                    {rankData.display || 'N/A'}
                  </span>
                </div>
              );
            } catch (e) {
              return null;
            }
          })()}
        </div>
      </div>

      {/* Program */}
      <div className="flex flex-col gap-2 overflow-hidden">
        <span className="text-base font-medium text-on-surface leading-tight line-clamp-2 text-left">
          {safeProgram}
        </span>
        <div className="flex items-center gap-2 text-sm text-on-surface-variant">
          <BookOpen className="size-3.5" />
          <span>{safeGroup}</span>
        </div>
      </div>

      {/* Category */}
      <div className="flex items-center">
        <span className="text-sm font-semibold text-on-surface-variant uppercase tracking-normal text-left">
          {safeCategory}
        </span>
      </div>

      {/* Max Score */}
      <div className="flex flex-col items-center justify-center gap-1">
        <span className="text-base font-medium text-on-surface tabular-nums whitespace-nowrap">
          {openingRank}
        </span>
      </div>

      {/* Min Score / Your Score for Predictor */}
      <div className="flex flex-col items-center justify-center gap-1">
        <span className={cn(
          "text-base font-medium tabular-nums whitespace-nowrap",
          type === 'predictor' ? "text-primary font-bold" : "text-on-surface-variant"
        )}>
          {closingRank}
        </span>
        {type === 'predictor' && userScores && userScores.length > 0 && checkEligibility && (
          <div className="mt-1">
            {(() => {
              try {
                const eligibleEntries = userScores.filter(s => 
                  checkEligibility!(item.program, [s.code])
                );
                const maxEligibleScore = eligibleEntries.length > 0
                  ? Math.max(...eligibleEntries.map(e => Number(e.score) || 0))
                  : 0;
                return (
                  <span className="text-[10px] font-bold text-on-surface-variant/60 bg-surface-container-highest/50 px-2 py-0.5 rounded border border-outline-variant/10 whitespace-nowrap">
                    Yours: <span className="text-primary font-black">{maxEligibleScore}</span>
                  </span>
                );
              } catch (e) {
                return null;
              }
            })()}
          </div>
        )}
      </div>
    </motion.div>
  );
});

export function ResultsTable({
  results,
  startIndex = 0,
  type = 'explorer',
  userScores = [],
  checkEligibility
}: ResultsTableProps) {
  // Validate results array
  if (!Array.isArray(results) || results.length === 0) {
    return (
      <div className="w-full px-6 py-12 text-center text-on-surface-variant">
        <p className="text-sm font-medium">No results to display</p>
      </div>
    );
  }

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
              <ResultRow
                key={`${item.institute}-${item.program}-${item.category}-${item.round}-${idx}`}
                item={item}
                idx={idx}
                startIndex={startIndex}
                type={type}
                userScores={userScores}
                checkEligibility={checkEligibility}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
