import { motion, useScroll, useTransform, useSpring, type Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import portrait from "@/assets/pasindu.webp";
import { ArrowUpRight, Mail, Linkedin, Phone, MapPin, Sparkles, ChevronDown, Menu, X, GraduationCap, PenTool, Mic, Video, TrendingUp, Layers, Palette, Target, Plus, Minus } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

const EASE = [0.6, 0.05, 0.1, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE, delay: i * 0.08 },
  }),
};

/* -------------------- Scroll progress -------------------- */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed top-0 inset-x-0 h-[2px] bg-bronze z-[60]"
    />
  );
};

/* -------------------- Live clock -------------------- */
const useColomboTime = () => {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const t = new Date().toLocaleTimeString("en-GB", {
        timeZone: "Asia/Colombo",
        hour: "2-digit",
        minute: "2-digit",
      });
      setTime(t);
    };
    tick();
    const i = setInterval(tick, 1000 * 30);
    return () => clearInterval(i);
  }, []);
  return time;
};

/* -------------------- Nav -------------------- */
const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["Services", "Work", "About", "Contact"];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "backdrop-blur-xl bg-cream/80 border-b border-border/60" : "bg-transparent"
        }`}
    >
      <div className="max-w-[1400px] mx-auto px-5 md:px-12 py-4 md:py-5 flex items-center justify-between">
        <a href="#top" className="font-display text-sm md:text-base tracking-tight flex items-center gap-2 font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-bronze" />
          PASINDU
        </a>
        <nav className="hidden md:flex items-center gap-12 text-sm text-ink-soft font-medium">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="reveal-line hover:text-ink transition-colors">
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2.5 text-sm font-semibold">
          <span className="relative flex w-2.5 h-2.5">
            <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75" />
            <span className="relative w-2.5 h-2.5 rounded-full bg-emerald-500" />
          </span>
          <span className="hidden sm:inline text-xs md:text-sm">Open to work</span>
          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="md:hidden ml-2 p-2 -mr-2" aria-label="Open menu">
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[340px] bg-cream border-l border-border p-0">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between px-6 py-5 border-b border-border">
                  <span className="font-display text-sm tracking-tight font-semibold flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-bronze" />
                    PASINDU
                  </span>
                  <SheetClose asChild>
                    <button className="p-2 -mr-2" aria-label="Close menu">
                      <X className="w-5 h-5 text-ink-soft" />
                    </button>
                  </SheetClose>
                </div>
                <nav className="flex-1 flex flex-col justify-center px-6 gap-1">
                  {links.map((l, i) => (
                    <motion.a
                      key={l}
                      href={`#${l.toLowerCase()}`}
                      onClick={() => setOpen(false)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08, duration: 0.4, ease: EASE }}
                      className="font-display text-3xl font-light py-3 border-b border-border/50 text-ink hover:text-bronze transition-colors"
                    >
                      {l}
                    </motion.a>
                  ))}
                </nav>
                <div className="px-6 pb-10 pt-6 border-t border-border space-y-4">
                  <a href="mailto:hello@pasinduukwatta.com" className="flex items-center gap-3 text-sm text-ink-soft hover:text-ink transition-colors">
                    <Mail className="w-4 h-4 text-bronze" />
                    hello@pasinduukwatta.com
                  </a>
                  <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground font-mono-tight">
                    Colombo · Available worldwide
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

