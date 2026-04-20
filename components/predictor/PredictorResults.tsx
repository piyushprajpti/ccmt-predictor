"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Search,
  Trophy,
  Compass,
  ArrowRight,
  Filter,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { checkEligibility } from "@/lib/eligibility";

interface PredictorResultsProps {
  results: any[];
  userScores: { code: string; score: number }[];
  category: string;
}

export function PredictorResults({ results, userScores, category }: PredictorResultsProps) {
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>({
    key: 'closingRank',
    direction: 'desc'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const maxUserScore = Math.max(...userScores.map(s => s.score));

  const sortedResults = useMemo(() => {
    let sortableItems = [...results];

    if (search) {
      sortableItems = sortableItems.filter(item =>
        item.institute.toLowerCase().includes(search.toLowerCase()) ||
        item.program.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [results, sortConfig, search]);

  const totalPages = Math.ceil(sortedResults.length / itemsPerPage);
  const paginatedResults = sortedResults.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard
          icon={<Trophy className="size-5" />}
          label="Eligible Programs"
          value={results.length.toString()}
          delay={0}
        />
        <StatCard
          icon={<Filter className="size-5" />}
          label="Selected Category"
          value={category}
          delay={0.1}
          color="secondary"
        />
        <StatCard
          icon={<Compass className="size-5" />}
          label="Highest Score"
          value={maxUserScore.toString()}
          delay={0.2}
          color="accent"
        />
      </div>

      {/* Main Table Container */}
      <div className="bg-surface-container rounded-[2.5rem] border border-outline-variant/40 overflow-hidden shadow-2xl shadow-primary/5">
        <div className="p-6 md:p-8 border-b border-outline-variant/30 bg-surface-container-high/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 size-5 text-on-surface-variant/50" />
            <input
              type="text"
              placeholder="Filter by institute or program name..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-[1.25rem] pl-14 pr-6 py-4 text-sm font-bold text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-inner"
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest ml-1">Sort by</span>
            <div className="flex bg-surface-container-lowest p-1 rounded-xl border border-outline-variant/40">
              <SortTab active={sortConfig?.key === 'closingRank'} onClick={() => requestSort('closingRank')} label="Cutoff" />
              <SortTab active={sortConfig?.key === 'institute'} onClick={() => requestSort('institute')} label="Institute" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-surface-container-lowest/50 text-[10px] font-black uppercase tracking-[0.25em] text-on-surface-variant/60">
                <th className="px-5 py-4">Institute Details</th>
                <th className="px-5 py-4">Program Name</th>
                <th className="px-5 py-4">Round</th>
                <th className="px-5 py-4 text-center">Group</th>
                <th className="px-5 py-4 text-right">Admission Range</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              <AnimatePresence mode="popLayout">
                {paginatedResults.length > 0 ? (
                  paginatedResults.map((item, idx) => (
                    <motion.tr
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      key={`${item.institute}-${item.program}-${item.round}-${item.group}-${idx}`}
                      className="group hover:bg-primary/[0.02] transition-colors"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-4">
                          <div className="size-10 rounded-xl bg-surface-container-highest flex items-center justify-center shrink-0 border border-outline-variant/30 group-hover:border-primary/20 transition-colors">
                            <Building2 className="size-5 text-on-surface-variant group-hover:text-primary transition-colors" />
                          </div>
                          <span className="text-base font-medium text-on-surface leading-tight tracking-tight group-hover:text-primary transition-colors">{item.institute}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-sm font-semibold text-on-surface-variant/80 leading-relaxed block max-w-sm">{item.program}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-flex px-3.5 py-1.5 rounded-lg bg-surface-container-highest text-xs font-black uppercase tracking-wider text-on-surface-variant border border-outline-variant/30">
                          {item.round}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <span className="text-sm font-bold text-primary/80 bg-primary/5 px-3 py-1.5 rounded-md border border-primary/10">
                          {item.group.replace('Group ', 'G-')}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex flex-col items-end gap-2">
                          {(() => {
                            const eligibleEntries = userScores.filter(s => checkEligibility(item.program, [s.code]));
                            const maxEligibleScore = eligibleEntries.length > 0
                              ? Math.max(...eligibleEntries.map(e => e.score))
                              : 0;
                            const paperCodesStr = eligibleEntries.map(e => e.code).join(", ");

                            return (
                              <>
                                <div className="flex items-center gap-3">
                                  {paperCodesStr && (
                                    <span className="text-[9px] font-black text-primary/40 bg-primary/5 px-1.5 py-0.5 rounded border border-primary/5">
                                      {paperCodesStr}
                                    </span >
                                  )}
                                  <div className="flex items-center gap-2.5 text-foreground">
                                    <div className="flex flex-col items-end">
                                      <span className="text-xs font-black uppercase tracking-widest text-on-surface-variant/40 leading-none mb-1.5">Max</span>
                                      <span className="text-xl font-display font-black tabular-nums leading-none">{item.openingRank}</span>
                                    </div>
                                    <div className="w-px h-10 bg-outline-variant/20 mx-1.5" />
                                    <div className="flex flex-col items-end">
                                      <span className="text-xs font-black uppercase tracking-widest text-primary/40 leading-none mb-1.5">Min</span>
                                      <span className="text-xl font-display font-black text-primary tabular-nums leading-none">{item.closingRank}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="text-xs font-bold text-on-surface-variant/60 flex items-center gap-2 bg-surface-container-highest/50 px-3 py-1.5 rounded-md border border-outline-variant/10">
                                  <span>Your Score:</span>
                                  <span className="text-primary font-black">{maxEligibleScore}</span>
                                </div>
                              </>
                            );
                          })()}
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-8 py-32 text-center">
                      <div className="flex flex-col items-center gap-4 opacity-40">
                        <Search className="size-12" />
                        <p className="text-sm font-bold uppercase tracking-widest italic">No matching programs found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-6 md:p-8 border-t border-outline-variant/10 flex items-center justify-between bg-surface-container-lowest/30">
            <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em]">Showing Page {currentPage} of {totalPages}</span>
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="icon"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className="rounded-xl size-11 border-outline-variant/40 hover:bg-primary/5 hover:text-primary transition-all"
              >
                <ChevronLeft className="size-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                className="rounded-xl size-11 border-outline-variant/40 hover:bg-primary/5 hover:text-primary transition-all"
              >
                <ChevronRight className="size-5" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Explorer Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-primary rounded-[3rem] p-10 md:p-14 text-primary-foreground relative overflow-hidden group shadow-2xl shadow-primary/20 border border-white/10"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-black/20 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl text-center md:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
              <Sparkles className="size-3" />
              Detailed Insights
            </div>
            <h3 className="text-3xl md:text-5xl font-display font-black leading-tight tracking-tight">Want to dive deeper into the data?</h3>
            <p className="text-primary-foreground/70 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
              Explore the full dataset across 5 years with advanced filters, seat matrices, and institute-wise trends in our specialized data explorer.
            </p>
          </div>

          <Link href="/explorer" className="shrink-0">
            <Button size="lg" className="bg-white text-primary hover:bg-primary-foreground h-20 px-12 rounded-[1.5rem] text-xl font-black gap-4 group-hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-black/20">
              Open Explorer
              <ArrowRight className="size-7" />
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

function StatCard({ icon, label, value, delay, color = 'primary' }: { icon: React.ReactNode, label: string, value: string, delay: number, color?: 'primary' | 'secondary' | 'accent' }) {
  const colors = {
    primary: "bg-primary/10 text-primary border-primary/20",
    secondary: "bg-secondary/10 text-secondary border-secondary/20",
    accent: "bg-accent-secondary/10 text-accent-secondary border-accent-secondary/20"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-surface-container-high rounded-[2rem] p-6 border border-outline-variant/10 flex items-center gap-5 shadow-sm"
    >
      <div className={cn("size-14 rounded-2xl flex items-center justify-center shrink-0 border", colors[color])}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-black text-on-surface-variant/60 uppercase tracking-[0.15em] mb-1">{label}</p>
        <p className="text-3xl font-display font-black text-foreground leading-none">{value}</p>
      </div>
    </motion.div>
  );
}

function SortTab({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-6 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
        active ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "text-on-surface-variant/60 hover:text-on-surface hover:bg-surface-container-highest"
      )}
    >
      {label}
    </button>
  );
}
