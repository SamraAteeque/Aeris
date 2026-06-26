import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const AWARDS = [
  { icon: '★', value: '3',      label: 'Michelin Stars',    year: '2024' },
  { icon: '◆', value: '#3',     label: "World's 50 Best",   year: '2024' },
  { icon: '◇', value: '5 Star', label: 'Forbes Travel',     year: '2024' },
  { icon: '○', value: 'Best',   label: 'James Beard Award', year: '2023' },
];

const PRESS = [
  {
    quote: '"An experience that transcends dining — it is an encounter with the sublime."',
    source: 'The New York Times',
    author: 'Pete Wells',
  },
  {
    quote: '"Aeris redefines what it means to eat with intention. Extraordinary in every sense."',
    source: 'Condé Nast Traveller',
    author: 'Restaurant Editor',
  },
  {
    quote: '"The most remarkable restaurant on Earth, full stop."',
    source: 'The Guardian',
    author: 'Jay Rayner',
  },
];

export default function AwardsSection() {
  const sectionRef  = useRef(null);
  const awardRefs   = useRef([]);
  const lineRef     = useRef(null);
  const headingRef  = useRef(null);

  useGSAP(() => {
    // Expanding rule
    gsap.fromTo(lineRef.current, { scaleX: 0 }, {
      scaleX: 1,
      duration: 1.6,
      ease: 'power3.inOut',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
    });

    // Heading reveal
    gsap.fromTo(headingRef.current, { opacity: 0, y: 36 }, {
      opacity: 1, y: 0,
      duration: 1.1,
      ease: 'power4.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 68%' },
    });

    // Award tiles
    awardRefs.current.forEach((el, i) => {
      gsap.fromTo(el, { opacity: 0, y: 32 }, {
        opacity: 1, y: 0,
        duration: 0.9,
        ease: 'power3.out',
        delay: i * 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' },
      });
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="awards"
      className="relative bg-zinc-950 py-32 md:py-44 px-8 md:px-16 lg:px-24 overflow-hidden border-t border-zinc-900/60"
    >
      {/* Ghost watermark */}
      <span
        aria-hidden="true"
        className="absolute -top-4 right-4 select-none pointer-events-none leading-none"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(14rem, 38vw, 34rem)',
          fontWeight: 200,
          WebkitTextStroke: '1px rgba(255,255,255,0.025)',
          color: 'transparent',
          lineHeight: 0.8,
        }}
      >
        ★
      </span>

      <div className="max-w-7xl mx-auto">
        {/* Label + rule */}
        <div className="flex items-center gap-6 mb-14">
          <p
            className="text-zinc-600 text-[10px] tracking-[0.6em] uppercase shrink-0"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Recognition
          </p>
          <div ref={lineRef} className="flex-1 h-px bg-zinc-800 origin-left" />
        </div>

        {/* Heading */}
        <h2
          ref={headingRef}
          className="text-white leading-none mb-20"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(3rem, 7vw, 6.5rem)',
            fontWeight: 200,
            letterSpacing: '-0.025em',
            opacity: 0,
          }}
        >
          World-Acclaimed<br />
          <span className="italic text-zinc-400">Since 2019</span>
        </h2>

        {/* Award tiles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-900/60 mb-24">
          {AWARDS.map((award, i) => (
            <div
              key={award.label}
              ref={(el) => (awardRefs.current[i] = el)}
              className="bg-zinc-950 px-8 py-10 group"
              style={{ opacity: 0 }}
            >
              <p
                className="text-zinc-800 group-hover:text-zinc-600 transition-colors duration-500 text-2xl mb-5"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {award.icon}
              </p>
              <p
                className="text-white mb-1 leading-none"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
                  fontWeight: 200,
                  letterSpacing: '-0.01em',
                }}
              >
                {award.value}
              </p>
              <p className="text-zinc-500 text-[9px] tracking-[0.35em] uppercase mt-1">
                {award.label}
              </p>
              <p className="text-zinc-700 text-[8px] tracking-[0.3em] mt-0.5">{award.year}</p>
            </div>
          ))}
        </div>

        {/* Press quotes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
          {PRESS.map((item, i) => (
            <motion.div
              key={item.source}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: i * 0.14, ease: [0.16, 1, 0.3, 1] }}
              className="border-t border-zinc-900 pt-8"
            >
              <p
                className="text-zinc-300 leading-relaxed mb-6"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.05rem',
                  fontWeight: 300,
                  fontStyle: 'italic',
                }}
              >
                {item.quote}
              </p>
              <p className="text-zinc-500 text-[9px] tracking-[0.35em] uppercase">
                {item.source}
              </p>
              <p className="text-zinc-700 text-[8px] tracking-[0.25em] mt-1">{item.author}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
