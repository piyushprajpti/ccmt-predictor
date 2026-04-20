"use client";

import { useState, useEffect } from "react";
import { PredictorForm } from "@/components/predictor/PredictorForm";
import { PredictorResults } from "@/components/predictor/PredictorResults";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { HeroSection } from "@/components/shared/HeroSection";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, Sparkles, ArrowRight } from "lucide-react";
import { checkEligibility } from "@/lib/eligibility";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { fetchJsonData, validateCCMTData } from "@/lib/data-handlers";
import { AlertCircle } from "lucide-react";

export default function PredictorPage() {
  const [data, setData] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [isPredicting, setIsPredicting] = useState(false);
  const [hasPredicted, setHasPredicted] = useState(false);
  const [category, setCategory] = useState("");
  const [userScores, setUserScores] = useState<{ code: string; score: number }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState("2025");
  const [predictionError, setPredictionError] = useState<string | null>(null);

  // Logic to handle prediction
  const handlePredict = async (predictionParams: {
    category: string;
    entries: { code: string; score: number }[];
    year: string;
  }) => {
    setIsPredicting(true);
    setPredictionError(null);
    setSelectedYear(predictionParams.year);
    setCategory(predictionParams.category);
    setUserScores(predictionParams.entries);

    try {
      // Load data for the selected year
      const result = await fetchJsonData(`/ccmt_${predictionParams.year}.json`);
      
      if (result.error) {
        setPredictionError(result.error);
        setResults([]);
        setHasPredicted(false);
        return;
      }

      if (!result.data) {
        setPredictionError('No data received from server');
        setResults([]);
        setHasPredicted(false);
        return;
      }

      const jsonData = result.data;
      const filtered = jsonData.filter((item: any) => {
        // 1. Match category
        if (item.category !== predictionParams.category) return false;

        // 2. Filter user entries that are eligible for this specific program
        const eligibleEntries = predictionParams.entries.filter(entry =>
          checkEligibility(item.program, [entry.code])
        );

        if (eligibleEntries.length === 0) return false;

        // 3. Get the max score among ELIGIBLE papers only
        const maxEligibleScore = Math.max(...eligibleEntries.map(e => e.score));

        // 4. Check if cutoff is satisfied
        return item.closingRank <= maxEligibleScore;
      });

      if (filtered.length === 0) {
        setPredictionError('No colleges found matching your criteria. Try adjusting your scores or category.');
      } else {
        setPredictionError(null);
      }

      setResults(filtered);
      setHasPredicted(true);

      // Smooth scroll to results
      setTimeout(() => {
        document.getElementById("results-section")?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setPredictionError(`Prediction failed: ${errorMessage}`);
      setResults([]);
      setHasPredicted(false);
      console.error("Prediction error:", error);
    } finally {
      setIsPredicting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:py-16 max-w-full overflow-hidden">
        <HeroSection 
          title={<>Predict Your <span className="text-primary">Future</span> <br className="hidden md:block" /> College & Program.</>}
          description={<>Analyze your admission chances across <span className="text-on-surface font-bold">NITs, IIITs, and GFTIs</span> using multi-year historical cutoffs and CCMT's specialized group eligibility system.</>}
        />

        <div className="mt-0 flex flex-col lg:flex-row gap-8 items-start w-full overflow-hidden">
          {/* Left Side: Form (Fixed Width like Explorer Sidebar) */}
          <div className="w-full lg:w-80 lg:border-r border-outline-variant/10 lg:pr-8 lg:sticky lg:top-24">
            <PredictorForm onPredict={handlePredict} isLoading={isPredicting} />
          </div>

          {/* Right Side: Results or Placeholder */}
          <div className="flex-1 min-w-0 max-w-full" id="results-section">
            <AnimatePresence mode="wait">
              {predictionError && !hasPredicted && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center pt-20 min-h-[400px] border-2 border-destructive/20 rounded-[3rem] p-8 text-center bg-destructive/5"
                >
                  <div className="size-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
                    <AlertCircle className="size-8 text-destructive" />
                  </div>
                  <h2 className="text-xl font-bold text-destructive mb-2">Prediction Failed</h2>
                  <p className="text-on-surface-variant max-w-sm mb-6">{predictionError}</p>
                  <Button 
                    onClick={() => setHasPredicted(false)} 
                    variant="secondary"
                    className="border border-outline-variant/20"
                  >
                    Try Again
                  </Button>
                </motion.div>
              )}
              {hasPredicted && !predictionError ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <PredictorResults
                    results={results}
                    userScores={userScores}
                    category={category}
                  />
                </motion.div>
              ) : !hasPredicted ? (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-start pt-20 h-full min-h-[400px] border-2 border-dashed border-outline-variant/20 rounded-[3rem] p-12 text-center bg-surface-container/10"
                >
                  <div className="size-20 rounded-[2rem] bg-primary/5 flex items-center justify-center mb-6">
                    <BarChart3 className="size-10 text-primary/40" />
                  </div>
                  <h2 className="text-2xl font-display font-black text-foreground mb-3">Ready to Predict?</h2>
                  <p className="text-on-surface-variant max-w-sm">
                    Enter your GATE scores and category in the form to see your eligible colleges and programs.
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>

        {/* Permanent Explorer CTA Card (Downsized) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-primary rounded-[2.5rem] p-8 md:p-10 text-primary-foreground relative overflow-hidden group shadow-2xl shadow-primary/20 border border-white/10"
        >
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[9px] font-black uppercase tracking-[0.2em]">
                <Sparkles className="size-3" />
                Detailed Insights
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-black tracking-tight">Dive deeper into the data?</h3>
              <p className="text-primary-foreground/70 text-sm md:text-base font-medium max-w-xl">
                Explore the full dataset across 5 years with advanced filters, seat matrices, and institute-wise trends in our specialized explorer.
              </p>
            </div>

            <Link href="/explorer" className="shrink-0">
              <Button size="lg" className="bg-on-primary-fixed text-primary-fixed hover:scale-105 active:scale-95 h-14 px-8 rounded-xl text-lg font-black gap-3 transition-all shadow-xl shadow-black/10">
                Open Explorer
                <ArrowRight className="size-5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
