"use client";
import { useState, useEffect, useRef, createContext, useContext } from "react";

/* ══════════════════════════════════════════════════════
   THEME SYSTEM
   ══════════════════════════════════════════════════════ */
const ThemeCtx = createContext();
const useTheme = () => useContext(ThemeCtx);

const themes = {
  dark: {
    bg: "#0A0A0A", bg2: "#111111", bg3: "#1A1A1A",
    t1: "#F5F0E8", t2: "#8A8478", t3: "#5A5650",
    g: "#C9A96E", gl: "#E2C992", gd: "#A68B4B",
    overlay: "rgba(10,10,10,", cardBorder: "0D", heroFilter: ".22", heroBright: ".65",
    navBg: "#0A0A0AF2", inputBg: "#1A1A1A",
    toggleBg: "#1A1A1A", toggleIcon: "☀",
  },
  light: {
    bg: "#FAF8F5", bg2: "#FFFFFF", bg3: "#F0EDE8",
    t1: "#1A1714", t2: "#5C564E", t3: "#8A847A",
    g: "#A68B4B", gl: "#C9A96E", gd: "#8A7339",
    overlay: "rgba(250,248,245,", cardBorder: "18", heroFilter: ".35", heroBright: ".55",
    navBg: "#FAF8F5F2", inputBg: "#F0EDE8",
    toggleBg: "#F0EDE8", toggleIcon: "☽",
  },
};

/* ── CURATED IMAGES ─────────────────────────────────── */
const IMG = {
  heroMain: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80",
  resHero: "https://images.unsplash.com/photo-1499793983394-12eeb592a825?w=1920&q=80",
  resPool: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=900&q=80",
  resBedroom: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=900&q=80",
  resBeach: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80",
  resSunset: "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=900&q=80",
  resTerrace: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80",
  resWellness: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=900&q=80",
  resFamily: "https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?w=900&q=80",
  elHero: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1920&q=80",
  elVilla: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=900&q=80",
  elDining: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80",
  elRetreat: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900&q=80",
  elNetwork: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=900&q=80",
  elOcean: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=900&q=80",
  elYoga: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=900&q=80",
  elKite: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=900&q=80",
  exHero: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80",
  exBoard: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80",
  exAerial: "https://images.unsplash.com/photo-1580541631950-7282082b53ce?w=900&q=80",
  exDev: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80",
  exHandshake: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&q=80",
  exSkyline: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80",
  exLobby: "https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=900&q=80",
  cabarete: "https://images.unsplash.com/photo-1580541631950-7282082b53ce?w=900&q=80",
  palmTrees: "https://images.unsplash.com/photo-1509233725247-49e657c54213?w=900&q=80",
  contactBg: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1920&q=80",
  applyBg: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
  concierge: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80",
  tropical: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=900&q=80",
  cocktail: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=900&q=80",
};

/* ── DYNAMIC CSS ─────────────────────────────────────── */
function buildCSS(th) {
  return `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Outfit:wght@200;300;400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{margin:0;background:${th.bg};overflow-x:hidden;transition:background .5s ease,color .5s ease}
::-webkit-scrollbar{width:5px}
::-webkit-scrollbar-track{background:${th.bg}}
::-webkit-scrollbar-thumb{background:${th.g}28;border-radius:3px}
::selection{background:${th.g}35;color:${th.t1}}
input,textarea,select{box-sizing:border-box}
img{max-width:100%;display:block}
a{color:inherit;text-decoration:none}

@keyframes fadeUp{from{opacity:0;transform:translateY(36px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes slideDown{from{transform:translateY(-80px)}to{transform:translateY(0)}}
@keyframes pulse{0%,100%{opacity:.5}50%{opacity:1}}
@keyframes scalePop{from{transform:scale(0)}to{transform:scale(1)}}

.fade-up{animation:fadeUp .85s cubic-bezier(.22,1,.36,1) both}
.fade-in{animation:fadeIn .7s ease both}
.slide-down{animation:slideDown .5s ease both}

.card-hover{transition:all .45s cubic-bezier(.22,1,.36,1)}
.card-hover:hover{transform:translateY(-6px);box-shadow:0 20px 60px ${th.overlay}.25)}

.img-zoom{overflow:hidden;border-radius:4px}
.img-zoom img{transition:transform .8s cubic-bezier(.22,1,.36,1)}
.img-zoom:hover img{transform:scale(1.05)}

.btn{font-family:'Outfit',sans-serif;font-weight:500;letter-spacing:.08em;text-transform:uppercase;cursor:pointer;border-radius:2px;display:inline-flex;align-items:center;justify-content:center;transition:all .4s cubic-bezier(.22,1,.36,1);font-size:12px;padding:16px 44px}
.btn-sm{font-size:11px;padding:12px 32px}
.btn-fill{background:linear-gradient(135deg,${th.gd},${th.g},${th.gl});color:#0A0A0A;border:none}
.btn-fill:hover{box-shadow:0 8px 32px ${th.g}30;transform:scale(1.03)}
.btn-out{background:transparent;color:${th.g};border:1px solid ${th.g}40}
.btn-out:hover{border-color:${th.g};transform:scale(1.03)}

.nav-link{background:none;border:none;cursor:pointer;font-family:'Outfit',sans-serif;font-size:11px;letter-spacing:.14em;text-transform:uppercase;font-weight:400;transition:color .3s;padding:0}
.nav-link:hover{color:${th.g}!important}

.inp{width:100%;padding:14px 16px;background:${th.inputBg};border:1px solid ${th.g}15;border-radius:2px;color:${th.t1};font-family:'Outfit',sans-serif;font-size:14px;font-weight:300;outline:none;transition:border .3s,background .5s}
.inp:focus{border-color:${th.g}50}

.mob-link{background:none;border:none;cursor:pointer;font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:300}

@media(max-width:768px){
  .desk-nav{display:none!important}
  .mob-btn{display:flex!important}
  .grid-r{grid-template-columns:1fr!important}
  .gal-r{grid-template-columns:1fr!important}
  .hero-t{font-size:36px!important}
  .stat-n{font-size:36px!important}
  .hide-m{display:none!important}
}
`;
}

/* ── REVEAL ON SCROLL ────────────────────────────────── */
function R({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.disconnect(); } }, { threshold: 0.06 });
    o.observe(el); return () => o.disconnect();
  }, []);
  return <div ref={ref} className={v ? "fade-up" : ""} style={{ opacity: v ? undefined : 0, animationDelay: `${delay}s`, ...style }}>{children}</div>;
}

