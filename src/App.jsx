import { useState, useEffect, useRef } from "react";

/* ── Data ─────────────────────────────────────────────────────────── */
const data = {
  name: "Mugume Martin",
  firstName: "Mugume",
  lastName: "Martin",
  title: "Data Engineer & Intelligence Specialist",
  tagline: "Turning messy program data into decisions that matter.",
  location: "Kampala, Uganda",
  email: "mugumeanalysis@gmail.com",
  linkedin: "linkedin.com/in/martin-mugume/",
  about: `I'm a Data Engineer and Business Intelligence specialist focused on program analytics, data quality systems, and decision-support infrastructure for entrepreneurship and impact ecosystems. I work at the intersection of data engineering, visualization, and monitoring & evaluation — building tools that help organizations see what's really happening in their programs and act on it.`,
  currentRole: "Data Analyst @ Outbox — NSSF Hi Innovator Program, Kampala",
  stats: [
    { value: "6+", label: "Dashboards Built" },
    { value: "3+", label: "Years Experience" },
    { value: "500+", label: "Businesses Tracked" },
    { value: "6+", label: "Projects Delivered" },
  ],
  skills: [
    { name: "Power BI", level: 95, cat: "BI" },
    { name: "Python (pandas)", level: 90, cat: "Engineering" },
    { name: "Excel / Sheets", level: 92, cat: "BI" },
    { name: "KoboToolbox", level: 88, cat: "Collection" },
    { name: "Data Automation", level: 85, cat: "Engineering" },
    { name: "M&E Systems", level: 90, cat: "Analytics" },
    { name: "Django", level: 72, cat: "Engineering" },
    { name: "Data Scraping", level: 80, cat: "Engineering" },
  ],
  projects: [
    { title: "OCA Dashboard", tag: "Power BI · M&E", palette: 0, featured: true, desc: "Organizational Capacity Assessment dashboard evaluating ESOs across Functional Capacity Areas — grading organizations into Maturity Levels to guide program support decisions.", impact: "Helped stakeholders identify which ESOs needed capacity support" },
    { title: "Academy Dashboard", tag: "Power BI · Learning", palette: 1, featured: true, desc: "Tracks learner progress, training participation, and course completion across program cohorts — giving program managers real-time visibility into learning outcomes.", impact: "Real-time learner tracking across cohorts" },
    { title: "Seed Funding Dashboard", tag: "Power BI · Finance", palette: 2, featured: false, desc: "Analyzes funding distribution across supported businesses and tracks their progress post-funding, enabling evidence-based reporting to funders.", impact: "Enabled transparent reporting on funding impact" },
    { title: "Email Fraud Detection", tag: "Python · Data Quality", palette: 3, featured: false, desc: "Python tool detecting suspicious registrations by identifying domain typos, disposable emails, name–email mismatches, and sequential patterns in program datasets.", impact: "Influenced enrollment decisions by surfacing fake registrations" },
    { title: "Portfolio Dashboard", tag: "Power BI · Program", palette: 4, featured: false, desc: "Monitors businesses supported by the program — tracking KPIs, business health metrics, and cohort-level trends for management reporting.", impact: "Single view of all supported businesses for program managers" },
    { title: "WhatsApp Learning Platform", tag: "Twilio · Text.it · Power BI", palette: 5, featured: false, desc: "End-to-end digital learning system on WhatsApp — learner tracking, quiz logic, 24-hour window management, certificate automation, and ESO dashboards.", impact: "Scalable course delivery via WhatsApp for ESO programs" },
  ],
  blogs: [
    { title: "Why Your Program Data Is Lying to You", date: "Coming Soon", desc: "How unvalidated data collection leads to wrong program decisions — and how to fix it.", palette: 3 },
    { title: "Building Dashboards That Actually Get Used", date: "Coming Soon", desc: "The difference between dashboards that sit in a folder and ones that change how teams operate.", palette: 1 },
    { title: "M&E in the Age of Automation", date: "Coming Soon", desc: "How automation tools are changing monitoring & evaluation for impact programs in Africa.", palette: 0 },
  ],
  services: [
    { icon: "BarChart", title: "Power BI Dashboards", desc: "Custom interactive dashboards for program monitoring, funding, and impact reporting." },
    { icon: "Code", title: "Python Data Analysis", desc: "Data cleaning, automation scripts, validation pipelines, and exploratory analysis." },
    { icon: "Shield", title: "Data Quality Systems", desc: "Fraud detection, validation logic, and data integrity frameworks for program data." },
    { icon: "Clipboard", title: "M&E System Design", desc: "Result measurement frameworks, indicator tracking, and evidence-based reporting tools." },
    { icon: "MessageSquare", title: "Digital Learning Systems", desc: "WhatsApp-based course delivery with progress tracking and automated certificates." },
    { icon: "BookOpen", title: "Data Capacity Building", desc: "Training teams on data tools, analytics thinking, and data-driven decision-making." },
  ],
};

