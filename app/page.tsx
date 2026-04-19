import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Filter,
  LibraryBig,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const metricCards = [
  {
    label: "Program fit",
    value: "92%",
    detail: "Strong alignment across credits, prerequisites, and outcomes.",
  },
  {
    label: "Research signal",
    value: "8.7",
    detail: "Weighted against project depth, publication cues, and advisor match.",
  },
  {
    label: "Review confidence",
    value: "High",
    detail: "Stable trendline with low variance across the latest cohort.",
  },
];

const insights = [
  {
    title: "Curated intake",
    text: "Separate strong-fit applicants from marginal matches without the spreadsheet noise.",
  },
  {
    title: "Editorial hierarchy",
    text: "Lead with the numbers that matter, then let the supporting context breathe underneath.",
  },
  {
    title: "No-line tables",
    text: "Use tonal shifts and spacing instead of grid lines to keep the surface calm and premium.",
  },
];

const filters = ["All programs", "Research fit", "Placement", "Confidence > 85%"];

const programs = [
  {
    name: "Computational Media",
    fit: "94%",
    signal: "Very strong",
    note: "High project overlap with design-led academic tracks.",
  },
  {
    name: "Applied Systems",
    fit: "89%",
    signal: "Strong",
    note: "Balanced performance across theory, labs, and applied work.",
  },
  {
    name: "Data Narratives",
    fit: "84%",
    signal: "Promising",
    note: "Needs one more publication or capstone signal to move up.",
  },
  {
    name: "Instructional AI",
    fit: "78%",
    signal: "Watchlist",
    note: "Solid baseline, but missing a direct research hinge.",
  },
];