/* ── ATOMS ────────────────────────────────────────────── */
const fd = { fontFamily: "'Cormorant Garamond',serif" };
const fb = { fontFamily: "'Outfit',sans-serif" };

function Btn({ children, onClick, outline, sm, full }) {
  return <button className={`btn ${sm ? "btn-sm" : ""} ${outline ? "btn-out" : "btn-fill"}`} onClick={onClick} style={full ? { width: "100%" } : {}}>{children}</button>;
}

function Label({ children, center }) {
  const th = useTheme();
  return <div style={{ ...fb, fontSize: 11, letterSpacing: ".25em", textTransform: "uppercase", color: th.g, marginBottom: 14, fontWeight: 500, textAlign: center ? "center" : undefined }}>{children}</div>;
}

function Title({ children, center }) {
  const th = useTheme();
  return <h2 className="hero-t" style={{ ...fd, fontSize: "clamp(30px,5vw,56px)", fontWeight: 300, color: th.t1, lineHeight: 1.1, margin: "0 0 20px", textAlign: center ? "center" : undefined, transition: "color .5s" }}>{children}</h2>;
}

function Body({ children, center, style: s = {} }) {
  const th = useTheme();
  return <p style={{ ...fb, fontSize: 15, color: th.t2, lineHeight: 1.8, fontWeight: 300, textAlign: center ? "center" : undefined, transition: "color .5s", ...s }}>{children}</p>;
}

function Divider() {
  const th = useTheme();
  return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "64px 0" }}>
    <div style={{ width: 50, height: 1, background: `linear-gradient(to right,transparent,${th.g}35)` }} />
    <div style={{ width: 6, height: 6, background: th.g, transform: "rotate(45deg)", margin: "0 14px" }} />
    <div style={{ width: 50, height: 1, background: `linear-gradient(to left,transparent,${th.g}35)` }} />
  </div>;
}

function GImg({ src, alt, aspect = "16/10" }) {
  return <div className="img-zoom" style={{ border: `1px solid ${useTheme().g}0A` }}>
    <img src={src} alt={alt || ""} style={{ width: "100%", aspectRatio: aspect, objectFit: "cover" }} loading="lazy" />
  </div>;
}

function Stat({ num, label }) {
  const th = useTheme();
  return <div style={{ textAlign: "center" }}>
    <div className="stat-n" style={{ ...fd, fontSize: "clamp(36px,5vw,52px)", fontWeight: 300, color: th.g, lineHeight: 1 }}>{num}</div>
    <div style={{ ...fb, fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: th.t3, fontWeight: 500, marginTop: 6 }}>{label}</div>
  </div>;
}

function FeatRow({ icon, title, desc }) {
  const th = useTheme();
  return <div style={{ display: "flex", gap: 20, alignItems: "flex-start", padding: "24px 0", borderBottom: `1px solid ${th.g}08` }}>
    <div style={{ ...fd, fontSize: 28, color: th.g, flexShrink: 0, width: 40, textAlign: "center", marginTop: 2 }}>{icon}</div>
    <div>
      <h4 style={{ ...fd, fontSize: 22, fontWeight: 500, color: th.t1, marginBottom: 6, transition: "color .5s" }}>{title}</h4>
      <p style={{ ...fb, fontSize: 14, color: th.t2, lineHeight: 1.7, fontWeight: 300, transition: "color .5s" }}>{desc}</p>
    </div>
  </div>;
}

function Quote({ text, name, role }) {
  const th = useTheme();
  return <div style={{ background: th.bg2, border: `1px solid ${th.g}${th.cardBorder}`, borderRadius: 4, padding: "32px 28px", transition: "background .5s, border .5s" }}>
    <div style={{ ...fd, fontSize: 20, fontWeight: 400, color: th.t1, lineHeight: 1.6, fontStyle: "italic", marginBottom: 20, transition: "color .5s" }}>"{text}"</div>
    <div style={{ ...fb, fontSize: 12, color: th.g, fontWeight: 500, letterSpacing: ".1em", textTransform: "uppercase" }}>{name}</div>
    <div style={{ ...fb, fontSize: 12, color: th.t3, fontWeight: 300, marginTop: 2, transition: "color .5s" }}>{role}</div>
  </div>;
}

function Field({ label, type = "text", value, onChange, placeholder, options, rows }) {
  const th = useTheme();
  return <div style={{ marginBottom: 18 }}>
    <label style={{ display: "block", ...fb, fontSize: 10, letterSpacing: ".15em", textTransform: "uppercase", color: th.t2, marginBottom: 7, fontWeight: 500 }}>{label}</label>
    {type === "select" ? <select className="inp" value={value} onChange={onChange} style={{ cursor: "pointer" }}><option value="" style={{ background: th.bg }}>Select…</option>{options?.map(o => <option key={o} value={o} style={{ background: th.bg }}>{o}</option>)}</select>
    : type === "textarea" ? <textarea className="inp" value={value} onChange={onChange} placeholder={placeholder} rows={rows || 4} style={{ resize: "vertical", minHeight: 100 }} />
    : <input className="inp" type={type} value={value} onChange={onChange} placeholder={placeholder} />}
  </div>;
}

/* ── PAGE HERO ────────────────────────────────────────── */
function PageHero({ label, title, sub, img, price, priceNote, children }) {
  const th = useTheme();
  return <div style={{ position: "relative", minHeight: "85vh", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
    <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${img})`, backgroundSize: "cover", backgroundPosition: "center", filter: `brightness(${th.heroFilter}) saturate(${th.heroBright})`, transition: "filter .5s" }} />
    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg,${th.overlay}.7) 0%,transparent 35%,${th.overlay}.5) 70%,${th.bg} 100%)`, transition: "background .5s" }} />
    <div style={{ position: "absolute", top: 0, left: "50%", width: 1, height: 140, background: `linear-gradient(to bottom,${th.g}50,transparent)` }} />
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: `linear-gradient(to right,transparent,${th.g}20,transparent)` }} />
    <div style={{ position: "relative", zIndex: 2, maxWidth: 900, padding: "160px 24px 80px", margin: "0 auto", width: "100%", textAlign: "center" }}>
      <div className="fade-up" style={{ animationDelay: ".2s" }}><Label center>{label}</Label></div>
      <h1 className="fade-up hero-t" style={{ animationDelay: ".35s", ...fd, fontSize: "clamp(38px,7vw,76px)", fontWeight: 300, color: th.t1, lineHeight: 1.05, margin: "0 0 24px" }}>{title}</h1>
      {price && <div className="fade-up" style={{ animationDelay: ".5s", display: "flex", alignItems: "baseline", justifyContent: "center", gap: 8, marginBottom: 8 }}>
        <span style={{ ...fd, fontSize: "clamp(42px,6vw,64px)", fontWeight: 300, color: th.g }}>{price}</span>
        {priceNote && <span style={{ ...fb, fontSize: 14, color: th.t2, fontWeight: 300 }}>{priceNote}</span>}
      </div>}
      <div className="fade-up" style={{ animationDelay: ".55s" }}><Body center style={{ maxWidth: 560, margin: "0 auto 40px" }}>{sub}</Body></div>
      <div className="fade-up" style={{ animationDelay: ".7s" }}>{children}</div>
    </div>
  </div>;
}

