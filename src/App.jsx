import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const PHONE = "9493995503";
const WHATSAPP_LINK = `https://wa.me/91${PHONE}`;
const CALL_LINK = `tel:+91${PHONE}`;
const MAPS_LINK = "https://maps.app.goo.gl/Pd5rqBa3Z9yGQtn29";
const LOGO = "/assets/logo.png";

const TOPBAR_H = 36;
const NAV_H = 70;
const HEADER_TOTAL = TOPBAR_H + NAV_H;

function serviceImg(f, fb) { return { src: `/assets/services/${f}`, fallback: fb }; }
function heroImg(f, fb)    { return { src: `/assets/hero/${f}`, fallback: fb }; }

const SERVICES = [
  { id:"women",     icon:"👗", title:"Designer Wear & Women's Ethnic", color:"#0a5f55", ...serviceImg("women-ethnic.jpg","https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80"), items:["Wedding gowns & bridal lehengas","Designer salwar suits & anarkalis","Embroidered & zardozi work garments","Delicate lace & chiffon wear"] },
  { id:"saree",     icon:"🥻", title:"Saree & Silk Care",                color:"#1a8a7a", ...serviceImg("saree-silk.jpg","https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&q=80"), items:["Banarasi, Kanjivaram & pure silk sarees","Wool, georgette & chiffon sarees","Fabric-specific gentle dry cleaning","Colour-safe stain removal"] },
  { id:"mensformal",icon:"🤵", title:"Sherwanis & Men's Formal",         color:"#0e7a6d", ...serviceImg("sherwanis-mens.jpg","https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"), items:["Wedding sherwanis & achkans","Bandhgala & jodhpuri suits","Blazers, tuxedos & formal coats","Embroidered kurtas & ethnic wear"] },
  { id:"everyday",  icon:"👔", title:"Everyday Garments",                color:"#2eaa96", ...serviceImg("everyday-garments.jpg","https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80"), items:["Business suits, blazers & jackets","Dresses, skirts & formal trousers","Shirts, sarees & casual wear","Steam pressing & crisp finishing"] },
  { id:"curtains",  icon:"🏠", title:"Curtains & Drapes",                color:"#0a5f55", ...serviceImg("curtains-drapes.jpg","https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80"), items:["All fabric curtains & drapes","Sheer, velvet & blackout curtains","Careful hanging & folding after clean","Odour & dust removal treatment"] },
  { id:"sofa",      icon:"🛋️",title:"Sofa Covers & Cushions",          color:"#1a8a7a", ...serviceImg("sofa-cushions.jpg","https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80"), items:["Sofa cover & slipcover cleaning","Cushion cover & throw pillow cleaning","Fabric & leather sofa accessories","Stain removal & deodorising"] },
  { id:"carpet",    icon:"🧹", title:"Carpet & Rug Cleaning",            color:"#0e7a6d", ...serviceImg("carpet-rug.jpg","https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&q=80"), items:["Persian, wool & synthetic carpets","Area rugs & door mats","Deep stain & odour extraction","Colour restoration treatment"] },
  { id:"misc",      icon:"✨", title:"Miscellaneous & Other Services",  color:"#2eaa96", ...serviceImg("misc-services.jpg","https://images.unsplash.com/photo-1521577352947-9bb58764b69a?w=600&q=80"), items:["Shoe & footwear cleaning (leather, suede, sneakers)","Bags, purses & leather accessories","Blankets, quilts & bed covers","Leather jackets & specialty garments"] },
];

