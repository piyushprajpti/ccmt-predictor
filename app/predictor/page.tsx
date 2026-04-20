"use client";

import { useState, useEffect } from "react";
import { PredictorHeader } from "@/components/predictor/PredictorHeader";
import { PredictorForm } from "@/components/predictor/PredictorForm";
import { PredictorResults } from "@/components/predictor/PredictorResults";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3 } from "lucide-react";
import { checkEligibility } from "@/lib/eligibility";

export default function PredictorPage() {
  const [data, setData] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [isPredicting, setIsPredicting] = useState(false);
  const [hasPredicted, setHasPredicted] = useState(false);
  const [category, setCategory] = useState("");
  const [userScores, setUserScores] = useState<{ code: string; score: number }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState("2025");

  // Logic to handle prediction
  const handlePredict = async (predictionParams: {
    category: string;
    entries: { code: string; score: number }[];
    year: string;
  }) => {
    setIsPredicting(true);
    setSelectedYear(predictionParams.year);
    setCategory(predictionParams.category);
    setUserScores(predictionParams.entries);

    try {
      // Load data for the selected year
      const response = await fetch(`/ccmt_${predictionParams.year}.json`);
      if (!response.ok) throw new Error("Failed to load data");
      const jsonData = await response.json();

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

      setResults(filtered);
      setHasPredicted(true);

      // Smooth scroll to results
      setTimeout(() => {
        document.getElementById("results-section")?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

    } catch (error) {
      console.error("Prediction error:", error);
      alert("Error loading data for prediction. Please try again.");
    } finally {
      setIsPredicting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-6 pt-12 md:pt-20">
        <PredictorHeader />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
          {/* Left Side: Form */}
          <div className="lg:col-span-4">
            <PredictorForm onPredict={handlePredict} isLoading={isPredicting} />
          </div>

          {/* Right Side: Results or Placeholder */}
          <div className="lg:col-span-8 min-h-[600px]" id="results-section">
            <AnimatePresence mode="wait">
              {hasPredicted ? (
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
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center h-full border-2 border-dashed border-outline-variant/20 rounded-[3rem] p-12 text-center"
                >
                  <div className="size-20 rounded-[2rem] bg-primary/5 flex items-center justify-center mb-6">
                    <BarChart3 className="size-10 text-primary/40" />
                  </div>
                  <h2 className="text-2xl font-display font-black text-foreground mb-3">Ready to Predict?</h2>
                  <p className="text-on-surface-variant max-w-sm">
                    Enter your GATE scores and category in the form to see your eligible colleges and programs.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
