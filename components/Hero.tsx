"use client";

import {
  Terminal,
  ArrowRight,
  Cpu,
  FileText,
  Mail,
  Layout,
  Zap,
  Check,
  type LucideIcon, // Import Type
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "motion/react"; // Import Variants type

// --- TYPES & INTERFACES ---

interface FeatureItem {
  icon: LucideIcon;
  title: string;
  desc: string;
}

interface TimelineStep {
  step: string;
  title: string;
  text: string;
}

// --- ANIMATION VARIANTS ---

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const drawLine: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1, ease: "easeInOut", delay: 0.2 },
  },
};

// --- DATA CONSTANTS ---

const FEATURES: FeatureItem[] = [
  {
    icon: FileText,
    title: "Blog Architect",
    desc: "SEO-ready long-form content that actually has an opinion. No fluff. No 'In the ever-evolving landscape.' Just value.",
  },
  {
    icon: Cpu,
    title: "Changelog / Updates",
    desc: "Turn dry Git commits into exciting narratives. Keep investors and users hooked on your shipping velocity.",
  },
  {
    icon: Mail,
    title: "Cold Outreach",
    desc: "High-conversion templates that respect the recipient's intelligence. Zero 'I hope this email finds you well.'",
  },
  {
    icon: Layout,
    title: "Landing Page Copy",
    desc: "Hero sections that convert. Value propositions that stick. Copy that sells the hole, not the drill.",
  },
];

