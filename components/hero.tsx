"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center px-6 pt-24 overflow-hidden">
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y }}>
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-wine/25 blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gold/15 blur-[160px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-emerald-900/10 blur-[120px]" />
      </motion.div>

      <motion.div className="relative max-w-5xl mx-auto text-center" style={{ opacity }}>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-sm tracking-[0.3em] uppercase text-gold mb-8"
        >
          India&apos;s craft cocktail atlas
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-[family-name:var(--font-display)] text-6xl md:text-8xl lg:text-9xl leading-[0.95] text-ink-high"
        >
          The night <em className="italic text-gold">begins</em>
          <br />
          after dark.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-10 text-lg md:text-xl text-ink-mid max-w-2xl mx-auto leading-relaxed"
        >
          A curated guide to the speakeasies, listening rooms, and signature
          cocktails redefining nightlife across India.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 items-center justify-center"
        >
          <Link href="/explore" className="px-8 py-4 rounded-full bg-gold text-bg-deep font-medium hover:bg-gold-hot transition">
            Explore the atlas
          </Link>
          <Link href="/recommender" className="px-8 py-4 rounded-full border border-bg-elevated text-ink-high hover:bg-bg-surface transition">
            Find my drink →
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="mt-24 flex items-center justify-center gap-8 text-xs tracking-[0.2em] uppercase text-ink-low"
        >
          <span>Mumbai</span><span>·</span>
          <span>Delhi</span><span>·</span>
          <span>Bangalore</span><span>·</span>
          <span>Goa</span>
        </motion.div>
      </motion.div>
    </section>
  );
}