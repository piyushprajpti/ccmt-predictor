import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CCMT College Finder | GATE Cutoff Predictor",
  description:
    "An editorial-grade academic portal for reviewing predictive signals with clarity and depth.",
};

import { Topbar } from "@/components/topbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Topbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
