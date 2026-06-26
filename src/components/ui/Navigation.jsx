import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Home',         id: 'hero' },
  { label: 'Experience',   id: 'experience' },
  { label: 'The Chef',     id: 'chef' },
  { label: 'Gallery',      id: 'gallery' },
  { label: 'Reservations', id: 'reservation' },
  { label: 'Contact',      id: 'contact' },
];

export default function Navigation({ onOpenReservation }) {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 70);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (window.__lenis) {
      window.__lenis.scrollTo(el, { duration: 1.8 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ${
          scrolled ? 'bg-zinc-950/90 backdrop-blur-xl border-b border-white/[0.04]' : 'bg-gradient-to-b from-zinc-950/40 to-transparent'
        }`}
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
      >
        <div className="relative flex items-center justify-between px-8 md:px-14 py-4 max-w-[1700px] mx-auto w-full">
          {/* Left logo lockup */}
          <button
            onClick={() => scrollTo('hero')}
            className="flex flex-col items-start leading-none shrink-0"
          >
            <p
              className="text-white text-2xl tracking-[0.55em] uppercase font-bold"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Aeris
            </p>
            <p
              className="text-white text-[7.5px] tracking-[0.45em] uppercase font-bold mt-1.5"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Fine Dining
            </p>
          </button>

          {/* Center navigation links — desktop */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="text-[10px] tracking-[0.4em] uppercase text-white hover:text-[#c5a880] transition-colors duration-300 font-bold"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Right CTA — desktop */}
          <div className="hidden md:flex items-center shrink-0">
            <motion.button
              onClick={onOpenReservation}
              className="flex items-center gap-3 text-[10px] tracking-[0.35em] uppercase border border-[#c5a880]/40 hover:border-[#c5a880] text-zinc-100 px-8 py-3.5 rounded-full bg-transparent hover:bg-[#c5a880]/10 transition-all duration-500 shadow-[0_4px_20px_rgba(197,168,128,0.05)]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              <svg className="w-3.5 h-3.5 text-[#c5a880]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="15" rx="2" strokeLinecap="round" strokeLinejoin="round" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              <span>Book A Table</span>
            </motion.button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-[5px] p-1 z-10"
            aria-label="Toggle menu"
          >
            <motion.span
              className="block w-6 h-px bg-zinc-400"
              animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 6 : 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.span
              className="block w-4 h-px bg-zinc-400"
              animate={{ opacity: mobileOpen ? 0 : 1, x: mobileOpen ? 8 : 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-6 h-px bg-zinc-400"
              animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -6 : 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[68px] left-0 right-0 z-40 bg-zinc-950/98 backdrop-blur-2xl border-b border-zinc-900"
          >
            <div className="flex flex-col px-8 py-10 gap-7">
              {NAV_LINKS.map((l, i) => (
                <motion.button
                  key={l.id}
                  onClick={() => scrollTo(l.id)}
                  className="text-white hover:text-[#c5a880] text-sm tracking-[0.35em] uppercase text-left transition-colors font-bold"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                >
                  {l.label}
                </motion.button>
              ))}
              <motion.button
                onClick={() => { onOpenReservation(); setMobileOpen(false); }}
                className="flex items-center justify-center gap-2 text-[10px] tracking-[0.3em] uppercase border border-[#c5a880]/40 text-[#c5a880] px-6 py-3.5 rounded-full mt-2 hover:bg-[#c5a880]/10 transition-colors self-stretch text-center"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <svg className="w-3.5 h-3.5 text-[#c5a880]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="15" rx="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 2v4M8 2v4M3 10h18" />
                </svg>
                <span>Book A Table</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