/* ── Design tokens ──────────────────────────────────────────────── */
const C = {
  bg:           "#F4F1EB",   // warm parchment
  surface:      "#FFFFFF",   // white cards
  surfaceWarm:  "#EFECE5",   // warm tinted surface
  ink:          "#18170F",   // warm near-black
  accent:       "#1B4332",   // deep forest
  accentSoft:   "rgba(27,67,50,0.07)",
  accentBorder: "rgba(27,67,50,0.2)",
  gold:         "#B5762A",   // warm ochre
  muted:        "#6A6760",   // warm gray
  dim:          "#999590",
  faint:        "#C0BDB9",
  border:       "rgba(0,0,0,0.08)",
  borderHi:     "rgba(0,0,0,0.14)",
};

const F = {
  display: "'Newsreader', Georgia, serif",
  sans:    "'DM Sans', system-ui, sans-serif",
  mono:    "'JetBrains Mono', monospace",
};

/* muted pastel palette per-project/tag */
const PALETTES = [
  { bg: "#EDF3EC", text: "#2D6A32", border: "rgba(45,106,50,0.2)" },   // sage
  { bg: "#E3EFFE", text: "#1E5799", border: "rgba(30,87,153,0.2)" },   // blue
  { bg: "#FBF3DB", text: "#8A5C00", border: "rgba(138,92,0,0.2)" },    // amber
  { bg: "#FDECEA", text: "#922B2B", border: "rgba(146,43,43,0.2)" },   // rose
  { bg: "#EEE8FB", text: "#5A2D91", border: "rgba(90,45,145,0.2)" },   // violet
  { bg: "#E2F5EE", text: "#1A6645", border: "rgba(26,102,69,0.2)" },   // emerald
];

const CAT_META = {
  BI:          { ...PALETTES[0] },
  Engineering: { ...PALETTES[1] },
  Collection:  { ...PALETTES[2] },
  Analytics:   { ...PALETTES[3] },
};

const NAV = ["About", "Work", "Services", "Blog", "Contact"];