/* ── IMAGE BAND (full-width strip of images) ─────────── */
function ImageBand({ images, height = 260 }) {
  return <div style={{ display: "flex", gap: 4, overflow: "hidden", width: "100%" }}>
    {images.map((src, i) => <div key={i} className="img-zoom" style={{ flex: 1, minWidth: 0, height, borderRadius: 0 }}>
      <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
    </div>)}
  </div>;
}

/* ══════════════════════════════════════════════════════
   HOME
   ══════════════════════════════════════════════════════ */
function Home({ go }) {
  const th = useTheme();
  return <>
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${IMG.heroMain})`, backgroundSize: "cover", backgroundPosition: "center", filter: `brightness(${th.heroFilter}) saturate(${th.heroBright})`, transition: "filter .5s" }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg,${th.overlay}.5) 0%,transparent 30%,${th.overlay}.85) 75%,${th.bg} 100%)`, transition: "background .5s" }} />
      <div style={{ position: "absolute", top: 0, left: "50%", width: 1, height: 120, background: `linear-gradient(to bottom,${th.g}50,transparent)` }} />
      <div style={{ position: "relative", zIndex: 2, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 24px" }}>
        <div className="fade-up" style={{ animationDelay: ".3s", ...fb, fontSize: 11, letterSpacing: ".3em", textTransform: "uppercase", color: th.g, marginBottom: 22, fontWeight: 400 }}>El Kaoba Private Residency & Capital Circle™</div>
        <h1 className="fade-up hero-t" style={{ animationDelay: ".5s", ...fd, fontSize: "clamp(38px,7vw,78px)", fontWeight: 300, color: th.t1, lineHeight: 1.04, margin: "0 0 26px", maxWidth: 880 }}>
          Own a Caribbean<br /><span style={{ color: th.g, fontStyle: "italic" }}>Home Base.</span><br />Access Opportunity.
        </h1>
        <p className="fade-up" style={{ animationDelay: ".7s", ...fb, fontSize: 16, color: th.t2, lineHeight: 1.8, maxWidth: 520, marginBottom: 48, fontWeight: 300 }}>
          Private residency and investor access program in Cabarete, Dominican Republic. Lifestyle memberships from $7,500.
        </p>
        <div className="fade-up" style={{ animationDelay: ".9s", display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
          <Btn onClick={() => go("residency")}>Explore Memberships</Btn>
          <Btn outline onClick={() => go("apply")}>Apply for Executive Circle</Btn>
        </div>
        <div style={{ position: "absolute", bottom: 44, width: 1, height: 44, background: `linear-gradient(to bottom,${th.g}50,transparent)`, animation: "pulse 2.5s infinite" }} />
      </div>
    </div>

    {/* IMAGE BAND */}
    <ImageBand images={[IMG.resPool, IMG.elDining, IMG.palmTrees, IMG.elKite]} height={220} />

    {/* VALUE PROPS */}
    <section style={{ padding: "100px 24px", maxWidth: 1160, margin: "0 auto" }}>
      <R><div style={{ textAlign: "center", marginBottom: 64 }}><Label center>Why El Kaoba</Label><Title center>A New Model for Caribbean Living</Title></div></R>
      <div className="grid-r" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 20 }}>
        {[
          { i: "◆", t: "No Property Purchase", d: "Access luxury living without the complexity of ownership, management, or maintenance.", img: IMG.resTerrace },
          { i: "◈", t: "Guaranteed Stays", d: "Secured nights every year with flexible scheduling and priority booking.", img: IMG.resBeach },
          { i: "◇", t: "Full Concierge", d: "White glove service — transfers, dining, activities, wellness, and local expertise.", img: IMG.concierge },
          { i: "◊", t: "Investment Access", d: "Optional pathway to DR real estate markets, networks, and business opportunity.", img: IMG.exAerial },
        ].map((x, i) => <R key={i} delay={i * .08}>
          <div className="card-hover" style={{ background: th.bg2, border: `1px solid ${th.g}${th.cardBorder}`, borderRadius: 4, overflow: "hidden", transition: "all .45s" }}>
            <div className="img-zoom" style={{ height: 160, borderRadius: 0 }}><img src={x.img} alt={x.t} style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" /></div>
            <div style={{ padding: "28px 24px" }}>
              <h3 style={{ ...fd, fontSize: 22, fontWeight: 500, color: th.t1, marginBottom: 10, transition: "color .5s" }}>{x.t}</h3>
              <Body>{x.d}</Body>
            </div>
          </div>
        </R>)}
      </div>
    </section>

    <Divider />

    {/* TIERS */}
    <section style={{ padding: "0 24px 100px", maxWidth: 1160, margin: "0 auto" }}>
      <R><div style={{ textAlign: "center", marginBottom: 64 }}><Label center>Membership Tiers</Label><Title center>Choose Your Level of Access</Title></div></R>
      <div className="grid-r" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 20 }}>
        {[
          { tier: "Residency Member", price: "$7,500", pd: "one-time", nights: "14 nights/year", best: "Lifestyle seekers", feat: ["14 nights (210 total)", "Flexible scheduling", "Giftable nights", "VIP arrival", "Concierge", "Community events"], page: "residency", img: IMG.resPool },
          { tier: "Elite Residency Owner", price: "$10,000", pd: "one-time", nights: "30 nights/year", best: "Lifestyle + Network", feat: ["30 nights per year", "50% off extra rooms", "White glove concierge", "Host retreats", "Network access", "Priority booking"], page: "elite", pop: true, img: IMG.elVilla },
          { tier: "Executive Capital Circle", price: "$15,000", pd: "/year", nights: "Up to 20 days/year", best: "Investors & Operators", feat: ["Application required", "Market immersion", "Investor gatherings", "Direct intros", "Strategy sessions", "Investment guidance"], page: "executive", img: IMG.exBoard },
        ].map((m, i) => <R key={i} delay={i * .1}>
          <div className="card-hover" style={{ background: m.pop ? `linear-gradient(180deg,${th.bg3},${th.bg2})` : th.bg2, border: `1px solid ${m.pop ? th.g + "28" : th.g + th.cardBorder}`, borderRadius: 4, overflow: "hidden", position: "relative", transition: "all .45s" }}>
            <div className="img-zoom" style={{ height: 180, borderRadius: 0 }}><img src={m.img} alt={m.tier} style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" /></div>
            {m.pop && <div style={{ position: "absolute", top: 14, right: 14, background: `${th.g}1A`, color: th.g, ...fb, fontSize: 9, letterSpacing: ".14em", textTransform: "uppercase", padding: "4px 12px", borderRadius: 2, fontWeight: 500, backdropFilter: "blur(8px)" }}>Most Popular</div>}
            <div style={{ padding: "28px 24px" }}>
              <div style={{ ...fb, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: th.g, marginBottom: 14, fontWeight: 500 }}>{m.tier}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 6 }}>
                <span style={{ ...fd, fontSize: 46, fontWeight: 300, color: th.t1, transition: "color .5s" }}>{m.price}</span>
                <span style={{ ...fb, fontSize: 13, color: th.t2, fontWeight: 300 }}>{m.pd}</span>
              </div>
              <div style={{ ...fb, fontSize: 13, color: th.t2, marginBottom: 6, fontWeight: 300 }}>{m.nights}</div>
              <div style={{ ...fb, fontSize: 12, color: th.g, marginBottom: 24, fontWeight: 400 }}>Best for: {m.best}</div>
              <div style={{ borderTop: `1px solid ${th.g}0D`, paddingTop: 20, marginBottom: 24 }}>
                {m.feat.map((f, fi) => <div key={fi} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 9 }}>
                  <span style={{ color: th.g, fontSize: 8 }}>✦</span>
                  <span style={{ ...fb, fontSize: 13, color: th.t2, fontWeight: 300 }}>{f}</span>
                </div>)}
              </div>
              <Btn outline={!m.pop} onClick={() => go(m.page)} full>Learn More</Btn>
            </div>
          </div>
        </R>)}
      </div>
    </section>

    <ImageBand images={[IMG.tropical, IMG.resSunset, IMG.cocktail]} height={200} />

    <Divider />

    {/* LOCATION */}
    <section style={{ padding: "0 24px 100px", maxWidth: 1160, margin: "0 auto" }}>
      <div className="grid-r" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
        <R><div>
          <Label>The Location</Label><Title>Cabarete, Dominican Republic</Title>
          <Body style={{ marginBottom: 32 }}>Nestled on the Atlantic coast, Cabarete combines world-class beaches with a thriving international community. Tourism is surging, investment is growing, and the lifestyle is unmatched in the Caribbean.</Body>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {[{ v: "World-class", l: "Beach Lifestyle" }, { v: "60+", l: "Nationalities" }, { v: "12%", l: "Tourism Growth/yr" }, { v: "15 min", l: "To POP Airport" }].map((s, i) =>
              <div key={i}><div style={{ ...fd, fontSize: 22, fontWeight: 500, color: th.g, marginBottom: 3 }}>{s.v}</div><div style={{ ...fb, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: th.t3, fontWeight: 400 }}>{s.l}</div></div>
            )}
          </div>
        </div></R>
        <R delay={.12}>
          <div style={{ display: "grid", gap: 12 }}>
            <GImg src={IMG.cabarete} alt="Cabarete coast" aspect="16/9" />
            <div className="gal-r" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <GImg src={IMG.palmTrees} alt="Palm trees" aspect="1/1" />
              <GImg src={IMG.elKite} alt="Kitesurfing" aspect="1/1" />
            </div>
          </div>
        </R>
      </div>
    </section>

    {/* CTA */}
    <section style={{ position: "relative", padding: "120px 24px", textAlign: "center", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${IMG.elOcean})`, backgroundSize: "cover", backgroundPosition: "center", filter: `brightness(.12) saturate(.5)` }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg,${th.bg} 0%,transparent 25%,transparent 75%,${th.bg} 100%)` }} />
      <R><div style={{ position: "relative", zIndex: 2 }}>
        <Label center>Founders Program</Label><Title center>Limited Founders Memberships Available</Title>
        <Body center style={{ maxWidth: 480, margin: "0 auto 40px" }}>Early members lock in founding rates, priority booking, and permanent recognition in the El Kaoba community.</Body>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <Btn onClick={() => go("residency")}>View Memberships</Btn>
          <Btn outline onClick={() => go("apply")}>Apply Now</Btn>
        </div>
      </div></R>
    </section>
  </>;
}

