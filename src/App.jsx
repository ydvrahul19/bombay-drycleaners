import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const PHONE = "9493995503";
const WHATSAPP_LINK = `https://wa.me/91${PHONE}`;
const CALL_LINK = `tel:+91${PHONE}`;
const MAPS_LINK = "https://maps.app.goo.gl/Pd5rqBa3Z9yGQtn29";
const LOGO = "/assets/logo.png";

// TopBar height = 36px, Navbar height = 64px, total offset = 100px
const TOPBAR_H = 36;
const NAV_H = 64;
const HEADER_TOTAL = TOPBAR_H + NAV_H;

function serviceImg(f, fb) { return { src: `/assets/services/${f}`, fallback: fb }; }
function heroImg(f, fb)    { return { src: `/assets/hero/${f}`, fallback: fb }; }

const SERVICES = [
  { id:"women",     icon:"👗", title:"Designer Wear & Women's Ethnic", color:"#0a5f55", ...serviceImg("women-ethnic.jpg","https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80"), items:["Wedding gowns & bridal lehengas","Designer salwar suits & anarkalis","Embroidered & zardozi work garments","Delicate lace & chiffon wear"] },
  { id:"saree",     icon:"🥻", title:"Saree & Silk Care",               color:"#1a8a7a", ...serviceImg("saree-silk.jpg","https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&q=80"), items:["Banarasi, Kanjivaram & pure silk sarees","Wool, georgette & chiffon sarees","Fabric-specific gentle dry cleaning","Colour-safe stain removal"] },
  { id:"mensformal",icon:"🤵", title:"Sherwanis & Men's Formal",        color:"#0e7a6d", ...serviceImg("sherwanis-mens.jpg","https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"), items:["Wedding sherwanis & achkans","Bandhgala & jodhpuri suits","Blazers, tuxedos & formal coats","Embroidered kurtas & ethnic wear"] },
  { id:"everyday",  icon:"👔", title:"Everyday Garments",               color:"#2eaa96", ...serviceImg("everyday-garments.jpg","https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80"), items:["Business suits, blazers & jackets","Dresses, skirts & formal trousers","Shirts, sarees & casual wear","Steam pressing & crisp finishing"] },
  { id:"curtains",  icon:"🏠", title:"Curtains & Drapes",               color:"#0a5f55", ...serviceImg("curtains-drapes.jpg","https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80"), items:["All fabric curtains & drapes","Sheer, velvet & blackout curtains","Careful hanging & folding after clean","Odour & dust removal treatment"] },
  { id:"sofa",      icon:"🛋️",title:"Sofa Covers & Cushions",          color:"#1a8a7a", ...serviceImg("sofa-cushions.jpg","https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80"), items:["Sofa cover & slipcover cleaning","Cushion cover & throw pillow cleaning","Fabric & leather sofa accessories","Stain removal & deodorising"] },
  { id:"carpet",    icon:"🧹", title:"Carpet & Rug Cleaning",           color:"#0e7a6d", ...serviceImg("carpet-rug.jpg","https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&q=80"), items:["Persian, wool & synthetic carpets","Area rugs & door mats","Deep stain & odour extraction","Colour restoration treatment"] },
  { id:"misc",      icon:"✨", title:"Miscellaneous & Other Services",  color:"#2eaa96", ...serviceImg("misc-services.jpg","https://images.unsplash.com/photo-1521577352947-9bb58764b69a?w=600&q=80"), items:["Shoe & footwear cleaning (leather, suede, sneakers)","Bags, purses & leather accessories","Blankets, quilts & bed covers","Leather jackets & specialty garments"] },
];

const HERO_SLIDES = [
  { ...heroImg("hero-1.jpg","https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1400&q=80"), caption:"Premium Dry Cleaning",    sub:"Trusted since 2001" },
  { ...heroImg("hero-2.jpg","https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1400&q=80"), caption:"Sarees & Silk Care",     sub:"Fabric-specific expertise" },
  { ...heroImg("hero-3.jpg","https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1400&q=80"), caption:"Designer & Bridal Wear", sub:"Wedding gowns · Lehengas · Sherwanis" },
  { ...heroImg("hero-4.jpg","https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1400&q=80"), caption:"Household Textiles",     sub:"Curtains · Carpets · Sofa Covers" },
  { ...heroImg("hero-5.jpg","https://images.unsplash.com/photo-1521577352947-9bb58764b69a?w=1400&q=80"), caption:"Steam Press & Finishing",sub:"Crisp, fresh, ready to wear" },
];

const REVIEWS = [
  { name:"Ravi Kumar",   rating:5, text:"Very professional and good cleaning. I gave my 2 sets of white kurta payjama during Diwali. Clothes were returned in sparkling white condition. Worth every rupee!", avatar:"RK", date:"2 weeks ago" },
  { name:"Meena Iyer",   rating:5, text:"Best in service, wonderful experience and fast track work. Excellent workshop and good hospitality.", avatar:"MI", date:"1 month ago" },
  { name:"Arjun Sharma", rating:5, text:"Great Drycleaning store! Quality service; always on top of items, on-time, and very very consistent!", avatar:"AS", date:"3 weeks ago" },
  { name:"Sunita Reddy", rating:5, text:"One of the finest dry cleaning centres. Did my marriage clothes — fast delivery and qualitative service.", avatar:"SR", date:"1 month ago" },
  { name:"Kiran Patel",  rating:5, text:"Quality service! Totally recommend this!", avatar:"KP", date:"5 days ago" },
  { name:"Vikash Gupta", rating:4, text:"Budget friendly compared to other drycleaning shops and good work.", avatar:"VG", date:"2 months ago" },
  { name:"Deepa Nair",   rating:5, text:"Good service helped in the last moment. They saved my event outfit!", avatar:"DN", date:"3 days ago" },
];

/* ── Dynamic counter ──────────────────────────────────────────────────────── */
function useCounter(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const numeric = parseInt(target.replace(/\D/g,""), 10);
    const step = numeric / (duration / 16);
    let cur = 0;
    const timer = setInterval(() => {
      cur += step;
      if (cur >= numeric) { setCount(numeric); clearInterval(timer); }
      else setCount(Math.floor(cur));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  const isKPlus  = target.includes("K+");
  const isPercent= target.includes("%");
  const isPlus   = target.includes("+") && !isKPlus;
  const display  = isKPlus ? `${Math.floor(count/1000)}K+` : isPercent ? `${count}%` : isPlus ? `${count}+` : `${count}`;
  return { ref, display };
}

function StatItem({ value, label }) {
  const { ref, display } = useCounter(value);
  return (
    <div ref={ref} style={{ textAlign:"center", minWidth: 80 }}>
      <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(20px,3vw,26px)", fontWeight:700, color:"#7eecd9" }}>{display}</div>
      <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"clamp(10px,1.2vw,11px)", color:"rgba(255,255,255,0.65)", letterSpacing:1, marginTop:2 }}>{label}</div>
    </div>
  );
}