/* ── Icons ──────────────────────────────────────────────────────── */
const Icon = {
  BarChart:     ({ s=22 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="3" y="9" width="4" height="12"/><rect x="9.5" y="5" width="4" height="16"/><rect x="16" y="1" width="4" height="20"/></svg>,
  Code:         ({ s=22 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  Shield:       ({ s=22 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Clipboard:    ({ s=22 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></svg>,
  MessageSquare:({ s=22 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  BookOpen:     ({ s=22 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
  Menu:         ({ s=22 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="17" x2="21" y2="17"/></svg>,
  X:            ({ s=22 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  ArrowRight:   ({ s=14 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  ArrowUpRight: ({ s=14 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>,
  MapPin:       ({ s=14 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  Mail:         ({ s=16 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  Linkedin:     ({ s=16 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
};

/* Decorative mini bar chart — signals data work */
const DataViz = () => (
  <svg width="180" height="110" viewBox="0 0 180 110" fill="none" aria-hidden style={{ display: "block" }}>
    {[
      { x: 4,  h: 58, y: 48 },
      { x: 30, h: 86, y: 20 },
      { x: 56, h: 42, y: 64 },
      { x: 82, h: 96, y: 10 },
      { x: 108,h: 68, y: 38 },
      { x: 134,h: 50, y: 56 },
      { x: 160,h: 76, y: 30 },
    ].map((b, i) => (
      <rect key={i} x={b.x} y={b.y} width={18} height={b.h} rx="3" fill={C.accent} opacity={0.13 + i * 0.02} />
    ))}
    <line x1="0" y1="106" x2="180" y2="106" stroke={C.accent} strokeWidth="1.5" opacity="0.15" />
  </svg>
);

/* ── Hooks ──────────────────────────────────────────────────────── */
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

function usePRM() {
  const [r, setR] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setR(mq.matches);
    mq.addEventListener("change", e => setR(e.matches));
  }, []);
  return r;
}

/* ── Sub-components ─────────────────────────────────────────────── */

function Tag({ palette, children, small }) {
  const p = PALETTES[palette] || PALETTES[0];
  return (
    <span style={{
      display: "inline-block",
      fontFamily: F.mono, fontWeight: 500,
      fontSize: small ? 9 : 10,
      letterSpacing: "0.07em",
      textTransform: "uppercase",
      color: p.text,
      background: p.bg,
      border: `1px solid ${p.border}`,
      borderRadius: 4,
      padding: small ? "2px 6px" : "3px 8px",
    }}>{children}</span>
  );
}

function SkillBar({ name, level, cat, delay }) {
  const [ref, vis] = useInView();
  const rm = usePRM();
  const p = CAT_META[cat] || CAT_META.BI;
  return (
    <div ref={ref} style={{ marginBottom: 22 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontFamily: F.sans, fontSize: 14, fontWeight: 500, color: C.ink }}>{name}</span>
        <span style={{
          fontFamily: F.mono, fontSize: 9, fontWeight: 500,
          letterSpacing: "0.08em", textTransform: "uppercase",
          color: p.text, background: p.bg, border: `1px solid ${p.border}`,
          borderRadius: 3, padding: "2px 6px",
        }}>{cat}</span>
      </div>
      <div style={{ height: 3, background: "rgba(0,0,0,0.08)", borderRadius: 99, overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: 99, background: p.text,
          width: vis ? `${level}%` : "0%",
          transition: rm ? "none" : `width 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        }} />
      </div>
    </div>
  );
}

function ProjectCard({ p, i, featured }) {
  const [ref, vis] = useInView();
  const [hov, setHov] = useState(false);
  const rm = usePRM();
  const pal = PALETTES[p.palette] || PALETTES[0];
  return (
    <article
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={featured ? "proj-card proj-card--lg" : "proj-card"}
      style={{
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderLeft: `3px solid ${pal.text}`,
        borderRadius: "0 10px 10px 0",
        padding: featured ? "28px 26px 22px" : "22px 20px 18px",
        opacity: vis ? 1 : 0,
        transform: !rm ? (vis ? "none" : "translateY(20px)") : "none",
        transition: rm ? "opacity 0.3s" : `opacity 0.55s cubic-bezier(0.16,1,0.3,1) ${i * 60}ms, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${i * 60}ms`,
        boxShadow: hov ? "0 4px 24px rgba(0,0,0,0.07)" : "0 1px 3px rgba(0,0,0,0.04)",
        cursor: "default",
      }}>
      <div style={{ marginBottom: 14 }}>
        <Tag palette={p.palette}>{p.tag}</Tag>
      </div>
      <h3 style={{ fontFamily: F.display, fontWeight: 600, fontSize: featured ? 22 : 17, color: C.ink, marginBottom: 10, lineHeight: 1.25, letterSpacing: "-0.01em" }}>{p.title}</h3>
      <p style={{ fontFamily: F.sans, fontSize: 13.5, color: C.muted, lineHeight: 1.75, marginBottom: 18 }}>{p.desc}</p>
      <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 12, display: "flex", alignItems: "flex-start", gap: 6 }}>
        <span style={{ color: pal.text, flexShrink: 0, marginTop: 2 }}><Icon.ArrowRight s={11} /></span>
        <span style={{ fontFamily: F.sans, fontSize: 12, color: C.muted, fontWeight: 500 }}>{p.impact}</span>
      </div>
    </article>
  );
}

function BlogCard({ b, i }) {
  const [ref, vis] = useInView();
  const [hov, setHov] = useState(false);
  const rm = usePRM();
  const pal = PALETTES[b.palette] || PALETTES[0];
  return (
    <article ref={ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "24px 22px",
        opacity: vis ? 1 : 0,
        transform: !rm ? (vis ? "none" : "translateY(16px)") : "none",
        transition: rm ? "opacity 0.3s" : `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 80}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 80}ms`,
        boxShadow: hov ? "0 4px 20px rgba(0,0,0,0.07)" : "0 1px 3px rgba(0,0,0,0.04)",
      }}>
      <Tag palette={b.palette}>{["Data Quality", "Business Intelligence", "M&E · Africa"][i]}</Tag>
      <h3 style={{ fontFamily: F.display, fontWeight: 600, fontSize: 17, color: C.ink, margin: "14px 0 10px", lineHeight: 1.3, letterSpacing: "-0.01em" }}>{b.title}</h3>
      <p style={{ fontFamily: F.sans, fontSize: 13.5, color: C.muted, lineHeight: 1.75, marginBottom: 16 }}>{b.desc}</p>
      <span style={{ fontFamily: F.mono, fontSize: 10, color: C.dim, letterSpacing: "0.05em" }}>{b.date.toUpperCase()}</span>
    </article>
  );
}

function Stat({ value, label, last }) {
  const [ref, vis] = useInView();
  return (
    <div ref={ref} style={{
      padding: "40px 32px", textAlign: "center",
      borderRight: last ? "none" : `1px solid ${C.border}`,
      opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(10px)", transition: "all 0.55s ease",
    }}>
      <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: "clamp(42px,5vw,60px)", color: C.accent, lineHeight: 1, letterSpacing: "-0.03em" }}>{value}</div>
      <div style={{ fontFamily: F.sans, fontSize: 12, fontWeight: 500, color: C.muted, marginTop: 8, letterSpacing: "0.02em" }}>{label}</div>
    </div>
  );
}

function SectionMark({ n, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
      <span style={{ fontFamily: F.mono, fontSize: 10, color: C.gold, letterSpacing: "0.08em", fontWeight: 500 }}>{n}</span>
      <div style={{ flex: 1, height: 1, background: C.border }} />
      <span style={{ fontFamily: F.mono, fontSize: 10, color: C.dim, letterSpacing: "0.08em" }}>{label}</span>
    </div>
  );
}

/* ── Main ───────────────────────────────────────────────────────── */
export default function Portfolio() {
  const [active, setActive]   = useState("About");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroRef, heroVis]    = useInView(0.04);
  const rm = usePRM();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const goto = (id) => {
    setActive(id);
    setMenuOpen(false);
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: rm ? "auto" : "smooth", block: "start" });
  };

  const a = (d) => ({
    opacity: heroVis ? 1 : 0,
    transform: heroVis ? "none" : "translateY(16px)",
    transition: rm ? "opacity 0.3s" : `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${d}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${d}s`,
  });

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: F.sans }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;1,6..72,300;1,6..72,400;1,6..72,600;1,6..72,700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=JetBrains+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { -webkit-font-smoothing: antialiased; background: #F4F1EB; }
        @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #F4F1EB; }
        ::-webkit-scrollbar-thumb { background: #1B4332; border-radius: 99px; }
        :focus-visible { outline: 2px solid #1B4332; outline-offset: 3px; border-radius: 4px; }
        @keyframes breathe { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.45;transform:scale(0.82)} }
        @keyframes slide-up { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:none} }

        /* Floating pill nav */
        .pill-nav {
          position: fixed; top: 18px; left: 50%; transform: translateX(-50%);
          z-index: 100; display: flex; align-items: center; gap: 4px;
          background: rgba(244,241,235,0.9); border: 1px solid rgba(0,0,0,0.1);
          border-radius: 999px; padding: 6px 8px 6px 16px;
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 2px 20px rgba(0,0,0,0.08);
          transition: box-shadow 0.3s;
          white-space: nowrap;
        }
        .pill-nav.scrolled { box-shadow: 0 4px 28px rgba(0,0,0,0.12); }
        .pill-nav-logo { font-family: 'Newsreader', serif; font-weight: 600; font-size: 16px; color: #18170F; margin-right: 8px; letter-spacing:-0.02em; }
        .pill-nav-links { display: none; }
        @media (min-width: 700px) { .pill-nav-links { display: flex; gap: 2px; } }
        .pill-nav-btn { font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; color: #6A6760; background: none; border: none; cursor: pointer; padding: 5px 11px; border-radius: 999px; transition: color 0.15s, background 0.15s; }
        .pill-nav-btn:hover { color: #18170F; background: rgba(0,0,0,0.05); }
        .pill-nav-btn.active { color: #1B4332; background: rgba(27,67,50,0.09); }
        .pill-cta { font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600; color: #fff; background: #18170F; border: none; cursor: pointer; padding: 7px 16px; border-radius: 999px; transition: background 0.15s, transform 0.15s; letter-spacing: 0.01em; display: inline-flex; align-items: center; gap: 6px; }
        .pill-cta:hover { background: #2D2C20; }
        .pill-cta:active { transform: scale(0.97); }

        /* Mobile hamburger */
        .mob-menu-btn { display: flex; position: fixed; top: 18px; right: 20px; z-index: 110; background: rgba(244,241,235,0.9); border: 1px solid rgba(0,0,0,0.1); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-radius: 999px; padding: 9px 14px; cursor: pointer; align-items: center; gap: 7px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; color: #6A6760; box-shadow: 0 2px 12px rgba(0,0,0,0.07); transition: color 0.15s; }
        .mob-menu-btn:hover { color: #18170F; }
        @media (min-width: 700px) { .mob-menu-btn { display: none; } }

        /* Mobile overlay */
        .mob-overlay { position: fixed; inset: 0; z-index: 200; background: #F4F1EB; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; }
        .mob-close { position: absolute; top: 20px; right: 22px; background: none; border: none; cursor: pointer; color: #9A9590; padding: 8px; }
        .mob-close:hover { color: #18170F; }
        .mob-link { background: none; border: none; font-family: 'Newsreader', serif; font-size: 40px; font-weight: 600; color: #6A6760; cursor: pointer; padding: 8px 28px; letter-spacing: -0.02em; transition: color 0.15s; }
        .mob-link:hover, .mob-link.active { color: #1B4332; }

        /* Sections */
        .section { padding: 96px 28px; border-top: 1px solid rgba(0,0,0,0.07); }
        @media (min-width: 640px) { .section { padding: 112px 48px; } }

        /* Project bento grid */
        .proj-grid { display: grid; gap: 16px; grid-template-columns: 1fr; }
        @media (min-width: 580px) { .proj-grid { grid-template-columns: repeat(2,1fr); } }
        @media (min-width: 900px) { .proj-grid { grid-template-columns: repeat(3,1fr); } .proj-card--lg { grid-column: span 2; } }

        /* Services grid */
        .srv-grid { display: grid; gap: 14px; grid-template-columns: 1fr; }
        @media (min-width: 480px) { .srv-grid { grid-template-columns: repeat(2,1fr); } }
        @media (min-width: 900px) { .srv-grid { grid-template-columns: repeat(3,1fr); } }

        /* Blog grid */
        .blog-grid { display: grid; gap: 16px; grid-template-columns: 1fr; }
        @media (min-width: 580px) { .blog-grid { grid-template-columns: repeat(2,1fr); } }
        @media (min-width: 900px) { .blog-grid { grid-template-columns: repeat(3,1fr); } }

        /* Stats row */
        .stats-row { display: grid; border: 1px solid rgba(0,0,0,0.08); border-radius: 12px; overflow: hidden; background: #fff; grid-template-columns: repeat(2,1fr); }
        @media (min-width: 580px) { .stats-row { grid-template-columns: repeat(4,1fr); } }

        /* Skills grid */
        .skills-grid { display: grid; gap: 0 64px; grid-template-columns: 1fr; }
        @media (min-width: 600px) { .skills-grid { grid-template-columns: 1fr 1fr; } }

        /* Contact links row */
        .contact-row { display: flex; gap: 12px; flex-wrap: wrap; }

        /* Footer */
        .footer-inner { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; max-width: 1040px; margin: 0 auto; }

        /* Service card hover */
        .srv-card { background: #fff; border: 1px solid rgba(0,0,0,0.08); border-radius: 10px; padding: 24px 20px; transition: box-shadow 0.2s, transform 0.2s; cursor: default; }
        .srv-card:hover { box-shadow: 0 4px 22px rgba(0,0,0,0.08); transform: translateY(-2px); }
        .srv-card:active { transform: scale(0.98); }
      `}</style>

      {/* ── Floating pill nav (desktop) ── */}
      <nav className={`pill-nav${scrolled ? " scrolled" : ""}`} role="navigation" aria-label="Main navigation">
        <button className="pill-nav-logo" onClick={() => goto("About")} aria-label="Top">MM.</button>
        <div className="pill-nav-links">
          {NAV.map(n => (
            <button key={n} className={`pill-nav-btn${active === n ? " active" : ""}`} onClick={() => goto(n)} aria-current={active === n ? "page" : undefined}>{n}</button>
          ))}
        </div>
        <button className="pill-cta" onClick={() => goto("Contact")}>Hire Me <Icon.ArrowRight s={13} /></button>
      </nav>

      {/* ── Mobile hamburger ── */}
      <button className="mob-menu-btn" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen}>
        <Icon.Menu s={18} /> Menu
      </button>

      {/* ── Mobile overlay ── */}
      {menuOpen && (
        <div className="mob-overlay" role="dialog" aria-modal="true" aria-label="Navigation">
          <button className="mob-close" onClick={() => setMenuOpen(false)} aria-label="Close"><Icon.X s={26} /></button>
          {NAV.map(n => (
            <button key={n} className={`mob-link${active === n ? " active" : ""}`} onClick={() => goto(n)}>{n}</button>
          ))}
          <button className="pill-cta" onClick={() => goto("Contact")} style={{ marginTop: 20, fontSize: 16, padding: "12px 32px" }}>
            Hire Me <Icon.ArrowRight s={15} />
          </button>
        </div>
      )}

      {/* ── HERO ── */}
      <section id="about" aria-label="Introduction" style={{ minHeight: "100dvh", display: "flex", alignItems: "center", padding: "130px 28px 90px", position: "relative", overflow: "hidden" }}>
        {/* Dot grid - fades in from right */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `radial-gradient(circle, ${C.accent} 1px, transparent 1px)`, backgroundSize: "28px 28px", opacity: 0.055, maskImage: "radial-gradient(ellipse 50% 75% at 92% 45%, black 0%, transparent 68%)", WebkitMaskImage: "radial-gradient(ellipse 50% 75% at 92% 45%, black 0%, transparent 68%)" }} />
        {/* Warm blob */}
        <div style={{ position: "absolute", bottom: "10%", right: "15%", width: 320, height: 320, borderRadius: "50%", background: `radial-gradient(circle, rgba(181,118,42,0.07) 0%, transparent 70%)`, pointerEvents: "none" }} />

        <div ref={heroRef} style={{ maxWidth: 1040, margin: "0 auto", width: "100%" }}>
          {/* Location */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 40, padding: "5px 12px 5px 8px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 999, boxShadow: "0 1px 4px rgba(0,0,0,0.05)", ...a(0.05) }}>
            <span style={{ color: C.gold }}><Icon.MapPin s={13} /></span>
            <span style={{ fontFamily: F.mono, fontSize: 10, color: C.muted, fontWeight: 500, letterSpacing: "0.07em" }}>KAMPALA, UGANDA</span>
          </div>

          {/* Name — huge editorial serif */}
          <h1 style={{ fontFamily: F.display, fontWeight: 600, fontSize: "clamp(58px,10vw,116px)", lineHeight: 0.9, letterSpacing: "-0.03em", color: C.ink, marginBottom: 30, ...a(0.12) }}>
            {data.firstName}<br />
            <span style={{ color: C.accent }}>{data.lastName}</span><span style={{ color: C.gold }}>.</span>
          </h1>

          {/* Role with left rule */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24, ...a(0.24) }}>
            <div style={{ width: 3, height: 24, background: C.gold, borderRadius: 99, flexShrink: 0 }} />
            <p style={{ fontFamily: F.sans, fontSize: "clamp(14px,1.8vw,19px)", fontWeight: 400, color: C.muted }}>{data.title}</p>
          </div>

          {/* Tagline — Newsreader italic */}
          <p style={{ fontFamily: F.display, fontSize: "clamp(17px,2vw,22px)", fontStyle: "italic", fontWeight: 400, color: C.accent, marginBottom: 28, maxWidth: 560, lineHeight: 1.5, letterSpacing: "-0.01em", ...a(0.33) }}>
            "{data.tagline}"
          </p>

          {/* About */}
          <p style={{ fontFamily: F.sans, fontSize: 15.5, fontWeight: 400, color: C.muted, lineHeight: 1.85, maxWidth: 600, marginBottom: 44, ...a(0.42) }}>
            {data.about}
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", ...a(0.5) }}>
            <button onClick={() => goto("Work")} className="pill-cta" style={{ fontSize: 14, padding: "11px 22px" }}>
              View My Work <Icon.ArrowRight s={14} />
            </button>
            <button onClick={() => goto("Contact")} style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: F.sans, fontSize: 14, fontWeight: 500, color: C.muted, background: "none", border: `1.5px solid ${C.border}`, borderRadius: 999, padding: "11px 20px", cursor: "pointer", transition: "all 0.15s" }}
              onMouseEnter={e => { e.currentTarget.style.color = C.ink; e.currentTarget.style.borderColor = C.borderHi; }}
              onMouseLeave={e => { e.currentTarget.style.color = C.muted; e.currentTarget.style.borderColor = C.border; }}>
              Get in Touch
            </button>
          </div>

          {/* Status pill */}
          <div style={{ marginTop: 52, display: "inline-flex", alignItems: "center", gap: 9, background: C.accentSoft, border: `1px solid ${C.accentBorder}`, borderRadius: 8, padding: "9px 14px", ...a(0.65) }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.accent, display: "inline-block", flexShrink: 0, animation: "breathe 2.4s ease-in-out infinite" }} />
            <span style={{ fontFamily: F.mono, fontSize: 10, color: C.accent, fontWeight: 500, letterSpacing: "0.02em" }}>{data.currentRole}</span>
          </div>

          {/* Decorative mini chart */}
          <div style={{ position: "absolute", bottom: "12%", right: "6%", pointerEvents: "none", ...a(0.8) }}>
            <DataViz />
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section aria-label="Key numbers" style={{ padding: "0 28px 80px" }}>
        <div style={{ maxWidth: 1040, margin: "0 auto" }}>
          <div className="stats-row">
            {data.stats.map((s, i) => <Stat key={s.label} {...s} last={i === data.stats.length - 1} />)}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section className="section" aria-label="Technical skills">
        <div style={{ maxWidth: 1040, margin: "0 auto" }}>
          <SectionMark n="01" label="TOOLKIT" />
          <h2 style={{ fontFamily: F.display, fontWeight: 600, fontSize: "clamp(28px,3.5vw,40px)", color: C.ink, marginBottom: 48, letterSpacing: "-0.02em" }}>Technical Skills</h2>
          <div className="skills-grid">
            {data.skills.map((s, i) => <SkillBar key={s.name} {...s} delay={i * 80} />)}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="work" className="section" aria-label="Selected projects">
        <div style={{ maxWidth: 1040, margin: "0 auto" }}>
          <SectionMark n="02" label="SELECTED WORK" />
          <h2 style={{ fontFamily: F.display, fontWeight: 600, fontSize: "clamp(28px,3.5vw,40px)", color: C.ink, marginBottom: 10, letterSpacing: "-0.02em" }}>My Work</h2>
          <p style={{ fontFamily: F.sans, fontSize: 15, color: C.muted, marginBottom: 44 }}>Dashboards, systems, and tools built for real programs.</p>
          <div className="proj-grid">
            {data.projects.map((p, i) => <ProjectCard key={p.title} p={p} i={i} featured={p.featured} />)}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="section" aria-label="Services">
        <div style={{ maxWidth: 1040, margin: "0 auto" }}>
          <SectionMark n="03" label="WHAT I OFFER" />
          <h2 style={{ fontFamily: F.display, fontWeight: 600, fontSize: "clamp(28px,3.5vw,40px)", color: C.ink, marginBottom: 10, letterSpacing: "-0.02em" }}>Services</h2>
          <p style={{ fontFamily: F.sans, fontSize: 15, color: C.muted, marginBottom: 44 }}>Available for freelance and consulting engagements.</p>
          <div className="srv-grid">
            {data.services.map((s, i) => {
              const IC = Icon[s.icon];
              return (
                <div key={s.title} className="srv-card">
                  <div style={{ width: 42, height: 42, borderRadius: 9, background: C.accentSoft, color: C.accent, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                    {IC && <IC s={20} />}
                  </div>
                  <h3 style={{ fontFamily: F.sans, fontWeight: 600, fontSize: 14, color: C.ink, marginBottom: 8, letterSpacing: "-0.01em" }}>{s.title}</h3>
                  <p style={{ fontFamily: F.sans, fontSize: 13, color: C.muted, lineHeight: 1.7 }}>{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── BLOG ── */}
      <section id="blog" className="section" aria-label="Writing">
        <div style={{ maxWidth: 1040, margin: "0 auto" }}>
          <SectionMark n="04" label="WRITING" />
          <h2 style={{ fontFamily: F.display, fontWeight: 600, fontSize: "clamp(28px,3.5vw,40px)", color: C.ink, marginBottom: 10, letterSpacing: "-0.02em" }}>Blog</h2>
          <p style={{ fontFamily: F.sans, fontSize: 15, color: C.muted, marginBottom: 44 }}>Articles on data, analytics, and building smarter systems.</p>
          <div className="blog-grid">
            {data.blogs.map((b, i) => <BlogCard key={b.title} b={b} i={i} />)}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="section" style={{ paddingBottom: 140 }} aria-label="Contact">
        <div style={{ maxWidth: 1040, margin: "0 auto" }}>
          <SectionMark n="05" label="LET'S WORK TOGETHER" />
          <h2 style={{ fontFamily: F.display, fontWeight: 600, fontSize: "clamp(38px,6.5vw,80px)", color: C.ink, marginBottom: 18, lineHeight: 1.0, letterSpacing: "-0.03em" }}>
            Got a project<br />
            <span style={{ color: C.accent }}>in mind</span><span style={{ color: C.gold }}>?</span>
          </h2>
          <p style={{ fontFamily: F.sans, fontSize: 16, color: C.muted, lineHeight: 1.8, maxWidth: 520, marginBottom: 48 }}>
            Looking to build a dashboard, automate your data pipeline, or design an M&amp;E system?
            I'm available for freelance and consulting work across Africa and beyond.
          </p>
          <div className="contact-row" style={{ marginBottom: 56 }}>
            <a href={`mailto:${data.email}`} className="pill-cta" style={{ fontSize: 14, padding: "11px 22px", textDecoration: "none" }}>
              <Icon.Mail s={15} /> Send an Email
            </a>
            <a href={`https://${data.linkedin}`} target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: F.sans, fontSize: 14, fontWeight: 500, color: C.muted, textDecoration: "none", border: `1.5px solid ${C.border}`, borderRadius: 999, padding: "11px 20px", background: "none", transition: "all 0.15s" }}
              onMouseEnter={e => { e.currentTarget.style.color = C.ink; e.currentTarget.style.borderColor = C.borderHi; }}
              onMouseLeave={e => { e.currentTarget.style.color = C.muted; e.currentTarget.style.borderColor = C.border; }}>
              <Icon.Linkedin s={15} /> LinkedIn <Icon.ArrowUpRight s={13} />
            </a>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {[["📍", "Kampala, Uganda"], ["🌍", "Open to Remote"], ["⚡", "Available Now"]].map(([ic, label]) => (
              <div key={label} style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "7px 14px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 7 }}>
                <span style={{ fontFamily: F.mono, fontSize: 10, color: C.dim, fontWeight: 500 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: `1px solid ${C.border}`, padding: "26px 28px", background: C.surface }}>
        <div className="footer-inner">
          <span style={{ fontFamily: F.display, fontWeight: 600, fontSize: 17, color: C.ink, letterSpacing: "-0.02em" }}>
            Mugume Martin<span style={{ color: C.gold }}>.</span>
          </span>
          <span style={{ fontFamily: F.mono, fontSize: 10, color: C.faint, letterSpacing: "0.04em" }}>
            &copy; 2025 — DATA ENGINEER &amp; INTELLIGENCE SPECIALIST
          </span>
        </div>
      </footer>
    </div>
  );
}