/* ══════════════════════════════════════════════════════
   RESIDENCY — $7,500
   ══════════════════════════════════════════════════════ */
function Residency({ go }) {
  const th = useTheme();
  return <>
    <PageHero label="Residency Membership" title="Your Caribbean Home Base" price="$7,500" priceNote="one-time · founders rate" sub="14 guaranteed nights per year of luxury Caribbean living in Cabarete. No property purchase. No complexity. Just the lifestyle you've been looking for." img={IMG.resHero}>
      <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
        <Btn onClick={() => go("contact")}>Secure Founders Membership</Btn>
        <Btn outline onClick={() => go("contact")}>Schedule a Call</Btn>
      </div>
    </PageHero>
    <div style={{ background: th.bg2, borderBottom: `1px solid ${th.g}${th.cardBorder}`, padding: "48px 24px", transition: "background .5s" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 32 }}>
        <Stat num="14" label="Nights Per Year" /><Stat num="210" label="Total Nights" /><Stat num="15" label="Year Term" /><Stat num="$36" label="Per Night Value" />
      </div>
    </div>
    <ImageBand images={[IMG.resPool, IMG.resBedroom, IMG.resBeach, IMG.resSunset]} height={240} />
    <section style={{ padding: "80px 24px", maxWidth: 900, margin: "0 auto" }}>
      <R><Label center>The Residency Experience</Label><Title center>More Than Vacation. Your Second Home.</Title><Body center style={{ maxWidth: 620, margin: "0 auto 56px" }}>Every detail is curated to make you feel at home. This isn't a hotel — it's your personal Caribbean retreat, ready whenever you are.</Body></R>
      <R delay={.1}>
        <FeatRow icon="☀" title="14 Nights Per Year, Your Way" desc="Block them for a two-week immersion, split across seasons, or mix and match. Over the 15-year term, that's 210 total nights of Caribbean living." />
        <FeatRow icon="↔" title="Flexible Scheduling" desc="Book through our member portal with priority windows for founders. Peak season energy, shoulder season peace, or rainy season adventure." />
        <FeatRow icon="♡" title="Giftable Nights" desc="Not using all your nights? Gift them to family, friends, or colleagues. A few nights in paradise is the most memorable gift you'll ever give." />
        <FeatRow icon="★" title="VIP Arrival Experience" desc="Private airport transfer, welcome package, cold beverages, local treats, and a personal orientation to settle you in immediately." />
        <FeatRow icon="◆" title="Personal Concierge" desc="Restaurant reservations, kitesurfing lessons, deep-sea fishing, spa appointments, waterfall tours — whatever your day calls for." />
        <FeatRow icon="∞" title="Community & Events" desc="Sunset gatherings, beach dinners, cultural outings, and seasonal celebrations with fellow members." />
      </R>
    </section>
    <Divider />
    <section style={{ padding: "0 24px 100px", maxWidth: 1100, margin: "0 auto" }}>
      <div className="grid-r" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>
        <R><div style={{ display: "grid", gap: 12 }}>
          <GImg src={IMG.resTerrace} alt="Villa terrace" aspect="16/11" />
          <div className="gal-r" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <GImg src={IMG.resWellness} alt="Wellness" aspect="1/1" />
            <GImg src={IMG.resFamily} alt="Family resort" aspect="1/1" />
          </div>
        </div></R>
        <R delay={.1}>
          <Label>Who It's For</Label><Title>Families. Couples. Digital Nomads.</Title>
          <Body style={{ marginBottom: 28 }}>The Residency Membership is designed for people who want consistent Caribbean access without the six-figure commitment of buying property.</Body>
          <div style={{ display: "grid", gap: 16 }}>
            <Quote text="We've spent three Christmases in Cabarete. The kids talk about it year-round. It feels like our place." name="The Martinez Family" role="Founders Members since 2024" />
            <Quote text="Two weeks in Cabarete recharges me more than any vacation ever did. I run my whole consultancy from there." name="Rachel C." role="Digital Nomad & Member" />
          </div>
        </R>
      </div>
    </section>
    <section style={{ position: "relative", padding: "100px 24px", textAlign: "center", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${IMG.palmTrees})`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(.13) saturate(.5)" }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg,${th.bg} 0%,transparent 25%,transparent 75%,${th.bg} 100%)` }} />
      <R><div style={{ position: "relative", zIndex: 2 }}>
        <Label center>Founders Pricing</Label><Title center>$7,500 One-Time. 14 Nights Every Year.</Title>
        <Body center style={{ maxWidth: 500, margin: "0 auto 40px" }}>Founders memberships are limited. Lock in your rate before availability closes.</Body>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}><Btn onClick={() => go("contact")}>Secure Your Membership</Btn><Btn outline onClick={() => go("contact")}>Ask a Question</Btn></div>
      </div></R>
    </section>
  </>;
}

