"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Compass, BarChart3, GraduationCap, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/30">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container/50 border border-outline-variant/10 text-primary text-sm font-bold mb-8 shadow-sm backdrop-blur-md"
          >
            <Sparkles className="size-4" />
            <span>Updated for 2025 Admissions</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-black tracking-tight text-foreground mb-6"
          >
            Your Journey to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-secondary animate-gradient">
              Top Engineering Colleges
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Predict your chances, explore historical cutoffs, and compare institutions 
            with India's most accurate CCMT companion. Powered by multi-year data.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/explorer">
              <Button size="lg" className="h-14 px-8 rounded-2xl text-lg font-bold gap-2 shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                Start Exploring
                <ArrowRight className="size-5" />
              </Button>
            </Link>
            <Link href="/predictor">
              <Button size="lg" variant="secondary" className="h-14 px-8 rounded-2xl text-lg font-bold gap-2 hover:scale-105 transition-transform">
                Predict My Rank
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-surface-container/20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Search}
              title="Smart Explorer"
              description="Deep dive into 5 years of CCMT data with advanced filters for rounds, categories, and institutes."
              delay={0.4}
              href="/explorer"
            />
            <FeatureCard 
              icon={BarChart3}
              title="Rank Predictor"
              description="AI-driven predictions based on your GATE score and historical trends to find your perfect match."
              delay={0.5}
              href="/predictor"
            />
            <FeatureCard 
              icon={Compass}
              title="College Comparison"
              description="Side-by-side comparison of placement stats, fees, and cutoff trends across multiple NITs & IIITs."
              delay={0.6}
              href="/comparison"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="rounded-[3rem] bg-gradient-to-br from-primary/10 via-background to-secondary/10 border border-outline-variant/10 p-12 md:p-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center relative z-10">
              <StatItem label="Institutes" value="60+" />
              <StatItem label="Programs" value="400+" />
              <StatItem label="Data Points" value="50k+" />
              <StatItem label="Happy Students" value="10k+" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description, delay, href }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="group p-8 rounded-[2rem] bg-surface border border-outline-variant/10 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
    >
      <div className="size-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
        <Icon className="size-7" />
      </div>
      <h3 className="text-2xl font-display font-bold text-foreground mb-3">{title}</h3>
      <p className="text-on-surface-variant leading-relaxed mb-6">
        {description}
      </p>
      <Link href={href} className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
        Try Now <ArrowRight className="size-4" />
      </Link>
    </motion.div>
  );
}

function StatItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-4xl md:text-5xl font-display font-black text-foreground tracking-tight">{value}</span>
      <span className="text-sm font-bold text-on-surface-variant uppercase tracking-widest">{label}</span>
    </div>
  );
}
