import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

// ─── LOGO (SVG-based, number updated to +91 9493995503) ────────────────────────
const LOGO_SVG = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0a5f55"/>
      <stop offset="100%" style="stop-color:#2eaa96"/>
    </linearGradient>
  </defs>
  <rect width="200" height="200" rx="28" fill="url(#bg)"/>
  <text x="100" y="62" font-family="Georgia,serif" font-size="52" font-weight="bold" fill="white" text-anchor="middle">BD</text>
  <text x="100" y="90" font-family="Georgia,serif" font-size="13" fill="rgba(255,255,255,0.85)" text-anchor="middle" letter-spacing="2">BOMBAY</text>
  <text x="100" y="108" font-family="Georgia,serif" font-size="9" fill="rgba(255,255,255,0.7)" text-anchor="middle" letter-spacing="2">DRYCLEANERS</text>
  <line x1="30" y1="118" x2="170" y2="118" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
  <text x="100" y="134" font-family="Arial,sans-serif" font-size="9.5" fill="rgba(255,255,255,0.9)" text-anchor="middle" font-weight="bold">+91 9493995503</text>
  <text x="100" y="150" font-family="Arial,sans-serif" font-size="7.5" fill="rgba(255,255,255,0.6)" text-anchor="middle">SINCE 2001</text>
</svg>`)}`;

// ─── CONSTANTS ─────────────────────────────────────────────────────────────────
const PHONE = "9493995503";
const WHATSAPP_LINK = `https://wa.me/91${PHONE}`;
const CALL_LINK = `tel:+91${PHONE}`;
const MAPS_LINK = "https://maps.app.goo.gl/Pd5rqBa3Z9yGQtn29";

// ─── TOP INFO BAR (like Fit & Shine reference) ─────────────────────────────────
function TopBar() {
  return (
    <div style={{
      background: "#f5f0e8", borderBottom: "1px solid #e0d8c8",
      padding: "7px 5%", display: "flex", alignItems: "center",
      justifyContent: "space-between", flexWrap: "wrap", gap: 8,
      fontSize: 13, fontFamily: "'DM Sans',sans-serif", color: "#555",
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 600, color: "#0a5f55" }}>
        <span style={{ color: "#e74c3c" }}>📞</span>
        <a href={CALL_LINK} style={{ color: "#0a5f55", textDecoration: "none", fontWeight: 700 }}>+91 {PHONE}</a>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#555", textAlign: "center", fontSize: 12 }}>
        <span>📍</span>
        <span style={{ fontWeight: 500 }}>Hyderabad, Telangana</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#555", fontSize: 12 }}>
        <span>🕐</span>
        <span>Mon–Sat: 8:00 AM – 8:00 PM</span>
      </div>
    </div>
  );
}

// ─── SERVICES DATA (updated, no shoe cleaning in main) ─────────────────────────
const SERVICES = [
  {
    id: "women",
    icon: "👗",
    title: "Designer Wear & Women's Ethnic",
    color: "#0a5f55",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80",
    items: [
      "Wedding gowns & bridal lehengas",
      "Designer salwar suits & anarkalis",
      "Embroidered & zardozi work garments",
      "Delicate lace & chiffon wear",
    ],
  },
  {
    id: "saree",
    icon: "🥻",
    title: "Saree & Silk Care",
    color: "#1a8a7a",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&q=80",
    items: [
      "Banarasi, Kanjivaram & pure silk sarees",
      "Wool, georgette & chiffon sarees",
      "Fabric-specific gentle dry cleaning",
      "Colour-safe stain removal",
    ],
  },
  {
    id: "mensformal",
    icon: "🤵",
    title: "Sherwanis & Men's Formal",
    color: "#0e7a6d",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    items: [
      "Wedding sherwanis & achkans",
      "Bandhgala & jodhpuri suits",
      "Blazers, tuxedos & formal coats",
      "Embroidered kurtas & ethnic wear",
    ],
  },
  {
    id: "everyday",
    icon: "👔",
    title: "Everyday Garments",
    color: "#2eaa96",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80",
    items: [
      "Business suits, blazers & jackets",
      "Dresses, skirts & formal trousers",
      "Shirts, sarees & casual wear",
      "Steam pressing & crisp finishing",
    ],
  },
  {
    id: "curtains",
    icon: "🏠",
    title: "Curtains & Drapes",
    color: "#0a5f55",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
    items: [
      "All fabric curtains & drapes",
      "Sheer, velvet & blackout curtains",
      "Careful hanging & folding after clean",
      "Odour & dust removal treatment",
    ],
  },
  {
    id: "sofa",
    icon: "🛋️",
    title: "Sofa Covers & Cushions",
    color: "#1a8a7a",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    items: [
      "Sofa cover & slipcover cleaning",
      "Cushion cover & throw pillow cleaning",
      "Fabric & leather sofa accessories",
      "Stain removal & deodorising",
    ],
  },
  {
    id: "carpet",
    icon: "🧹",
    title: "Carpet & Rug Cleaning",
    color: "#0e7a6d",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&q=80",
    items: [
      "Persian, wool & synthetic carpets",
      "Area rugs & door mats",
      "Deep stain & odour extraction",
      "Colour restoration treatment",
    ],
  },
  {
    id: "misc",
    icon: "✨",
    title: "Miscellaneous & Other Services",
    color: "#2eaa96",
    image: "https://images.unsplash.com/photo-1521577352947-9bb58764b69a?w=600&q=80",
    items: [
      "Shoe & footwear cleaning (leather, suede, sneakers)",
      "Bags, purses & leather accessories",
      "Blankets, quilts & bed covers",
      "Leather jackets & specialty garments",
    ],
  },
];