/* ══════════════════════════════════════════════════════
   ELITE — $10,000
   ══════════════════════════════════════════════════════ */
function Elite({ go }) {
  const th = useTheme();
  return <>
    <PageHero label="Elite Residency Owner" title="Live More. Connect Deeper." price="$10,000" priceNote="one-time · founders rate" sub="30 nights per year, expanded privileges, and access to a network of developers, operators, and business owners in the Dominican Republic." img={IMG.elHero}>
      <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}><Btn onClick={() => go("contact")}>Become an Elite Member</Btn><Btn outline onClick={() => go("contact")}>Schedule a Call</Btn></div>
    </PageHero>
    <div style={{ background: th.bg2, borderBottom: `1px solid ${th.g}${th.cardBorder}`, padding: "48px 24px", transition: "background .5s" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 32 }}>
        <Stat num="30" label="Nights Per Year" /><Stat num="50%" label="Off Extra Rooms" /><Stat num="450" label="Total Nights" /><Stat num="$22" label="Per Night Value" />
      </div>
    </div>
    <ImageBand images={[IMG.elVilla, IMG.elDining, IMG.elRetreat, IMG.elYoga]} height={240} />
    <section style={{ padding: "80px 24px", maxWidth: 900, margin: "0 auto" }}>
      <R><Label center>Elite Privileges</Label><Title center>Everything in Residency — Plus Much More.</Title><Body center style={{ maxWidth: 620, margin: "0 auto 56px" }}>The Elite tier unlocks the full depth of El Kaoba. More time, more access, more connection — designed for members who want to build something in the Caribbean.</Body></R>
      <R delay={.1}>
        <FeatRow icon="◈" title="30 Nights Per Year" desc="A full month every year. Settle in, build routines, make friends, and truly experience Caribbean life. 450 nights over 15 years." />
        <FeatRow icon="½" title="50% Off Additional Rooms" desc="Group trips, extended family, team retreats — book additional rooms at half the standard rate." />
        <FeatRow icon="★" title="White Glove Concierge" desc="Private chef dinners, exclusive excursions, yacht arrangements, bespoke wellness programs." />
        <FeatRow icon="⌂" title="Host Retreats & Gatherings" desc="Professional retreats, creative workshops, wellness intensives, or milestone celebrations. We handle logistics." />
        <FeatRow icon="∞" title="Local Network Access" desc="Curated network of developers, operators, attorneys, architects building the future of North Coast DR." />
        <FeatRow icon="◆" title="Priority Booking & New Properties" desc="First access to peak dates, best units, and best rates as El Kaoba expands." />
      </R>
    </section>
    <Divider />
    <section style={{ padding: "0 24px 100px", maxWidth: 1100, margin: "0 auto" }}>
      <div className="grid-r" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>
        <R delay={.05}><div>
          <Label>The Network</Label><Title>Your Circle in the Caribbean</Title>
          <Body style={{ marginBottom: 28 }}>Elite members are part of a community who see the DR as more than a vacation destination. Expect introductions, collaborations, and friendships that create real value.</Body>
          <div style={{ display: "grid", gap: 16 }}>
            <Quote text="Through the Elite network, I met a developer who became my JV partner on a 12-unit project. That one intro paid for my membership ten times over." name="James K." role="Real Estate Investor" />
            <Quote text="I hosted a leadership retreat for my team. The concierge handled everything. Still our best offsite ever." name="Priya S." role="CEO, Tech Startup" />
          </div>
        </div></R>
        <R><div style={{ display: "grid", gap: 12 }}>
          <GImg src={IMG.elNetwork} alt="Networking" aspect="16/11" />
          <div className="gal-r" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <GImg src={IMG.elOcean} alt="Ocean" aspect="1/1" />
            <GImg src={IMG.elKite} alt="Activities" aspect="1/1" />
          </div>
        </div></R>
      </div>
    </section>
    <section style={{ position: "relative", padding: "100px 24px", textAlign: "center", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${IMG.tropical})`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(.12) saturate(.5)" }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg,${th.bg} 0%,transparent 25%,transparent 75%,${th.bg} 100%)` }} />
      <R><div style={{ position: "relative", zIndex: 2 }}>
        <Label center>Founders Pricing</Label><Title center>$10,000 One-Time. 30 Nights Every Year.</Title>
        <Body center style={{ maxWidth: 520, margin: "0 auto 40px" }}>The Elite tier is for people serious about Caribbean life. Lock in your founders rate before it closes.</Body>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}><Btn onClick={() => go("contact")}>Become an Elite Member</Btn><Btn outline onClick={() => go("home")}>Compare All Tiers</Btn></div>
      </div></R>
    </section>
  </>;
}