export default function Home() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-24 h-72 w-72 rounded-full bg-surface-container-high/60 blur-3xl" />
        <div className="absolute -right-16 top-24 h-80 w-80 rounded-full bg-surface-tint/50 blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 h-64 w-64 rounded-full bg-primary-container/10 blur-3xl" />
      </div>

      <header className="sticky top-0 z-20 border-0 bg-surface/80 backdrop-blur-[20px]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-12">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-linear-to-br from-primary to-primary-container text-sm font-semibold text-white shadow-[0_14px_30px_rgba(13,28,47,0.14)]">
              CC
            </div>
            <div>
              <p className="text-[0.75rem] uppercase tracking-[0.28em] text-on-surface-variant">
                Academic Curator
              </p>
              <p className="font-display text-sm text-on-surface">
                CCMT Predictor
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <div className="rounded-full bg-surface-container-low px-4 py-2 text-sm text-on-surface-variant shadow-[0_12px_28px_rgba(13,28,47,0.05)]">
              Editorial-first review mode
            </div>
            <Button asChild size="sm">
              <Link href="#programs">
                Open forecast <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-10 sm:px-8 lg:grid-cols-[1.3fr_0.9fr] lg:px-12 lg:py-14">
        <div className="flex flex-col justify-center gap-8">
          <div className="flex items-center gap-3 text-[0.75rem] uppercase tracking-[0.26em] text-on-surface-variant">
            <Sparkles className="size-4" />
            Tonal depth over hard edges
          </div>

          <div className="max-w-3xl space-y-6">
            <h1 className="font-display text-[clamp(3rem,7vw,4.5rem)] leading-[0.95] tracking-[-0.06em] text-on-surface">
              Academic data, curated like a prestige publication.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-on-surface-variant sm:text-xl">
              The interface uses surface layering, glass navigation, and high-contrast type to turn predictive
              review into a calm editorial experience rather than a dense dashboard.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="#programs">
                Review programs <ArrowUpRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="#insights">
                Explore framework <BookOpen className="size-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {metricCards.map((card) => (
              <article
                key={card.label}
                className="rounded-[0.75rem] bg-surface-container-lowest p-5 shadow-[0_18px_36px_rgba(13,28,47,0.05)]"
              >
                <p className="text-[0.75rem] uppercase tracking-[0.22em] text-on-surface-variant">
                  {card.label}
                </p>
                <p className="mt-3 font-display text-[2.2rem] leading-none text-on-surface">
                  {card.value}
                </p>
                <p className="mt-3 text-sm leading-6 text-on-surface-variant">
                  {card.detail}
                </p>
              </article>
            ))}
          </div>
        </div>

        <aside className="self-start rounded-[0.9rem] bg-surface-container-low/85 p-5 shadow-[0_30px_60px_rgba(13,28,47,0.08)] backdrop-blur-[20px] sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[0.75rem] uppercase tracking-[0.24em] text-on-surface-variant">
                Snapshot
              </p>
              <h2 className="mt-2 font-display text-[1.75rem] leading-tight text-on-surface">
                Curated intake overview
              </h2>
            </div>
            <div className="rounded-full bg-surface-container-high px-3 py-1 text-xs font-medium text-on-surface">
              Live
            </div>
          </div>

          <div className="mt-8 rounded-[0.75rem] bg-surface-container-lowest p-5 shadow-[0_18px_36px_rgba(13,28,47,0.05)]">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm text-on-surface-variant">Top forecast score</p>
                <p className="mt-2 font-display text-[3.5rem] leading-none tracking-[-0.08em] text-on-surface">
                  96
                </p>
              </div>
              <div className="rounded-3xl bg-surface-container-high px-3 py-2 text-right">
                <p className="text-xs uppercase tracking-[0.24em] text-on-surface-variant">
                  Trend
                </p>
                <p className="mt-1 text-base font-medium text-on-surface">
                  Upward
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {insights.map((item) => (
                <div key={item.title} className="rounded-4xl bg-surface-container-low px-4 py-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-primary-container" />
                    <p className="font-medium text-on-surface">{item.title}</p>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-on-surface-variant">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section id="insights" className="mx-auto max-w-7xl px-6 pb-6 sm:px-8 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-[0.9rem] bg-surface-container-lowest p-6 shadow-[0_22px_48px_rgba(13,28,47,0.06)] lg:p-8">
            <div className="flex items-center gap-3 text-[0.75rem] uppercase tracking-[0.26em] text-on-surface-variant">
              <Filter className="size-4" />
              Filter ribbon
            </div>
            <h2 className="mt-4 font-display text-[1.75rem] leading-tight text-on-surface">
              Use chips to narrow the review without crowding the page.
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {filters.map((filter, index) => (
                <span
                  key={filter}
                  className={
                    index === 0
                      ? "rounded-lg bg-primary-fixed px-3.5 py-2 text-sm font-medium text-on-primary-fixed"
                        : "rounded-lg bg-surface-container-high px-3.5 py-2 text-sm font-medium text-on-surface-variant"
                  }
                >
                  {filter}
                </span>
              ))}
            </div>
            <p className="mt-6 max-w-xl text-sm leading-7 text-on-surface-variant">
              This surface uses softer tonal shifts instead of borders, letting the primary narrative stay in
              focus while still providing clear interactive affordances.
            </p>
          </article>

          <article className="rounded-[0.9rem] bg-surface-container-lowest p-6 shadow-[0_22px_48px_rgba(13,28,47,0.06)] lg:p-8">
            <div className="flex items-center gap-3 text-[0.75rem] uppercase tracking-[0.26em] text-on-surface-variant">
              <LibraryBig className="size-4" />
              Program ledger
            </div>
            <div className="mt-4 flex items-end justify-between gap-4">
              <h2 className="font-display text-[1.75rem] leading-tight text-on-surface">
                Compact table, calm hierarchy.
              </h2>
              <p className="hidden text-sm text-on-surface-variant sm:block">
                Zebra rows at low contrast
              </p>
            </div>

            <div id="programs" className="mt-6 overflow-hidden rounded-[0.75rem] bg-surface-container-low">
              <div className="grid grid-cols-[1.2fr_.6fr_.7fr] gap-4 bg-surface-container-high px-5 py-4 text-[0.75rem] uppercase tracking-[0.24em] text-on-surface-variant">
                <span>Program</span>
                <span>Fit</span>
                <span>Status</span>
              </div>
              <div>
                {programs.map((program, index) => (
                  <div
                    key={program.name}
                    className={`grid grid-cols-[1.2fr_.6fr_.7fr] gap-4 px-5 py-6 ${
                      index % 2 === 0 ? "bg-surface-container-lowest" : "bg-surface"
                    }`}
                  >
                    <div>
                      <p className="font-medium text-on-surface">{program.name}</p>
                      <p className="mt-1 text-sm leading-6 text-on-surface-variant">{program.note}</p>
                    </div>
                    <div>
                      <p className="font-display text-[1.6rem] leading-none text-on-surface">
                        {program.fit}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-on-surface">{program.signal}</p>
                      <p className="mt-1 text-sm leading-6 text-on-surface-variant">
                        Confidence-led routing
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