/* ── GLOBAL STYLES injected once ─────────────────────────────────────────── */
const GLOBAL_CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { overflow-x: hidden; }

  /* ── service grid responsive ── */
  .services-grid {
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr;          /* mobile: 1 col */
  }
  @media (min-width: 640px) {
    .services-grid { grid-template-columns: repeat(2, 1fr); }  /* sm: 2 col */
  }
  @media (min-width: 1024px) {
    .services-grid { grid-template-columns: repeat(4, 1fr); }  /* lg: 4 col */
  }

  /* ── review grid ── */
  .reviews-grid {
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr;
  }
  @media (min-width: 640px) {
    .reviews-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (min-width: 1024px) {
    .reviews-grid { grid-template-columns: repeat(3, 1fr); }
  }

  /* ── features grid ── */
  .features-grid {
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr;
  }
  @media (min-width: 640px) {
    .features-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (min-width: 1024px) {
    .features-grid { grid-template-columns: repeat(4, 1fr); }
  }

  /* ── contact cards grid ── */
  .contact-grid {
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr;
  }
  @media (min-width: 640px) {
    .contact-grid { grid-template-columns: repeat(3, 1fr); }
  }

  /* ── nav ── */
  .desktop-nav { display: flex; }
  .mobile-menu-btn { display: none !important; }
  @media (max-width: 768px) {
    .desktop-nav { display: none !important; }
    .mobile-menu-btn { display: flex !important; }
  }

  /* ── topbar hide on tiny screens ── */
  .topbar-location { display: flex; }
  @media (max-width: 480px) {
    .topbar-location { display: none; }
  }

  /* ── hero tagline ── */
  .hero-tagline {
    font-family: 'DM Sans', sans-serif;
    font-size: clamp(12px, 2vw, 15px);
    color: rgba(255,255,255,0.7);
    letter-spacing: 0.5px;
    font-style: italic;
    margin-bottom: 14px;
  }

  /* ── contact info card ── */
  .contact-info-wrap {
    display: flex;
    flex-wrap: wrap;
    gap: 28px;
    align-items: center;
  }
  @media (max-width: 640px) {
    .contact-info-wrap { flex-direction: column; align-items: flex-start; }
  }

  /* ── stats bar ── */
  .stats-bar {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: clamp(16px,4vw,60px);
    padding: 16px 5%;
  }

  /* ── hero buttons ── */
  .hero-btns {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: center;
  }

  /* ── about hero ── */
  .about-hero {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 32px;
    padding: 60px 5%;
    background: linear-gradient(135deg,#0a5f55,#2eaa96);
  }

  /* ── why-us section ── */
  .why-us-inner {
    display: flex;
    flex-wrap: wrap;
    gap: 36px;
    align-items: center;
    max-width: 1100px;
    margin: 0 auto;
  }
  .why-us-badges {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    flex: 1 1 240px;
  }

  /* ── footer grid ── */
  .footer-grid {
    display: grid;
    gap: 32px;
    grid-template-columns: 1fr;
  }
  @media (min-width: 640px) {
    .footer-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (min-width: 1024px) {
    .footer-grid { grid-template-columns: repeat(4, 1fr); }
  }
`;

/* ── TopBar ────────────────────────────────────────────────────────────────── */
function TopBar() {
  return (
    <div style={{
      background:"#f5f0e8", borderBottom:"1px solid #e0d8c8",
      height: TOPBAR_H,
      padding:"0 5%", display:"flex", alignItems:"center",
      justifyContent:"space-between", flexWrap:"nowrap", gap:8,
      fontSize:12, fontFamily:"'DM Sans',sans-serif", color:"#555",
      position:"fixed", top:0, left:0, right:0, zIndex:1100,
    }}>
      <div style={{ display:"flex", alignItems:"center", gap:5, fontWeight:700, color:"#0a5f55", flexShrink:0 }}>
        <span style={{ color:"#e74c3c", fontSize:13 }}>📞</span>
        <a href={CALL_LINK} style={{ color:"#0a5f55", textDecoration:"none", fontWeight:700, fontSize:12 }}>+91 {PHONE}</a>
      </div>
      <div className="topbar-location" style={{ alignItems:"center", gap:5, color:"#555", fontSize:11 }}>
        <span>📍</span><span style={{ fontWeight:500 }}>Hyderabad, Telangana</span>
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:5, color:"#555", fontSize:11, flexShrink:0 }}>
        <span>🕐</span><span>Mon–Sat: 8:00 AM – 8:00 PM</span>
      </div>
    </div>
  );
}

/* ── Navbar ─────────────────────────────────────────────────────────────────── */
function Navbar({ activePage, setActivePage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", s);
    return () => window.removeEventListener("scroll", s);
  }, []);
  const links = ["Home","Services","About","Reviews","Contact"];
  const navBg = scrolled ? "rgba(255,255,255,0.98)" : "rgba(5,40,36,0.55)";
  return (
    <>
      <nav style={{
        position:"fixed",
        top: TOPBAR_H,   /* sits exactly below topbar — no overlap */
        left:0, right:0, zIndex:1000,
        background: navBg,
        backdropFilter:"blur(14px)",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.10)" : "none",
        transition:"background 0.3s, box-shadow 0.3s",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "1px solid rgba(255,255,255,0.1)",
      }}>
        <div style={{
          maxWidth:1200, margin:"0 auto",
          display:"flex", alignItems:"center", justifyContent:"space-between",
          height: NAV_H, padding:"0 5%",
        }}>
          {/* Logo */}
          <button onClick={() => { setActivePage("Home"); setMenuOpen(false); }}
            style={{ background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:10, padding:0, flexShrink:0 }}>
            <img src={LOGO} alt="Logo"
              style={{ height:44, width:44, objectFit:"contain", borderRadius:9,
                       background: scrolled ? "transparent" : "rgba(255,255,255,0.1)",
                       padding: scrolled ? 0 : 3, transition:"all 0.3s" }} />
            <div style={{ lineHeight:1.15 }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:15, color: scrolled ? "#0a5f55" : "#fff" }}>BOMBAY</div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:400, fontSize:8, color: scrolled ? "#2eaa96" : "#a8e6de", letterSpacing:3 }}>DRYCLEANERS</div>
            </div>
          </button>

          {/* Desktop links */}
          <div className="desktop-nav" style={{ gap:24, alignItems:"center" }}>
            {links.map(l => (
              <button key={l} onClick={() => setActivePage(l)} style={{
                background:"none", border:"none", cursor:"pointer",
                fontFamily:"'DM Sans',sans-serif", fontWeight: activePage===l ? 700 : 500,
                fontSize:13, letterSpacing:0.4,
                color: activePage===l ? "#2eaa96" : (scrolled ? "#333" : "rgba(255,255,255,0.9)"),
                borderBottom: activePage===l ? "2px solid #2eaa96" : "2px solid transparent",
                paddingBottom:2, transition:"all 0.2s",
              }}>{l}</button>
            ))}
            <a href={CALL_LINK} style={{
              background:"linear-gradient(135deg,#0a5f55,#2eaa96)", color:"#fff",
              padding:"8px 20px", borderRadius:22, fontFamily:"'DM Sans',sans-serif",
              fontWeight:600, fontSize:13, textDecoration:"none",
              boxShadow:"0 4px 12px rgba(10,95,85,0.35)", whiteSpace:"nowrap",
            }}>📞 Call Now</a>
          </div>

          {/* Hamburger */}
          <button className="mobile-menu-btn" onClick={() => setMenuOpen(o => !o)}
            style={{ background:"none", border:"none", cursor:"pointer", flexDirection:"column", gap:5, padding:6 }}>
            {[0,1,2].map(i => (
              <div key={i} style={{
                width:22, height:2, borderRadius:2, transition:"all 0.3s",
                background: scrolled ? "#0a5f55" : "#fff",
                transform: menuOpen && i===0 ? "rotate(45deg) translate(5px,5px)" :
                           menuOpen && i===1 ? "scaleX(0)" :
                           menuOpen && i===2 ? "rotate(-45deg) translate(5px,-5px)" : "none",
              }} />
            ))}
          </button>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }} exit={{ height:0, opacity:0 }}
              style={{ overflow:"hidden", background:"#fff", borderTop:"1px solid #e0f5f1" }}>
              <div style={{ padding:"12px 5% 16px", display:"flex", flexDirection:"column", gap:4 }}>
                {links.map(l => (
                  <button key={l} onClick={() => { setActivePage(l); setMenuOpen(false); }} style={{
                    background: activePage===l ? "#e8f7f4" : "none", border:"none", cursor:"pointer",
                    padding:"11px 14px", borderRadius:8, textAlign:"left",
                    fontFamily:"'DM Sans',sans-serif", fontWeight: activePage===l ? 700 : 500,
                    fontSize:14, color: activePage===l ? "#0a5f55" : "#333",
                  }}>{l}</button>
                ))}
                <a href={CALL_LINK} style={{
                  background:"linear-gradient(135deg,#0a5f55,#2eaa96)", color:"#fff",
                  padding:"12px 16px", borderRadius:10, textDecoration:"none",
                  fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:14,
                  textAlign:"center", marginTop:6,
                }}>📞 +91 {PHONE}</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}

/* ── Hero ───────────────────────────────────────────────────────────────────── */
function HeroSection({ setActivePage }) {
  const [current, setCurrent] = useState(0);
  const [bgSrcs, setBgSrcs] = useState(HERO_SLIDES.map(s => s.src));
  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c+1) % HERO_SLIDES.length), 4500);
    return () => clearInterval(t);
  }, []);
  const handleBgErr = i => setBgSrcs(prev => { const n=[...prev]; n[i]=HERO_SLIDES[i].fallback; return n; });

  return (
    <section style={{ position:"relative", height:"100vh", minHeight:600, overflow:"hidden", paddingTop: HEADER_TOTAL }}>
      {/* Slide backgrounds */}
      {HERO_SLIDES.map((s,i) => (
        <motion.div key={i}
          initial={{ opacity:0 }} animate={{ opacity: i===current ? 1 : 0 }}
          transition={{ duration:1.2, ease:"easeInOut" }}
          style={{ position:"absolute", inset:0 }}>
          <img src={bgSrcs[i]} alt="" style={{ display:"none" }} onError={() => handleBgErr(i)} />
          <div style={{ position:"absolute", inset:0, backgroundImage:`url(${bgSrcs[i]})`, backgroundSize:"cover", backgroundPosition:"center", transition:"transform 8s ease" }} />
        </motion.div>
      ))}

      {/* Overlay — white/gray tint at bottom for "hero reflection" effect */}
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, rgba(5,40,36,0.62) 0%, rgba(5,40,36,0.70) 55%, rgba(230,240,238,0.18) 100%)" }} />

      {/* Content */}
      <div style={{
        position:"relative", zIndex:2, height:`calc(100% - ${HEADER_TOTAL}px)`,
        display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
        textAlign:"center", padding:"0 20px",
      }}>
        {/* Logo */}
        <motion.div initial={{ opacity:0, scale:0.7 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.15, duration:0.6 }}
          style={{ marginBottom:14 }}>
          <img src={LOGO} alt="Bombay Drycleaners"
            style={{ width:90, height:90, objectFit:"contain", borderRadius:16,
                     background:"rgba(255,255,255,0.13)", padding:6,
                     backdropFilter:"blur(8px)", border:"1.5px solid rgba(255,255,255,0.25)" }} />
        </motion.div>

        {/* Tagline beneath logo */}
        <motion.p className="hero-tagline" initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.28, duration:0.6 }}>
          From Nagpur Roots to Hyderabad Service — Since 2001
        </motion.p>

        {/* Badge */}
        <motion.div initial={{ opacity:0, y:-14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.38, duration:0.6 }}
          style={{ background:"rgba(46,170,150,0.22)", border:"1px solid rgba(46,170,150,0.45)", borderRadius:28,
                   padding:"5px 16px", marginBottom:14, fontFamily:"'DM Sans',sans-serif", color:"#7eecd9", fontSize:11, letterSpacing:2 }}>
          ✦ TRUSTED SINCE 2001 ✦
        </motion.div>

        {/* Slide caption */}
        <AnimatePresence mode="wait">
          <motion.h1 key={current}
            initial={{ opacity:0, y:26 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-18 }} transition={{ duration:0.55 }}
            style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.8rem,5.5vw,4rem)",
                     color:"#fff", fontWeight:700, lineHeight:1.15, margin:"0 0 10px", maxWidth:760 }}>
            {HERO_SLIDES[current].caption}
          </motion.h1>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.p key={`sub-${current}`}
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.45, delay:0.18 }}
            style={{ color:"rgba(255,255,255,0.82)", fontFamily:"'DM Sans',sans-serif",
                     fontSize:"clamp(13px,2.2vw,17px)", margin:"0 0 28px" }}>
            {HERO_SLIDES[current].sub}
          </motion.p>
        </AnimatePresence>

        {/* CTA buttons */}
        <div className="hero-btns">
          <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.97 }}
            onClick={() => setActivePage("Services")}
            style={{ background:"linear-gradient(135deg,#2eaa96,#0a5f55)", color:"#fff", border:"none",
                     padding:"13px 28px", borderRadius:28, cursor:"pointer",
                     fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:"clamp(13px,2vw,15px)" }}>
            View Services
          </motion.button>
          <motion.a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"
            whileHover={{ scale:1.05 }} whileTap={{ scale:0.97 }}
            style={{ background:"rgba(255,255,255,0.15)", color:"#fff", backdropFilter:"blur(8px)",
                     border:"1px solid rgba(255,255,255,0.3)", padding:"13px 28px", borderRadius:28,
                     textDecoration:"none", fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:"clamp(13px,2vw,15px)" }}>
            💬 WhatsApp Us
          </motion.a>
        </div>

        {/* Dot navigation */}
        <div style={{ position:"absolute", bottom:80, display:"flex", gap:8 }}>
          {HERO_SLIDES.map((_,i) => (
            <button key={i} onClick={() => setCurrent(i)} style={{
              width: i===current ? 26 : 8, height:8, borderRadius:4,
              background: i===current ? "#2eaa96" : "rgba(255,255,255,0.4)",
              border:"none", cursor:"pointer", transition:"all 0.3s",
            }} />
          ))}
        </div>
      </div>

      {/* Stats bar — white/gray color combination as requested */}
      <div className="stats-bar" style={{
        position:"absolute", bottom:0, left:0, right:0,
        background:"rgba(255,255,255,0.92)",
        backdropFilter:"blur(12px)",
        borderTop:"1px solid rgba(200,220,216,0.6)",
        boxShadow:"0 -4px 20px rgba(10,95,85,0.08)",
      }}>
        {[["23+","Years Experience"],["10000+","Happy Customers"],["25+","Fabric Types"],["100%","Satisfaction"]].map(([v,l]) => (
          <StatItemDark key={l} value={v} label={l} />
        ))}
      </div>
    </section>
  );
}

/* Stats on white background */
function StatItemDark({ value, label }) {
  const { ref, display } = useCounter(value);
  return (
    <div ref={ref} style={{ textAlign:"center", minWidth:80 }}>
      <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(20px,3vw,26px)", fontWeight:700, color:"#0a5f55" }}>{display}</div>
      <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"clamp(10px,1.2vw,11px)", color:"#666", letterSpacing:1, marginTop:2 }}>{label}</div>
    </div>
  );
}

/* ── Service Card ────────────────────────────────────────────────────────────── */
function ServiceCard({ service, i }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-50px" });
  const [imgSrc, setImgSrc] = useState(service.src);
  return (
    <motion.div ref={ref}
      initial={{ opacity:0, y:40 }} animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ duration:0.55, delay:(i%4)*0.07 }}
      whileHover={{ y:-5, boxShadow:"0 18px 44px rgba(10,95,85,0.16)" }}
      style={{ background:"#fff", borderRadius:18, overflow:"hidden",
               boxShadow:"0 3px 16px rgba(0,0,0,0.07)", transition:"box-shadow 0.3s",
               display:"flex", flexDirection:"column" }}>
      <div style={{ height:180, overflow:"hidden", position:"relative", flexShrink:0 }}>
        <img src={imgSrc} alt={service.title} onError={() => setImgSrc(service.fallback)}
          style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.45s ease" }}
          onMouseOver={e => e.currentTarget.style.transform="scale(1.07)"}
          onMouseOut={e  => e.currentTarget.style.transform="scale(1)"} />
        <div style={{ position:"absolute", top:10, left:10, background:service.color,
                      color:"#fff", borderRadius:8, padding:"3px 11px",
                      fontFamily:"'DM Sans',sans-serif", fontSize:12, fontWeight:700 }}>
          {service.icon}
        </div>
      </div>
      <div style={{ padding:"16px 18px 22px", flex:1 }}>
        <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:15, color:"#0a3d37",
                     margin:"0 0 10px", fontWeight:700, lineHeight:1.35 }}>{service.title}</h3>
        <ul style={{ listStyle:"none", padding:0, margin:0, display:"flex", flexDirection:"column", gap:5 }}>
          {service.items.map((it,j) => (
            <li key={j} style={{ display:"flex", gap:7, alignItems:"flex-start",
                                  fontFamily:"'DM Sans',sans-serif", fontSize:12.5, color:"#444", lineHeight:1.5 }}>
              <span style={{ color:"#2eaa96", fontWeight:700, flexShrink:0, marginTop:1 }}>✓</span>{it}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

/* ── Pages ─────────────────────────────────────────────────────────────────── */
function ServicesPage() {
  return (
    <div style={{ minHeight:"100vh", background:"#f0faf8", paddingTop: HEADER_TOTAL }}>
      <div style={{ background:"linear-gradient(135deg,#0a5f55 0%,#1a8a7a 100%)", padding:"50px 5% 60px", textAlign:"center" }}>
        <motion.div initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.55 }}>
          <div style={{ color:"#7eecd9", fontFamily:"'DM Sans',sans-serif", letterSpacing:3, fontSize:11, marginBottom:10 }}>WHAT WE OFFER</div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.8rem,4vw,3rem)", color:"#fff", margin:"0 0 14px" }}>Our Services</h1>
          <p style={{ color:"rgba(255,255,255,0.75)", fontFamily:"'DM Sans',sans-serif", fontSize:"clamp(13px,2vw,16px)", maxWidth:520, margin:"0 auto" }}>
            Professional care for every garment, fabric, and textile — handled with expertise since 2001.
          </p>
        </motion.div>
      </div>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"48px 5%" }}>
        <div className="services-grid">
          {SERVICES.map((s,i) => <ServiceCard key={s.id} service={s} i={i} />)}
        </div>
      </div>
      <div style={{ textAlign:"center", padding:"0 5% 64px" }}>
        <motion.a href={CALL_LINK} whileHover={{ scale:1.04 }}
          style={{ background:"linear-gradient(135deg,#0a5f55,#2eaa96)", color:"#fff", padding:"15px 36px", borderRadius:30,
                   textDecoration:"none", fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:"clamp(14px,2vw,16px)",
                   boxShadow:"0 6px 22px rgba(10,95,85,0.33)", display:"inline-block" }}>
          📞 Book a Service — {PHONE}
        </motion.a>
      </div>
    </div>
  );
}

function AboutPage() {
  const features = [
    { icon:"🌿", title:"Eco-Friendly Solvents", desc:"We use safe, fabric-friendly cleaning agents that protect both your garments and the environment." },
    { icon:"👨‍🔬", title:"Expert Technicians",    desc:"Our team has 23+ years of hands-on experience with every type of fabric and garment." },
    { icon:"⚡", title:"Fast Turnaround",       desc:"Standard 48-hour service with express options. Your clothes ready when you need them." },
    { icon:"🔒", title:"Safe & Insured",        desc:"Every garment handled with care. Full responsibility for designer and luxury items." },
  ];
  return (
    <div style={{ minHeight:"100vh", paddingTop: HEADER_TOTAL }}>
      <div className="about-hero">
        <motion.div initial={{ opacity:0, x:-36 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.65 }} style={{ flex:"1 1 280px" }}>
          <div style={{ color:"#7eecd9", fontFamily:"'DM Sans',sans-serif", letterSpacing:3, fontSize:11, marginBottom:12 }}>OUR STORY</div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.8rem,4vw,2.8rem)", color:"#fff", marginBottom:18 }}>Over Two Decades of Trust</h1>
          <p style={{ color:"rgba(255,255,255,0.82)", fontFamily:"'DM Sans',sans-serif", fontSize:"clamp(13px,2vw,16px)", lineHeight:1.8, maxWidth:500 }}>
            Founded in 2001 with roots in Nagpur, Bombay Drycleaners has grown into a trusted name for garment care across Hyderabad — handling everything from everyday shirts to precious wedding lehengas.
          </p>
        </motion.div>
        <motion.div initial={{ opacity:0, x:36 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.65, delay:0.15 }}
          style={{ flex:"0 0 auto", display:"flex", justifyContent:"center" }}>
          <div style={{ width:200, height:200, borderRadius:"50%", background:"rgba(255,255,255,0.1)",
                        border:"2px solid rgba(255,255,255,0.25)", display:"flex", flexDirection:"column",
                        alignItems:"center", justifyContent:"center", backdropFilter:"blur(10px)" }}>
            <img src={LOGO} alt="Logo" style={{ width:76, height:76, objectFit:"contain", marginBottom:6, borderRadius:10 }} />
            <div style={{ fontFamily:"'Playfair Display',serif", color:"#7eecd9", fontSize:10, letterSpacing:2 }}>EST.</div>
            <div style={{ fontFamily:"'Playfair Display',serif", color:"#fff", fontSize:24, fontWeight:700, lineHeight:1 }}>2001</div>
          </div>
        </motion.div>
      </div>

      <div style={{ background:"#f0faf8", padding:"56px 5%" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <h2 style={{ textAlign:"center", fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.4rem,3vw,1.9rem)", color:"#0a3d37", marginBottom:40 }}>
            Why Choose Bombay Drycleaners?
          </h2>
          <div className="features-grid">
            {features.map((f,i) => (
              <motion.div key={i} initial={{ opacity:0, y:26 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.08 }}
                style={{ background:"#fff", borderRadius:14, padding:"24px 20px", boxShadow:"0 3px 14px rgba(0,0,0,0.06)", borderTop:"3px solid #2eaa96" }}>
                <div style={{ fontSize:30, marginBottom:10 }}>{f.icon}</div>
                <h4 style={{ fontFamily:"'Playfair Display',serif", color:"#0a3d37", fontSize:15, marginBottom:8 }}>{f.title}</h4>
                <p style={{ fontFamily:"'DM Sans',sans-serif", color:"#666", fontSize:13, lineHeight:1.7 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background:"#fff", padding:"56px 5%", textAlign:"center" }}>
        <div style={{ display:"inline-flex", flexDirection:"column", alignItems:"center",
                      border:"2px solid #e0f5f1", borderRadius:22, padding:"40px 56px",
                      background:"linear-gradient(135deg,#f0faf8,#e0f5f1)" }}>
          <img src={LOGO} alt="Logo" style={{ width:110, height:110, objectFit:"contain", marginBottom:14, borderRadius:14 }} />
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:26, fontWeight:700, color:"#0a5f55", letterSpacing:3 }}>BOMBAY</div>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:13, color:"#2eaa96", letterSpacing:6, marginBottom:10 }}>DRYCLEANERS</div>
          <div style={{ color:"#999", fontFamily:"'DM Sans',sans-serif", fontSize:11, letterSpacing:2, marginBottom:12 }}>SINCE 2001 · HYDERABAD</div>
          <a href={CALL_LINK} style={{ color:"#0a5f55", fontFamily:"'DM Sans',sans-serif", fontSize:15, fontWeight:700, textDecoration:"none" }}>📞 +91 {PHONE}</a>
        </div>
      </div>
    </div>
  );
}

function ReviewsPage() {
  return (
    <div style={{ minHeight:"100vh", background:"#f0faf8", paddingTop: HEADER_TOTAL }}>
      <div style={{ background:"linear-gradient(135deg,#0a5f55,#1a8a7a)", padding:"50px 5% 60px", textAlign:"center" }}>
        <motion.div initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }}>
          <div style={{ color:"#7eecd9", fontFamily:"'DM Sans',sans-serif", letterSpacing:3, fontSize:11, marginBottom:10 }}>TESTIMONIALS</div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.8rem,4vw,3rem)", color:"#fff", marginBottom:10 }}>What Our Customers Say</h1>
          <div style={{ display:"flex", justifyContent:"center", gap:3, marginBottom:8 }}>
            {"★★★★★".split("").map((s,i) => <span key={i} style={{ color:"#ffd700", fontSize:22 }}>{s}</span>)}
          </div>
          <p style={{ color:"rgba(255,255,255,0.7)", fontFamily:"'DM Sans',sans-serif", fontSize:14 }}>4.9/5 average · 10,000+ satisfied customers</p>
        </motion.div>
      </div>
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"50px 5%" }}>
        <div className="reviews-grid">
          {REVIEWS.map((r,i) => (
            <motion.div key={i} initial={{ opacity:0, y:26 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.07 }}
              whileHover={{ y:-4 }}
              style={{ background:"#fff", borderRadius:16, padding:"22px 20px", boxShadow:"0 3px 16px rgba(0,0,0,0.06)" }}>
              <div style={{ display:"flex", alignItems:"center", gap:11, marginBottom:12 }}>
                <div style={{ width:42, height:42, borderRadius:"50%", background:"linear-gradient(135deg,#0a5f55,#2eaa96)",
                              display:"flex", alignItems:"center", justifyContent:"center",
                              color:"#fff", fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:13, flexShrink:0 }}>{r.avatar}</div>
                <div>
                  <div style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:700, color:"#0a3d37", fontSize:13 }}>{r.name}</div>
                  <div style={{ fontFamily:"'DM Sans',sans-serif", color:"#999", fontSize:11 }}>{r.date}</div>
                </div>
              </div>
              <div style={{ display:"flex", gap:2, marginBottom:10 }}>
                {Array.from({ length:r.rating }).map((_,j) => <span key={j} style={{ color:"#ffd700", fontSize:13 }}>★</span>)}
              </div>
              <p style={{ fontFamily:"'DM Sans',sans-serif", color:"#555", fontSize:13, lineHeight:1.7, margin:0 }}>"{r.text}"</p>
            </motion.div>
          ))}
        </div>
      </div>
      <div style={{ textAlign:"center", padding:"0 5% 64px" }}>
        <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer"
          style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#fff",
                   border:"2px solid #2eaa96", color:"#0a5f55", padding:"12px 26px", borderRadius:26,
                   textDecoration:"none", fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:14,
                   boxShadow:"0 4px 14px rgba(0,0,0,0.07)" }}>
          <span>📍</span> View on Google Maps & Leave a Review
        </a>
      </div>
    </div>
  );
}

function ContactPage() {
  return (
    <div style={{ minHeight:"100vh", paddingTop: HEADER_TOTAL, background:"#f0faf8" }}>
      <div style={{ background:"linear-gradient(135deg,#0a5f55,#2eaa96)", padding:"50px 5% 60px", textAlign:"center" }}>
        <motion.div initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }}>
          <div style={{ color:"#7eecd9", fontFamily:"'DM Sans',sans-serif", letterSpacing:3, fontSize:11, marginBottom:10 }}>GET IN TOUCH</div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.8rem,4vw,3rem)", color:"#fff", marginBottom:10 }}>Contact Us</h1>
          <p style={{ color:"rgba(255,255,255,0.78)", fontFamily:"'DM Sans',sans-serif", fontSize:15 }}>Call, WhatsApp, or find us on the map.</p>
        </motion.div>
      </div>

      <div style={{ maxWidth:960, margin:"0 auto", padding:"48px 5% 24px" }}>
        <div className="contact-grid">
          {[
            { icon:"📞", title:"Call Us",        detail:`+91 ${PHONE}`,      sub:"Mon–Sat: 8:00 AM – 8:00 PM", bg:"#0a5f55",  href:CALL_LINK,       cta:"Call Now" },
            { icon:"💬", title:"WhatsApp",        detail:`+91 ${PHONE}`,      sub:"Chat with us anytime",        bg:"#25D366",  href:WHATSAPP_LINK,   cta:"Open WhatsApp" },
            { icon:"📍", title:"Find Us on Maps", detail:"Bombay Drycleaners",sub:"Hyderabad, Telangana",        bg:"#e74c3c",  href:MAPS_LINK,       cta:"Open Google Maps" },
          ].map((c,i) => (
            <motion.div key={i} initial={{ opacity:0, y:26 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.1 }}
              whileHover={{ y:-5 }}
              style={{ background:"#fff", borderRadius:18, overflow:"hidden", boxShadow:"0 3px 16px rgba(0,0,0,0.07)" }}>
              <div style={{ background:c.bg, padding:"26px 20px", textAlign:"center" }}>
                <div style={{ fontSize:40 }}>{c.icon}</div>
              </div>
              <div style={{ padding:"20px 20px 24px", textAlign:"center" }}>
                <h3 style={{ fontFamily:"'Playfair Display',serif", color:"#0a3d37", fontSize:17, marginBottom:6 }}>{c.title}</h3>
                <p style={{ fontFamily:"'DM Sans',sans-serif", color:"#0a5f55", fontWeight:700, fontSize:15, marginBottom:3 }}>{c.detail}</p>
                <p style={{ fontFamily:"'DM Sans',sans-serif", color:"#888", fontSize:12, marginBottom:18 }}>{c.sub}</p>
                <motion.a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                  whileHover={{ scale:1.05 }}
                  style={{ display:"inline-block", background:c.bg, color:"#fff", padding:"10px 22px",
                           borderRadius:22, textDecoration:"none", fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:13 }}>
                  {c.cta}
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Business info card */}
      <div style={{ maxWidth:960, margin:"0 auto 64px", padding:"0 5%" }}>
        <motion.div initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          style={{ background:"#fff", borderRadius:18, padding:"32px", boxShadow:"0 3px 16px rgba(0,0,0,0.06)" }}>
          <div className="contact-info-wrap">
            <img src={LOGO} alt="Logo" style={{ width:88, height:88, objectFit:"contain", borderRadius:14, flexShrink:0 }} />
            <div style={{ flex:"1 1 220px" }}>
              <h3 style={{ fontFamily:"'Playfair Display',serif", color:"#0a3d37", fontSize:20, marginBottom:14 }}>Bombay Drycleaners</h3>
              {[
                ["📍 Location","Hyderabad, Telangana, India"],
                ["🕐 Hours","Monday – Saturday: 8:00 AM – 8:00 PM"],
                ["📞 Phone",`+91 ${PHONE}`],
                ["💬 WhatsApp",`+91 ${PHONE}`],
                ["📅 Established","2001"],
              ].map(([lbl,val]) => (
                <div key={lbl} style={{ display:"flex", gap:10, marginBottom:7 }}>
                  <span style={{ fontFamily:"'DM Sans',sans-serif", color:"#777", fontSize:12, minWidth:100 }}>{lbl}</span>
                  <span style={{ fontFamily:"'DM Sans',sans-serif", color:"#0a3d37", fontSize:12, fontWeight:600 }}>{val}</span>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:10, alignItems:"stretch", minWidth:150 }}>
              <a href={CALL_LINK} style={{ background:"linear-gradient(135deg,#0a5f55,#2eaa96)", color:"#fff", padding:"12px 20px", borderRadius:24, textDecoration:"none", fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:14, textAlign:"center" }}>📞 Call Now</a>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ background:"#25D366", color:"#fff", padding:"12px 20px", borderRadius:24, textDecoration:"none", fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:14, textAlign:"center" }}>💬 WhatsApp</a>
              <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" style={{ background:"#e74c3c", color:"#fff", padding:"12px 20px", borderRadius:24, textDecoration:"none", fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:14, textAlign:"center" }}>📍 Directions</a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function HomePage({ setActivePage }) {
  return (
    <>
      <HeroSection setActivePage={setActivePage} />

      {/* All 8 Services — 1→2→4 col grid */}
      <section style={{ background:"#fff", padding:"64px 5%" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <motion.div initial={{ opacity:0, y:26 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            style={{ textAlign:"center", marginBottom:44 }}>
            <div style={{ color:"#2eaa96", fontFamily:"'DM Sans',sans-serif", letterSpacing:3, fontSize:11, marginBottom:8 }}>WHAT WE DO</div>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.5rem,3vw,2.3rem)", color:"#0a3d37", marginBottom:12 }}>
              Complete Garment & Textile Care
            </h2>
            <p style={{ fontFamily:"'DM Sans',sans-serif", color:"#666", fontSize:"clamp(13px,2vw,15px)", maxWidth:480, margin:"0 auto" }}>
              All 8 services — from everyday wardrobe to precious heirlooms, expert care since 2001.
            </p>
          </motion.div>
          <div className="services-grid">
            {SERVICES.map((s,i) => <ServiceCard key={s.id} service={s} i={i} />)}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section style={{ background:"linear-gradient(135deg,#052820,#0a5f55)", padding:"60px 5%" }}>
        <div className="why-us-inner">
          <motion.div initial={{ opacity:0, x:-26 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} style={{ flex:"1 1 280px" }}>
            <div style={{ color:"#7eecd9", fontFamily:"'DM Sans',sans-serif", letterSpacing:3, fontSize:11, marginBottom:12 }}>TRUSTED BY THOUSANDS</div>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.4rem,3vw,2.1rem)", color:"#fff", marginBottom:14 }}>
              Hyderabad's Most Trusted Drycleaners
            </h2>
            <p style={{ color:"rgba(255,255,255,0.72)", fontFamily:"'DM Sans',sans-serif", fontSize:"clamp(13px,2vw,15px)", lineHeight:1.8 }}>
              With over 23 years of service — from Nagpur roots to Hyderabad hearts — Bombay Drycleaners handles everything from everyday clothing to priceless wedding wear.
            </p>
            <div style={{ display:"flex", gap:10, marginTop:24, flexWrap:"wrap" }}>
              <a href={CALL_LINK} style={{ background:"#2eaa96", color:"#fff", padding:"11px 20px", borderRadius:24, textDecoration:"none", fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:13 }}>📞 Call: {PHONE}</a>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ background:"#25D366", color:"#fff", padding:"11px 20px", borderRadius:24, textDecoration:"none", fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:13 }}>💬 WhatsApp</a>
            </div>
          </motion.div>
          <motion.div initial={{ opacity:0, x:26 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}>
            <div className="why-us-badges">
              {[["🌿","Eco-Friendly"],["⚡","Fast Turnaround"],["🔒","100% Safe"],["⭐","5-Star Rated"]].map(([ic,lb]) => (
                <div key={lb} style={{ background:"rgba(255,255,255,0.08)", borderRadius:12, padding:"16px 12px", textAlign:"center", border:"1px solid rgba(255,255,255,0.1)" }}>
                  <div style={{ fontSize:26, marginBottom:6 }}>{ic}</div>
                  <div style={{ fontFamily:"'DM Sans',sans-serif", color:"#fff", fontWeight:600, fontSize:12 }}>{lb}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reviews preview */}
      <section style={{ background:"#f0faf8", padding:"64px 5%" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <motion.div initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            style={{ textAlign:"center", marginBottom:38 }}>
            <div style={{ color:"#2eaa96", fontFamily:"'DM Sans',sans-serif", letterSpacing:3, fontSize:11, marginBottom:8 }}>TESTIMONIALS</div>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.5rem,3vw,2.3rem)", color:"#0a3d37" }}>What Our Customers Say</h2>
          </motion.div>
          <div className="reviews-grid" style={{ gridTemplateColumns:undefined }}>
            {/* show first 3 on home */}
            {REVIEWS.slice(0,3).map((r,i) => (
              <motion.div key={i} initial={{ opacity:0, y:22 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.08 }}
                style={{ background:"#fff", borderRadius:14, padding:"20px 18px", boxShadow:"0 3px 14px rgba(0,0,0,0.06)" }}>
                <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:10 }}>
                  <div style={{ width:38, height:38, borderRadius:"50%", background:"linear-gradient(135deg,#0a5f55,#2eaa96)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:12, flexShrink:0 }}>{r.avatar}</div>
                  <div>
                    <div style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:700, color:"#0a3d37", fontSize:13 }}>{r.name}</div>
                    <div style={{ color:"#ffd700", fontSize:12 }}>{"★".repeat(r.rating)}</div>
                  </div>
                </div>
                <p style={{ fontFamily:"'DM Sans',sans-serif", color:"#555", fontSize:12.5, lineHeight:1.7, margin:0 }}>"{r.text}"</p>
              </motion.div>
            ))}
          </div>
          <div style={{ textAlign:"center", marginTop:30 }}>
            <motion.button whileHover={{ scale:1.05 }} onClick={() => setActivePage("Reviews")}
              style={{ background:"none", border:"2px solid #0a5f55", color:"#0a5f55", padding:"11px 28px", borderRadius:28, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:14 }}>
              Read All Reviews →
            </motion.button>
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Footer ─────────────────────────────────────────────────────────────────── */
function Footer({ setActivePage }) {
  return (
    <footer style={{ background:"#041f1c", color:"#fff", padding:"50px 5% 24px" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div className="footer-grid" style={{ paddingBottom:32, borderBottom:"1px solid rgba(255,255,255,0.08)" }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:12 }}>
              <img src={LOGO} alt="Logo" style={{ width:42, height:42, objectFit:"contain", borderRadius:7 }} />
              <div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:14, color:"#7eecd9" }}>BOMBAY</div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:8, color:"#2eaa96", letterSpacing:3 }}>DRYCLEANERS</div>
              </div>
            </div>
            <p style={{ fontFamily:"'DM Sans',sans-serif", color:"rgba(255,255,255,0.5)", fontSize:12.5, lineHeight:1.8 }}>
              Premium garment care trusted by Hyderabad families since 2001.
            </p>
          </div>
          <div>
            <h4 style={{ fontFamily:"'DM Sans',sans-serif", color:"#7eecd9", fontSize:10, letterSpacing:2, marginBottom:12 }}>QUICK LINKS</h4>
            {["Home","Services","About","Reviews","Contact"].map(l => (
              <button key={l} onClick={() => setActivePage(l)} style={{ display:"block", background:"none", border:"none", cursor:"pointer", color:"rgba(255,255,255,0.5)", fontFamily:"'DM Sans',sans-serif", fontSize:13, padding:"3px 0", textAlign:"left" }}>{l}</button>
            ))}
          </div>
          <div>
            <h4 style={{ fontFamily:"'DM Sans',sans-serif", color:"#7eecd9", fontSize:10, letterSpacing:2, marginBottom:12 }}>SERVICES</h4>
            {["Saree & Silk Care","Bridal Lehengas","Sherwanis & Suits","Curtains & Drapes","Carpet & Rug","Shoes & Bags"].map(s => (
              <div key={s} style={{ color:"rgba(255,255,255,0.5)", fontFamily:"'DM Sans',sans-serif", fontSize:12.5, padding:"3px 0" }}>{s}</div>
            ))}
          </div>
          <div>
            <h4 style={{ fontFamily:"'DM Sans',sans-serif", color:"#7eecd9", fontSize:10, letterSpacing:2, marginBottom:12 }}>CONTACT</h4>
            <a href={CALL_LINK} style={{ display:"block", color:"rgba(255,255,255,0.5)", fontFamily:"'DM Sans',sans-serif", fontSize:12.5, textDecoration:"none", padding:"3px 0" }}>📞 +91 {PHONE}</a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ display:"block", color:"rgba(255,255,255,0.5)", fontFamily:"'DM Sans',sans-serif", fontSize:12.5, textDecoration:"none", padding:"3px 0" }}>💬 WhatsApp Us</a>
            <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" style={{ display:"block", color:"rgba(255,255,255,0.5)", fontFamily:"'DM Sans',sans-serif", fontSize:12.5, textDecoration:"none", padding:"3px 0" }}>📍 Get Directions</a>
            <div style={{ color:"rgba(255,255,255,0.32)", fontFamily:"'DM Sans',sans-serif", fontSize:11, marginTop:7 }}>Mon–Sat: 8am – 8pm</div>
          </div>
        </div>
        <div style={{ paddingTop:20, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10 }}>
          <div style={{ fontFamily:"'DM Sans',sans-serif", color:"rgba(255,255,255,0.28)", fontSize:11 }}>© 2024 Bombay Drycleaners. All rights reserved. Since 2001.</div>
          <div style={{ display:"flex", gap:8 }}>
            <a href={CALL_LINK} style={{ background:"#0a5f55", color:"#fff", padding:"5px 14px", borderRadius:18, textDecoration:"none", fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:600 }}>📞 Call</a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ background:"#25D366", color:"#fff", padding:"5px 14px", borderRadius:18, textDecoration:"none", fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:600 }}>💬 WhatsApp</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── Floating buttons ─────────────────────────────────────────────────────── */
function FloatingButtons() {
  return (
    <div style={{ position:"fixed", bottom:24, right:18, zIndex:1200, display:"flex", flexDirection:"column", gap:12 }}>
      <motion.a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" whileHover={{ scale:1.12 }} whileTap={{ scale:0.95 }}
        style={{ width:52, height:52, borderRadius:"50%", background:"#25D366", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 18px rgba(37,211,102,0.48)", textDecoration:"none" }}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </motion.a>
      <motion.a href={CALL_LINK} whileHover={{ scale:1.12 }} whileTap={{ scale:0.95 }}
        style={{ width:52, height:52, borderRadius:"50%", background:"#0a5f55", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 18px rgba(10,95,85,0.48)", textDecoration:"none" }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
      </motion.a>
    </div>
  );
}

/* ── App root ────────────────────────────────────────────────────────────────── */
export default function App() {
  const [activePage, setActivePage] = useState("Home");
  const handleSetPage = page => { setActivePage(page); window.scrollTo({ top:0, behavior:"smooth" }); };

  useEffect(() => {
    // Google Fonts
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);

    // Favicon
    let fav = document.querySelector("link[rel='icon']");
    if (!fav) { fav = document.createElement("link"); fav.rel = "icon"; document.head.appendChild(fav); }
    fav.type = "image/png"; fav.href = LOGO;

    document.body.style.margin  = "0";
    document.body.style.padding = "0";
    document.body.style.overflowX = "hidden";
  }, []);

  const renderPage = () => {
    switch (activePage) {
      case "Home":     return <HomePage setActivePage={handleSetPage} />;
      case "Services": return <ServicesPage />;
      case "About":    return <AboutPage />;
      case "Reviews":  return <ReviewsPage />;
      case "Contact":  return <ContactPage />;
      default:         return <HomePage setActivePage={handleSetPage} />;
    }
  };

  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", background:"#f0faf8" }}>
      {/* inject global responsive CSS */}
      <style>{GLOBAL_CSS}</style>

      <TopBar />
      <Navbar activePage={activePage} setActivePage={handleSetPage} />

      <AnimatePresence mode="wait">
        <motion.div key={activePage}
          initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-14 }}
          transition={{ duration:0.3 }}>
          {renderPage()}
        </motion.div>
      </AnimatePresence>

      <Footer setActivePage={handleSetPage} />
      <FloatingButtons />
    </div>
  );
}
