"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Search, 
  Compass, 
  BarChart3, 
  GraduationCap, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  History,
  Building2,
  BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/30">
      {/* Hero Section */}
      <section className="relative pt-20 pb-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container/50 border border-outline-variant/10 text-primary text-sm font-bold mb-8 shadow-sm backdrop-blur-md"
          >
            <Sparkles className="size-4" />
            <span>The All-in-One CCMT Portal (2021-2025)</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-5xl font-display font-black tracking-tight text-foreground mb-6 leading-tight"
          >
            Predict Your Future <br />
            With Precision Data
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            The definitive gateway for CCMT previous years' cutoffs. Access verified, 
            official data from 2021 to 2025 in one unified platform with 
            powerful, customizable filters.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link href="/explorer">
              <Button size="lg" className="h-14 px-8 rounded-xl text-base font-bold gap-2 hover:scale-105 active:scale-95 transition-all">
                <Search className="size-5" />
                Explorer
              </Button>
            </Link>
            <Link href="/predictor">
              <Button size="lg" variant="secondary" className="h-14 px-8 rounded-xl text-base font-bold gap-2 hover:scale-105 active:scale-95 transition-all">
                <BarChart3 className="size-5" />
                Predictor
              </Button>
            </Link>
            <Link href="/institutes_and_programs">
              <Button size="lg" variant="outline" className="h-14 px-8 rounded-xl text-base font-bold gap-2 hover:scale-105 active:scale-95 transition-all">
                <GraduationCap className="size-5" />
                Institutions & Programs
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-3xl bg-surface-container border border-outline-variant/20 p-8 md:p-12 relative overflow-hidden shadow-sm"
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center relative z-10">
              <StatItem label="Data Records" value="50,000+" icon={History} />
              <StatItem label="Institutions" value="60+" icon={Building2} />
              <StatItem label="Programs" value="400+" icon={BookOpen} />
              <StatItem label="Year Range" value="2021-25" icon={Sparkles} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-4xl font-display font-black text-foreground mb-4"
            >
              Everything You Need in One Place
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-on-surface-variant text-base md:text-lg max-w-xl mx-auto"
            >
              Designed for students, by developers who understand the CCMT struggle. 
              Clean, fast, and 100% accurate.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={BarChart3}
              title="College Predictor"
              description="Get instant predictions based on your GATE score and category using our high-fidelity trend analysis."
              delay={0.2}
              href="/predictor"
              tag="Popular"
            />
            <FeatureCard 
              icon={Search}
              title="Unified Explorer"
              description="Browse 5 years of cutoffs with customizable filters. No more legacy UI hurdles—just pure data."
              delay={0.3}
              href="/explorer"
              tag="Modern"
            />
            <FeatureCard 
              icon={GraduationCap}
              title="Institution Directory"
              description="Explore every participating NIT, IIIT, and GFTI. Compare programs, seats, and fees effortlessly."
              delay={0.4}
              href="/institutes_and_programs"
            />
            <FeatureCard 
              icon={CheckCircle2}
              title="Verified Data"
              description="Sleep easy knowing every cutoff and seat matrix is pulled directly from verified official sources."
              delay={0.5}
              href="#verified"
              isVerified
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description, delay, href, tag, isVerified }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -10 }}
      className="group relative p-6 rounded-3xl bg-surface-container border border-outline-variant/20 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 overflow-hidden"
    >
      {tag && (
        <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wider">
          {tag}
        </div>
      )}
      
      <div className="size-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
        <Icon className="size-8" />
      </div>
      
      <h3 className="text-xl font-display font-bold text-foreground mb-3">{title}</h3>
      <p className="text-on-surface-variant leading-relaxed mb-6 text-sm md:text-base">
        {description}
      </p>
      
      {!isVerified ? (
        <Link href={href} className="inline-flex items-center gap-2 text-primary text-sm font-bold hover:gap-3 transition-all">
          Explore Now <ArrowRight className="size-4" />
        </Link>
      ) : (
        <div className="flex items-center gap-2 text-primary text-sm font-bold">
          Official Source <CheckCircle2 className="size-4" />
        </div>
      )}
    </motion.div>
  );
}

function StatItem({ label, value, icon: Icon }: { label: string, value: string, icon: any }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className="flex flex-col items-center gap-3 group"
    >
      <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-1 group-hover:bg-primary/20 group-hover:text-primary transition-colors duration-500">
        <Icon className="size-5" />
      </div>
      <span className="text-3xl md:text-4xl font-display font-black text-foreground tracking-tight">{value}</span>
      <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em]">{label}</span>
    </motion.div>
  );
}

