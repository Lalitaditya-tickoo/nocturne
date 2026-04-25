import type { Metadata } from "next";
import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Cursor } from "@/components/cursor";
import { Intro } from "@/components/intro";
import { ScrollProgress } from "@/components/scroll-progress";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Nocturne — India's craft cocktail atlas",
    template: "%s · Nocturne",
  },
  description:
    "A hand-curated guide to India's craft cocktail scene. 27 venues across Mumbai, Delhi, Bangalore, Goa, Hyderabad, and Pune. Speakeasies, listening rooms, signature drinks.",
  keywords: ["cocktail bars India", "speakeasy Mumbai", "cocktail bars Delhi", "Sidecar", "Home Saket", "PCO", "Soro Goa", "craft cocktails India"],
  openGraph: {
    title: "Nocturne — India's craft cocktail atlas",
    description: "A hand-curated guide to India's craft cocktail scene.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nocturne — India's craft cocktail atlas",
    description: "A hand-curated guide to India's craft cocktail scene.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body>
        <Intro />
        <ScrollProgress />
        <SmoothScroll />
        <Cursor />
        {children}
      </body>
    </html>
  );
}