// ─── UPDATED REVIEWS ───────────────────────────────────────────────────────────
const REVIEWS = [
  { name: "Ravi Kumar", rating: 5, text: "Very professional and good cleaning. I gave my 2 sets of white kurta payjama for cleaning during this Diwali. Clothes were returned in sparkling white condition. Price is slightly high ie Rs 60 for each cloth. But worth it.", avatar: "RK", date: "2 weeks ago" },
  { name: "Meena Iyer", rating: 5, text: "Best in service, wonderful experience and fast track work. Excellent workshop and good hospitality.", avatar: "MI", date: "1 month ago" },
  { name: "Arjun Sharma", rating: 5, text: "Great Drycleaning store! Quality service; always on top of items, on-time, and very very consistent!", avatar: "AS", date: "3 weeks ago" },
  { name: "Sunita Reddy", rating: 5, text: "One of the finest dry cleaning centres. Did my marriage clothes — fast delivery and qualitative service.", avatar: "SR", date: "1 month ago" },
  { name: "Kiran Patel", rating: 5, text: "Quality service! Totally recommend this!", avatar: "KP", date: "5 days ago" },
  { name: "Vikash Gupta", rating: 4, text: "Budget friendly compared to other drycleaning shops and good work.", avatar: "VG", date: "2 months ago" },
  { name: "Deepa Nair", rating: 5, text: "Good service helped in the last moment. They saved my event outfit!", avatar: "DN", date: "3 days ago" },
];

