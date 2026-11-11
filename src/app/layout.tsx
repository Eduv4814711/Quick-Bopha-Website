import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { EmergencyTrigger } from "@/components/shared/EmergencyTrigger";
import { PopiaNotice } from "@/components/shared/PopiaNotice";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quick Bopha Security | We Guard With Pride | North West & N12 Corridor",
  description:
    "Enterprise-grade private security services, 24/7 armed response, smart safes, and PSiRA accredited training academy headquartered in Wolmaransstad, Maquassi Hills, North West Province. 100% Black-Owned, Level 1 B-BBEE, 100% NBCPSS Statutory Wage Compliant.",
  keywords: [
    "Quick Bopha Security",
    "Security Wolmaransstad",
    "Maquassi Hills security",
    "N12 corridor guarding",
    "PSiRA training academy",
    "24/7 Armed Response North West",
    "NBCPSS rate calculator",
    "B-BBEE Level 1 security company",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <EmergencyTrigger />
        <PopiaNotice />
        <Footer />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
