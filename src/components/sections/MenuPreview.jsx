import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const DISHES = [
  {
    id: '01',
    name: 'Alpine Truffle Consommé',
    desc: 'Black truffle, mountain herbs, aged parmesan snow. A crystal-clear broth that captures the forest floor at 3,000m.',
    tag: 'First Course',
    img: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=1400&q=90',
  },
  {
    id: '02',
    name: 'Glacial Char Crudo',
    desc: 'River char, elderflower, compressed cucumber, freeze-dried dill oil. Raw, precise, elemental.',
    tag: 'Second Course',
    img: 'https://images.unsplash.com/photo-1519984388953-d2406bc725e1?w=1400&q=90',
  },
  {
    id: '03',
    name: 'Highland Wagyu A5',
    desc: 'Japanese A5 sirloin, bone marrow emulsion, wild garlic, aged vinegar reduction and pine ash salt.',
    tag: 'Main Course',
    img: 'https://images.unsplash.com/photo-1558030006-450675393462?w=1400&q=90',
  },
  {
    id: '04',
    name: 'Cloud Forest Dessert',
    desc: 'Yuzu cream, pine needle ice cream, crystallised violet, champagne sorbet and white chocolate soil.',
    tag: 'Dessert',
    img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=1400&q=90',
  },
  {
    id: '05',
    name: 'Sommelier Reserve',
    desc: 'Curated alpine vintages, aged in glacial cellars below the snowline. Paired thoughtfully to each course.',
    tag: 'Wine Pairing',
    img: 'https://images.unsplash.com/photo-1585553616435-2dc0a54e271d?w=1400&q=90',
  },
  {
    id: '06',
    name: 'Smoked Pine Infusion',
    desc: 'Artisan mountain digestif, cold cedar smoke, raw highland honey and hand-picked alpine botanicals.',
    tag: 'Digestif',
    img: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1400&q=90',
  },
];