const HERO_SLIDES = [
  { url: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1400&q=80", caption: "Premium Dry Cleaning", sub: "Trusted since 2001" },
  { url: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1400&q=80", caption: "Sarees & Silk Care", sub: "Fabric-specific expertise" },
  { url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1400&q=80", caption: "Designer & Bridal Wear", sub: "Wedding gowns · Lehengas · Sherwanis" },
  { url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1400&q=80", caption: "Household Textiles", sub: "Curtains · Carpets · Sofa Covers" },
  { url: "https://images.unsplash.com/photo-1521577352947-9bb58764b69a?w=1400&q=80", caption: "Steam Press & Finishing", sub: "Crisp, fresh, ready to wear" },
];

// ─── FLOATING BUTTONS ──────────────────────────────────────────────────────────
function FloatingButtons() {
  return (
    <div style={{ position: "fixed", bottom: 28, right: 22, zIndex: 1000, display: "flex", flexDirection: "column", gap: 14 }}>
      <motion.a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"
        whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.95 }}
        style={{ width: 56, height: 56, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(37,211,102,0.5)", textDecoration: "none" }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </motion.a>
      <motion.a href={CALL_LINK} whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.95 }}
        style={{ width: 56, height: 56, borderRadius: "50%", background: "#0a5f55", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(10,95,85,0.5)", textDecoration: "none" }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
      </motion.a>
    </div>
  );
}

// ─── NAVBAR ────────────────────────────────────────────────────────────────────
function Navbar({ activePage, setActivePage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", s);
    return () => window.removeEventListener("scroll", s);
  }, []);
  const links = ["Home", "Services", "About", "Reviews", "Contact"];
  return (
    <motion.nav initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        position: "fixed", top: 36, left: 0, right: 0, zIndex: 900,
        background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.08)" : "none",
        transition: "all 0.3s ease", padding: "0 5%",
      }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <button onClick={() => { setActivePage("Home"); setMenuOpen(false); }}
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: 0, gap: 10 }}>
          <img src={LOGO_SVG} alt="Bombay Drycleaners"
            style={{ height: 50, width: 50, objectFit: "contain", borderRadius: 10, transition: "all 0.3s" }} />
          <div style={{ textAlign: "left" }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 16, color: scrolled ? "#0a5f55" : "#fff", lineHeight: 1.1 }}>BOMBAY</div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 400, fontSize: 9, color: scrolled ? "#2eaa96" : "#a8e6de", letterSpacing: 3 }}>DRYCLEANERS</div>
          </div>
        </button>

        {/* Desktop Nav */}
        <div className="desktop-nav" style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {links.map((l) => (
            <button key={l} onClick={() => setActivePage(l)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "'DM Sans',sans-serif", fontWeight: activePage === l ? 700 : 500,
                fontSize: 14, letterSpacing: 0.5,
                color: activePage === l ? "#2eaa96" : (scrolled ? "#333" : "rgba(255,255,255,0.9)"),
                borderBottom: activePage === l ? "2px solid #2eaa96" : "2px solid transparent",
                paddingBottom: 2, transition: "all 0.2s",
              }}>{l}</button>
          ))}
          <a href={CALL_LINK} style={{
            background: "linear-gradient(135deg,#0a5f55,#2eaa96)", color: "#fff",
            padding: "9px 22px", borderRadius: 24, fontFamily: "'DM Sans',sans-serif",
            fontWeight: 600, fontSize: 13, textDecoration: "none",
            boxShadow: "0 4px 12px rgba(10,95,85,0.35)",
          }}>📞 Call Now</a>
        </div>

        {/* Mobile hamburger */}
        <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}
          style={{ display: "none", background: "none", border: "none", cursor: "pointer", flexDirection: "column", gap: 5, padding: 4 }}>
          {[0,1,2].map(i => (
            <div key={i} style={{ width: 24, height: 2, background: scrolled ? "#0a5f55" : "#fff", borderRadius: 2, transition: "all 0.3s" }} />
          ))}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            style={{ background: "#fff", borderTop: "1px solid #e0f5f1", padding: "16px 5%", display: "flex", flexDirection: "column", gap: 4 }}>
            {links.map((l) => (
              <button key={l} onClick={() => { setActivePage(l); setMenuOpen(false); }}
                style={{ background: activePage === l ? "#e0f5f1" : "none", border: "none", cursor: "pointer", padding: "12px 16px", borderRadius: 8, textAlign: "left", fontFamily: "'DM Sans',sans-serif", fontWeight: activePage === l ? 700 : 500, fontSize: 15, color: activePage === l ? "#0a5f55" : "#333" }}>{l}</button>
            ))}
            <a href={CALL_LINK} style={{ background: "linear-gradient(135deg,#0a5f55,#2eaa96)", color: "#fff", padding: "12px 20px", borderRadius: 10, textDecoration: "none", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 15, textAlign: "center", marginTop: 8 }}>📞 +91 {PHONE}</a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </motion.nav>
  );
}

