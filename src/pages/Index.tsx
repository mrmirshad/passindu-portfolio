import { motion, useScroll, useTransform, useSpring, type Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import portrait from "@/assets/pasindu-portrait.jpg";
import { ArrowUpRight, Mail, Linkedin, Phone, MapPin, Sparkles, ChevronDown } from "lucide-react";

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
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "backdrop-blur-xl bg-cream/80 border-b border-border/60" : "bg-transparent"
        }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
        <a href="#top" className="font-display text-base tracking-tight flex items-center gap-2 font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-bronze" />
          PASINDU
        </a>
        <nav className="hidden md:flex items-center gap-12 text-sm text-ink-soft font-medium">
          {["Services", "Work", "About", "Contact"].map((l) => (
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
          <span className="hidden sm:inline">Open to work</span>
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
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-32 pb-20 grain overflow-hidden bg-cream"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Ambient bronze blobs */}
      <div className="blob blob-bronze float-slow w-[520px] h-[520px] -top-40 -right-40" />
      <div className="blob blob-ink float-slower w-[420px] h-[420px] -bottom-40 -left-32" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } } }}
        className="max-w-7xl mx-auto w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
      >
        {/* Left: text */}
        <div className="lg:col-span-7 order-2 lg:order-1">
          <motion.div
            variants={fadeUp}
            className="text-bronze uppercase tracking-[0.3em] text-xs md:text-sm font-mono-tight font-medium mb-6 md:mb-10 pl-1 flex items-center gap-3"
          >
            <span className="w-8 h-px bg-gradient-to-r from-bronze to-transparent" />
            Brand Strategist
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-display font-light text-[15vw] lg:text-[8vw] leading-[0.85] tracking-[-0.03em] text-balance text-ink mb-8"
          >
            Pasindu<br />
            <span className="italic text-gradient-bronze">Ukwatta</span>
          </motion.h1>

          <motion.div variants={fadeUp} className="flex flex-col mt-12 gap-8 max-w-md">
            <p className="text-ink-soft text-sm md:text-base font-light leading-relaxed">
              Elevating brands through strategic precision and relentless innovation.
              Specializing in high-impact campaigns that bridge the gap between
              creative vision and commercial success.
            </p>

            <div>
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                href="#contact"
                className="inline-flex group items-center gap-4 text-xs tracking-[0.2em] uppercase border border-bronze/30 rounded-full px-8 py-4 hover:bg-bronze hover:text-cream hover:border-bronze transition-all duration-500 hover:shadow-[0_15px_40px_-15px_hsl(var(--bronze)/0.6)]"
              >
                <span className="font-semibold">Discuss a Project</span>
                <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-500" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Right: portrait */}
        <motion.div
          variants={fadeUp}
          className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end relative"
        >
          <div className="absolute -bottom-4 right-4 lg:-right-4 w-32 h-32 border-b border-r border-bronze/40 z-0 hidden lg:block" />
          <div className="absolute -top-4 left-4 lg:-left-4 w-32 h-32 border-t border-l border-bronze/40 z-0 hidden lg:block" />

          {/* Glow halo */}
          <div className="absolute inset-8 bg-bronze/20 blur-3xl rounded-full opacity-60" />

          <motion.div
            style={{ y: imgY }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            className="w-full max-w-sm lg:max-w-md aspect-[3/4] relative overflow-hidden group z-10 border border-bronze/20 sheen"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-cream via-transparent to-transparent z-10 opacity-70 group-hover:opacity-30 transition-opacity duration-1000 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-br from-bronze/10 via-transparent to-transparent z-10 mix-blend-overlay pointer-events-none" />
            <img
              src={portrait}
              alt="Pasindu Ukwatta — Brand Strategist"
              className="object-cover object-top w-full h-full grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-[1400ms]"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-bronze/60"
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
    <section className="py-14 border-y border-border bg-cream-deep/30 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-8 flex items-center gap-4">
        <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground font-mono-tight">
          Trusted by teams at
        </span>
        <span className="flex-1 h-px bg-border" />
      </div>
      <div className="overflow-hidden">
        <div className="flex marquee-slow whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex items-center gap-16 pr-16">
              {brands.map((b) => (
                <span
                  key={b + k}
                  className="font-display text-3xl md:text-4xl tracking-[0.15em] text-ink-soft/60 hover:text-ink transition-colors"
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
    { v: "12+", l: "Years leading marketing" },
    { v: "$48M", l: "Revenue influenced" },
    { v: "40+", l: "Brands launched & scaled" },
    { v: "9", l: "Industry awards" },
  ];
  return (
    <section className="border-b border-border bg-cream">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-20 grid grid-cols-2 md:grid-cols-4 gap-10 divide-x divide-border">
        {stats.map((s, i) => (
          <motion.div
            key={s.l}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            className="px-2 md:px-8 first:pl-0"
          >
            <div className="font-display text-5xl md:text-7xl font-light tracking-[-0.02em]">{s.v}</div>
            <div className="mt-3 text-[11px] uppercase tracking-[0.25em] text-muted-foreground font-mono-tight">
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
  <section id="about" className="py-32">
    <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-12">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="md:col-span-4 md:sticky md:top-32 self-start"
      >
        <p className="text-xs uppercase tracking-[0.35em] text-bronze font-mono-tight">— About</p>
        <h2 className="mt-6 font-display text-4xl md:text-5xl font-light leading-[1.05] tracking-[-0.02em]">
          A marketer's mind. <br />
          <em className="italic text-ink-soft">A storyteller's heart.</em>
        </h2>
        <div className="mt-10 hidden md:block text-xs uppercase tracking-[0.25em] text-muted-foreground space-y-2 font-mono-tight">
          <div>01 — Strategy</div>
          <div>02 — Story</div>
          <div>03 — System</div>
          <div>04 — Scale</div>
        </div>
      </motion.div>
      <div className="md:col-span-7 md:col-start-6 space-y-8 text-lg md:text-xl leading-relaxed text-ink-soft font-light text-pretty">
        {[
          "I lead marketing functions for ambitious organizations — from challenger startups finding their voice to legacy brands reinventing themselves for a new decade. My work sits where vision meets velocity.",
          "Over twelve years, I've shaped go-to-market strategies across SaaS, hospitality and consumer goods, building teams that ship campaigns the world actually remembers.",
          "I believe great marketing is quiet confidence at scale: clear positioning, beautiful craft, and numbers that hold up to scrutiny.",
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
    <section id="expertise" className="py-32 bg-ink text-cream relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-[0.04] pointer-events-none" />
      <div className="blob blob-bronze float-slower w-[600px] h-[600px] -top-60 -left-40 opacity-20" />
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative">
        <div className="flex items-end justify-between mb-20 flex-wrap gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-bronze-soft font-mono-tight">— Expertise</p>
            <h2 className="mt-6 font-display text-5xl md:text-7xl font-light leading-[1] max-w-3xl tracking-[-0.02em]">
              Where I create <em className="italic text-gradient-bronze">leverage</em>.
            </h2>
          </div>
          <p className="max-w-sm text-cream/60 font-light leading-relaxed">
            Six disciplines, one philosophy: clarity in story, rigor in execution, taste in everything between.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-bronze/15">
          {items.map((it, i) => (
            <motion.div
              key={it.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="bg-ink p-10 group hover:bg-cream-deep transition-colors duration-500 relative sheen"
            >
              <div className="flex items-start justify-between mb-10 text-[11px] uppercase tracking-[0.25em] text-bronze-soft font-mono-tight">
                <span>{it.n}</span>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-500 text-bronze" />
              </div>
              <h3 className="font-display text-3xl font-light mb-4 tracking-[-0.01em] group-hover:text-bronze-soft transition-colors duration-500">{it.t}</h3>
              <p className="text-cream/70 font-light leading-relaxed">{it.d}</p>
              <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full bg-gradient-to-r from-bronze to-bronze-soft transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* -------------------- Work -------------------- */
const Work = () => {
  const projects = [
    { y: "2024", c: "Aurelian Hotels", r: "Head of Marketing", m: "Repositioned a heritage hospitality group, lifting direct bookings 142% YoY through a refreshed brand system and editorial content strategy.", tag: "Hospitality" },
    { y: "2023", c: "Northwind SaaS", r: "VP Marketing (Interim)", m: "Led the Series B go-to-market: category narrative, ABM program and product launches that contributed to a 3.1x ARR expansion in 18 months.", tag: "B2B SaaS" },
    { y: "2022", c: "Lumen Beverages", r: "Marketing Director", m: "Launched a premium D2C line in three regions; achieved profitable CAC in quarter two and 38% repeat-purchase rate within six months.", tag: "D2C" },
    { y: "2020", c: "Meridian Group", r: "Senior Brand Manager", m: "Architected the masterbrand strategy uniting seven sub-brands; recognized at the Effie Awards for strategic clarity.", tag: "Conglomerate" },
  ];
  return (
    <section id="work" className="py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="mb-20 flex items-end justify-between flex-wrap gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-bronze font-mono-tight">— Selected Work</p>
            <h2 className="mt-6 font-display text-5xl md:text-7xl font-light leading-[1] tracking-[-0.02em]">
              Chapters of <em className="italic">impact</em>.
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            A condensed selection. Full case studies available on request.
          </p>
        </div>

        <div className="border-t border-border">
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
    <section id="process" className="py-32 bg-cream-deep/40 border-y border-border">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-12 gap-10 mb-16">
          <div className="md:col-span-5">
            <p className="text-xs uppercase tracking-[0.35em] text-bronze font-mono-tight">— Process</p>
            <h2 className="mt-6 font-display text-5xl md:text-6xl font-light leading-[1.05] tracking-[-0.02em]">
              Method behind the <em className="italic">momentum</em>.
            </h2>
          </div>
          <p className="md:col-span-6 md:col-start-7 self-end text-ink-soft font-light leading-relaxed text-lg">
            The same disciplined sequence — calibrated to your stage, sector and ambition. No theatrics, no recycled
            decks.
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-px bg-border">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="bg-cream p-10 hover:bg-cream-deep/60 transition-colors duration-500"
            >
              <div className="flex items-baseline justify-between mb-8">
                <span className="font-mono-tight text-[11px] tracking-[0.25em] text-bronze">{s.n}</span>
                <span className="font-display text-5xl font-light text-ink/10">0{i + 1}</span>
              </div>
              <h3 className="font-display text-2xl font-light mb-3 tracking-[-0.01em]">{s.t}</h3>
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
    <section className="py-32 bg-cream">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-bronze font-mono-tight">— Words</p>
            <h2 className="mt-6 font-display text-5xl md:text-6xl font-light leading-[1.05] tracking-[-0.02em]">
              From the people <br /> <em className="italic">in the room.</em>
            </h2>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-px bg-border">
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
      </div>
    </section>
  );
};

/* -------------------- Contact -------------------- */
const Contact = () => (
  <section id="contact" className="py-32 bg-ink text-cream grain relative overflow-hidden">
    <div className="absolute inset-0 dot-grid opacity-[0.04]" />
    <div className="blob blob-bronze float-slow w-[700px] h-[700px] -top-40 -right-40 opacity-25" />
    <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-12 items-end relative">
      <div className="md:col-span-8">
        <p className="text-xs uppercase tracking-[0.35em] text-bronze-soft font-mono-tight">— Let's build</p>
        <h2 className="mt-6 font-display text-6xl md:text-[10rem] font-light leading-[0.88] tracking-[-0.035em]">
          Got a brand <br />
          worth <em className="italic text-bronze-soft">telling?</em>
        </h2>
        <a
          href="mailto:hello@pasinduukwatta.com"
          className="inline-flex items-center gap-4 mt-12 text-lg md:text-2xl border-b border-cream/40 pb-2 hover:border-bronze-soft hover:text-bronze-soft transition-colors duration-500 font-display italic"
        >
          hello@pasinduukwatta.com
          <ArrowUpRight className="w-6 h-6" />
        </a>
      </div>
      <div className="md:col-span-4 space-y-6 text-sm">
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
            <I className="w-4 h-4 text-bronze-soft" />
            <span className="reveal-line">{t}</span>
          </a>
        ))}
      </div>
    </div>
    <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-24 pt-8 border-t border-cream/15 flex flex-wrap justify-between text-[11px] uppercase tracking-[0.25em] text-cream/50 gap-4 font-mono-tight relative">
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
    <Brands />
    <Stats />
    <About />
    <Work />
    <Expertise />
    <Process />
    <Testimonials />
    <Contact />
  </main>
);

export default Index;