/* -------------------- Hero -------------------- */
const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-screen flex flex-col justify-center px-5 md:px-12 lg:px-24 pt-28 md:pt-32 pb-16 md:pb-20 grain overflow-hidden bg-cream"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Ambient bronze blobs */}
      <div className="blob blob-bronze float-slow w-[320px] h-[320px] md:w-[520px] md:h-[520px] -top-20 -right-20 md:-top-40 md:-right-40" />
      <div className="blob blob-ink float-slower w-[280px] h-[280px] md:w-[420px] md:h-[420px] -bottom-20 -left-16 md:-bottom-40 md:-left-32" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } } }}
        className="max-w-7xl mx-auto w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-8 items-center"
      >
        {/* Left: text */}
        <div className="lg:col-span-7 order-1 lg:order-1">
          <motion.div
            variants={fadeUp}
            className="text-bronze uppercase tracking-[0.25em] text-[10px] md:text-xs md:tracking-[0.3em] font-mono-tight font-medium mb-4 md:mb-10 pl-1 flex items-center gap-3"
          >
            <span className="w-6 md:w-8 h-px bg-gradient-to-r from-bronze to-transparent" />
            Marketing · Strategy · Content
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-display font-light text-[11vw] sm:text-[10vw] lg:text-[8vw] leading-[0.85] tracking-[-0.03em] text-balance text-ink mb-6 md:mb-8"
          >
            Pasindu<br />
            <span className="italic text-gradient-bronze">Ukwatta</span>
          </motion.h1>

          <motion.div variants={fadeUp} className="flex flex-col mt-8 md:mt-12 gap-6 md:gap-8 max-w-md">
            <p className="text-ink-soft text-sm md:text-base font-light leading-relaxed">
              Marketing professional with 7+ years of experience and an MSc in
              Strategic Marketing. Blending creativity with strategy to craft
              campaigns, content and stories that connect with people.
            </p>

            <div>
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                href="#contact"
                className="inline-flex group items-center gap-3 md:gap-4 text-[10px] md:text-xs tracking-[0.2em] uppercase border border-bronze/30 rounded-full px-6 md:px-8 py-3.5 md:py-4 hover:bg-bronze hover:text-cream hover:border-bronze transition-all duration-500 hover:shadow-[0_15px_40px_-15px_hsl(var(--bronze)/0.6)]"
              >
                <span className="font-semibold">Get in Touch</span>
                <ArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:rotate-45 transition-transform duration-500" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Right: portrait */}
        <motion.div
          variants={fadeUp}
          className="lg:col-span-5 order-2 lg:order-2 flex justify-center lg:justify-end relative mt-4 md:mt-0"
        >
          <div className="absolute -bottom-3 right-2 lg:-right-4 w-20 h-20 lg:w-32 lg:h-32 border-b border-r border-bronze/40 z-0 hidden lg:block" />
          <div className="absolute -top-3 left-2 lg:-left-4 w-20 h-20 lg:w-32 lg:h-32 border-t border-l border-bronze/40 z-0 hidden lg:block" />

          {/* Glow halo */}
          <div className="absolute inset-4 md:inset-8 bg-bronze/20 blur-3xl rounded-full opacity-60" />

          <motion.div
            style={{ y: imgY }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            className="w-full max-w-[200px] sm:max-w-[240px] lg:max-w-md aspect-[3/4] relative overflow-hidden group z-10 border border-bronze/20 sheen"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-cream via-transparent to-transparent z-10 opacity-70 group-hover:opacity-30 transition-opacity duration-1000 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-br from-bronze/10 via-transparent to-transparent z-10 mix-blend-overlay pointer-events-none" />
            <img
              src={portrait}
              alt="Pasindu Ukwatta — Marketing Executive"
              className="object-cover object-top w-full h-full grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-[1400ms]"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-bronze/60"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-mono-tight">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </motion.div>
    </section>
  );
};

