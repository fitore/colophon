import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import PageShell from "@/components/layout/PageShell";
import "@/styles/tokens.css";
import "@/styles/global.css";
import "@/styles/typography.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: {
    default: "Colophon",
    template: "%s · Colophon",
  },
  description:
    "Colophon is an online-first publishing, press, and bookshop experiment based in Ontario, Canada.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <PageShell>{children}</PageShell>
      </body>
    </html>
  );
}
