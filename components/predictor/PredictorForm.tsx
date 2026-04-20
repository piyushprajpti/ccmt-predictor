"use client";

import React, { useState } from "react";
import { Plus, Trash2, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { CustomSelect } from "@/components/ui/custom-select";

const PAPER_CODES = [
  "CS", "DA", "ME", "EC", "EE", "CE", "CH", "IN", "PI", "MT",
  "AE", "AG", "AR", "BM", "BT", "CY", "ES", "EY", "GE", "GG",
  "MA", "MN", "NM", "PE", "PH", "ST", "TF", "XE", "XH", "XL"
].sort();

const CATEGORIES = [
  "OPEN", "OBC-NCL", "SC", "ST", "EWS",
  "OPEN-PwD", "OBC-NCL-PwD", "SC-PwD", "ST-PwD", "EWS-PwD"
];

const YEARS = ["2025", "2024", "2023", "2022", "2021"];

interface PaperEntry {
  id: string;
  code: string;
  score: string;
}

interface PredictorFormProps {
  onPredict: (data: {
    category: string;
    entries: { code: string; score: number }[];
    year: string;
  }) => void;
  isLoading: boolean;
}

export function PredictorForm({ onPredict, isLoading }: PredictorFormProps) {
  const [category, setCategory] = useState("OPEN");
  const [year, setYear] = useState("2025");
  const [entries, setEntries] = useState<PaperEntry[]>([
    { id: Math.random().toString(), code: "CS", score: "" }
  ]);
  const [error, setError] = useState<string | null>(null);

  const addEntry = () => {
    setError(null);
    setEntries([...entries, { id: Math.random().toString(), code: "CS", score: "" }]);
  };

  const removeEntry = (id: string) => {
    if (entries.length > 1) {
      setEntries(entries.filter(e => e.id !== id));
    }
  };

  const updateEntry = (id: string, field: keyof PaperEntry, value: string) => {
    setError(null);
    setEntries(entries.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check for out-of-range scores first
    const hasOutOfRange = entries.some(e => {
      if (!e.score) return false;
      const val = Number(e.score);
      return val < 0 || val > 1000;
    });

    if (hasOutOfRange) {
      setError("GATE scores must be between 0 and 1000.");
      return;
    }

    const validEntries = entries
      .filter(e => e.score && !isNaN(Number(e.score)) && Number(e.score) >= 0 && Number(e.score) <= 1000)
      .map(e => ({ code: e.code, score: Number(e.score) }));
    
    if (validEntries.length === 0) {
      setError("Please enter at least one valid GATE score.");
      return;
    }

    setError(null);
    onPredict({ category, entries: validEntries, year });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-surface-container rounded-[2rem] p-5 md:p-6 border border-outline-variant/40 shadow-2xl shadow-primary/5 sticky top-24"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Year & Category Row */}
        <div className="space-y-4">
          <div className="space-y-3">
            <label className="text-[11px] font-black text-on-surface-variant uppercase tracking-[0.2em] ml-1">Predict for Year</label>
            <CustomSelect
              value={year}
              onChange={setYear}
              options={YEARS}
            />
          </div>

          <div className="space-y-3">
            <label className="text-[11px] font-black text-on-surface-variant uppercase tracking-[0.2em] ml-1">Your Category</label>
            <CustomSelect
              value={category}
              onChange={setCategory}
              options={CATEGORIES}
            />
          </div>
        </div>

        <div className="h-px bg-outline-variant/30" />

        {/* Paper Entries Section */}
        <div className="space-y-4">
          <label className="text-[11px] font-black text-on-surface-variant uppercase tracking-[0.2em] ml-1 block">GATE Paper(s) & Scores</label>
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {entries.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative p-4 rounded-[1.5rem] bg-background border border-outline-variant/30 shadow-sm group/entry"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <CustomSelect
                        value={entry.code}
                        onChange={(val) => updateEntry(entry.id, "code", val)}
                        options={PAPER_CODES}
                        className="w-24 shrink-0"
                      />

                      <input
                        type="number"
                        placeholder="Score (e.g. 750)"
                        value={entry.score}
                        onChange={(e) => updateEntry(entry.id, "score", e.target.value)}
                        className="flex-1 bg-surface-container-lowest border border-outline-variant/60 rounded-xl px-4 py-3 text-sm font-bold text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all min-w-0 h-[45px]"
                      />
                    </div>

                    {entries.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEntry(entry.id)}
                        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-destructive hover:bg-destructive/5 transition-all border border-transparent hover:border-destructive/10"
                      >
                        <Trash2 className="size-3.5" />
                        Remove this paper
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <Button
            type="button"
            variant="ghost"
            onClick={addEntry}
            className="w-full h-11 rounded-2xl border-2 border-dashed border-outline-variant/20 hover:border-primary/40 hover:bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest gap-2 transition-all"
          >
            <Plus className="size-3.5" /> Add Paper
          </Button>
        </div>

        <div className="space-y-4">
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: 10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: 10 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm font-bold overflow-hidden"
              >
                <div className="size-5 rounded-full bg-destructive/20 flex items-center justify-center shrink-0">
                  <span className="text-[10px]">!</span>
                </div>
                {error}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Button
          type="submit"
          className="w-full h-14 rounded-[1.25rem] text-sm font-black gap-3 shadow-xl shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all bg-primary text-primary-foreground"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="size-4 border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin rounded-full" />
              <span className="uppercase tracking-[0.1em]">Processing...</span>
            </div>
          ) : (
            <>
              <Calculator className="size-5" />
              <span className="uppercase tracking-[0.1em]">Predict My Colleges</span>
            </>
          )}
        </Button>
      </form>
    </motion.div>
  );
}