export default function MenuPreview() {
  const sectionRef = useRef(null);
  const headRef    = useRef(null);
  const cardsRef   = useRef([]);
  const [active,   setActive] = useState(null);

  useGSAP(() => {
    gsap.fromTo(headRef.current, { opacity: 0, y: 28 }, {
      opacity: 1, y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
    });

    cardsRef.current.forEach((card, i) => {
      gsap.fromTo(card, { opacity: 0, y: 50 }, {
        opacity: 1, y: 0,
        duration: 1.1,
        ease: 'power3.out',
        delay: (i % 3) * 0.1,
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });
    });
  }, { scope: sectionRef });

  const scrollToReservation = () => {
    const el = document.getElementById('reservation');
    if (!el) return;
    if (window.__lenis) window.__lenis.scrollTo(el, { duration: 1.8 });
    else el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="menu"
        className="bg-zinc-950 pt-32 md:pt-44 pb-0 overflow-hidden"
      >
        {/* Header */}
        <div ref={headRef} className="px-8 md:px-16 lg:px-24 mb-14 max-w-[1700px] mx-auto" style={{ opacity: 0 }}>
          <div className="flex items-end justify-between">
            <div>
              <p
                className="text-zinc-600 text-[10px] tracking-[0.65em] uppercase mb-4"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Tasting Journey
              </p>
              <h2
                className="text-white leading-none"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
                  fontWeight: 200,
                  letterSpacing: '-0.025em',
                }}
              >
                Tonight's Menu
              </h2>
            </div>
            <motion.button
              onClick={scrollToReservation}
              className="hidden md:block text-[10px] tracking-[0.35em] uppercase text-zinc-500 hover:text-zinc-200 transition-colors duration-400 pb-1 border-b border-zinc-800 hover:border-zinc-500"
              whileHover={{ x: 4 }}
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Reserve to experience →
            </motion.button>
          </div>
        </div>

        {/* Full-bleed grid — 3 columns, each card is a viewport slice */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {DISHES.map((dish, i) => (
            <motion.div
              key={dish.id}
              ref={(el) => (cardsRef.current[i] = el)}
              className="group relative overflow-hidden cursor-pointer"
              style={{
                minHeight: 'clamp(420px, 55vh, 680px)',
                opacity: 0,
              }}
              whileHover="hover"
              onClick={() => setActive(dish)}
            >
              {/* Background image */}
              <motion.div
                className="absolute inset-0"
                variants={{ hover: { scale: 1.06 } }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              >
                <img
                  src={dish.img}
                  alt={dish.name}
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity duration-700"
                  loading="lazy"
                />
              </motion.div>

              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

              {/* Thin top border on hover */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-px bg-white/30"
                initial={{ scaleX: 0 }}
                variants={{ hover: { scaleX: 1 } }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                style={{ transformOrigin: 'left' }}
              />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                <p className="text-zinc-500 text-[9px] tracking-[0.55em] uppercase mb-3">
                  {dish.tag}
                </p>
                <h3
                  className="text-white leading-snug mb-3"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(1.4rem, 2.2vw, 1.9rem)',
                    fontWeight: 300,
                  }}
                >
                  {dish.name}
                </h3>
                <motion.p
                  className="text-zinc-400 text-sm leading-relaxed max-w-xs"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  initial={{ opacity: 0, y: 10 }}
                  variants={{ hover: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.45 }}
                >
                  {dish.desc}
                </motion.p>

                {/* View more hint */}
                <motion.div
                  className="flex items-center gap-2 mt-4"
                  initial={{ opacity: 0 }}
                  variants={{ hover: { opacity: 1 } }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <div className="h-px w-4 bg-zinc-500" />
                  <span className="text-zinc-500 text-[9px] tracking-[0.35em] uppercase">
                    Details
                  </span>
                </motion.div>
              </div>

              {/* Course number */}
              <span
                className="absolute top-7 right-7 text-zinc-800 group-hover:text-zinc-600 transition-colors duration-500"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1rem',
                  fontWeight: 200,
                  letterSpacing: '0.1em',
                }}
              >
                {dish.id}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className="flex items-center justify-center gap-6 py-12 border-t border-zinc-900/60 px-8">
          <p
            className="text-zinc-600 text-sm"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic' }}
          >
            Tasting menu · 12 courses · 4 hours
          </p>
          <div className="w-px h-4 bg-zinc-800" />
          <motion.button
            onClick={scrollToReservation}
            className="text-[10px] tracking-[0.35em] uppercase text-zinc-300 hover:text-white transition-colors duration-300"
            whileHover={{ x: 3 }}
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Book Your Table →
          </motion.button>
        </div>
      </section>

      {/* Dish detail modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[90] flex items-end md:items-center justify-center"
            style={{ backgroundColor: 'rgba(9,9,11,0.88)', backdropFilter: 'blur(14px)' }}
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-2xl bg-zinc-900 border border-zinc-800/60 overflow-hidden md:mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-72">
                <img src={active.img} alt={active.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
                <button
                  onClick={() => setActive(null)}
                  className="absolute top-4 right-4 w-9 h-9 bg-zinc-950/70 border border-zinc-700/50 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M11 3L3 11M3 3l8 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <div className="p-8 md:p-10">
                <p className="text-zinc-600 text-[9px] tracking-[0.55em] uppercase mb-2">{active.tag}</p>
                <h3
                  className="text-white mb-4 leading-tight"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                    fontWeight: 300,
                  }}
                >
                  {active.name}
                </h3>
                <p
                  className="text-zinc-300 leading-relaxed mb-8"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.05rem', fontWeight: 300 }}
                >
                  {active.desc}
                </p>
                <motion.button
                  onClick={() => {
                    setActive(null);
                    const el = document.getElementById('reservation');
                    if (el && window.__lenis) window.__lenis.scrollTo(el, { duration: 1.8 });
                    else el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-[10px] tracking-[0.3em] uppercase bg-white text-zinc-950 px-8 py-3.5 hover:bg-zinc-100 transition-colors duration-300"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Reserve to Experience
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
