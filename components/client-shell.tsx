"use client";

import dynamic from "next/dynamic";
import { NavigationProvider } from "@/components/navigation-provider";
import { Topbar } from "@/components/topbar";

const Footer = dynamic(
  () => import("@/components/footer").then((m) => ({ default: m.Footer })),
  { ssr: false }
);

const PageTransition = dynamic(
  () =>
    import("@/components/page-transition").then((m) => ({
      default: m.PageTransition,
    })),
  { ssr: false }
);

const FloatingFeedback = dynamic(
  () =>
    import("@/components/floating-feedback").then((m) => ({
      default: m.FloatingFeedback,
    })),
  { ssr: false }
);

export function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <NavigationProvider>
      <Topbar />
      <PageTransition>
        <main className="flex-1 pt-16">{children}</main>
      </PageTransition>
      <Footer />
      <FloatingFeedback />
    </NavigationProvider>
  );
}