// ─── HERO ──────────────────────────────────────────────────────────────────────
function HeroSection({ setActivePage }) {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % HERO_SLIDES.length), 4500);
    return () => clearInterval(t);
  }, []);
  return (
    <section style={{ position: "relative", height: "100vh", minHeight: 560, overflow: "hidden" }}>
      {HERO_SLIDES.map((s, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: i === current ? 1 : 0, scale: i === current ? 1 : 1.05 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          style={{ position: "absolute", inset: 0, backgroundImage: `url(${s.url})`, backgroundSize: "cover", backgroundPosition: "center" }} />
      ))}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(5,40,36,0.6) 0%, rgba(5,40,36,0.75) 100%)" }} />

      <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 20px" }}>
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.6 }}
          style={{ marginBottom: 20 }}>
          <img src={LOGO_SVG} alt="Bombay Drycleaners"
            style={{ width: 100, height: 100, objectFit: "contain", borderRadius: 18, background: "rgba(255,255,255,0.1)", padding: 8, backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.2)" }} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7 }}
          style={{ background: "rgba(46,170,150,0.2)", border: "1px solid rgba(46,170,150,0.4)", borderRadius: 30, padding: "6px 18px", marginBottom: 18, fontFamily: "'DM Sans',sans-serif", color: "#7eecd9", fontSize: 12, letterSpacing: 2 }}>
          ✦ TRUSTED SINCE 2001 ✦
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.h1 key={current}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.6 }}
            style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,6vw,4.5rem)", color: "#fff", fontWeight: 700, lineHeight: 1.15, margin: "0 0 12px", maxWidth: 800 }}>
            {HERO_SLIDES[current].caption}
          </motion.h1>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.p key={`sub-${current}`}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            style={{ color: "rgba(255,255,255,0.8)", fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(15px,2.5vw,18px)", margin: "0 0 36px" }}>
            {HERO_SLIDES[current].sub}
          </motion.p>
        </AnimatePresence>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            onClick={() => setActivePage("Services")}
            style={{ background: "linear-gradient(135deg,#2eaa96,#0a5f55)", color: "#fff", border: "none", padding: "14px 30px", borderRadius: 30, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "clamp(14px,2vw,16px)" }}>
            View Services
          </motion.button>
          <motion.a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            style={{ background: "rgba(255,255,255,0.15)", color: "#fff", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.3)", padding: "14px 30px", borderRadius: 30, textDecoration: "none", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "clamp(14px,2vw,16px)" }}>
            WhatsApp Us
          </motion.a>
        </div>

        <div style={{ position: "absolute", bottom: 80, display: "flex", gap: 8 }}>
          {HERO_SLIDES.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              style={{ width: i === current ? 28 : 8, height: 8, borderRadius: 4, background: i === current ? "#2eaa96" : "rgba(255,255,255,0.4)", border: "none", cursor: "pointer", transition: "all 0.3s" }} />
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.6 }}
        style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(10,95,85,0.95)", backdropFilter: "blur(8px)", display: "flex", justifyContent: "center", gap: "clamp(16px,4vw,70px)", padding: "18px 5%", flexWrap: "wrap" }}>
        {[["23+", "Years Experience"], ["10K+", "Happy Customers"], ["25+", "Fabric Types"], ["100%", "Satisfaction"]].map(([n, l]) => (
          <div key={l} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(18px,3vw,26px)", fontWeight: 700, color: "#7eecd9" }}>{n}</div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(10px,1.5vw,12px)", color: "rgba(255,255,255,0.65)", letterSpacing: 1 }}>{l}</div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

// ─── SERVICE CARD ──────────────────────────────────────────────────────────────
function ServiceCard({ service, i }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.07 }}
      whileHover={{ y: -6, boxShadow: "0 20px 50px rgba(10,95,85,0.18)" }}
      style={{ background: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.07)", transition: "box-shadow 0.3s" }}>
      <div style={{ height: 185, overflow: "hidden", position: "relative" }}>
        <img src={service.image} alt={service.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.45s ease" }}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.07)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")} />
        <div style={{ position: "absolute", top: 12, left: 12, background: service.color, color: "#fff", borderRadius: 10, padding: "4px 12px", fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 0.5 }}>
          {service.icon}
        </div>
      </div>
      <div style={{ padding: "18px 20px 24px" }}>
        <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, color: "#0a3d37", margin: "0 0 12px", fontWeight: 700 }}>
          {service.title}
        </h3>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
          {service.items.map((it, j) => (
            <li key={j} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#444", lineHeight: 1.55 }}>
              <span style={{ color: "#2eaa96", fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>{it}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

// ─── SERVICES PAGE ─────────────────────────────────────────────────────────────
function ServicesPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#f0faf8", paddingTop: 104 }}>
      <div style={{ background: "linear-gradient(135deg,#0a5f55 0%,#1a8a7a 100%)", padding: "55px 5% 65px", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div style={{ color: "#7eecd9", fontFamily: "'DM Sans',sans-serif", letterSpacing: 3, fontSize: 12, marginBottom: 12 }}>WHAT WE OFFER</div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,4vw,3rem)", color: "#fff", margin: "0 0 16px" }}>Our Services</h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(14px,2vw,17px)", maxWidth: 560, margin: "0 auto" }}>
            Professional care for every garment, fabric, and textile — handled with expertise since 2001.
          </p>
        </motion.div>
      </div>

      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "55px 5%", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(270px,1fr))", gap: 24 }}>
        {SERVICES.map((s, i) => <ServiceCard key={s.id} service={s} i={i} />)}
      </div>

      <div style={{ textAlign: "center", padding: "0 5% 70px" }}>
        <motion.a href={CALL_LINK} whileHover={{ scale: 1.04 }}
          style={{ background: "linear-gradient(135deg,#0a5f55,#2eaa96)", color: "#fff", padding: "16px 38px", borderRadius: 32, textDecoration: "none", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "clamp(15px,2vw,17px)", boxShadow: "0 6px 24px rgba(10,95,85,0.35)", display: "inline-block" }}>
          📞 Book a Service — {PHONE}
        </motion.a>
      </div>
    </div>
  );
}

// ─── ABOUT PAGE ─────────────────────────────────────────────────────────────────
function AboutPage() {
  const features = [
    { icon: "🌿", title: "Eco-Friendly Solvents", desc: "We use safe, fabric-friendly cleaning agents that protect both your garments and the environment." },
    { icon: "👨‍🔬", title: "Expert Technicians", desc: "Our team has 23+ years of hands-on experience with every type of fabric and garment." },
    { icon: "⚡", title: "Fast Turnaround", desc: "Standard 48-hour service with express options available. Your clothes ready when you need them." },
    { icon: "🔒", title: "Safe & Insured", desc: "Every garment is handled with care. Full responsibility for designer and luxury items." },
  ];
  return (
    <div style={{ minHeight: "100vh", paddingTop: 104 }}>
      <div style={{ background: "linear-gradient(135deg,#0a5f55,#2eaa96)", padding: "60px 5%", display: "flex", flexWrap: "wrap", alignItems: "center", gap: 40 }}>
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} style={{ flex: "1 1 300px" }}>
          <div style={{ color: "#7eecd9", fontFamily: "'DM Sans',sans-serif", letterSpacing: 3, fontSize: 12, marginBottom: 14 }}>OUR STORY</div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,4vw,3rem)", color: "#fff", margin: "0 0 20px" }}>Over Two Decades of Trust</h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(14px,2vw,17px)", lineHeight: 1.8, maxWidth: 520 }}>
            Founded in 2001, Bombay Drycleaners has been a cornerstone of garment care in Hyderabad. What started as a small neighbourhood dry cleaning shop has grown into a trusted name for thousands of families.
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
          style={{ flex: "0 0 auto", display: "flex", justifyContent: "center" }}>
          <div style={{ width: 220, height: 220, borderRadius: "50%", background: "rgba(255,255,255,0.1)", border: "2px solid rgba(255,255,255,0.25)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backdropFilter: "blur(10px)" }}>
            <img src={LOGO_SVG} alt="Logo" style={{ width: 80, height: 80, objectFit: "contain", marginBottom: 8 }} />
            <div style={{ fontFamily: "'Playfair Display',serif", color: "#fff", fontSize: 36, fontWeight: 700, lineHeight: 1 }}>23</div>
            <div style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'DM Sans',sans-serif", fontSize: 11, letterSpacing: 2 }}>YEARS OF</div>
            <div style={{ color: "#fff", fontFamily: "'Playfair Display',serif", fontSize: 14, fontWeight: 600, letterSpacing: 1 }}>EXCELLENCE</div>
          </div>
        </motion.div>
      </div>

      <div style={{ background: "#f0faf8", padding: "60px 5%" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.5rem,3vw,2rem)", color: "#0a3d37", marginBottom: 44 }}>Why Choose Bombay Drycleaners?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 24 }}>
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                style={{ background: "#fff", borderRadius: 16, padding: "26px 22px", boxShadow: "0 4px 16px rgba(0,0,0,0.06)", borderTop: "3px solid #2eaa96" }}>
                <div style={{ fontSize: 34, marginBottom: 12 }}>{f.icon}</div>
                <h4 style={{ fontFamily: "'Playfair Display',serif", color: "#0a3d37", fontSize: 16, margin: "0 0 10px" }}>{f.title}</h4>
                <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#666", fontSize: 13.5, lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── REVIEWS PAGE ───────────────────────────────────────────────────────────────
function ReviewsPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#f0faf8", paddingTop: 104 }}>
      <div style={{ background: "linear-gradient(135deg,#0a5f55,#1a8a7a)", padding: "55px 5% 65px", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ color: "#7eecd9", fontFamily: "'DM Sans',sans-serif", letterSpacing: 3, fontSize: 12, marginBottom: 12 }}>TESTIMONIALS</div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,4vw,3rem)", color: "#fff", margin: "0 0 12px" }}>What Our Customers Say</h1>
          <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 10 }}>
            {"★★★★★".split("").map((s, i) => <span key={i} style={{ color: "#ffd700", fontSize: 24 }}>{s}</span>)}
          </div>
          <p style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'DM Sans',sans-serif", fontSize: 15 }}>4.9/5 average · 10,000+ satisfied customers</p>
        </motion.div>
      </div>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "55px 5%", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 22 }}>
        {REVIEWS.map((r, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            style={{ background: "#fff", borderRadius: 18, padding: "26px 22px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 13, marginBottom: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#0a5f55,#2eaa96)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: 14, flexShrink: 0 }}>{r.avatar}</div>
              <div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, color: "#0a3d37", fontSize: 14 }}>{r.name}</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", color: "#999", fontSize: 12 }}>{r.date}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 2, marginBottom: 12 }}>
              {Array.from({ length: r.rating }).map((_, j) => <span key={j} style={{ color: "#ffd700", fontSize: 15 }}>★</span>)}
            </div>
            <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#555", fontSize: 13.5, lineHeight: 1.75, margin: 0 }}>"{r.text}"</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── CONTACT PAGE ───────────────────────────────────────────────────────────────
function ContactPage() {
  return (
    <div style={{ minHeight: "100vh", paddingTop: 104, background: "#f0faf8" }}>
      <div style={{ background: "linear-gradient(135deg,#0a5f55,#2eaa96)", padding: "55px 5% 65px", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ color: "#7eecd9", fontFamily: "'DM Sans',sans-serif", letterSpacing: 3, fontSize: 12, marginBottom: 12 }}>GET IN TOUCH</div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,4vw,3rem)", color: "#fff", margin: "0 0 12px" }}>Contact Us</h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontFamily: "'DM Sans',sans-serif", fontSize: 17 }}>We're here to help — call, WhatsApp, or visit us directly.</p>
        </motion.div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "55px 5%", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 24 }}>
        {[
          { icon: "📞", title: "Call Us", detail: `+91 ${PHONE}`, sub: "Mon–Sat: 8am – 8pm", bg: "#0a5f55", href: CALL_LINK, cta: "Call Now" },
          { icon: "💬", title: "WhatsApp", detail: `+91 ${PHONE}`, sub: "Chat with us anytime", bg: "#25D366", href: WHATSAPP_LINK, cta: "Open WhatsApp" },
          { icon: "📍", title: "Find Us", detail: "Bombay Drycleaners", sub: "Hyderabad, Telangana", bg: "#e74c3c", href: MAPS_LINK, cta: "Open Maps" },
        ].map((c, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            style={{ background: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.07)" }}>
            <div style={{ background: c.bg, padding: "26px 24px", textAlign: "center" }}>
              <div style={{ fontSize: 42 }}>{c.icon}</div>
            </div>
            <div style={{ padding: "22px 22px 26px", textAlign: "center" }}>
              <h3 style={{ fontFamily: "'Playfair Display',serif", color: "#0a3d37", fontSize: 19, margin: "0 0 8px" }}>{c.title}</h3>
              <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#0a5f55", fontWeight: 700, fontSize: 16, margin: "0 0 4px" }}>{c.detail}</p>
              <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#888", fontSize: 13, margin: "0 0 18px" }}>{c.sub}</p>
              <motion.a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                style={{ display: "inline-block", background: c.bg, color: "#fff", padding: "10px 24px", borderRadius: 24, textDecoration: "none", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 14 }}>
                {c.cta}
              </motion.a>
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto 70px", padding: "0 5%" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", height: 360 }}>
          <iframe title="Bombay Drycleaners Location"
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY&q=17.4813901,78.5442765&zoom=16"
            width="100%" height="100%" style={{ border: 0, display: "block" }} allowFullScreen loading="lazy" />
        </motion.div>
      </div>
    </div>
  );
}

// ─── HOME PAGE ─────────────────────────────────────────────────────────────────
function HomePage({ setActivePage }) {
  return (
    <>
      <HeroSection setActivePage={setActivePage} />

      <section style={{ background: "#fff", padding: "70px 5%" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: 44 }}>
            <div style={{ color: "#2eaa96", fontFamily: "'DM Sans',sans-serif", letterSpacing: 3, fontSize: 12, marginBottom: 10 }}>WHAT WE DO</div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.6rem,3vw,2.4rem)", color: "#0a3d37", margin: "0 0 14px" }}>Complete Garment & Textile Care</h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#666", fontSize: "clamp(14px,2vw,16px)", maxWidth: 500, margin: "0 auto" }}>
              From your everyday wardrobe to precious heirlooms — every item gets expert attention.
            </p>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 20 }}>
            {SERVICES.slice(0, 6).map((s, i) => <ServiceCard key={s.id} service={s} i={i} />)}
          </div>
          <div style={{ textAlign: "center", marginTop: 36 }}>
            <motion.button whileHover={{ scale: 1.05 }} onClick={() => setActivePage("Services")}
              style={{ background: "none", border: "2px solid #0a5f55", color: "#0a5f55", padding: "12px 30px", borderRadius: 30, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: 15 }}>
              View All Services →
            </motion.button>
          </div>
        </div>
      </section>

      <section style={{ background: "linear-gradient(135deg,#052820,#0a5f55)", padding: "60px 5%" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 40, alignItems: "center" }}>
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={{ flex: "1 1 300px" }}>
            <div style={{ color: "#7eecd9", fontFamily: "'DM Sans',sans-serif", letterSpacing: 3, fontSize: 12, marginBottom: 14 }}>TRUSTED BY THOUSANDS</div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.6rem,3vw,2.2rem)", color: "#fff", margin: "0 0 16px" }}>Hyderabad's Most Trusted Drycleaners</h2>
            <p style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(14px,2vw,16px)", lineHeight: 1.8 }}>
              With over 23 years of service, Bombay Drycleaners is the go-to choice for premium garment care — handling everything from everyday clothing to priceless wedding wear.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 26, flexWrap: "wrap" }}>
              <a href={CALL_LINK} style={{ background: "#2eaa96", color: "#fff", padding: "12px 22px", borderRadius: 26, textDecoration: "none", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 14 }}>📞 Call: {PHONE}</a>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ background: "#25D366", color: "#fff", padding: "12px 22px", borderRadius: 26, textDecoration: "none", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 14 }}>💬 WhatsApp</a>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            style={{ flex: "1 1 240px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {[["🌿","Eco-Friendly"],["⚡","Fast Turnaround"],["🔒","100% Safe"],["⭐","5-Star Rated"]].map(([ic,lb]) => (
              <div key={lb} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 14, padding: "18px 14px", textAlign: "center", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{ic}</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", color: "#fff", fontWeight: 600, fontSize: 13 }}>{lb}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section style={{ background: "#f0faf8", padding: "70px 5%" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ color: "#2eaa96", fontFamily: "'DM Sans',sans-serif", letterSpacing: 3, fontSize: 12, marginBottom: 10 }}>TESTIMONIALS</div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.6rem,3vw,2.4rem)", color: "#0a3d37", margin: 0 }}>What Our Customers Say</h2>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20 }}>
            {REVIEWS.slice(0, 3).map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                style={{ background: "#fff", borderRadius: 16, padding: "22px 20px", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
                <div style={{ display: "flex", gap: 11, alignItems: "center", marginBottom: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg,#0a5f55,#2eaa96)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{r.avatar}</div>
                  <div>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, color: "#0a3d37", fontSize: 14 }}>{r.name}</div>
                    <div style={{ color: "#ffd700", fontSize: 13 }}>{"★".repeat(r.rating)}</div>
                  </div>
                </div>
                <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#555", fontSize: 13, lineHeight: 1.7, margin: 0 }}>"{r.text}"</p>
              </motion.div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <motion.button whileHover={{ scale: 1.05 }} onClick={() => {}}
              style={{ background: "none", border: "2px solid #0a5f55", color: "#0a5f55", padding: "12px 30px", borderRadius: 30, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: 15 }}>
              Read All Reviews →
            </motion.button>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── FOOTER ────────────────────────────────────────────────────────────────────
function Footer({ setActivePage }) {
  return (
    <footer style={{ background: "#041f1c", color: "#fff", padding: "55px 5% 28px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 36, paddingBottom: 36, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <img src={LOGO_SVG} alt="Logo" style={{ width: 46, height: 46, objectFit: "contain", borderRadius: 8 }} />
              <div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 15, color: "#7eecd9" }}>BOMBAY</div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 8, color: "#2eaa96", letterSpacing: 3 }}>DRYCLEANERS</div>
              </div>
            </div>
            <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.5)", fontSize: 13, lineHeight: 1.8 }}>
              Premium garment care trusted by Hyderabad families since 2001.
            </p>
          </div>
          <div>
            <h4 style={{ fontFamily: "'DM Sans',sans-serif", color: "#7eecd9", fontSize: 11, letterSpacing: 2, marginBottom: 14 }}>QUICK LINKS</h4>
            {["Home","Services","About","Reviews","Contact"].map((l) => (
              <button key={l} onClick={() => setActivePage(l)}
                style={{ display: "block", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans',sans-serif", fontSize: 14, padding: "4px 0", textAlign: "left" }}>{l}</button>
            ))}
          </div>
          <div>
            <h4 style={{ fontFamily: "'DM Sans',sans-serif", color: "#7eecd9", fontSize: 11, letterSpacing: 2, marginBottom: 14 }}>SERVICES</h4>
            {["Saree & Silk Care","Bridal Lehengas","Sherwanis & Suits","Curtains & Drapes","Carpet & Sofa","All Other Items"].map((s) => (
              <div key={s} style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans',sans-serif", fontSize: 13, padding: "4px 0" }}>{s}</div>
            ))}
          </div>
          <div>
            <h4 style={{ fontFamily: "'DM Sans',sans-serif", color: "#7eecd9", fontSize: 11, letterSpacing: 2, marginBottom: 14 }}>CONTACT</h4>
            <a href={CALL_LINK} style={{ display: "block", color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans',sans-serif", fontSize: 13, textDecoration: "none", padding: "4px 0" }}>📞 +91 {PHONE}</a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ display: "block", color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans',sans-serif", fontSize: 13, textDecoration: "none", padding: "4px 0" }}>💬 WhatsApp Us</a>
            <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" style={{ display: "block", color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans',sans-serif", fontSize: 13, textDecoration: "none", padding: "4px 0" }}>📍 Get Directions</a>
            <div style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans',sans-serif", fontSize: 12, marginTop: 8 }}>Mon–Sat: 8am – 8pm</div>
          </div>
        </div>
        <div style={{ paddingTop: 22, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.3)", fontSize: 12 }}>© 2024 Bombay Drycleaners. All rights reserved. Since 2001.</div>
          <div style={{ display: "flex", gap: 10 }}>
            <a href={CALL_LINK} style={{ background: "#0a5f55", color: "#fff", padding: "6px 16px", borderRadius: 20, textDecoration: "none", fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 600 }}>📞 Call</a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ background: "#25D366", color: "#fff", padding: "6px 16px", borderRadius: 20, textDecoration: "none", fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 600 }}>💬 WhatsApp</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [activePage, setActivePage] = useState("Home");
  const handleSetPage = (page) => { setActivePage(page); window.scrollTo({ top: 0, behavior: "smooth" }); };

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflowX = "hidden";
  }, []);

  const renderPage = () => {
    switch (activePage) {
      case "Home": return <HomePage setActivePage={handleSetPage} />;
      case "Services": return <ServicesPage />;
      case "About": return <AboutPage />;
      case "Reviews": return <ReviewsPage />;
      case "Contact": return <ContactPage />;
      default: return <HomePage setActivePage={handleSetPage} />;
    }
  };

  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", background: "#f0faf8" }}>
      <TopBar />
      <Navbar activePage={activePage} setActivePage={handleSetPage} />
      <AnimatePresence mode="wait">
        <motion.div key={activePage} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35 }}>
          {renderPage()}
        </motion.div>
      </AnimatePresence>
      <Footer setActivePage={handleSetPage} />
      <FloatingButtons />
    </div>
  );
}