/* ══════════════════════════════════════════════════════
   EXECUTIVE — $15K/YR
   ══════════════════════════════════════════════════════ */
function Executive({ go }) {
  const th = useTheme();
  return <>
    <PageHero label="Executive Capital Circle™" title="Where Capital Meets Caribbean." price="$15,000" priceNote="/year · application required" sub="An exclusive investor program providing direct access to Dominican Republic real estate markets, vetted operators, and curated deal flow. Limited to 25 members." img={IMG.exHero}>
      <Btn onClick={() => go("apply")}>Apply for Executive Capital Circle</Btn>
    </PageHero>
    <div style={{ background: `linear-gradient(90deg,transparent,${th.g}08,transparent)`, borderTop: `1px solid ${th.g}18`, borderBottom: `1px solid ${th.g}18`, padding: 24 }}>
      <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", justifyContent: "center", gap: 28, flexWrap: "wrap" }}>
        {["Application Required", "Limited to 25 Members", "Annual Commitment", "Vetted Community"].map((t, i) =>
          <div key={i} style={{ ...fb, fontSize: 10, letterSpacing: ".16em", textTransform: "uppercase", color: th.g, fontWeight: 500, display: "flex", alignItems: "center", gap: 8 }}><span style={{ fontSize: 6 }}>◆</span>{t}</div>
        )}
      </div>
    </div>
    <div style={{ background: th.bg2, borderBottom: `1px solid ${th.g}${th.cardBorder}`, padding: "48px 24px", transition: "background .5s" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 32 }}>
        <Stat num="20" label="Days Per Year" /><Stat num="25" label="Max Members" /><Stat num="4" label="Quarterly Events" /><Stat num="1:1" label="Strategy Sessions" />
      </div>
    </div>
    <ImageBand images={[IMG.exBoard, IMG.exAerial, IMG.exDev, IMG.exHandshake]} height={240} />
    <section style={{ padding: "80px 24px", maxWidth: 900, margin: "0 auto" }}>
      <R><Label center>What You Get</Label><Title center>Complete Investor Immersion</Title><Body center style={{ maxWidth: 640, margin: "0 auto 56px" }}>The Capital Circle places you at the center of DR opportunity with the people, intel, and access to move with confidence.</Body></R>
      <R delay={.1}>
        <FeatRow icon="⊕" title="Up to 20 Days Residency" desc="Stay in premium Cabarete accommodations during immersion trips, gatherings, and exploration periods." />
        <FeatRow icon="◈" title="Market Immersion & Project Tours" desc="Walk active construction sites. Tour completed developments. Sit in on briefings with developers. See the numbers firsthand." />
        <FeatRow icon="⬡" title="Quarterly Investor Gatherings" desc="Four times a year — deal reviews, market updates, networking dinners, and collaborative strategy sessions." />
        <FeatRow icon="→" title="Direct Introductions" desc="Warm intros to vetted developers, attorneys, architects, and property managers building in the DR." />
        <FeatRow icon="◆" title="One-on-One Strategy Sessions" desc="Advisory conversations to align your investment thesis with live market conditions." />
        <FeatRow icon="∞" title="Investment Pathway Guidance" desc="Entity formation, due diligence checklists, financing options, tax considerations, and exit strategies." />
      </R>
    </section>
    <Divider />
    <section style={{ padding: "0 24px 100px", maxWidth: 1100, margin: "0 auto" }}>
      <R><div style={{ textAlign: "center", marginBottom: 64 }}><Label center>The Process</Label><Title center>How It Works</Title></div></R>
      <div className="grid-r" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 24 }}>
        {[
          { n: "01", t: "Apply", d: "Submit your application. We review every one within 48 hours.", img: IMG.applyBg },
          { n: "02", t: "Interview", d: "Brief conversation to understand your objectives and timeline.", img: IMG.exLobby },
          { n: "03", t: "Welcome", d: "Onboarding materials, network directory, and first immersion scheduling.", img: IMG.concierge },
          { n: "04", t: "Immerse", d: "Arrive in Cabarete. Tour projects. Meet operators. Build your thesis.", img: IMG.exAerial },
        ].map((s, i) => <R key={i} delay={i * .08}>
          <div className="card-hover" style={{ background: th.bg2, border: `1px solid ${th.g}${th.cardBorder}`, borderRadius: 4, overflow: "hidden", transition: "all .45s" }}>
            <div className="img-zoom" style={{ height: 140, borderRadius: 0 }}><img src={s.img} alt={s.t} style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" /></div>
            <div style={{ padding: "24px 20px" }}>
              <div style={{ ...fd, fontSize: 42, fontWeight: 300, color: `${th.g}30`, marginBottom: 10, lineHeight: 1 }}>{s.n}</div>
              <h4 style={{ ...fd, fontSize: 24, fontWeight: 500, color: th.t1, marginBottom: 10, transition: "color .5s" }}>{s.t}</h4>
              <Body>{s.d}</Body>
            </div>
          </div>
        </R>)}
      </div>
    </section>
    <Divider />
    <section style={{ padding: "0 24px 100px", maxWidth: 1100, margin: "0 auto" }}>
      <div className="grid-r" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>
        <R><div style={{ display: "grid", gap: 12 }}><GImg src={IMG.exSkyline} alt="Investment" aspect="16/10" /><GImg src={IMG.exLobby} alt="Premium" aspect="16/10" /></div></R>
        <R delay={.1}><div>
          <Label>The Circle</Label><Title>Who Belongs Here</Title>
          <Body style={{ marginBottom: 28 }}>Capital Circle members are investors and professionals who bring capital, expertise, and intention — and expect the same from everyone in the room.</Body>
          <div style={{ display: "grid", gap: 16 }}>
            <Quote text="Within my first quarter, three viable deals on my desk and the local counsel to evaluate them. This compressed years of relationship-building." name="David L." role="Private Equity" />
            <Quote text="I've invested internationally for 15 years. The Capital Circle gave me the local intelligence I was missing." name="Sandra M." role="Family Office Principal" />
          </div>
        </div></R>
      </div>
    </section>
    <section style={{ position: "relative", padding: "100px 24px", textAlign: "center", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${IMG.exHero})`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(.1) saturate(.4)" }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg,${th.bg} 0%,transparent 25%,transparent 75%,${th.bg} 100%)` }} />
      <R><div style={{ position: "relative", zIndex: 2 }}>
        <Label center>By Application Only</Label><Title center>$15,000/Year. 25 Members. Unlimited Upside.</Title>
        <Body center style={{ maxWidth: 520, margin: "0 auto 40px" }}>Ready to move beyond tourism into real DR investment? Apply today.</Body>
        <Btn onClick={() => go("apply")}>Apply for Executive Capital Circle</Btn>
      </div></R>
    </section>
  </>;
}

