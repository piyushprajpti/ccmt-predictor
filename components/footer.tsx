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
  MessageSquare
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

const SOCIAL_LINKS = [
  { 
    name: "GitHub", 
    href: "https://github.com/piyushprajpti", 
    icon: "/github.png",
    color: "hover:scale-110"
  },
  { 
    name: "LinkedIn", 
    href: "https://linkedin.com/in/piyushprajpti", 
    icon: "/linkedin.png",
    color: "hover:scale-110"
  },
  { 
    name: "Play Store", 
    href: "https://play.google.com/store/apps/dev?id=8262523398168308167", 
    icon: "/play_store_icon.png",
    color: "hover:scale-110"
  },
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

          {/* Developer Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-4 md:col-span-6"
          >
            <div className="flex items-center gap-2 text-primary">
              <Briefcase className="w-5 h-5" />
              <h3 className="font-display font-bold text-lg tracking-tight">Developer</h3>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Hi, I am <strong>Piyush Prajapati</strong>. I also gave GATE this year and am taking part in CCMT counseling. I built this website because checking cutoffs on different sites with confusing filters was really hard and time taking. I hope this makes things easier for you also!
              </p>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                I am a final year student and an app developer. I am looking for full-time jobs, referrals, or freelance projects. I would be very happy to connect if you have any leads!
              </p>
            </div>
            
            <div className="flex items-center gap-3 mt-3">
              <Link 
                href="https://piyushprajapatiportfolio.web.app/" 
                target="_blank"
                className="group relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs overflow-hidden transition-all hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span>Portfolio</span>
                <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <div className="flex items-center gap-2.5">
                {SOCIAL_LINKS.map((link) => (
                  <Link 
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    className={cn(
                      "p-1.5 rounded-full overflow-hidden bg-surface-container-low border border-outline-variant/20 transition-all duration-300 group hover:bg-surface-container hover:shadow-md text-on-surface-variant",
                      link.color
                    )}
                    title={link.name}
                  >
                    <Image 
                      src={link.icon} 
                      alt={link.name} 
                      width={32} 
                      height={32} 
                      className="object-contain rounded-full"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* GitHub Issues & Feedback Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 p-6 rounded-2xl bg-surface-container-low/60 border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative group backdrop-blur-sm"
        >
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          <div className="flex flex-col gap-1 text-center md:text-left relative z-10">
            <div className="flex items-center justify-center md:justify-start gap-2 text-primary">
              <MessageSquare className="w-5 h-5" />
              <h3 className="font-display font-bold text-lg tracking-tight">Have feedback or found a bug?</h3>
            </div>
            <p className="text-on-surface-variant text-sm max-w-2xl">
              If you encounter any issues, bugs, or want to suggest new features, please create an issue on our GitHub repository.
            </p>
          </div>
          
          <Link 
            href="https://github.com/piyushprajpti/ccmt-predictor" 
            target="_blank"
            className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-surface-container-highest text-on-surface font-bold text-sm border border-outline-variant/30 transition-all hover:bg-surface-container-lowest hover:shadow-md active:scale-95 whitespace-nowrap z-10"
          >
            <Image 
              src="/github.png" 
              alt="GitHub" 
              width={20} 
              height={20} 
              className="object-contain"
            />
            <span>Create GitHub Issue</span>
            <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-outline-variant/20 flex flex-col md:flex-row justify-center items-center gap-4">
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



