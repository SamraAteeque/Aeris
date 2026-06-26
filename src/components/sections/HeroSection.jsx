import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import video from '/video/video.mp4';

export default function HeroSection({ onOpenReservation }) {
  const [videoEnded, setVideoEnded] = useState(false);

  const scrollDown = () => {
    const target = document.getElementById('sticky-media') || null;
    if (target && window.__lenis) {
      window.__lenis.scrollTo(target, { duration: 1.8 });
    } else if (window.__lenis) {
      window.__lenis.scrollTo(window.innerHeight, { duration: 1.8 });
    } else {
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden bg-zinc-950">
      {/* Video */}
      <video
        src={video}
        muted
        autoPlay
        playsInline
        preload="auto"
        onEnded={() => setVideoEnded(true)}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(9,9,11,0.25) 0%, rgba(9,9,11,0.55) 55%, rgba(9,9,11,1) 100%)',
        }}
      />

      {/* Grain */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
          opacity: 0.3,
        }}
      />

      {/* Dynamic content */}
      <AnimatePresence mode="wait">
        {!videoEnded ? (
          <motion.div
            key="intro"
            className="absolute bottom-[16%] left-0 right-0 z-20 px-8 md:px-16 lg:px-24"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              className="text-zinc-400 text-xs tracking-[0.55em] uppercase mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Where the clouds meet cuisine
            </p>
            <h1
              className="text-white leading-none mb-8"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(3.5rem, 9vw, 9rem)',
                fontWeight: 300,
                letterSpacing: '-0.025em',
              }}
            >
              <span className="block">A Taste of</span>
              <span className="block italic" style={{ fontWeight: 200, color: '#d4d4d8' }}>
                Altitude
              </span>
            </h1>
            <div className="flex items-center gap-8">
              <div className="h-px w-12 bg-zinc-600" />
              <p className="text-zinc-400 text-xs tracking-[0.35em] uppercase">
                Experience the journey
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="welcome"
            className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 sm:px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Core Content Container - optically centered with a negative top margin */}
            <div className="flex flex-col items-center max-w-4xl mx-auto z-25 -mt-24 sm:-mt-28 md:-mt-32">
              {/* Welcome Badge with elegant fading gold lines */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="flex items-center gap-4 mb-5 w-full justify-center"
              >
                <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-[#c5a880]/60" />
                <span className="text-[#c5a880] text-[10px] sm:text-xs tracking-[0.6em]">✦</span>
                <p
                  className="text-zinc-300 text-[10px] sm:text-xs tracking-[0.65em] uppercase font-light"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Welcome to
                </p>
                <span className="text-[#c5a880] text-[10px] sm:text-xs tracking-[0.6em]">✦</span>
                <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-[#c5a880]/60" />
              </motion.div>

              {/* Brand Name - thicker font-light to show the stunning stroke contrast */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.4, delay: 0.4 }}
                className="text-white leading-none mb-4 drop-shadow-[0_10px_30px_rgba(0,0,0,0.65)]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(5rem, 13vw, 11.5rem)',
                  fontWeight: 300,
                  letterSpacing: '0.03em',
                }}
              >
                Aeris
              </motion.h1>

              {/* Gold Separator Spark */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.6 }}
                className="text-[#c5a880] text-xs sm:text-sm tracking-[0.6em] mb-5"
              >
                ✦
              </motion.div>

              {/* Sub-badge: Dine Unwind Explore */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.75 }}
                className="flex items-center justify-center gap-5 sm:gap-7 mb-7 text-[#c5a880]/90 text-xs sm:text-sm tracking-[0.55em] uppercase font-light"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                <span>Dine</span>
                <span>•</span>
                <span>Unwind</span>
                <span>•</span>
                <span>Explore</span>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.4, delay: 0.95 }}
                className="text-zinc-200 text-sm sm:text-base md:text-lg lg:text-xl max-w-xl mx-auto font-light leading-relaxed mb-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                A fine dining experience above the ordinary,
                <span className="block mt-1">crafted for unforgettable moments.</span>
              </motion.p>

              {/* CTAs - larger buttons with premium layout */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 1.15 }}
                className="flex flex-row items-center justify-center gap-5 sm:gap-6 mb-12 w-full"
              >
                {/* Explore Menu */}
                <motion.button
                  onClick={() => {
                    const el = document.getElementById('menu');
                    if (el && window.__lenis) window.__lenis.scrollTo(el, { duration: 1.8 });
                  }}
                  className="flex items-center gap-3 bg-white hover:bg-zinc-100 text-zinc-950 font-bold px-8 py-4 sm:px-10 sm:py-4 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.3),0_10px_25px_rgba(0,0,0,0.5)] transition-all duration-500 group text-center shrink-0 cursor-pointer"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-4.5 h-4.5 text-zinc-950 transition-transform group-hover:rotate-12 duration-300" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M6 3v7a3 3 0 0 0 3 3h0a3 3 0 0 0 3-3V3" />
                    <path d="M9 13v8" />
                    <path d="M18 3v18" />
                    <path d="M18 3a3 3 0 0 0-3 3v8h3" />
                  </svg>
                  <span className="text-[10px] sm:text-xs tracking-[0.25em] uppercase font-sans">Explore Menu</span>
                </motion.button>

                {/* View Gallery */}
                <motion.button
                  onClick={() => {
                    const el = document.getElementById('gallery');
                    if (el && window.__lenis) window.__lenis.scrollTo(el, { duration: 1.8 });
                  }}
                  className="flex items-center gap-3 bg-white hover:bg-zinc-100 text-zinc-950 font-bold px-8 py-4 sm:px-10 sm:py-4 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.3),0_10px_25px_rgba(0,0,0,0.5)] transition-all duration-500 group text-center shrink-0 cursor-pointer"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-3.5 h-3.5 fill-zinc-950 transition-transform group-hover:scale-110 duration-300" viewBox="0 0 24 24">
                    <path d="M6 4l15 8-15 8V4z" />
                  </svg>
                  <span className="text-[10px] sm:text-xs tracking-[0.25em] uppercase font-sans">View Gallery</span>
                </motion.button>
              </motion.div>
            </div>

            {/* Bottom Floating Glassmorphic Feature Grid Bar (Floating Capsule) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl bg-zinc-950/40 backdrop-blur-xl border border-white/[0.08] rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden z-25 p-1 sm:p-2"
            >
              <div className="grid grid-cols-2 lg:grid-cols-4">
                {/* Feature 1 */}
                <div className="flex items-center gap-3 sm:gap-5 p-5 sm:p-6 lg:p-8 hover:bg-white/[0.02] transition-all duration-500 rounded-2xl text-left border-r border-b lg:border-b-0 border-white/[0.06]">
                  <div className="p-3 bg-[#c5a880]/10 rounded-2xl text-[#c5a880] shrink-0 shadow-[0_8px_20px_rgba(197,168,128,0.05)]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.25" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a1.5 1.5 0 0 1 1.5 1.5c0 .34-.11.65-.3.9M12 3a1.5 1.5 0 0 0-1.2.9" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 14a8 8 0 0 1 16 0H4z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2 17h20a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 14c1-3.5 3-5.5 6-6" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white text-xs sm:text-sm font-semibold tracking-[0.15em] uppercase font-sans">Authentic Cuisine</h4>
                    <p className="text-zinc-400 text-[10px] sm:text-xs mt-1 font-light">Curated gourmet dishes</p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex items-center gap-3 sm:gap-5 p-5 sm:p-6 lg:p-8 hover:bg-white/[0.02] transition-all duration-500 rounded-2xl text-left border-b lg:border-b-0 lg:border-r border-white/[0.06]">
                  <div className="p-3 bg-[#c5a880]/10 rounded-2xl text-[#c5a880] shrink-0 shadow-[0_8px_20px_rgba(197,168,128,0.05)]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.25" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m3 20 5-7 4 5" />
                      <path d="m7 20 6-9 6 9" />
                      <path d="m14 20 3-4 4 4" />
                      <path d="m10.5 14.5 2.5-3 2.5 3" />
                      <path d="m6.5 15 1.5-2 1.5 2" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white text-xs sm:text-sm font-semibold tracking-[0.15em] uppercase font-sans">Scenic Views</h4>
                    <p className="text-zinc-400 text-[10px] sm:text-xs mt-1 font-light">Himalayan range</p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex items-center gap-3 sm:gap-5 p-5 sm:p-6 lg:p-8 hover:bg-white/[0.02] transition-all duration-500 rounded-2xl text-left border-r border-white/[0.06]">
                  <div className="p-3 bg-[#c5a880]/10 rounded-2xl text-[#c5a880] shrink-0 shadow-[0_8px_20px_rgba(197,168,128,0.05)]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.25" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 4h12v4c0 3.31-2.69 6-6 6s-6-2.69-6-6V4z" />
                      <path d="M6 7.5h12" />
                      <path d="M12 14v6" />
                      <path d="M9 20h6" />
                      <path d="M18 13.5a1.5 1.5 0 0 1-1.5-1.5M16.5 12a1.5 1.5 0 0 1 1.5-1.5M18 10.5a1.5 1.5 0 0 1 1.5 1.5M19.5 12a1.5 1.5 0 0 1-1.5 1.5" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white text-xs sm:text-sm font-semibold tracking-[0.15em] uppercase font-sans">Premium Ambience</h4>
                    <p className="text-zinc-400 text-[10px] sm:text-xs mt-1 font-light">Elegant & cozy setting</p>
                  </div>
                </div>

                {/* Feature 4 */}
                <div className="flex items-center gap-3 sm:gap-5 p-5 sm:p-6 lg:p-8 hover:bg-white/[0.02] transition-all duration-500 rounded-2xl text-left">
                  <div className="p-3 bg-[#c5a880]/10 rounded-2xl text-[#c5a880] shrink-0 shadow-[0_8px_20px_rgba(197,168,128,0.05)]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.25" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="16" rx="2" />
                      <path d="M16 2v4M8 2v4M3 10h18" />
                      <circle cx="15" cy="15" r="3" />
                      <path d="M15 13.5v1.5l1 1" />
                      <path d="M7 13h2M7 16h2" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white text-xs sm:text-sm font-semibold tracking-[0.15em] uppercase font-sans">Easy Reservations</h4>
                    <p className="text-zinc-400 text-[10px] sm:text-xs mt-1 font-light">Seamless booking</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle location badge */}
      <motion.div
        className="absolute bottom-8 right-8 md:right-14 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1.5 }}
      >
        <p className="text-zinc-700 text-[8px] tracking-[0.45em] uppercase">
          Himalayan Range · 28°N
        </p>
      </motion.div>
    </section>
  );
}