/* ═══ APPLICATION ═════════════════════════════════════ */
function Apply({ go }) {
  const th = useTheme();
  const [done, setDone] = useState(false);
  const [f, sf] = useState({ name: "", email: "", phone: "", country: "", occ: "", exp: "", interest: "", range: "" });
  const u = k => e => sf(p => ({ ...p, [k]: e.target.value }));
  if (done) return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "120px 24px" }}>
    <div className="fade-up"><div style={{ ...fd, fontSize: 48, color: th.g, marginBottom: 22 }}>◆</div><Title center>Application Received</Title><Body center style={{ maxWidth: 460, margin: "0 auto 32px" }}>Our team will review your application within 48 hours.</Body><Btn onClick={() => go("home")}>Return Home</Btn></div>
  </div>;
  return <>
    <PageHero label="Executive Capital Circle" title="Apply for Membership" sub="All applications reviewed within 48 hours." img={IMG.applyBg} />
    <section style={{ padding: "72px 24px", maxWidth: 640, margin: "0 auto" }}>
      <R><div style={{ background: th.bg2, border: `1px solid ${th.g}${th.cardBorder}`, borderRadius: 4, padding: "48px 36px", transition: "background .5s" }}>
        <div className="grid-r" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 18px" }}>
          <Field label="Full Name" value={f.name} onChange={u("name")} placeholder="Your full name" />
          <Field label="Email" type="email" value={f.email} onChange={u("email")} placeholder="you@email.com" />
          <Field label="Phone" type="tel" value={f.phone} onChange={u("phone")} placeholder="+1 (000) 000-0000" />
          <Field label="Country" value={f.country} onChange={u("country")} placeholder="Where are you based?" />
        </div>
        <Field label="Occupation" value={f.occ} onChange={u("occ")} placeholder="Your current role" />
        <Field label="Investment Experience" type="select" value={f.exp} onChange={u("exp")} options={["New to investing", "Some (1-5 years)", "Experienced (5-10 years)", "Professional (10+ years)"]} />
        <Field label="Interest in the DR" type="textarea" value={f.interest} onChange={u("interest")} placeholder="What draws you to the Dominican Republic?" />
        <Field label="Annual Investment Range" type="select" value={f.range} onChange={u("range")} options={["$10K–$50K", "$50K–$150K", "$150K–$500K", "$500K–$1M", "$1M+"]} />
        <div style={{ marginTop: 16 }}><Btn onClick={() => setDone(true)} full>Submit Application</Btn></div>
      </div></R>
    </section>
  </>;
}

/* ═══ CONTACT ════════════════════════════════════════ */
function Contact({ go }) {
  const th = useTheme();
  const [done, setDone] = useState(false);
  const [f, sf] = useState({ name: "", email: "", msg: "" });
  const u = k => e => sf(p => ({ ...p, [k]: e.target.value }));
  if (done) return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "120px 24px" }}>
    <div className="fade-up"><div style={{ ...fd, fontSize: 48, color: th.g, marginBottom: 22 }}>◆</div><Title center>Message Sent</Title><Body center>We'll get back to you shortly.</Body></div>
  </div>;
  return <>
    <PageHero label="Get in Touch" title="Let's Talk" sub="Questions about membership, investment, or Cabarete?" img={IMG.contactBg} />
    <section style={{ padding: "72px 24px", maxWidth: 900, margin: "0 auto" }}>
      <div className="grid-r" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 44 }}>
        <R><div style={{ background: th.bg2, border: `1px solid ${th.g}${th.cardBorder}`, borderRadius: 4, padding: "40px 32px", transition: "background .5s" }}>
          <Field label="Name" value={f.name} onChange={u("name")} placeholder="Your name" />
          <Field label="Email" type="email" value={f.email} onChange={u("email")} placeholder="you@email.com" />
          <Field label="Message" type="textarea" value={f.msg} onChange={u("msg")} placeholder="How can we help?" rows={6} />
          <Btn onClick={() => setDone(true)} full>Send Message</Btn>
        </div></R>
        <R delay={.12}><div style={{ padding: "40px 0" }}>
          <Label>Other Ways to Connect</Label>
          {[{ l: "Email", v: "info@elkaoba.com" }, { l: "WhatsApp", v: "+1 (809) 000-0000" }, { l: "Location", v: "Cabarete, Puerto Plata\nDominican Republic" }, { l: "Hours", v: "Mon–Sat, 9AM–6PM AST" }].map((c, i) =>
            <div key={i} style={{ marginTop: 28 }}><div style={{ ...fb, fontSize: 10, letterSpacing: ".15em", textTransform: "uppercase", color: th.t3, marginBottom: 6, fontWeight: 500 }}>{c.l}</div><div style={{ ...fd, fontSize: 20, color: th.t1, whiteSpace: "pre-line", lineHeight: 1.4, transition: "color .5s" }}>{c.v}</div></div>
          )}
        </div></R>
      </div>
    </section>
  </>;
}

