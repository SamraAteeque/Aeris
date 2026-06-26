import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const LINES = [
  { text: 'The mountain does not', weight: 300 },
  { text: 'hurry, yet everything',  weight: 200, italic: true },
  { text: 'is accomplished.',       weight: 300 },
];

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { duration: 1.8 });
  else el.scrollIntoView({ behavior: 'smooth' });
};

export default function EditorialText() {
  const sectionRef = useRef(null);
  const linesRef   = useRef([]);
  const asideRef   = useRef(null);

  useGSAP(() => {
    linesRef.current.forEach((el, i) => {
      gsap.fromTo(el, { y: '105%', opacity: 0 }, {
        y: '0%', opacity: 1,
        duration: 1.15,
        ease: 'power4.out',
        delay: i * 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          toggleActions: 'play none none none',
        },
      });
    });

    gsap.fromTo(asideRef.current, { x: 36, opacity: 0 }, {
      x: 0, opacity: 1,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 60%',
      },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative bg-zinc-950 px-8 md:px-16 lg:px-24 py-40 overflow-hidden"
    >
      {/* Background number watermark */}
      <span
        aria-hidden="true"
        className="absolute top-16 right-8 select-none pointer-events-none"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(8rem, 20vw, 18rem)',
          fontWeight: 200,
          lineHeight: 1,
          WebkitTextStroke: '1px rgba(255,255,255,0.04)',
          color: 'transparent',
        }}
      >
        02
      </span>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-20 lg:gap-32 items-end max-w-7xl">

        {/* Headline */}
        <div>
          <div className="overflow-hidden mb-6">
            <motion.p
              className="text-zinc-600 text-[10px] tracking-[0.65em] uppercase"
              initial={{ y: '100%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Our Philosophy
            </motion.p>
          </div>

          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.8rem, 7vw, 7.5rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
            }}
          >
            {LINES.map((line, i) => (
              <div key={i} style={{ overflow: 'hidden' }}>
                <div
                  ref={(el) => (linesRef.current[i] = el)}
                  className="text-white"
                  style={{
                    fontWeight: line.weight,
                    fontStyle: line.italic ? 'italic' : 'normal',
                    display: 'block',
                  }}
                >
                  {line.text}
                </div>
              </div>
            ))}
          </h2>
        </div>

        {/* Aside */}
        <div ref={asideRef} className="lg:max-w-xs space-y-8" style={{ opacity: 0 }}>
          <p
            className="text-zinc-400 leading-relaxed"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.05rem',
              fontWeight: 300,
            }}
          >
            We source every ingredient from within 50km of the summit. The altitude shapes the soil,
            the soil shapes the harvest, and the harvest shapes what appears on your plate each evening.
          </p>

          <div className="h-px w-full bg-zinc-800" />

          <div className="space-y-4">
            {['Seasonal tasting menu', 'Natural wine pairing', 'Single seating per evening'].map((item) => (
              <motion.div
                key={item}
                className="flex items-center gap-3 group cursor-default"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-1 h-1 rounded-full bg-zinc-700 group-hover:bg-zinc-400 transition-colors duration-300" />
                <span
                  className="text-zinc-500 text-xs tracking-[0.2em] uppercase group-hover:text-zinc-300 transition-colors duration-300"
                >
                  {item}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.button
            onClick={() => scrollToSection('menu')}
            className="text-xs tracking-[0.3em] uppercase text-zinc-300 border border-zinc-700 px-6 py-3 w-full hover:border-zinc-400 hover:text-white transition-all duration-400 relative overflow-hidden group"
            whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
            whileTap={{ scale: 0.98 }}
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            View the menu
          </motion.button>
        </div>
      </div>
    </section>
  );
}
