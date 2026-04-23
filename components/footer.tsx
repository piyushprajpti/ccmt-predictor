"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  ShieldAlert,
  Briefcase,
  Code,
  User,
  Smartphone,
  ChevronUp,
  MessageSquare,
  MessageSquarePlus,
  GitPullRequest,
  Users
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

import { CcmtPortalsCard } from "./ccmt-portals-card";

const TABS = [
  { name: "Home", href: "/" },
  { name: "Explorer", href: "/explorer" },
  { name: "Predictor", href: "/predictor" },
  { name: "Institutions & Programs", href: "/institutes_and_programs" },
];

const DEVELOPERS = [
  {
    name: "Piyush Prajapati",
    description: "Final year student and app developer. Looking for full-time jobs, referrals, or freelance projects. I would be very happy to connect if you have any leads!",
    portfolio: "https://piyushprajapatiportfolio.web.app/",
    socials: [
      { name: "GitHub", href: "https://github.com/piyushprajpti", icon: "/github.webp" },
      { name: "LinkedIn", href: "https://linkedin.com/in/piyushprajpti", icon: "/linkedin.webp" },
      { name: "Play Store", href: "https://play.google.com/store/apps/dev?id=8262523398168308167", icon: "/play_store_icon.webp" },
    ]
  },
  {
    name: "Ankit Yadav",
    description: "Full stack developer with 1 year of work experience at a real company. Also a final year student looking for jobs, referrals, and freelance projects.",
    portfolio: "https://itsyadav.vercel.app/",
    socials: [
      { name: "GitHub", href: "https://github.com/iankityadav01", icon: "/github.webp" },
      { name: "LinkedIn", href: "https://www.linkedin.com/in/ankit-yadav-a1a138255/", icon: "/linkedin.webp" },
    ]
  }
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const [isCcmtCardOpen, setIsCcmtCardOpen] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);

  // Close card when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setIsCcmtCardOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <footer className="relative mt-auto border-t border-outline-variant/30 bg-surface-container shadow-inner">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-8">
          {/* Disclaimer Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4 md:col-span-3 text-pretty"
          >
            <div className="flex items-center gap-2 text-primary">
              <ShieldAlert className="w-5 h-5 text-destructive" />
              <h3 className="font-display font-bold text-lg tracking-tight">Disclaimer</h3>
            </div>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              This platform is an <strong>unofficial, student-led project</strong>.
              Not affiliated with CCMT or any government body.
              Always refer to the official CCMT website for final and authoritative information.
            </p>
          </motion.div>

          {/* Quick Shortcuts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col gap-4 md:col-span-3"
          >
            <h3 className="font-display font-bold text-lg tracking-tight text-foreground">Quick Shortcuts</h3>
            <div className="flex flex-col gap-y-2 relative" ref={cardRef}>
              {TABS.map((tab) => (
                <Link
                  key={tab.name}
                  href={tab.href}
                  className={cn(
                    "text-sm transition-colors hover:text-primary",
                    pathname === tab.href ? "text-primary font-semibold" : "text-on-surface-variant"
                  )}
                >
                  {tab.name}
                </Link>
              ))}
              <button
                onClick={() => setIsCcmtCardOpen(!isCcmtCardOpen)}
                className="text-sm text-primary font-bold hover:text-primary/80 transition-colors flex items-center gap-1.5 text-left mt-1"
              >
                Official CCMT Min Max Site
                <ChevronUp className={cn("size-3.5 transition-transform duration-300", isCcmtCardOpen && "rotate-180")} />
              </button>

              {/* Modular Popover integrated into shortcuts */}
              <CcmtPortalsCard isOpen={isCcmtCardOpen} side="bottom" align="left" className="mb-8" />
            </div>
          </motion.div>

          {/* The Story Behind */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-4 md:col-span-6"
          >
            <div className="flex items-center gap-2 text-primary">
              <Code className="w-5 h-5" />
              <h3 className="font-display font-bold text-lg tracking-tight">The Story Behind</h3>
            </div>
            <p className="text-on-surface-variant text-sm leading-relaxed text-pretty">
              Checking cutoffs on different sites with confusing filters was really hard and time taking.
              We built this website to simplify the process for every CCMT aspirant, providing a clean,
              data-driven experience to help you make one of the most important decisions of your career.
            </p>
          </motion.div>
        </div>

        {/* Developers Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 pt-8 border-t border-outline-variant/20"
        >
          <div className="flex items-center gap-2 text-primary mb-8">
            <User className="w-5 h-5" />
            <h3 className="font-display font-bold text-lg tracking-tight">Meet the Developers</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {DEVELOPERS.map((dev, index) => (
              <div key={dev.name} className="flex flex-col gap-4 p-6 rounded-2xl bg-surface-container-low border border-outline-variant/20 hover:border-primary/30 transition-colors shadow-sm">
                <div className="flex flex-col gap-2">
                  <h4 className="font-display font-bold text-base text-foreground">{dev.name}</h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    {dev.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 mt-auto">
                  <Link
                    href={dev.portfolio}
                    target="_blank"
                    className="group relative inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-xs overflow-hidden transition-all hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.2)] active:scale-95"
                  >
                    <span>Portfolio</span>
                    <ExternalLink className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>

                  <div className="flex items-center gap-2">
                    {dev.socials.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        className="transition-all duration-300 hover:scale-120 active:scale-95"
                        title={link.name}
                      >
                        <Image
                          src={link.icon}
                          alt={link.name}
                          width={24}
                          height={24}
                          className="object-contain opacity-80 group-hover:opacity-100"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Community & Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 pt-8 border-t border-outline-variant/20"
        >
          <div className="flex items-center gap-2 text-primary mb-6">
            <Users className="w-5 h-5" />
            <h3 className="font-display font-bold text-lg tracking-tight">Community & Support</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Feedback Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="p-6 rounded-2xl bg-primary/5 border border-primary/20 flex flex-col justify-between gap-6 overflow-hidden relative group backdrop-blur-sm"
            >
              {/* Subtle background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50 pointer-events-none" />

              <div className="flex flex-col gap-2 relative z-10">
                <div className="flex items-center gap-2 text-primary">
                  <MessageSquare className="w-5 h-5" />
                  <h3 className="font-display font-bold text-lg tracking-tight">Have feedback or found a bug?</h3>
                </div>
                <p className="text-on-surface-variant text-sm">
                  If you encounter any bugs, issues, or want to suggest new features, you can submit feedback directly through our form or create an issue on our GitHub repository.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 z-10 w-full mt-auto">
                <button
                  onClick={() => window.dispatchEvent(new Event("open-feedback"))}
                  className="w-full sm:flex-1 group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm transition-all hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.2)] active:scale-95 whitespace-nowrap"
                >
                  <MessageSquarePlus className="w-4 h-4" />
                  <span>Send Feedback</span>
                </button>

                <Link
                  href="https://github.com/piyushprajpti/ccmt-predictor/issues"
                  target="_blank"
                  className="w-full sm:flex-1 group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-surface-container-highest text-on-surface font-bold text-sm border border-outline-variant/30 transition-all hover:bg-surface-container-lowest hover:shadow-md active:scale-95 whitespace-nowrap"
                >
                  <Image
                    src="/github.webp"
                    alt="GitHub"
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                  <span>Report Issue</span>
                  <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </motion.div>

            {/* Open Source Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="p-6 rounded-2xl bg-primary/5 border border-primary/20 flex flex-col justify-between gap-6 overflow-hidden relative group backdrop-blur-sm"
            >
              {/* Subtle background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50 pointer-events-none" />

              <div className="flex flex-col gap-2 relative z-10">
                <div className="flex items-center gap-2 text-primary">
                  <GitPullRequest className="w-5 h-5" />
                  <h3 className="font-display font-bold text-lg tracking-tight">Open Source</h3>
                </div>
                <p className="text-on-surface-variant text-sm">
                  This is an open-source project. If you have any suggestions, updates, or can improve something, we highly encourage you to contribute! Check out our repository and make a pull request.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 z-10 w-full mt-auto">
                <Link
                  href="https://github.com/piyushprajpti/ccmt-predictor"
                  target="_blank"
                  className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-surface-container-highest text-on-surface font-bold text-sm border border-outline-variant/30 transition-all hover:bg-surface-container-lowest hover:shadow-md active:scale-95 whitespace-nowrap"
                >
                  <Image
                    src="/github.webp"
                    alt="GitHub"
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                  <span>View Repository</span>
                  <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-outline-variant/20 flex flex-col md:flex-row justify-center items-center gap-4">
          <div className="relative size-8 opacity-80">
            <Image
              src="/ccmt_logo.png"
              alt="CCMT Logo"
              fill
              className="object-contain"
            />
          </div>
          <div className="text-on-surface-variant text-xs font-medium text-center">
            <span>© {currentYear} CCMT College Finder. All Rights Reserved.</span>
          </div>
        </div>
      </div>

      {/* Decorative gradient blur */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-32 bg-primary/5 blur-[100px] pointer-events-none -z-10" />
    </footer>
  );
}



