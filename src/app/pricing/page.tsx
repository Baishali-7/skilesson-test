"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Snowflake,
  Mountain,
  Trophy,
  Check,
  ChevronDown,
  Shield,
  Zap,
  Users,
  ArrowRight,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const plans = [
  {
    name: "Explorer",
    tier: "Beginner",
    icon: Snowflake,
    monthlyPrice: 29,
    annualPrice: 249,
    annualSavings: 99,
    popular: false,
    description:
      "Master the fundamentals. Build confidence on every run with expert-guided foundations.",
    features: [
      "Access to all Beginner lessons (50+ video lessons)",
      "Foundational ski & snowboard techniques",
      "Equipment guides & gear recommendations",
      "Progress tracking dashboard",
      "Community forum access",
      "AI Coach basic encouragement",
      "Email support",
    ],
  },
  {
    name: "Summit",
    tier: "Intermediate",
    icon: Mountain,
    monthlyPrice: 49,
    annualPrice: 449,
    annualSavings: 139,
    popular: true,
    description:
      "Push your limits. Conquer any terrain with advanced drills, personalized feedback, and live coaching.",
    features: [
      "Everything in Explorer, plus:",
      "Full Intermediate curriculum (80+ lessons)",
      "Advanced technique breakdowns",
      "Terrain-specific training (moguls, powder, park)",
      "Video analysis tips",
      "AI Coach personalized feedback",
      "Monthly live Q&A with instructors",
      "Priority support",
    ],
  },
  {
    name: "Apex",
    tier: "Advanced + Family",
    icon: Trophy,
    monthlyPrice: 79,
    annualPrice: 699,
    annualSavings: 249,
    popular: false,
    description:
      "The complete mountain experience. Elite training for you and up to 4 family members.",
    features: [
      "Everything in Summit, plus:",
      "Complete Advanced curriculum (120+ lessons)",
      "Competition prep & racing techniques",
      "Family plan (up to 4 profiles)",
      "Parent dashboard for tracking kids\u2019 progress",
      "1-on-1 virtual coaching sessions (2/month)",
      "AI Coach advanced analytics",
      "Early access to new content",
      "Dedicated support",
    ],
  },
];

const faqs = [
  {
    question: "Can I switch plans anytime?",
    answer:
      "Absolutely. Upgrade or downgrade your plan at any time from your account settings. When upgrading, you\u2019ll get immediate access to new features and we\u2019ll prorate the difference. Downgrading takes effect at the end of your current billing cycle so you never lose access mid-period.",
  },
  {
    question: "What\u2019s included in the free trial?",
    answer:
      "Your 7-day free trial gives you full, unrestricted access to every feature in your chosen plan. Explore lessons, track progress, chat with AI Coach \u2014 the complete experience. No charge until day 8, and you can cancel anytime during the trial with zero commitment.",
  },
  {
    question: "Is there a family discount?",
    answer:
      "Yes! The Apex plan includes a built-in family discount \u2014 up to 4 profiles under one subscription. Compared to individual plans, families save over 60%. Each family member gets their own personalized dashboard, progress tracking, and AI Coach experience.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "No contracts, no cancellation fees, no questions asked. Cancel your subscription anytime from your account settings. You\u2019ll continue to have access through the end of your current billing period. Plus, our 30-day money-back guarantee means you can try us completely risk-free.",
  },
  {
    question: "Do I need any equipment to start?",
    answer:
      "Not at all. Many of our foundational lessons focus on body positioning, balance drills, and fitness exercises you can practice at home. When you\u2019re ready to hit the slopes, our comprehensive equipment guides will help you choose the right gear for your level and budget.",
  },
  {
    question: "How are lessons delivered?",
    answer:
      "Lessons are delivered through our premium streaming platform, available on web, iOS, and Android. Each lesson includes HD video instruction, slow-motion breakdowns, on-screen annotations, and downloadable practice checklists. Watch anytime, anywhere \u2014 even offline with our mobile app.",
  },
];

function FAQItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      className="border-b border-slate-800/60"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-6 text-left"
      >
        <span className="text-lg font-medium text-slate-100 pr-4">
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0 text-sky-400"
        >
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-slate-400 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-[#0f172a] overflow-hidden">
      {/* Background texture */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(56,189,248,0.08)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(125,211,252,0.05)_0%,_transparent_50%)]" />
      </div>

      <div className="relative">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-sky-500/10 border border-sky-500/20 px-4 py-1.5 text-sm font-medium text-sky-400 mb-8">
                <Zap className="h-3.5 w-3.5" />
                Start with a 7-day free trial
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              <span className="text-white">Invest in Your</span>
              <br />
              <span className="bg-gradient-to-r from-sky-400 via-sky-300 to-cyan-300 bg-clip-text text-transparent">
                Mountain Journey
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              World-class ski and snowboard instruction, powered by AI,
              delivered on demand. Choose the plan that matches your ambition.
            </motion.p>

            {/* Billing Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center justify-center gap-4"
            >
              <span
                className={`text-sm font-medium transition-colors duration-200 ${
                  !isAnnual ? "text-white" : "text-slate-500"
                }`}
              >
                Monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative h-8 w-14 rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f172a] ${
                  isAnnual ? "bg-sky-500" : "bg-slate-600"
                }`}
                aria-label="Toggle annual billing"
              >
                <motion.div
                  className="absolute top-1 left-1 h-6 w-6 rounded-full bg-white shadow-md"
                  animate={{ x: isAnnual ? 24 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
              <span
                className={`text-sm font-medium transition-colors duration-200 ${
                  isAnnual ? "text-white" : "text-slate-500"
                }`}
              >
                Annual
              </span>
              <AnimatePresence>
                {isAnnual && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8, x: -8 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: -8 }}
                    className="rounded-full bg-emerald-500/15 border border-emerald-500/25 px-3 py-1 text-xs font-semibold text-emerald-400"
                  >
                    Save up to $249
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              const price = isAnnual
                ? Math.round(plan.annualPrice / 12)
                : plan.monthlyPrice;
              const totalPrice = isAnnual
                ? plan.annualPrice
                : plan.monthlyPrice;

              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.12,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }}
                  className={`relative rounded-2xl p-px ${
                    plan.popular ? "md:-mt-4 md:mb-[-16px]" : ""
                  }`}
                >
                  {/* Card border gradient */}
                  <div
                    className={`absolute inset-0 rounded-2xl ${
                      plan.popular
                        ? "bg-gradient-to-b from-amber-400/60 via-amber-500/20 to-amber-400/60"
                        : "bg-gradient-to-b from-slate-700/60 via-slate-800/30 to-slate-700/60"
                    }`}
                  />

                  {/* Most Popular badge */}
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0f172a] shadow-lg shadow-amber-500/25">
                        <Mountain className="h-3.5 w-3.5" />
                        Most Popular
                      </span>
                    </div>
                  )}

                  {/* Card body */}
                  <div
                    className={`relative rounded-2xl p-8 lg:p-10 h-full ${
                      plan.popular
                        ? "bg-[#0f172a]/95 backdrop-blur-xl"
                        : "bg-slate-900/80 backdrop-blur-xl"
                    }`}
                  >
                    {/* Glass highlight */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-t-2xl" />

                    {/* Icon */}
                    <div
                      className={`inline-flex items-center justify-center rounded-xl p-3 mb-6 ${
                        plan.popular
                          ? "bg-amber-500/10 text-amber-400"
                          : "bg-sky-500/10 text-sky-400"
                      }`}
                    >
                      <Icon className="h-7 w-7" />
                    </div>

                    {/* Plan name & tier */}
                    <h3
                      className="text-2xl font-bold text-white mb-1"
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    >
                      {plan.name}
                    </h3>
                    <p className="text-sm text-slate-500 font-medium uppercase tracking-wide mb-4">
                      {plan.tier}
                    </p>

                    {/* Description */}
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                      {plan.description}
                    </p>

                    {/* Price */}
                    <div className="mb-8">
                      <div className="flex items-baseline gap-1">
                        <span className="text-5xl font-extrabold text-white tracking-tight">
                          ${isAnnual ? price : totalPrice}
                        </span>
                        <span className="text-slate-500 text-sm font-medium">
                          /mo
                        </span>
                      </div>
                      {isAnnual && (
                        <motion.div
                          key="annual-detail"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-2 space-y-1"
                        >
                          <p className="text-sm text-slate-500">
                            ${totalPrice} billed annually
                          </p>
                          <p className="text-sm font-semibold text-emerald-400">
                            Save ${plan.annualSavings}/year
                          </p>
                        </motion.div>
                      )}
                    </div>

                    {/* CTA Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={async () => {
                        console.log("SESSION:", session);
                        if (!session?.userId) {
                          window.location.href = "/signin";
                          return;
                        }

                        const res = await fetch("/api/subscribe", {
                          method: "POST",
                          body: JSON.stringify({
                            userId: session.userId,
                            planId: plan.name.toLowerCase(),
                            billingCycle: isAnnual ? "annual" : "monthly",
                            trialEnabled: true,
                          }),
                        });

                        const data = await res.json();

                        if (data.url) {
                          window.location.href = data.url;
                        } else {
                          alert("Something went wrong");
                        }
                      }}
                      className={`w-full rounded-xl py-3.5 px-6 text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 mb-8 cursor-pointer ${
                        plan.popular
                          ? "bg-gradient-to-r from-amber-500 to-amber-400 text-[#0f172a]"
                          : "bg-sky-500 text-white"
                      }`}
                    >
                      Start 7-Day Free Trial
                      <ArrowRight className="h-4 w-4" />
                    </motion.button>

                    {/* Divider */}
                    <div className="h-px bg-slate-800 mb-8" />

                    {/* Features */}
                    <ul className="space-y-3.5">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check
                            className={`h-5 w-5 flex-shrink-0 mt-0.5 ${
                              plan.popular ? "text-amber-400" : "text-sky-400"
                            }`}
                          />
                          <span className="text-sm text-slate-300 leading-snug">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Money-Back Guarantee */}
        <section className="pb-24 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-sm px-8 py-5">
              <Shield className="h-8 w-8 text-emerald-400 flex-shrink-0" />
              <div className="text-left">
                <p className="text-white font-semibold text-lg">
                  30-Day Money-Back Guarantee
                </p>
                <p className="text-slate-400 text-sm mt-0.5">
                  Not the right fit? Get a full refund within 30 days. No
                  questions asked.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* FAQ Section */}
        <section className="pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2
                className="text-3xl sm:text-4xl font-bold text-white mb-4"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Frequently Asked Questions
              </h2>
              <p className="text-slate-400 text-lg">
                Everything you need to know before hitting the slopes.
              </p>
            </motion.div>

            <div>
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Enterprise / Group Section */}
        <section className="pb-32 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto relative rounded-2xl p-px"
          >
            {/* Border gradient */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-sky-500/30 via-purple-500/20 to-sky-500/30" />

            <div className="relative rounded-2xl bg-slate-900/90 backdrop-blur-xl px-8 py-12 sm:px-12 sm:py-16 text-center">
              {/* Glass highlight */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-t-2xl" />

              <div className="inline-flex items-center justify-center rounded-xl bg-sky-500/10 p-3 mb-6">
                <Users className="h-8 w-8 text-sky-400" />
              </div>

              <h2
                className="text-3xl sm:text-4xl font-bold text-white mb-4"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Training Your Team?
              </h2>
              <p className="text-slate-400 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
                Custom plans for ski schools, corporate retreats, and group
                programs. Volume pricing, admin dashboards, and dedicated
                onboarding for teams of 10+.
              </p>

              <motion.a
                href="/contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-xl border border-sky-500/40 bg-sky-500/10 px-8 py-3.5 text-sm font-semibold text-sky-400 transition-all duration-200 hover:bg-sky-500/20 hover:border-sky-400/50"
              >
                Contact Us
                <ArrowRight className="h-4 w-4" />
              </motion.a>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