/* ═══ NAVIGATION ═════════════════════════════════════ */
function Nav({ pg, go, mode, toggle }) {
  const th = useTheme();
  const [sc, setSc] = useState(false);
  const [mob, setMob] = useState(false);
  useEffect(() => { const h = () => setSc(window.scrollY > 40); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  const items = [{ l: "Home", p: "home" }, { l: "Residency", p: "residency" }, { l: "Elite", p: "elite" }, { l: "Executive", p: "executive" }, { l: "Apply", p: "apply" }, { l: "Contact", p: "contact" }];
  return <>
    <nav className="slide-down" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, padding: sc ? "10px 0" : "18px 0", background: sc ? th.navBg : "transparent", backdropFilter: sc ? "blur(20px)" : "none", borderBottom: sc ? `1px solid ${th.g}0D` : "none", transition: "all .4s" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div onClick={() => { go("home"); setMob(false); }} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, border: `1.5px solid ${th.g}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", ...fd, fontSize: 13, fontWeight: 600, color: th.g }}>EK</div>
          <div>
            <div style={{ ...fd, fontSize: 15, fontWeight: 600, color: th.t1, letterSpacing: ".04em", lineHeight: 1, transition: "color .5s" }}>EL KAOBA</div>
            <div style={{ ...fb, fontSize: 7, letterSpacing: ".18em", color: th.g, textTransform: "uppercase", fontWeight: 500, marginTop: 2 }}>Private Residency</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div className="desk-nav" style={{ display: "flex", gap: 28 }}>
            {items.map(i => <button key={i.p} className="nav-link" onClick={() => go(i.p)} style={{ color: pg === i.p ? th.g : th.t2 }}>{i.l}</button>)}
          </div>
          {/* THEME TOGGLE */}
          <button onClick={toggle} style={{ background: th.toggleBg, border: `1px solid ${th.g}20`, borderRadius: 20, width: 44, height: 26, cursor: "pointer", position: "relative", transition: "all .4s", display: "flex", alignItems: "center", padding: "0 3px" }}>
            <div style={{ width: 20, height: 20, borderRadius: "50%", background: `linear-gradient(135deg,${th.gd},${th.g})`, transition: "all .4s cubic-bezier(.22,1,.36,1)", transform: mode === "dark" ? "translateX(0)" : "translateX(18px)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#0A0A0A" }}>
              {mode === "dark" ? "☀" : "☽"}
            </div>
          </button>
          <button className="mob-btn" onClick={() => setMob(!mob)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 8, flexDirection: "column", gap: 5, width: 28 }}>
            <div style={{ height: 1.5, background: th.g, transition: "all .3s", transform: mob ? "rotate(45deg) translateY(4.5px)" : "none" }} />
            <div style={{ height: 1.5, background: th.g, transition: "all .3s", opacity: mob ? 0 : 1 }} />
            <div style={{ height: 1.5, background: th.g, transition: "all .3s", transform: mob ? "rotate(-45deg) translateY(-4.5px)" : "none" }} />
          </button>
        </div>
      </div>
    </nav>
    {mob && <div className="fade-in" style={{ position: "fixed", inset: 0, zIndex: 999, background: `${th.bg}F8`, backdropFilter: "blur(30px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28 }}>
      {items.map(item => <button key={item.p} className="mob-link" onClick={() => { go(item.p); setMob(false); }} style={{ color: pg === item.p ? th.g : th.t1 }}>{item.l}</button>)}
    </div>}
  </>;
}

/* ═══ FOOTER ═════════════════════════════════════════ */
function Foot({ go }) {
  const th = useTheme();
  return <footer style={{ background: th.bg, borderTop: `1px solid ${th.g}0D`, padding: "56px 24px 40px", transition: "background .5s" }}>
    <div style={{ maxWidth: 1160, margin: "0 auto" }}>
      <div className="grid-r" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 40, marginBottom: 44 }}>
        <div>
          <div style={{ ...fd, fontSize: 22, fontWeight: 600, color: th.t1, marginBottom: 6, transition: "color .5s" }}>El Kaoba</div>
          <div style={{ ...fb, fontSize: 12, color: th.t2, lineHeight: 1.8, fontWeight: 300 }}>Private Residency & Capital Circle™<br />Cabarete, Dominican Republic</div>
        </div>
        <div>
          <div style={{ ...fb, fontSize: 9, letterSpacing: ".2em", textTransform: "uppercase", color: th.g, marginBottom: 14, fontWeight: 500 }}>Memberships</div>
          {[["Residency — $7,500", "residency"], ["Elite — $10,000", "elite"], ["Executive — $15,000/yr", "executive"]].map(([t, p]) =>
            <button key={p} onClick={() => go(p)} style={{ display: "block", background: "none", border: "none", cursor: "pointer", ...fb, fontSize: 13, color: th.t2, padding: "4px 0", fontWeight: 300 }}>{t}</button>
          )}
        </div>
        <div>
          <div style={{ ...fb, fontSize: 9, letterSpacing: ".2em", textTransform: "uppercase", color: th.g, marginBottom: 14, fontWeight: 500 }}>Connect</div>
          <div style={{ ...fb, fontSize: 13, color: th.t2, fontWeight: 300, lineHeight: 2.2 }}>info@elkaoba.com<br />WhatsApp: +1 (809) 000-0000</div>
        </div>
      </div>
      <div style={{ borderTop: `1px solid ${th.g}0D`, paddingTop: 22, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div style={{ ...fb, fontSize: 10, color: th.t3, fontWeight: 300 }}>© 2026 El Kaoba Private Residency & Capital Circle™</div>
        <div style={{ ...fb, fontSize: 10, color: th.t3, fontWeight: 300 }}>Cabarete, Puerto Plata, DR</div>
      </div>
    </div>
  </footer>;
}

/* ══════════════════════════════════════════════════════
   ROOT APP
   ══════════════════════════════════════════════════════ */
export default function App() {
  const [pg, setPg] = useState("home");
  const [mode, setMode] = useState("dark");
  const th = themes[mode];
  const toggle = () => setMode(m => m === "dark" ? "light" : "dark");

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [pg]);

  const pages = {
    home: <Home go={setPg} />, residency: <Residency go={setPg} />,
    elite: <Elite go={setPg} />, executive: <Executive go={setPg} />,
    apply: <Apply go={setPg} />, contact: <Contact go={setPg} />,
  };

  return <ThemeCtx.Provider value={th}>
    <div style={{ background: th.bg, color: th.t1, minHeight: "100vh", overflowX: "hidden", transition: "background .5s ease, color .5s ease" }}>
      <style>{buildCSS(th)}</style>
      <Nav pg={pg} go={setPg} mode={mode} toggle={toggle} />
      <div key={pg} className="fade-in">{pages[pg]}</div>
      <Foot go={setPg} />
      <a href="https://wa.me/18090000000" target="_blank" rel="noopener noreferrer" style={{ position: "fixed", bottom: 24, right: 24, zIndex: 900, width: 54, height: 54, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(37,211,102,.4)", animation: "scalePop .5s ease 1.5s both" }}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
    </div>
  </ThemeCtx.Provider>;
}