/* -------------------- Brands -------------------- */
const Brands = () => {
  const brands = [
    "AURELIAN",
    "NORTHWIND",
    "LUMEN",
    "MERIDIAN",
    "KAYA & CO.",
    "ATLAS GROUP",
    "OBSCURA",
    "HARBOR LABS",
  ];
  return (
    <section className="py-10 md:py-14 border-y border-border bg-cream-deep/30 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-5 md:px-12 mb-6 md:mb-8 flex items-center gap-4">
        <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-muted-foreground font-mono-tight shrink-0">
          Trusted by
        </span>
        <span className="flex-1 h-px bg-border" />
      </div>
      <div className="overflow-hidden">
        <div className="flex marquee-slow whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex items-center gap-8 md:gap-16 pr-8 md:pr-16">
              {brands.map((b) => (
                <span
                  key={b + k}
                  className="font-display text-2xl md:text-3xl lg:text-4xl tracking-[0.15em] text-ink-soft/60 hover:text-ink transition-colors"
                >
                  {b}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* -------------------- Stats -------------------- */
const Stats = () => {
  const stats = [
    { v: "7+", l: "Years in marketing" },
    { v: "MSc", l: "Strategic Marketing" },
    { v: "3", l: "Brands collaborated with" },
    { v: "Dip.", l: "Fashion Merchandising & Retailing" },
  ];
  return (
    <section className="border-b border-border bg-cream">
      <div className="max-w-[1400px] mx-auto px-5 md:px-12 py-14 md:py-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 md:divide-x md:divide-border">
        {stats.map((s, i) => (
          <motion.div
            key={s.l}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            className="px-0 md:px-8 first:md:pl-0 py-4 md:py-0 border-b md:border-b-0 border-border/50 last:border-b-0"
          >
            <div className="font-display text-4xl md:text-5xl lg:text-7xl font-light tracking-[-0.02em]">{s.v}</div>
            <div className="mt-2 md:mt-3 text-[10px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.25em] text-muted-foreground font-mono-tight">
              {s.l}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

/* -------------------- About -------------------- */
const About = () => (
  <section id="about" className="py-20 md:py-32">
    <div className="max-w-[1400px] mx-auto px-5 md:px-12 grid md:grid-cols-12 gap-10 md:gap-12">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="md:col-span-4 md:sticky md:top-32 self-start"
      >
        <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-bronze font-mono-tight">— About</p>
        <h2 className="mt-4 md:mt-6 font-display text-3xl md:text-4xl lg:text-5xl font-light leading-[1.05] tracking-[-0.02em]">
          A marketer's mind. <br />
          <em className="italic text-ink-soft">A storyteller's heart.</em>
        </h2>
        <div className="mt-6 md:mt-10 flex md:flex-col gap-3 md:gap-2 text-[10px] md:text-xs uppercase tracking-[0.25em] text-muted-foreground font-mono-tight overflow-x-auto md:overflow-visible pb-2 md:pb-0">
          <div className="shrink-0">01 — Strategy</div>
          <div className="shrink-0">02 — Content</div>
          <div className="shrink-0">03 — Presenting</div>
          <div className="shrink-0">04 — Video</div>
        </div>
      </motion.div>
      <div className="md:col-span-7 md:col-start-6 space-y-6 md:space-y-8 text-base md:text-lg lg:text-xl leading-relaxed text-ink-soft font-light text-pretty">
        {[
          "With over 7 years of experience in marketing and an MSc in Strategic Marketing, I am passionate about finding innovative ways to market products and connect with audiences.",
          "My background also includes a Diploma in Fashion Merchandising and Retailing, giving me strong insight into branding, retail trends and consumer behavior.",
          "I enjoy blending creativity with strategy to develop impactful marketing campaigns and fresh content ideas. Content writing, program presenting and video editing are some of my key interests, allowing me to creatively engage with different audiences.",
          "I am always driven to explore modern marketing trends and bring unique perspectives to every project I undertake.",
        ].map((p, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.15 }}
          >
            {p}
          </motion.p>
        ))}
      </div>
    </div>
  </section>
);

/* -------------------- Work -------------------- */
const Work = () => {
  const projects = [
    { y: "2020 — 2026", c: "Ceylon Innovation", r: "Marketing", m: "Long-term role contributing to brand, content and marketing initiatives across multiple projects.", tag: "Innovation" },
    { y: "2021 — 2022", c: "Screenline Holdings", r: "Marketing", m: "Supported marketing activities, content development and campaign execution.", tag: "Holdings" },
    { y: "2019 — 2020", c: "Brandix", r: "Marketing", m: "Early-career experience in one of the region's leading apparel groups, building a foundation across branding and retail.", tag: "Apparel" },
  ];
  return (
    <section id="work" className="py-20 md:py-32">
      <div className="max-w-[1400px] mx-auto px-5 md:px-12">
        <div className="mb-12 md:mb-20 flex items-end justify-between flex-wrap gap-4 md:gap-6">
          <div>
            <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-bronze font-mono-tight">— Selected Work</p>
            <h2 className="mt-4 md:mt-6 font-display text-4xl md:text-5xl lg:text-7xl font-light leading-[1] tracking-[-0.02em]">
              Chapters of <em className="italic">impact</em>.
            </h2>
          </div>
          <p className="text-xs md:text-sm text-muted-foreground max-w-xs">
            Companies I've contributed to throughout my career.
          </p>
        </div>

        {/* Desktop: list layout */}
        <div className="hidden md:block border-t border-border">
          {projects.map((p, i) => (
            <motion.a
              key={p.c}
              href="#contact"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="group grid md:grid-cols-12 gap-6 py-10 border-b border-border items-start hover:bg-cream-deep/50 px-2 md:px-6 -mx-2 md:-mx-6 transition-colors duration-500 relative"
            >
              <div className="md:col-span-1 text-sm tracking-[0.15em] text-muted-foreground font-mono-tight">{p.y}</div>
              <div className="md:col-span-3">
                <div className="font-display text-2xl md:text-3xl font-light tracking-[-0.01em]">{p.c}</div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.25em] text-muted-foreground font-mono-tight">
                  {p.tag}
                </div>
              </div>
              <div className="md:col-span-2 text-sm uppercase tracking-[0.15em] text-bronze">{p.r}</div>
              <div className="md:col-span-5 text-ink-soft font-light leading-relaxed text-pretty">{p.m}</div>
              <div className="md:col-span-1 flex md:justify-end">
                <span className="w-10 h-10 rounded-full border border-ink/20 flex items-center justify-center group-hover:bg-ink group-hover:text-cream group-hover:border-ink transition-colors duration-500">
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Mobile: horizontal scroll cards */}
        <div className="md:hidden -mx-5">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-5 pb-4 scrollbar-hide">
            {projects.map((p, i) => (
              <motion.a
                key={p.c}
                href="#contact"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                className="group snap-start shrink-0 w-[82vw] bg-cream-deep/30 border border-border rounded-lg p-6 flex flex-col gap-4 hover:bg-cream-deep/50 transition-colors duration-500"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-bronze font-mono-tight">{p.y}</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono-tight">{p.tag}</span>
                </div>
                <div className="font-display text-2xl font-light tracking-[-0.01em]">{p.c}</div>
                <div className="text-xs uppercase tracking-[0.15em] text-bronze">{p.r}</div>
                <p className="text-sm text-ink-soft font-light leading-relaxed text-pretty flex-1">{p.m}</p>
                <div className="flex justify-end">
                  <span className="w-9 h-9 rounded-full border border-ink/20 flex items-center justify-center group-hover:bg-ink group-hover:text-cream transition-colors duration-500">
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
          <div className="flex justify-center gap-1.5 mt-2">
            {projects.map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-border" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* -------------------- Expertise -------------------- */
const Expertise = () => {
  const items = [
    { n: "01", t: "Brand Strategy", d: "Positioning, narrative architecture and identity systems that compound over time." },
    { n: "02", t: "Growth Marketing", d: "Full-funnel performance, lifecycle and CRO informed by data, executed with taste." },
    { n: "03", t: "Go-to-Market", d: "Launch playbooks, category design and pricing strategy for new products and markets." },
    { n: "04", t: "Creative Direction", d: "Campaigns, content systems and editorial that turn brands into cultural objects." },
    { n: "05", t: "Team Leadership", d: "Building and mentoring high-performing, cross-functional marketing teams." },
    { n: "06", t: "Marketing Ops", d: "Martech stack, attribution and reporting infrastructure that scales with the business." },
  ];
  return (
    <section id="expertise" className="py-20 md:py-32 bg-ink text-cream relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-[0.04] pointer-events-none" />
      <div className="blob blob-bronze float-slower w-[400px] h-[400px] md:w-[600px] md:h-[600px] -top-40 -left-20 md:-top-60 md:-left-40 opacity-20" />
      <div className="max-w-[1400px] mx-auto px-5 md:px-12 relative">
        <div className="flex items-end justify-between mb-12 md:mb-20 flex-wrap gap-4 md:gap-6">
          <div>
            <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-bronze-soft font-mono-tight">— Expertise</p>
            <h2 className="mt-4 md:mt-6 font-display text-4xl md:text-5xl lg:text-7xl font-light leading-[1] max-w-3xl tracking-[-0.02em]">
              Where I create <em className="italic text-gradient-bronze">leverage</em>.
            </h2>
          </div>
          <p className="max-w-sm text-cream/60 font-light leading-relaxed text-sm md:text-base">
            Six disciplines, one philosophy: clarity in story, rigor in execution, taste in everything between.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-bronze/15">
          {items.map((it, i) => (
            <motion.div
              key={it.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="bg-ink p-6 md:p-10 group hover:bg-cream-deep transition-colors duration-500 relative sheen"
            >
              <div className="flex items-start justify-between mb-6 md:mb-10 text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-bronze-soft font-mono-tight">
                <span>{it.n}</span>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-500 text-bronze" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-light mb-3 tracking-[-0.01em] group-hover:text-bronze-soft transition-colors duration-500">{it.t}</h3>
              <p className="text-sm text-cream/70 font-light leading-relaxed">{it.d}</p>
              <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full bg-gradient-to-r from-bronze to-bronze-soft transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* -------------------- Process -------------------- */
const Process = () => {
  const steps = [
    { n: "01", t: "Listen", d: "Audits, interviews and category mapping. Strategy starts with hearing the truth." },
    { n: "02", t: "Frame", d: "Positioning, audience and the singular story only this brand can tell." },
    { n: "03", t: "Build", d: "Identity, messaging, channels and the operating system that ships them weekly." },
    { n: "04", t: "Compound", d: "Measure, learn, double down. Marketing as an engine, not a campaign." },
  ];
  return (
    <section id="process" className="py-20 md:py-32 bg-cream-deep/40 border-y border-border">
      <div className="max-w-[1400px] mx-auto px-5 md:px-12">
        <div className="grid md:grid-cols-12 gap-8 md:gap-10 mb-12 md:mb-16">
          <div className="md:col-span-5">
            <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-bronze font-mono-tight">— Process</p>
            <h2 className="mt-4 md:mt-6 font-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] tracking-[-0.02em]">
              Method behind the <em className="italic">momentum</em>.
            </h2>
          </div>
          <p className="md:col-span-6 md:col-start-7 self-end text-ink-soft font-light leading-relaxed text-base md:text-lg">
            The same disciplined sequence — calibrated to your stage, sector and ambition. No theatrics, no recycled
            decks.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-px bg-border">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="bg-cream p-6 md:p-10 hover:bg-cream-deep/60 transition-colors duration-500"
            >
              <div className="flex items-baseline justify-between mb-6 md:mb-8">
                <span className="font-mono-tight text-[10px] md:text-[11px] tracking-[0.25em] text-bronze">{s.n}</span>
                <span className="font-display text-4xl md:text-5xl font-light text-ink/10">0{i + 1}</span>
              </div>
              <h3 className="font-display text-xl md:text-2xl font-light mb-3 tracking-[-0.01em]">{s.t}</h3>
              <p className="text-sm text-ink-soft font-light leading-relaxed">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* -------------------- Testimonial -------------------- */
const Testimonials = () => {
  const items = [
    {
      q: "Pasindu doesn't just market a brand — he sharpens its point of view until the market can't look away.",
      a: "Anika Pereira",
      r: "CEO, Northwind SaaS",
    },
    {
      q: "Rare combination: editorial taste, commercial instinct, and the discipline to ship. Our category narrative finally clicked.",
      a: "Daniel Mensah",
      r: "Founder, Lumen Beverages",
    },
    {
      q: "He rebuilt our marketing org and our story in the same quarter. Both still hold up two years later.",
      a: "Saskia Klein",
      r: "Chair, Aurelian Hotels",
    },
  ];
  return (
    <section className="py-20 md:py-32 bg-cream">
      <div className="max-w-[1400px] mx-auto px-5 md:px-12">
        <div className="flex items-end justify-between mb-10 md:mb-16 flex-wrap gap-4 md:gap-6">
          <div>
            <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-bronze font-mono-tight">— Words</p>
            <h2 className="mt-4 md:mt-6 font-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] tracking-[-0.02em]">
              From the people <br className="hidden md:block" /> <em className="italic">in the room.</em>
            </h2>
          </div>
        </div>

        {/* Desktop: grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-px bg-border">
          {items.map((t, i) => (
            <motion.figure
              key={t.a}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="bg-cream p-10 flex flex-col justify-between min-h-[320px] hover:bg-cream-deep/40 transition-colors duration-500"
            >
              <blockquote className="font-display text-xl md:text-2xl font-light leading-snug text-pretty">
                <span className="text-bronze">“</span>
                {t.q}
                <span className="text-bronze">”</span>
              </blockquote>
              <figcaption className="mt-10 text-[11px] uppercase tracking-[0.25em] text-muted-foreground font-mono-tight">
                — {t.a} · <span className="text-ink-soft">{t.r}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="md:hidden -mx-5">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-5 pb-4 scrollbar-hide">
            {items.map((t, i) => (
              <motion.figure
                key={t.a}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="snap-start shrink-0 w-[85vw] bg-cream-deep/20 border border-border rounded-lg p-6 flex flex-col justify-between min-h-[280px]"
              >
                <blockquote className="font-display text-lg font-light leading-snug text-pretty">
                  <span className="text-bronze">“</span>
                  {t.q}
                  <span className="text-bronze">”</span>
                </blockquote>
                <figcaption className="mt-8 text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-mono-tight">
                  — {t.a} · <span className="text-ink-soft">{t.r}</span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
          <div className="flex justify-center gap-1.5 mt-2">
            {items.map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-border" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* -------------------- Education -------------------- */
const Education = () => {
  const items = [
    { y: "MSc", t: "Strategic Marketing", d: "Postgraduate degree focused on modern marketing strategy, consumer insight and brand building." },
    { y: "Dip.", t: "Fashion Merchandising & Retailing", d: "Foundation in branding, retail trends, visual merchandising and consumer behavior." },
  ];
  return (
    <section id="education" className="py-20 md:py-32 bg-cream">
      <div className="max-w-[1400px] mx-auto px-5 md:px-12">
        <div className="mb-12 md:mb-20 grid md:grid-cols-12 gap-6">
          <div className="md:col-span-5">
            <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-bronze font-mono-tight">— Education</p>
            <h2 className="mt-4 md:mt-6 font-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] tracking-[-0.02em]">
              Built on <em className="italic">study</em> <br />and curiosity.
            </h2>
          </div>
          <p className="md:col-span-6 md:col-start-7 self-end text-ink-soft font-light leading-relaxed text-base md:text-lg">
            Formal training in strategic marketing combined with a retail and merchandising foundation — a mix that shapes how I think about brands.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-px bg-border">
          {items.map((it, i) => (
            <motion.div
              key={it.t}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="bg-cream p-8 md:p-12 group hover:bg-cream-deep/40 transition-colors duration-500 relative"
            >
              <div className="flex items-start gap-5">
                <div className="shrink-0 w-12 h-12 rounded-full border border-bronze/40 flex items-center justify-center text-bronze">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-mono-tight text-[11px] uppercase tracking-[0.25em] text-bronze mb-2">{it.y}</div>
                  <h3 className="font-display text-2xl md:text-3xl font-light tracking-[-0.01em]">{it.t}</h3>
                  <p className="mt-3 text-sm md:text-base text-ink-soft font-light leading-relaxed">{it.d}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* -------------------- Skills -------------------- */
const Skills = () => {
  const groups = [
    { h: "Strategy", items: ["Brand Strategy", "Market Research", "Consumer Insight", "Positioning", "Campaign Planning"] },
    { h: "Content", items: ["Content Writing", "Copywriting", "Editorial Direction", "Storytelling", "Social Content"] },
    { h: "Production", items: ["Video Editing", "Program Presenting", "Creative Direction", "Visual Merchandising"] },
    { h: "Retail & Brand", items: ["Retail Trends", "Consumer Behavior", "Merchandising", "Brand Identity"] },
  ];
  return (
    <section id="skills" className="py-20 md:py-32 bg-cream-deep/40 border-y border-border">
      <div className="max-w-[1400px] mx-auto px-5 md:px-12">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12 md:mb-16">
          <div>
            <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-bronze font-mono-tight">— Skills</p>
            <h2 className="mt-4 md:mt-6 font-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] tracking-[-0.02em]">
              A toolkit for <em className="italic">modern brands</em>.
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {groups.map((g, i) => (
            <motion.div
              key={g.h}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="bg-cream border border-border rounded-lg p-6 md:p-8 hover:border-bronze/40 transition-colors duration-500"
            >
              <div className="text-[10px] uppercase tracking-[0.25em] text-bronze font-mono-tight mb-5">0{i + 1} — {g.h}</div>
              <ul className="space-y-2.5">
                {g.items.map((s) => (
                  <li key={s} className="text-sm md:text-base text-ink-soft font-light flex items-center gap-2.5">
                    <span className="w-1 h-1 rounded-full bg-bronze shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* -------------------- Interests -------------------- */
const Interests = () => {
  const items = [
    { I: PenTool, t: "Content Writing", d: "Crafting words that earn attention — from short copy to long-form editorial." },
    { I: Mic, t: "Program Presenting", d: "Hosting and presenting with warmth, clarity and genuine curiosity." },
    { I: Video, t: "Video Editing", d: "Shaping raw footage into stories that hold an audience to the last frame." },
    { I: TrendingUp, t: "Modern Trends", d: "Always exploring how marketing is shifting and what's worth borrowing next." },
  ];
  return (
    <section id="interests" className="py-20 md:py-32 bg-cream">
      <div className="max-w-[1400px] mx-auto px-5 md:px-12">
        <div className="mb-12 md:mb-16 max-w-3xl">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-bronze font-mono-tight">— What I love</p>
          <h2 className="mt-4 md:mt-6 font-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] tracking-[-0.02em]">
            Creative interests <br /><em className="italic text-gradient-bronze">beyond the brief</em>.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map((it, i) => (
            <motion.div
              key={it.t}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="group p-6 md:p-8 border border-border rounded-lg bg-cream hover:bg-cream-deep/40 hover:border-bronze/40 transition-all duration-500"
            >
              <div className="w-11 h-11 rounded-full bg-bronze/10 text-bronze flex items-center justify-center mb-5 group-hover:bg-bronze group-hover:text-cream transition-colors duration-500">
                <it.I className="w-5 h-5" />
              </div>
              <h3 className="font-display text-xl md:text-2xl font-light tracking-[-0.01em] mb-2">{it.t}</h3>
              <p className="text-sm text-ink-soft font-light leading-relaxed">{it.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* -------------------- Services -------------------- */
const Services = () => {
  const items = [
    { I: Target, t: "Marketing Strategy", d: "Positioning, audience and campaign planning for brands that want a clear direction." },
    { I: Layers, t: "Content & Copy", d: "Writing for campaigns, social, web and editorial — across short and long form." },
    { I: Palette, t: "Creative Concepts", d: "Idea generation, campaign concepts and fresh angles for product launches." },
    { I: Video, t: "Video & Presenting", d: "Concepting, presenting and editing short-form video for brand and social." },
  ];
  return (
    <section id="services" className="py-20 md:py-32 bg-ink text-cream relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-[0.04]" />
      <div className="blob blob-bronze float-slow w-[400px] h-[400px] md:w-[600px] md:h-[600px] -bottom-40 -right-20 md:-bottom-60 md:-right-40 opacity-20" />
      <div className="max-w-[1400px] mx-auto px-5 md:px-12 relative">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12 md:mb-16">
          <div>
            <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-bronze-soft font-mono-tight">— Services</p>
            <h2 className="mt-4 md:mt-6 font-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] tracking-[-0.02em]">
              How I can <em className="italic text-gradient-bronze">help</em>.
            </h2>
          </div>
          <p className="max-w-sm text-cream/60 font-light leading-relaxed text-sm md:text-base">
            Open to freelance, collaboration and full-time roles in marketing, content and creative.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-bronze/15">
          {items.map((it, i) => (
            <motion.div
              key={it.t}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="bg-ink p-8 md:p-12 group hover:bg-cream-deep transition-colors duration-500 relative"
            >
              <div className="flex items-start gap-5">
                <div className="w-11 h-11 rounded-full border border-bronze/40 text-bronze-soft flex items-center justify-center shrink-0 group-hover:bg-bronze group-hover:text-cream group-hover:border-bronze transition-colors duration-500">
                  <it.I className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-2xl md:text-3xl font-light tracking-[-0.01em] group-hover:text-ink transition-colors duration-500">{it.t}</h3>
                  <p className="mt-3 text-sm md:text-base text-cream/70 font-light leading-relaxed group-hover:text-ink-soft transition-colors duration-500">{it.d}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* -------------------- Currently -------------------- */
const Currently = () => {
  const items = [
    { l: "Role", v: "Marketing — Ceylon Innovation" },
    { l: "Based in", v: "Colombo, Sri Lanka" },
    { l: "Focus", v: "Content, campaigns & creative direction" },
    { l: "Exploring", v: "Short-form video & modern storytelling" },
    { l: "Open to", v: "Collaborations · Freelance · Full-time" },
  ];
  return (
    <section className="py-20 md:py-28 bg-cream-deep/40 border-y border-border">
      <div className="max-w-[1400px] mx-auto px-5 md:px-12 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-bronze font-mono-tight">— Currently</p>
          <h2 className="mt-4 md:mt-6 font-display text-3xl md:text-4xl lg:text-5xl font-light leading-[1.05] tracking-[-0.02em]">
            A snapshot of <em className="italic">right now</em>.
          </h2>
        </div>
        <div className="md:col-span-7 md:col-start-6 divide-y divide-border">
          {items.map((it, i) => (
            <motion.div
              key={it.l}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="py-5 flex items-baseline justify-between gap-6"
            >
              <span className="text-[11px] md:text-xs uppercase tracking-[0.25em] text-muted-foreground font-mono-tight shrink-0">{it.l}</span>
              <span className="text-right text-sm md:text-base text-ink font-light">{it.v}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* -------------------- FAQ -------------------- */
const FAQ = () => {
  const items = [
    { q: "What kind of work are you open to?", a: "Marketing, content, creative and presenting projects — freelance, collaboration or full-time roles." },
    { q: "What industries have you worked in?", a: "Apparel, innovation and holdings — with experience at Brandix, Ceylon Innovation and Screenline Holdings." },
    { q: "Do you write your own content?", a: "Yes. Content writing is one of my favourite parts of the job, from short social copy to long-form editorial." },
    { q: "Can you present on camera?", a: "Yes — program presenting is one of my key interests and something I genuinely enjoy." },
    { q: "Where are you based?", a: "Colombo, Sri Lanka. I'm happy to work remotely with teams anywhere." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-20 md:py-32 bg-cream">
      <div className="max-w-[1100px] mx-auto px-5 md:px-12">
        <div className="mb-12 md:mb-16 text-center">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-bronze font-mono-tight">— FAQ</p>
          <h2 className="mt-4 md:mt-6 font-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] tracking-[-0.02em]">
            Questions, <em className="italic">answered</em>.
          </h2>
        </div>
        <div className="border-t border-border">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={it.q} className="border-b border-border">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full py-6 md:py-7 flex items-center justify-between gap-6 text-left group"
                >
                  <span className="font-display text-lg md:text-2xl font-light tracking-[-0.01em] group-hover:text-bronze transition-colors duration-300">
                    {it.q}
                  </span>
                  <span className="shrink-0 w-9 h-9 rounded-full border border-ink/20 flex items-center justify-center text-ink-soft group-hover:bg-ink group-hover:text-cream group-hover:border-ink transition-colors duration-500">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 md:pb-8 pr-12 text-sm md:text-base text-ink-soft font-light leading-relaxed">
                    {it.a}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* -------------------- Contact -------------------- */
const Contact = () => (
  <section id="contact" className="py-20 md:py-32 bg-ink text-cream grain relative overflow-hidden">
    <div className="absolute inset-0 dot-grid opacity-[0.04]" />
    <div className="blob blob-bronze float-slow w-[450px] h-[450px] md:w-[700px] md:h-[700px] -top-20 -right-20 md:-top-40 md:-right-40 opacity-25" />
    <div className="max-w-[1400px] mx-auto px-5 md:px-12 grid md:grid-cols-12 gap-10 md:gap-12 items-end relative">
      <div className="md:col-span-8">
        <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-bronze-soft font-mono-tight">— Let's build</p>
        <h2 className="mt-4 md:mt-6 font-display text-5xl md:text-7xl lg:text-[10rem] font-light leading-[0.88] tracking-[-0.035em]">
          Got a brand <br />
          worth <em className="italic text-bronze-soft">telling?</em>
        </h2>
        <a
          href="mailto:hello@pasinduukwatta.com"
          className="inline-flex items-center gap-3 md:gap-4 mt-8 md:mt-12 text-base md:text-lg lg:text-2xl border-b border-cream/40 pb-2 hover:border-bronze-soft hover:text-bronze-soft transition-colors duration-500 font-display italic"
        >
          hello@pasinduukwatta.com
          <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" />
        </a>
      </div>
      <div className="md:col-span-4 space-y-4 md:space-y-6 text-sm">
        {[
          { I: Mail, t: "hello@pasinduukwatta.com", h: "mailto:hello@pasinduukwatta.com" },
          { I: Phone, t: "+94 77 000 0000", h: "tel:+94770000000" },
          { I: Linkedin, t: "linkedin.com/in/pasinduukwatta", h: "#" },
          { I: MapPin, t: "Colombo · Available worldwide", h: "#" },
        ].map(({ I, t, h }) => (
          <a
            key={t}
            href={h}
            className="flex items-center gap-4 text-cream/70 hover:text-cream transition-colors group"
          >
            <I className="w-4 h-4 text-bronze-soft shrink-0" />
            <span className="reveal-line text-sm">{t}</span>
          </a>
        ))}
      </div>
    </div>
    <div className="max-w-[1400px] mx-auto px-5 md:px-12 mt-16 md:mt-24 pt-6 md:pt-8 border-t border-cream/15 flex flex-wrap justify-between text-[10px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.25em] text-cream/50 gap-2 md:gap-4 font-mono-tight relative">
      <span>© 2026 Pasindu Ukwatta</span>
      <span>Folio · Marketing Leadership</span>
      <span>Designed in Colombo</span>
    </div>
  </section>
);

const Index = () => (
  <main className="bg-cream text-ink overflow-x-hidden">
    <ScrollProgress />
    <Nav />
    <Hero />
    <Stats />
    <About />
    <Education />
    <Work />
    <Skills />
    <Expertise />
    <Services />
    <Process />
    <Interests />
    <Currently />
    <FAQ />
    <Contact />
  </main>
);

export default Index;