const TIMELINE_STEPS: TimelineStep[] = [
  {
    step: "01",
    title: "INPUT DATA",
    text: "Upload your best blog posts, tweets, or memos.",
  },
  {
    step: "02",
    title: "SYNTAX PARSING",
    text: "Zendt isolates your vocabulary, sentence structure, and tone.",
  },
  {
    step: "03",
    title: "EXECUTE",
    text: "Generate content that is indistinguishable from your own hand.",
  },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-black text-white font-inter selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      {/* NAVIGATION */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="fixed top-0 w-full z-50 border-b border-neutral-800 bg-black/80 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold tracking-tight text-xl">
              <Image src="/logo.svg" alt="Logo" width={24} height={24} />
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-mono text-neutral-400">
            {["MANIFESTO", "PRICING"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-white transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-indigo-500 transition-all group-hover:w-full" />
              </a>
            ))}
            <Link href="/login" className="hover:text-white transition-colors">
              LOGIN
            </Link>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/login"
                className="bg-white text-black px-4 py-2 font-inter font-bold hover:bg-neutral-200 transition-colors"
              >
                GET ACCESS
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* HERO SECTION */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 border-b border-neutral-900">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-7xl mx-auto"
        >
          {/* System Status Badge */}
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-3 py-1 border border-neutral-800 rounded-full mb-8"
          >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
            <span className="font-mono text-xs text-neutral-400">
              SYSTEM STATUS: ONLINE // ANTI-SLOP PROTOCOL ACTIVE
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8"
          >
            DON'T LET AI
            <br />
            <span className="text-neutral-500">DILUTE YOUR SOUL.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-xl text-neutral-400 max-w-2xl leading-relaxed mb-12"
          >
            Most AI writing tools sound like everyone else. Zendt is the writing
            engine engineered for B2B Startups who refuse to publish generic
            content.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col md:flex-row gap-6 items-start md:items-center"
          >
            <Link href="/login">
              <motion.button
                whileHover={{ x: 5 }}
                className="group relative px-8 py-4 bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 font-bold tracking-wide flex items-center gap-3"
              >
                INITIALIZE ZENDT_VOICE
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
            <span className="font-mono text-xs text-neutral-600">
              v1.0.4 | No Credit Card Required for Beta
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* THE PROBLEM GRID */}
      <section className="border-b border-neutral-900 overflow-hidden">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-900 max-w-7xl mx-auto"
        >
          {/* Header Tile */}
          <motion.div
            variants={fadeUp}
            className="p-12 bg-neutral-950 relative"
          >
            <h2 className="text-3xl font-bold tracking-tighter mb-4">
              THE UNCANNY
              <br />
              VALLEY OF
              <br />
              CONTENT.
            </h2>
            {/* Animated Underline */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-1 bg-indigo-600 mt-4"
            />
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="p-12 group hover:bg-neutral-900 transition-colors"
          >
            <span className="font-mono text-indigo-500 text-sm mb-4 block">
              01 // THE BLOAT
            </span>
            <p className="text-neutral-400 leading-relaxed">
              Your competitors are flooding the market with "ChatGPT grey"
              content. It fills space, but it says nothing. It is noise.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="p-12 group hover:bg-neutral-900 transition-colors"
          >
            <span className="font-mono text-indigo-500 text-sm mb-4 block">
              02 // THE CHURN
            </span>
            <p className="text-neutral-400 leading-relaxed">
              Generic writing kills trust. If your product update sounds like a
              bot wrote it, customers assume your product is built by bots too.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* FEATURE MODULES */}
      <section id="manifesto" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-12"
          >
            <Terminal className="w-5 h-5 text-indigo-500" />
            <span className="font-mono text-sm tracking-widest text-neutral-500 uppercase">
              Select_Module
            </span>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {FEATURES.map((feature, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                whileHover={{ y: -4, borderColor: "rgba(99, 102, 241, 0.5)" }}
                className="border border-neutral-800 p-8 bg-neutral-950/30 transition-all duration-300 group cursor-default"
              >
                <feature.icon className="w-8 h-8 text-neutral-500 group-hover:text-indigo-500 mb-6 transition-colors duration-500" />
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-neutral-400 leading-relaxed text-sm">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS (Timeline) */}
      <section className="py-24 px-6 border-y border-neutral-900 bg-neutral-950">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 text-center"
          >
            TRAINED ON YOU.
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Animated Connecting Line */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-neutral-800 z-0 overflow-hidden">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={drawLine}
                className="h-full w-full bg-neutral-600 origin-left"
              />
            </div>

            {TIMELINE_STEPS.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="relative z-10 bg-neutral-950 pr-4"
              >
                <div className="w-24 h-24 border border-neutral-800 flex items-center justify-center mb-6 bg-black group hover:border-indigo-500 transition-colors duration-300">
                  <span className="font-mono text-2xl text-indigo-500 group-hover:scale-110 transition-transform">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-mono text-lg font-bold mb-2">
                  {item.title}
                </h3>
                <p className="text-neutral-500 text-sm">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-32 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <Zap className="w-12 h-12 text-white mx-auto mb-8 animate-pulse" />
          <blockquote className="text-2xl md:text-4xl font-medium leading-tight text-neutral-200">
            "Zendt isn't for the mass market. It isn't for people who want 'good
            enough.' It is for the 1% of founders who treat words as currency."
          </blockquote>
        </motion.div>
      </section>

      {/* PRICING SECTION */}
      <section
        className="py-32 px-6 border-b border-neutral-900 bg-black"
        id="pricing"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <motion.div variants={fadeUp}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                <span className="font-mono text-sm tracking-widest text-neutral-500 uppercase">
                  Pricing_Protocol
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
                INVEST IN <span className="text-neutral-500">SIGNAL</span>.
              </h2>
            </motion.div>
            <motion.p
              variants={fadeUp}
              className="text-neutral-400 max-w-sm text-sm font-mono text-right hidden md:block"
            >
              // NO HIDDEN FEES
              <br />
              // CANCEL ANYTIME
              <br />
              // 14-DAY REFUND GUARANTEE
            </motion.p>
          </motion.div>

          {/* Pricing Grid */}
          <motion.div
            id="#pricing"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-neutral-800 divide-y md:divide-y-0 md:divide-x divide-neutral-800"
          >
            {/* PLAN: FREE */}
            <motion.div
              variants={fadeUp}
              className="p-8 md:p-12 flex flex-col h-full bg-black hover:bg-neutral-950 transition-colors"
            >
              <div className="mb-8">
                <h3 className="font-mono text-neutral-400 text-sm mb-2">
                  / SANDBOX
                </h3>
                <div className="text-4xl font-bold text-white">
                  $0
                  <span className="text-lg text-neutral-600 font-normal">
                    /mo
                  </span>
                </div>
                <p className="text-neutral-500 text-sm mt-4 min-h-[40px]">
                  For skeptics who want to test the quality before committing.
                </p>
              </div>

              <ul className="space-y-4 mb-12 flex-1">
                <li className="flex items-center gap-3 text-sm text-neutral-300">
                  <Check className="w-4 h-4 text-white" /> 5 Generated Content
                </li>
                <li className="flex items-center gap-3 text-sm text-neutral-300">
                  <Check className="w-4 h-4 text-white" /> All 4 Writing Modes
                </li>
                <li className="flex items-center gap-3 text-sm text-neutral-600 line-through decoration-neutral-600">
                  <span className="sr-only">No</span> AI Auto-Complete
                </li>
              </ul>

              <button className="w-full py-4 border border-neutral-700 text-white font-mono text-xs hover:bg-white hover:text-black transition-colors uppercase tracking-wider">
                Initialize Free
              </button>
            </motion.div>

            {/* PLAN: OPERATOR */}
            <motion.div
              variants={fadeUp}
              whileHover={{ scale: 1.02, zIndex: 10, borderColor: "#4f46e5" }}
              className="p-8 md:p-12 flex flex-col h-full bg-neutral-900/20 relative group border border-transparent hover:border-indigo-600 transition-all duration-300"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-indigo-600" />

              <div className="mb-8">
                <div className="flex justify-between items-start">
                  <h3 className="font-mono text-indigo-400 text-sm mb-2">
                    / OPERATOR
                  </h3>
                  <span className="bg-indigo-900/30 text-indigo-400 text-[10px] font-mono px-2 py-1 uppercase tracking-wider border border-indigo-500/30">
                    Recommended
                  </span>
                </div>
                <div className="text-4xl font-bold text-white">
                  $29
                  <span className="text-lg text-neutral-600 font-normal">
                    /mo
                  </span>
                </div>
                <p className="text-neutral-400 text-sm mt-4 min-h-[40px]">
                  For solo founders and small marketing teams (1-2 people).
                </p>
              </div>

              <ul className="space-y-4 mb-12 flex-1">
                <li className="flex items-center gap-3 text-sm text-white font-medium">
                  <Check className="w-4 h-4 text-indigo-500" /> 50 Generated
                  Content
                </li>
                <li className="flex items-center gap-3 text-sm text-white">
                  <Check className="w-4 h-4 text-indigo-500" /> All 4 Writing
                  Modes
                </li>
                <li className="flex items-center gap-3 text-sm text-white">
                  <Check className="w-4 h-4 text-indigo-500" /> AI Auto-Complete
                  (Edit Mode)
                </li>
                <li className="flex items-center gap-3 text-sm text-white">
                  <Check className="w-4 h-4 text-indigo-500" /> Priority Support
                </li>
              </ul>

              <button className="w-full py-4 bg-indigo-600 text-white font-mono text-xs hover:bg-indigo-700 transition-colors uppercase tracking-wider font-bold shadow-lg shadow-indigo-500/20">
                Deploy Operator
              </button>
            </motion.div>

            {/* PLAN: GROWTH */}
            <motion.div
              variants={fadeUp}
              className="p-8 md:p-12 flex flex-col h-full bg-black hover:bg-neutral-950 transition-colors"
            >
              <div className="mb-8">
                <h3 className="font-mono text-neutral-400 text-sm mb-2">
                  / GROWTH
                </h3>
                <div className="text-4xl font-bold text-white">
                  $79
                  <span className="text-lg text-neutral-600 font-normal">
                    /mo
                  </span>
                </div>
                <p className="text-neutral-500 text-sm mt-4 min-h-[40px]">
                  High volume production for scaling startups.
                </p>
              </div>

              <ul className="space-y-4 mb-12 flex-1">
                <li className="flex items-center gap-3 text-sm text-neutral-300">
                  <Check className="w-4 h-4 text-white" /> 100 Generated Content
                </li>
                <li className="flex items-center gap-3 text-sm text-neutral-300">
                  <Check className="w-4 h-4 text-white" /> All 4 Writing Modes
                </li>
                <li className="flex items-center gap-3 text-sm text-neutral-300">
                  <Check className="w-4 h-4 text-white" /> AI Auto-Complete
                  (Edit Mode)
                </li>
                <li className="flex items-center gap-3 text-sm text-neutral-300">
                  <Check className="w-4 h-4 text-white" /> Early Feature Access
                </li>
              </ul>

              <button className="w-full py-4 border border-neutral-700 text-white font-mono text-xs hover:bg-white hover:text-black transition-colors uppercase tracking-wider">
                Deploy Growth
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-neutral-800 py-20 px-6 bg-neutral-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">
              RECLAIM YOUR
              <br />
              NARRATIVE.
            </h2>
            <Link
              href="/login"
              className="inline-block w-full md:w-auto px-12 py-5 bg-white text-black font-bold text-lg hover:bg-neutral-200 transition-colors text-center"
            >
              GET EARLY ACCESS
            </Link>
          </motion.div>

          <div className="flex flex-col gap-4 text-right">
            <div className="flex gap-6 font-mono text-sm text-neutral-500">
              <a
                href="https://x.com/_rudosurebec"
                target="_blank"
                className="hover:text-indigo-500 transition-colors"
              >
                TWITTER
              </a>
              <a href="#" className="hover:text-indigo-500 transition-colors">
                MANIFESTO
              </a>
              <Link
                href="/login"
                className="hover:text-indigo-500 transition-colors"
              >
                LOGIN
              </Link>
            </div>
            <span className="font-mono text-xs text-neutral-700">
              © 2025 ZENDT SYSTEMS
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