const HERO_SLIDES = [
  { ...heroImg("hero-1.jpg","https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1400&q=80"), caption:"Premium Dry Cleaning",    sub:"Trusted since 2001" },
  { ...heroImg("hero-2.jpg","https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1400&q=80"), caption:"Sarees & Silk Care",     sub:"Fabric-specific expertise" },
  { ...heroImg("hero-3.jpg","https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1400&q=80"), caption:"Designer & Bridal Wear", sub:"Wedding gowns · Lehengas · Sherwanis" },
  { ...heroImg("hero-4.jpg","https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1400&q=80"), caption:"Household Textiles",      sub:"Curtains · Carpets · Sofa Covers" },
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

const GLOBAL_CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { overflow-x: hidden; -webkit-font-smoothing: antialiased; }

  .services-grid { display: grid; gap: 20px; grid-template-columns: 1fr; }
  @media (min-width: 640px) { .services-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (min-width: 1024px) { .services-grid { grid-template-columns: repeat(4, 1fr); } }

  .reviews-grid { display: grid; gap: 20px; grid-template-columns: 1fr; }
  @media (min-width: 640px) { .reviews-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (min-width: 1024px) { .reviews-grid { grid-template-columns: repeat(3, 1fr); } }

  .features-grid { display: grid; gap: 20px; grid-template-columns: 1fr; }
  @media (min-width: 640px) { .features-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (min-width: 1024px) { .features-grid { grid-template-columns: repeat(4, 1fr); } }

  .contact-grid { display: grid; gap: 20px; grid-template-columns: 1fr; }
  @media (min-width: 640px) { .contact-grid { grid-template-columns: repeat(3, 1fr); } }

  .desktop-nav { display: flex; }
  .mobile-menu-btn { display: none !important; }
  @media (max-width: 768px) {
    .desktop-nav { display: none !important; }
    .mobile-menu-btn { display: flex !important; }
  }

  .topbar-location { display: flex; }
  @media (max-width: 480px) {
    .topbar-location { display: none; }
  }

  .hero-tagline {
    font-family: 'DM Sans', sans-serif;
    font-size: clamp(14px, 3vw, 18px);
    color: rgba(255,255,255,0.7);
    letter-spacing: 0.5px;
    margin-bottom: 32px;
    text-shadow: 0 2px 8px rgba(0,0,0,0.5);
  }

  .contact-info-wrap { display: flex; flex-wrap: wrap; gap: 28px; align-items: center; }
  @media (max-width: 640px) { .contact-info-wrap { flex-direction: column; align-items: flex-start; } }

  /* ── Modern Mobile-First Stats Bar ── */
  .stats-bar {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px 10px;
    padding: 24px 5%;
  }
  @media (min-width: 768px) {
    .stats-bar {
      display: flex;
      justify-content: center;
      gap: clamp(40px, 6vw, 80px);
      padding: 24px 5%;
    }
  }

  .hero-btns {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
  }
  @media (max-width: 480px) {
    .hero-btns { flex-direction: column; padding: 0 20px; }
    .hero-btns > * { width: 100%; justify-content: center; }
  }

  .about-hero { display: flex; flex-wrap: wrap; align-items: center; gap: 32px; padding: 60px 5%; background: linear-gradient(135deg,#0a5f55,#2eaa96); }
  .why-us-inner { display: flex; flex-wrap: wrap; gap: 36px; align-items: center; max-width: 1100px; margin: 0 auto; }
  .why-us-badges { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; flex: 1 1 240px; }
  .footer-grid { display: grid; gap: 32px; grid-template-columns: 1fr; }
  @media (min-width: 640px) { .footer-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (min-width: 1024px) { .footer-grid { grid-template-columns: repeat(4, 1fr); } }
`;

function TopBar() {
  return (
    <div style={{
      background:"#111", borderBottom:"1px solid rgba(255,255,255,0.08)",
      height: TOPBAR_H,
      padding:"0 5%", display:"flex", alignItems:"center",
      justifyContent:"space-between", flexWrap:"nowrap", gap:8,
      fontSize:12, fontFamily:"'DM Sans',sans-serif", color:"rgba(255,255,255,0.7)",
      position:"fixed", top:0, left:0, right:0, zIndex:1100,
    }}>
      <div style={{ display:"flex", alignItems:"center", gap:6, fontWeight:600 }}>
        <span style={{ color:"#2eaa96", fontSize:13 }}>📞</span>
        <a href={CALL_LINK} style={{ color:"#fff", textDecoration:"none", letterSpacing: 0.5 }}>+91 {PHONE}</a>
      </div>
      <div className="topbar-location" style={{ alignItems:"center", gap:6 }}>
        <span>📍</span><span>Hyderabad, Telangana</span>
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:6, flexShrink:0 }}>
        <span>🕐</span><span>Mon–Sat: 8:00 AM – 8:00 PM</span>
      </div>
    </div>
  );
}

function Navbar({ activePage, setActivePage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", s);
    return () => window.removeEventListener("scroll", s);
  }, []);
  
  const links = ["Home","Services","About","Reviews","Contact"];
  const isSolid = scrolled || menuOpen;
  
  return (
    <>
      <nav style={{
        position:"fixed",
        top: TOPBAR_H,
        left:0, right:0, zIndex:1000,
        background: isSolid ? "rgba(255,255,255,0.98)" : "transparent",
        backdropFilter: isSolid ? "blur(20px)" : "none",
        boxShadow: isSolid ? "0 4px 30px rgba(0,0,0,0.06)" : "none",
        transition:"all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        borderBottom: isSolid ? "1px solid rgba(0,0,0,0.04)" : "1px solid rgba(255,255,255,0.1)",
      }}>
        <div style={{
          maxWidth:1200, margin:"0 auto",
          display:"flex", alignItems:"center", justifyContent:"space-between",
          height: NAV_H, padding:"0 5%",
        }}>
          <button onClick={() => { setActivePage("Home"); setMenuOpen(false); }}
            style={{ background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:12, padding:0, flexShrink:0 }}>
            <div style={{ 
              height:40, width:40, borderRadius:8, overflow: 'hidden',
              background: isSolid ? "#0a5f55" : "rgba(255,255,255,0.1)",
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: "blur(8px)", transition: "all 0.3s"
            }}>
              <img src={LOGO} alt="Logo" style={{ height: 28, width: 28, objectFit: "contain", filter: isSolid ? "brightness(0) invert(1)" : "none" }} />
            </div>
            <div style={{ lineHeight:1.15, textAlign: "left" }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:17, color: isSolid ? "#111" : "#fff", transition:"color 0.3s" }}>BOMBAY</div>
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:9, color: isSolid ? "#2eaa96" : "rgba(255,255,255,0.7)", letterSpacing:3.5, transition:"color 0.3s" }}>DRYCLEANERS</div>
            </div>
          </button>

          <div className="desktop-nav" style={{ gap:28, alignItems:"center" }}>
            {links.map(l => (
              <button key={l} onClick={() => setActivePage(l)} style={{
                background:"none", border:"none", cursor:"pointer",
                fontFamily:"'DM Sans',sans-serif", fontWeight: activePage===l ? 700 : 500,
                fontSize:14, letterSpacing:0.3,
                color: isSolid 
                  ? (activePage===l ? "#0a5f55" : "#444") 
                  : (activePage===l ? "#fff" : "rgba(255,255,255,0.75)"),
                position: "relative",
                padding: "4px 0",
                transition:"color 0.3s",
              }}>
                {l}
                {activePage === l && (
                  <motion.div layoutId="nav-indicator" 
                    style={{ position: "absolute", bottom: -2, left: 0, right: 0, height: 2, background: isSolid ? "#0a5f55" : "#fff", borderRadius: 2 }} 
                  />
                )}
              </button>
            ))}
            <a href={CALL_LINK} style={{
              background: isSolid ? "#111" : "#fff", color: isSolid ? "#fff" : "#111",
              padding:"10px 24px", borderRadius:30, fontFamily:"'DM Sans',sans-serif",
              fontWeight:700, fontSize:13, textDecoration:"none",
              transition:"all 0.3s", whiteSpace:"nowrap",
            }}>Call Now</a>
          </div>

          <button className="mobile-menu-btn" onClick={() => setMenuOpen(o => !o)}
            style={{ background:"none", border:"none", cursor:"pointer", flexDirection:"column", gap:5, padding:6 }}>
            {[0,1,2].map(i => (
              <div key={i} style={{
                width:24, height:2, borderRadius:2, transition:"all 0.3s",
                background: isSolid ? "#111" : "#fff",
                transform: menuOpen && i===0 ? "rotate(45deg) translate(5px,5px)" :
                           menuOpen && i===1 ? "scaleX(0)" :
                           menuOpen && i===2 ? "rotate(-45deg) translate(5px,-5px)" : "none",
              }} />
            ))}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }} exit={{ height:0, opacity:0 }}
              style={{ overflow:"hidden", background:"#fff", borderTop:"1px solid #f0f0f0" }}>
              <div style={{ padding:"16px 5% 24px", display:"flex", flexDirection:"column", gap:6 }}>
                {links.map(l => (
                  <button key={l} onClick={() => { setActivePage(l); setMenuOpen(false); }} style={{
                    background: activePage===l ? "#f4fcfb" : "none", border:"none", cursor:"pointer",
                    padding:"14px 16px", borderRadius:12, textAlign:"left",
                    fontFamily:"'DM Sans',sans-serif", fontWeight: activePage===l ? 700 : 500,
                    fontSize:16, color: activePage===l ? "#0a5f55" : "#333",
                  }}>{l}</button>
                ))}
                <a href={CALL_LINK} style={{
                  background:"#111", color:"#fff",
                  padding:"16px", borderRadius:12, textDecoration:"none",
                  fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:15,
                  textAlign:"center", marginTop:12,
                }}>📞 +91 {PHONE}</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}

function HeroSection({ setActivePage }) {
  const [current, setCurrent] = useState(0);
  const [bgSrcs, setBgSrcs] = useState(HERO_SLIDES.map(s => s.src));
  
  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c+1) % HERO_SLIDES.length), 5500);
    return () => clearInterval(t);
  }, []);
  
  const handleBgErr = i => setBgSrcs(prev => { const n=[...prev]; n[i]=HERO_SLIDES[i].fallback; return n; });

  return (
    <section style={{ position:"relative", height:"100vh", minHeight:750, overflow:"hidden" }}>
      {HERO_SLIDES.map((s,i) => (
        <motion.div key={i}
          initial={{ opacity:0 }} animate={{ opacity: i===current ? 1 : 0 }}
          transition={{ duration:1.5, ease:"easeInOut" }}
          style={{ position:"absolute", inset:0 }}>
          <img src={bgSrcs[i]} alt="" style={{ display:"none" }} onError={() => handleBgErr(i)} />
          <div style={{ position:"absolute", inset:0, backgroundImage:`url(${bgSrcs[i]})`, backgroundSize:"cover", backgroundPosition:"center", transition:"transform 10s ease-out", transform: i===current ? "scale(1.08)" : "scale(1)" }} />
        </motion.div>
      ))}

      {/* Modern neutral gradient overlay for high contrast */}
      <div style={{ 
        position:"absolute", inset:0, 
        background:"linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.65) 60%, rgba(0,0,0,0.85) 100%)" 
      }} />

      <div style={{
        position:"relative", zIndex:2, height:"100%",
        display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
        textAlign:"center", padding:`${HEADER_TOTAL + 20}px 20px 140px`, 
      }}>

        <motion.div initial={{ opacity:0, y:-15 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2, duration:0.6 }}
          style={{ 
            background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.15)", 
            borderRadius:30, padding:"8px 20px", marginBottom:28, 
            backdropFilter:"blur(12px)", fontFamily:"'DM Sans',sans-serif", 
            color:"#fff", fontSize:11, letterSpacing:2.5, fontWeight:600, textTransform:"uppercase" 
          }}>
          ✦ Trusted Since 2001 ✦
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.h1 key={current}
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-20 }} transition={{ duration:0.5 }}
            style={{ 
              fontFamily:"'Playfair Display',serif", fontSize:"clamp(2.5rem, 8vw, 5.5rem)",
              color:"#fff", fontWeight:700, lineHeight:1.05, margin:"0 0 20px", 
              maxWidth:1000, textShadow:"0 4px 24px rgba(0,0,0,0.5)" 
            }}>
            {HERO_SLIDES[current].caption}
          </motion.h1>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.p key={`sub-${current}`}
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.4, delay:0.15 }}
            style={{ 
              color:"rgba(255,255,255,0.9)", fontFamily:"'DM Sans',sans-serif",
              fontSize:"clamp(16px, 4vw, 22px)", margin:"0 0 12px", fontWeight: 400,
              textShadow:"0 2px 12px rgba(0,0,0,0.5)" 
            }}>
            {HERO_SLIDES[current].sub}
          </motion.p>
        </AnimatePresence>

        <motion.p className="hero-tagline" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.35, duration:0.6 }}>
          From Nagpur Roots to Hyderabad Service
        </motion.p>

        <div className="hero-btns">
          <motion.button whileHover={{ scale:1.03, backgroundColor:"#fff", color:"#111" }} whileTap={{ scale:0.97 }}
            onClick={() => setActivePage("Services")}
            style={{ 
              background:"#2eaa96", color:"#fff", border:"none",
              padding:"16px 40px", borderRadius:30, cursor:"pointer",
              fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:"clamp(15px, 3vw, 16px)",
              transition:"all 0.3s ease" 
            }}>
            Explore Services
          </motion.button>
          
          <motion.a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"
            whileHover={{ scale:1.03, background:"rgba(255,255,255,0.2)" }} whileTap={{ scale:0.97 }}
            style={{ 
              background:"rgba(255,255,255,0.1)", color:"#fff", backdropFilter:"blur(12px)",
              border:"1px solid rgba(255,255,255,0.3)", padding:"16px 40px", borderRadius:30,
              textDecoration:"none", fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:"clamp(15px, 3vw, 16px)",
              display:"flex", alignItems:"center", gap:10, transition:"background 0.3s ease" 
            }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp Us
          </motion.a>
        </div>

        <div style={{ position:"absolute", bottom: "calc(20% + 40px)", display:"flex", gap:12 }}>
          {HERO_SLIDES.map((_,i) => (
            <button key={i} onClick={() => setCurrent(i)} style={{
              width: i===current ? 36 : 8, height:8, borderRadius:4,
              background: i===current ? "#fff" : "rgba(255,255,255,0.3)",
              border:"none", cursor:"pointer", transition:"all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            }} />
          ))}
        </div>
      </div>

      <div className="stats-bar" style={{
        position:"absolute", bottom:0, left:0, right:0,
        background:"rgba(255,255,255,0.98)",
        backdropFilter:"blur(20px)",
        borderTop:"1px solid rgba(0,0,0,0.05)",
        zIndex: 10
      }}>
        {[["23+","Years Experience"],["10000+","Happy Customers"],["25+","Fabric Types"],["100%","Satisfaction"]].map(([v,l]) => (
          <StatItemDark key={l} value={v} label={l} />
        ))}
      </div>
    </section>
  );
}

function StatItemDark({ value, label }) {
  const { ref, display } = useCounter(value);
  return (
    <div ref={ref} style={{ textAlign:"center", minWidth: 0 }}>
      <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(24px, 5vw, 32px)", fontWeight:700, color:"#111", lineHeight: 1.1 }}>{display}</div>
      <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"clamp(11px, 2vw, 13px)", color:"#666", letterSpacing:0.5, marginTop:4 }}>{label}</div>
    </div>
  );
}

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
               boxShadow:"0 3px 16px rgba(0,0,0,0.04)", border: "1px solid #f0f0f0", transition:"all 0.3s",
               display:"flex", flexDirection:"column" }}>
      <div style={{ height:200, overflow:"hidden", position:"relative", flexShrink:0 }}>
        <img src={imgSrc} alt={service.title} onError={() => setImgSrc(service.fallback)}
          style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }}
          onMouseOver={e => e.currentTarget.style.transform="scale(1.08)"}
          onMouseOut={e  => e.currentTarget.style.transform="scale(1)"} />
        <div style={{ position:"absolute", top:12, left:12, background:"#fff",
                      color:"#111", borderRadius:8, padding:"6px 12px",
                      fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:700, boxShadow:"0 2px 10px rgba(0,0,0,0.1)" }}>
          {service.icon}
        </div>
      </div>
      <div style={{ padding:"20px 22px 24px", flex:1 }}>
        <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:17, color:"#111",
                     margin:"0 0 12px", fontWeight:700, lineHeight:1.35 }}>{service.title}</h3>
        <ul style={{ listStyle:"none", padding:0, margin:0, display:"flex", flexDirection:"column", gap:8 }}>
          {service.items.map((it,j) => (
            <li key={j} style={{ display:"flex", gap:8, alignItems:"flex-start",
                                  fontFamily:"'DM Sans',sans-serif", fontSize:13, color:"#555", lineHeight:1.5 }}>
              <span style={{ color:"#2eaa96", fontWeight:700, flexShrink:0, marginTop:1 }}>✓</span>{it}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

function ServicesPage() {
  return (
    <div style={{ minHeight:"100vh", background:"#f9fcfb", paddingTop: HEADER_TOTAL }}>
      <div style={{ background:"linear-gradient(135deg,#0a5f55 0%,#1a8a7a 100%)", padding:"60px 5% 70px", textAlign:"center" }}>
        <motion.div initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.55 }}>
          <div style={{ color:"#a8e6de", fontFamily:"'DM Sans',sans-serif", letterSpacing:3, fontSize:11, marginBottom:12 }}>WHAT WE OFFER</div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(2rem,5vw,3.5rem)", color:"#fff", margin:"0 0 16px" }}>Our Services</h1>
          <p style={{ color:"rgba(255,255,255,0.8)", fontFamily:"'DM Sans',sans-serif", fontSize:"clamp(14px,2.5vw,17px)", maxWidth:560, margin:"0 auto" }}>
            Professional care for every garment, fabric, and textile — handled with expertise since 2001.
          </p>
        </motion.div>
      </div>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"60px 5%" }}>
        <div className="services-grid">
          {SERVICES.map((s,i) => <ServiceCard key={s.id} service={s} i={i} />)}
        </div>
      </div>
      <div style={{ textAlign:"center", padding:"0 5% 80px" }}>
        <motion.a href={CALL_LINK} whileHover={{ scale:1.04 }}
          style={{ background:"#111", color:"#fff", padding:"16px 40px", borderRadius:30,
                   textDecoration:"none", fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:"clamp(14px,2vw,16px)",
                   boxShadow:"0 8px 24px rgba(0,0,0,0.15)", display:"inline-block" }}>
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
          <div style={{ color:"#a8e6de", fontFamily:"'DM Sans',sans-serif", letterSpacing:3, fontSize:11, marginBottom:12 }}>OUR STORY</div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(2rem,5vw,3.5rem)", color:"#fff", marginBottom:20 }}>Over Two Decades of Trust</h1>
          <p style={{ color:"rgba(255,255,255,0.85)", fontFamily:"'DM Sans',sans-serif", fontSize:"clamp(14px,2.5vw,17px)", lineHeight:1.8, maxWidth:540 }}>
            Founded in 2001 with roots in Nagpur, Bombay Drycleaners has grown into a trusted name for garment care across Hyderabad — handling everything from everyday shirts to precious wedding lehengas.
          </p>
        </motion.div>
        <motion.div initial={{ opacity:0, x:36 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.65, delay:0.15 }}
          style={{ flex:"0 0 auto", display:"flex", justifyContent:"center" }}>
          <div style={{ width:220, height:220, borderRadius:"50%", background:"rgba(255,255,255,0.1)",
                        border:"2px solid rgba(255,255,255,0.25)", display:"flex", flexDirection:"column",
                        alignItems:"center", justifyContent:"center", backdropFilter:"blur(12px)" }}>
            <img src={LOGO} alt="Logo" style={{ width:84, height:84, objectFit:"contain", marginBottom:8, borderRadius:12 }} />
            <div style={{ fontFamily:"'Playfair Display',serif", color:"#a8e6de", fontSize:11, letterSpacing:2 }}>EST.</div>
            <div style={{ fontFamily:"'Playfair Display',serif", color:"#fff", fontSize:28, fontWeight:700, lineHeight:1 }}>2001</div>
          </div>
        </motion.div>
      </div>

      <div style={{ background:"#f9fcfb", padding:"70px 5%" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <h2 style={{ textAlign:"center", fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.6rem,4vw,2.2rem)", color:"#111", marginBottom:48 }}>
            Why Choose Bombay Drycleaners?
          </h2>
          <div className="features-grid">
            {features.map((f,i) => (
              <motion.div key={i} initial={{ opacity:0, y:26 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.08 }}
                style={{ background:"#fff", borderRadius:16, padding:"28px 24px", boxShadow:"0 4px 20px rgba(0,0,0,0.03)", borderTop:"4px solid #2eaa96" }}>
                <div style={{ fontSize:32, marginBottom:12 }}>{f.icon}</div>
                <h4 style={{ fontFamily:"'Playfair Display',serif", color:"#111", fontSize:17, marginBottom:10 }}>{f.title}</h4>
                <p style={{ fontFamily:"'DM Sans',sans-serif", color:"#666", fontSize:14, lineHeight:1.7 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background:"#fff", padding:"70px 5%", textAlign:"center" }}>
        <div style={{ display:"inline-flex", flexDirection:"column", alignItems:"center",
                      border:"1px solid #eaeaea", borderRadius:24, padding:"48px 64px",
                      background:"#fafafa", boxShadow: "0 10px 30px rgba(0,0,0,0.02)" }}>
          <img src={LOGO} alt="Logo" style={{ width:120, height:120, objectFit:"contain", marginBottom:16, borderRadius:16 }} />
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:28, fontWeight:700, color:"#111", letterSpacing:3 }}>BOMBAY</div>
          <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:"#2eaa96", letterSpacing:6, marginBottom:12, fontWeight: 600 }}>DRYCLEANERS</div>
          <div style={{ color:"#888", fontFamily:"'DM Sans',sans-serif", fontSize:12, letterSpacing:2, marginBottom:16 }}>SINCE 2001 · HYDERABAD</div>
          <a href={CALL_LINK} style={{ color:"#111", fontFamily:"'DM Sans',sans-serif", fontSize:16, fontWeight:700, textDecoration:"none" }}>📞 +91 {PHONE}</a>
        </div>
      </div>
    </div>
  );
}

function ReviewsPage() {
  return (
    <div style={{ minHeight:"100vh", background:"#f9fcfb", paddingTop: HEADER_TOTAL }}>
      <div style={{ background:"linear-gradient(135deg,#0a5f55,#1a8a7a)", padding:"60px 5% 70px", textAlign:"center" }}>
        <motion.div initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }}>
          <div style={{ color:"#a8e6de", fontFamily:"'DM Sans',sans-serif", letterSpacing:3, fontSize:11, marginBottom:12 }}>TESTIMONIALS</div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(2rem,5vw,3.5rem)", color:"#fff", marginBottom:12 }}>What Our Customers Say</h1>
          <div style={{ display:"flex", justifyContent:"center", gap:4, marginBottom:10 }}>
            {"★★★★★".split("").map((s,i) => <span key={i} style={{ color:"#ffd700", fontSize:24 }}>{s}</span>)}
          </div>
          <p style={{ color:"rgba(255,255,255,0.8)", fontFamily:"'DM Sans',sans-serif", fontSize:15 }}>4.9/5 average · 10,000+ satisfied customers</p>
        </motion.div>
      </div>
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"60px 5%" }}>
        <div className="reviews-grid">
          {REVIEWS.map((r,i) => (
            <motion.div key={i} initial={{ opacity:0, y:26 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.07 }}
              whileHover={{ y:-5, boxShadow:"0 8px 25px rgba(0,0,0,0.06)" }}
              style={{ background:"#fff", borderRadius:16, padding:"24px", boxShadow:"0 4px 16px rgba(0,0,0,0.03)", border: "1px solid #f0f0f0", transition:"all 0.3s" }}>
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
                <div style={{ width:46, height:46, borderRadius:"50%", background:"#f4fcfb", border: "1px solid #e0f5f1",
                              display:"flex", alignItems:"center", justifyContent:"center",
                              color:"#0a5f55", fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:14, flexShrink:0 }}>{r.avatar}</div>
                <div>
                  <div style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:700, color:"#111", fontSize:14 }}>{r.name}</div>
                  <div style={{ fontFamily:"'DM Sans',sans-serif", color:"#888", fontSize:12 }}>{r.date}</div>
                </div>
              </div>
              <div style={{ display:"flex", gap:2, marginBottom:12 }}>
                {Array.from({ length:r.rating }).map((_,j) => <span key={j} style={{ color:"#ffd700", fontSize:14 }}>★</span>)}
              </div>
              <p style={{ fontFamily:"'DM Sans',sans-serif", color:"#555", fontSize:14, lineHeight:1.7, margin:0 }}>"{r.text}"</p>
            </motion.div>
          ))}
        </div>
      </div>
      <div style={{ textAlign:"center", padding:"0 5% 80px" }}>
        <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer"
          style={{ display:"inline-flex", alignItems:"center", gap:10, background:"#fff",
                   border:"1px solid #eaeaea", color:"#111", padding:"14px 30px", borderRadius:30,
                   textDecoration:"none", fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:15,
                   boxShadow:"0 4px 16px rgba(0,0,0,0.05)" }}>
          <span>📍</span> View on Google Maps & Leave a Review
        </a>
      </div>
    </div>
  );
}

function ContactPage() {
  return (
    <div style={{ minHeight:"100vh", paddingTop: HEADER_TOTAL, background:"#f9fcfb" }}>
      <div style={{ background:"linear-gradient(135deg,#0a5f55,#2eaa96)", padding:"60px 5% 70px", textAlign:"center" }}>
        <motion.div initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }}>
          <div style={{ color:"#a8e6de", fontFamily:"'DM Sans',sans-serif", letterSpacing:3, fontSize:11, marginBottom:12 }}>GET IN TOUCH</div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(2rem,5vw,3.5rem)", color:"#fff", marginBottom:12 }}>Contact Us</h1>
          <p style={{ color:"rgba(255,255,255,0.85)", fontFamily:"'DM Sans',sans-serif", fontSize:16 }}>Call, WhatsApp, or find us on the map.</p>
        </motion.div>
      </div>

      <div style={{ maxWidth:1000, margin:"0 auto", padding:"60px 5% 30px" }}>
        <div className="contact-grid">
          {[
            { icon:"📞", title:"Call Us",       detail:`+91 ${PHONE}`,      sub:"Mon–Sat: 8:00 AM – 8:00 PM", bg:"#111",     href:CALL_LINK,       cta:"Call Now" },
            { icon:"💬", title:"WhatsApp",       detail:`+91 ${PHONE}`,      sub:"Chat with us anytime",        bg:"#25D366",  href:WHATSAPP_LINK,   cta:"Open WhatsApp" },
            { icon:"📍", title:"Find Us",        detail:"Bombay Drycleaners",sub:"Hyderabad, Telangana",        bg:"#e74c3c",  href:MAPS_LINK,       cta:"Open Maps" },
          ].map((c,i) => (
            <motion.div key={i} initial={{ opacity:0, y:26 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.1 }}
              whileHover={{ y:-5 }}
              style={{ background:"#fff", borderRadius:20, overflow:"hidden", boxShadow:"0 4px 20px rgba(0,0,0,0.04)", border: "1px solid #f0f0f0" }}>
              <div style={{ background:c.bg, padding:"32px 20px", textAlign:"center" }}>
                <div style={{ fontSize:44 }}>{c.icon}</div>
              </div>
              <div style={{ padding:"24px 20px 28px", textAlign:"center" }}>
                <h3 style={{ fontFamily:"'Playfair Display',serif", color:"#111", fontSize:18, marginBottom:8 }}>{c.title}</h3>
                <p style={{ fontFamily:"'DM Sans',sans-serif", color:"#333", fontWeight:700, fontSize:16, marginBottom:4 }}>{c.detail}</p>
                <p style={{ fontFamily:"'DM Sans',sans-serif", color:"#888", fontSize:13, marginBottom:20 }}>{c.sub}</p>
                <motion.a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                  whileHover={{ scale:1.05 }}
                  style={{ display:"inline-block", background:c.bg, color:"#fff", padding:"12px 26px",
                           borderRadius:24, textDecoration:"none", fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:14 }}>
                  {c.cta}
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth:1000, margin:"0 auto 80px", padding:"0 5%" }}>
        <motion.div initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          style={{ background:"#fff", borderRadius:20, padding:"40px", boxShadow:"0 4px 24px rgba(0,0,0,0.03)", border: "1px solid #eaeaea" }}>
          <div className="contact-info-wrap">
            <img src={LOGO} alt="Logo" style={{ width:100, height:100, objectFit:"contain", borderRadius:16, flexShrink:0, background: "#fafafa", padding: 8 }} />
            <div style={{ flex:"1 1 240px" }}>
              <h3 style={{ fontFamily:"'Playfair Display',serif", color:"#111", fontSize:22, marginBottom:16 }}>Bombay Drycleaners</h3>
              {[
                ["📍 Location","Hyderabad, Telangana, India"],
                ["🕐 Hours","Monday – Saturday: 8:00 AM – 8:00 PM"],
                ["📞 Phone",`+91 ${PHONE}`],
                ["💬 WhatsApp",`+91 ${PHONE}`],
                ["📅 Established","2001"],
              ].map(([lbl,val]) => (
                <div key={lbl} style={{ display:"flex", gap:12, marginBottom:8 }}>
                  <span style={{ fontFamily:"'DM Sans',sans-serif", color:"#888", fontSize:13, minWidth:110 }}>{lbl}</span>
                  <span style={{ fontFamily:"'DM Sans',sans-serif", color:"#333", fontSize:13, fontWeight:600 }}>{val}</span>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:12, alignItems:"stretch", minWidth:160 }}>
              <a href={CALL_LINK} style={{ background:"#111", color:"#fff", padding:"14px 20px", borderRadius:24, textDecoration:"none", fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:14, textAlign:"center" }}>📞 Call Now</a>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ background:"#25D366", color:"#fff", padding:"14px 20px", borderRadius:24, textDecoration:"none", fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:14, textAlign:"center" }}>💬 WhatsApp</a>
              <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" style={{ background:"#e74c3c", color:"#fff", padding:"14px 20px", borderRadius:24, textDecoration:"none", fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:14, textAlign:"center" }}>📍 Directions</a>
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

      <section style={{ background:"#f9fcfb", padding:"80px 5%" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <motion.div initial={{ opacity:0, y:26 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            style={{ textAlign:"center", marginBottom:50 }}>
            <div style={{ color:"#2eaa96", fontFamily:"'DM Sans',sans-serif", letterSpacing:3, fontSize:12, marginBottom:10, fontWeight:600 }}>WHAT WE DO</div>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.8rem,4vw,2.5rem)", color:"#111", marginBottom:14 }}>
              Complete Garment & Textile Care
            </h2>
            <p style={{ fontFamily:"'DM Sans',sans-serif", color:"#666", fontSize:"clamp(14px,2vw,16px)", maxWidth:520, margin:"0 auto", lineHeight: 1.6 }}>
              All 8 services — from everyday wardrobe to precious heirlooms, expert care since 2001.
            </p>
          </motion.div>
          <div className="services-grid">
            {SERVICES.map((s,i) => <ServiceCard key={s.id} service={s} i={i} />)}
          </div>
        </div>
      </section>

      <section style={{ background:"#111", padding:"80px 5%" }}>
        <div className="why-us-inner">
          <motion.div initial={{ opacity:0, x:-26 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} style={{ flex:"1 1 280px" }}>
            <div style={{ color:"#2eaa96", fontFamily:"'DM Sans',sans-serif", letterSpacing:3, fontSize:12, marginBottom:12, fontWeight:600 }}>TRUSTED BY THOUSANDS</div>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.8rem,4vw,2.5rem)", color:"#fff", marginBottom:16 }}>
              Hyderabad's Most Trusted Drycleaners
            </h2>
            <p style={{ color:"rgba(255,255,255,0.7)", fontFamily:"'DM Sans',sans-serif", fontSize:"clamp(14px,2vw,16px)", lineHeight:1.8 }}>
              With over 23 years of service — from Nagpur roots to Hyderabad hearts — Bombay Drycleaners handles everything from everyday clothing to priceless wedding wear.
            </p>
            <div style={{ display:"flex", gap:12, marginTop:30, flexWrap:"wrap" }}>
              <a href={CALL_LINK} style={{ background:"#fff", color:"#111", padding:"12px 24px", borderRadius:30, textDecoration:"none", fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:14 }}>📞 Call: {PHONE}</a>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ background:"#25D366", color:"#fff", padding:"12px 24px", borderRadius:30, textDecoration:"none", fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:14 }}>💬 WhatsApp</a>
            </div>
          </motion.div>
          <motion.div initial={{ opacity:0, x:26 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}>
            <div className="why-us-badges">
              {[["🌿","Eco-Friendly"],["⚡","Fast Turnaround"],["🔒","100% Safe"],["⭐","5-Star Rated"]].map(([ic,lb]) => (
                <div key={lb} style={{ background:"rgba(255,255,255,0.05)", borderRadius:16, padding:"20px 16px", textAlign:"center", border:"1px solid rgba(255,255,255,0.08)" }}>
                  <div style={{ fontSize:32, marginBottom:10 }}>{ic}</div>
                  <div style={{ fontFamily:"'DM Sans',sans-serif", color:"#fff", fontWeight:600, fontSize:13 }}>{lb}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section style={{ background:"#fff", padding:"80px 5%" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <motion.div initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            style={{ textAlign:"center", marginBottom:44 }}>
            <div style={{ color:"#2eaa96", fontFamily:"'DM Sans',sans-serif", letterSpacing:3, fontSize:12, marginBottom:10, fontWeight:600 }}>TESTIMONIALS</div>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.8rem,4vw,2.5rem)", color:"#111" }}>What Our Customers Say</h2>
          </motion.div>
          <div className="reviews-grid" style={{ gridTemplateColumns:undefined }}>
            {REVIEWS.slice(0,3).map((r,i) => (
              <motion.div key={i} initial={{ opacity:0, y:22 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.08 }}
                style={{ background:"#fff", borderRadius:16, padding:"24px", boxShadow:"0 4px 20px rgba(0,0,0,0.04)", border: "1px solid #f0f0f0" }}>
                <div style={{ display:"flex", gap:12, alignItems:"center", marginBottom:14 }}>
                  <div style={{ width:42, height:42, borderRadius:"50%", background:"#f4fcfb", border:"1px solid #e0f5f1", display:"flex", alignItems:"center", justifyContent:"center", color:"#0a5f55", fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:14, flexShrink:0 }}>{r.avatar}</div>
                  <div>
                    <div style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:700, color:"#111", fontSize:14 }}>{r.name}</div>
                    <div style={{ color:"#ffd700", fontSize:12 }}>{"★".repeat(r.rating)}</div>
                  </div>
                </div>
                <p style={{ fontFamily:"'DM Sans',sans-serif", color:"#555", fontSize:14, lineHeight:1.7, margin:0 }}>"{r.text}"</p>
              </motion.div>
            ))}
          </div>
          <div style={{ textAlign:"center", marginTop:40 }}>
            <motion.button whileHover={{ scale:1.05 }} onClick={() => setActivePage("Reviews")}
              style={{ background:"none", border:"2px solid #111", color:"#111", padding:"12px 32px", borderRadius:30, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:14 }}>
              Read All Reviews →
            </motion.button>
          </div>
        </div>
      </section>
    </>
  );
}

function Footer({ setActivePage }) {
  return (
    <footer style={{ background:"#0a0a0a", color:"#fff", padding:"60px 5% 30px" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div className="footer-grid" style={{ paddingBottom:40, borderBottom:"1px solid rgba(255,255,255,0.1)" }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
              <div style={{ background: "#fff", padding: 4, borderRadius: 8 }}>
                 <img src={LOGO} alt="Logo" style={{ width:36, height:36, objectFit:"contain" }} />
              </div>
              <div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:16, color:"#fff" }}>BOMBAY</div>
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:9, fontWeight: 600, color:"#2eaa96", letterSpacing:3.5 }}>DRYCLEANERS</div>
              </div>
            </div>
            <p style={{ fontFamily:"'DM Sans',sans-serif", color:"rgba(255,255,255,0.6)", fontSize:13, lineHeight:1.8 }}>
              Premium garment care trusted by Hyderabad families since 2001.
            </p>
          </div>
          <div>
            <h4 style={{ fontFamily:"'DM Sans',sans-serif", color:"#fff", fontSize:11, letterSpacing:2, marginBottom:16, fontWeight:700 }}>QUICK LINKS</h4>
            {["Home","Services","About","Reviews","Contact"].map(l => (
              <button key={l} onClick={() => setActivePage(l)} style={{ display:"block", background:"none", border:"none", cursor:"pointer", color:"rgba(255,255,255,0.6)", fontFamily:"'DM Sans',sans-serif", fontSize:14, padding:"4px 0", textAlign:"left", transition:"color 0.2s" }} onMouseOver={e=>e.target.style.color="#fff"} onMouseOut={e=>e.target.style.color="rgba(255,255,255,0.6)"}>{l}</button>
            ))}
          </div>
          <div>
            <h4 style={{ fontFamily:"'DM Sans',sans-serif", color:"#fff", fontSize:11, letterSpacing:2, marginBottom:16, fontWeight:700 }}>SERVICES</h4>
            {["Saree & Silk Care","Bridal Lehengas","Sherwanis & Suits","Curtains & Drapes","Carpet & Rug","Shoes & Bags"].map(s => (
              <div key={s} style={{ color:"rgba(255,255,255,0.6)", fontFamily:"'DM Sans',sans-serif", fontSize:14, padding:"4px 0" }}>{s}</div>
            ))}
          </div>
          <div>
            <h4 style={{ fontFamily:"'DM Sans',sans-serif", color:"#fff", fontSize:11, letterSpacing:2, marginBottom:16, fontWeight:700 }}>CONTACT</h4>
            <a href={CALL_LINK} style={{ display:"block", color:"rgba(255,255,255,0.6)", fontFamily:"'DM Sans',sans-serif", fontSize:14, textDecoration:"none", padding:"4px 0", transition:"color 0.2s" }} onMouseOver={e=>e.target.style.color="#fff"} onMouseOut={e=>e.target.style.color="rgba(255,255,255,0.6)"}>📞 +91 {PHONE}</a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ display:"block", color:"rgba(255,255,255,0.6)", fontFamily:"'DM Sans',sans-serif", fontSize:14, textDecoration:"none", padding:"4px 0", transition:"color 0.2s" }} onMouseOver={e=>e.target.style.color="#fff"} onMouseOut={e=>e.target.style.color="rgba(255,255,255,0.6)"}>💬 WhatsApp Us</a>
            <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" style={{ display:"block", color:"rgba(255,255,255,0.6)", fontFamily:"'DM Sans',sans-serif", fontSize:14, textDecoration:"none", padding:"4px 0", transition:"color 0.2s" }} onMouseOver={e=>e.target.style.color="#fff"} onMouseOut={e=>e.target.style.color="rgba(255,255,255,0.6)"}>📍 Get Directions</a>
            <div style={{ color:"rgba(255,255,255,0.4)", fontFamily:"'DM Sans',sans-serif", fontSize:12, marginTop:10 }}>Mon–Sat: 8am – 8pm</div>
          </div>
        </div>
        <div style={{ paddingTop:24, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:16 }}>
          <div style={{ fontFamily:"'DM Sans',sans-serif", color:"rgba(255,255,255,0.4)", fontSize:13 }}>
          © 2026 Bombay Drycleaners. All rights reserved. Since 2001. Created by 
            <a href="https://localrizz.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ color:"#fff", marginLeft:6, textDecoration:"none", fontWeight:600 }}>LocalRizz</a>
        </div>
          <div style={{ display:"flex", gap:10 }}>
            <a href={CALL_LINK} style={{ background:"#fff", color:"#111", padding:"8px 16px", borderRadius:20, textDecoration:"none", fontFamily:"'DM Sans',sans-serif", fontSize:12, fontWeight:700 }}>📞 Call</a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ background:"#25D366", color:"#fff", padding:"8px 16px", borderRadius:20, textDecoration:"none", fontFamily:"'DM Sans',sans-serif", fontSize:12, fontWeight:700 }}>💬 WhatsApp</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FloatingButtons() {
  return (
    <div style={{ position:"fixed", bottom:24, right:20, zIndex:1200, display:"flex", flexDirection:"column", gap:14 }}>
      <motion.a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" whileHover={{ scale:1.1 }} whileTap={{ scale:0.95 }}
        style={{ width:56, height:56, borderRadius:"50%", background:"#25D366", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 6px 20px rgba(37,211,102,0.3)", textDecoration:"none" }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </motion.a>
      <motion.a href={CALL_LINK} whileHover={{ scale:1.1 }} whileTap={{ scale:0.95 }}
        style={{ width:56, height:56, borderRadius:"50%", background:"#111", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 6px 20px rgba(0,0,0,0.2)", textDecoration:"none" }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
      </motion.a>
    </div>
  );
}

export default function App() {
  const [activePage, setActivePage] = useState("Home");
  const handleSetPage = page => { setActivePage(page); window.scrollTo({ top:0, behavior:"smooth" }); };

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);

    let fav = document.querySelector("link[rel='icon']");
    if (!fav) { fav = document.createElement("link"); fav.rel = "icon"; document.head.appendChild(fav); }
    fav.type = "image/png"; fav.href = LOGO;

    document.body.style.margin  = "0";
    document.body.style.padding = "0";
    document.body.style.overflowX = "hidden";
    document.body.style.backgroundColor = "#f9fcfb";
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
    <div style={{ fontFamily:"'DM Sans',sans-serif" }}>
      <style>{GLOBAL_CSS}</style>

      <TopBar />
      <Navbar activePage={activePage} setActivePage={handleSetPage} />

      <AnimatePresence mode="wait">
        <motion.div key={activePage}
          initial={{ opacity:0, y:15 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-15 }}
          transition={{ duration:0.4, ease: [0.16, 1, 0.3, 1] }}>
          {renderPage()}
        </motion.div>
      </AnimatePresence>

      <Footer setActivePage={handleSetPage} />
      <FloatingButtons />
    </div>
  );
}