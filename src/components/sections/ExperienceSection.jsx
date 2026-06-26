import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    num: '01',
    title: 'The Altitude',
    body: 'At 3,200 metres, ingredients behave differently. Water boils at 89°C. The thinner air concentrates flavours. We cook with the mountain, not against it.',
  },
  {
    num: '02',
    title: 'The Ingredients',
    body: 'Every component on the plate is sourced within 50 km of the summit. Our foragers ascend before dawn. The harvest dictates the menu — never the reverse.',
  },
  {
    num: '03',
    title: 'The Singular Evening',
    body: 'One table. One seating. One unhurried evening. We do not serve 200 covers — we serve you. The entire kitchen and service team exist solely for your table tonight.',
  },
  {
    num: '04',
    title: 'The Transfer',
    body: 'A private helicopter departs from the valley floor at golden hour. The journey is itself part of the experience — the world shrinks below, and the summit reveals itself.',
  },
];

export default function ExperienceSection() {
  const containerRef = useRef(null);
  const imageRef     = useRef(null);
  const labelRef     = useRef(null);
  const headingRef   = useRef(null);
  const pillarsRef   = useRef([]);

  useGSAP(() => {
    // Image parallax
    gsap.fromTo(imageRef.current, { y: -60, scale: 1.08 }, {
      y: 60, scale: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Label
    gsap.fromTo(labelRef.current, { opacity: 0, x: -16 }, {
      opacity: 1, x: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: { trigger: containerRef.current, start: 'top 72%' },
    });

    // Heading lines
    gsap.fromTo(headingRef.current.querySelectorAll('.line-inner'), { y: '100%' }, {
      y: '0%',
      duration: 1.1,
      stagger: 0.12,
      ease: 'power4.out',
      scrollTrigger: { trigger: containerRef.current, start: 'top 68%' },
    });

    // Pillars
    pillarsRef.current.forEach((el, i) => {
      gsap.fromTo(el, { opacity: 0, y: 28 }, {
        opacity: 1, y: 0,
        duration: 0.9,
        ease: 'power3.out',
        delay: i * 0.1,
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });
    });
  }, { scope: containerRef });

  const scrollToGallery = () => {
    const el = document.getElementById('gallery');
    if (!el) return;
    if (window.__lenis) window.__lenis.scrollTo(el, { duration: 1.8 });
    else el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      id="experience"
      className="relative bg-zinc-950 overflow-hidden"
    >
      {/* ── Hero image block ── */}
      <div className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden">
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-zinc-950/10 via-transparent to-zinc-950" />
        <img
          ref={imageRef}
          src="https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=1800&q=90"
          alt="Alpine mountain lodge"
          className="absolute inset-0 w-full h-full object-cover origin-center"
        />

        {/* Floating label over image */}
        <div ref={labelRef} className="absolute bottom-16 left-8 md:left-16 lg:left-24 z-20" style={{ opacity: 0 }}>
          <p
            className="text-zinc-400 text-[10px] tracking-[0.6em] uppercase mb-2"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            The Alpine Sanctuary
          </p>
          <div className="h-px w-16 bg-zinc-600" />
        </div>
      </div>

      {/* ── Text content below image ── */}
      <div className="px-8 md:px-16 lg:px-24 py-20 md:py-32 max-w-[1700px] mx-auto">

        {/* Heading */}
        <div ref={headingRef} className="mb-16 md:mb-24">
          <div className="overflow-hidden mb-2">
            <p
              className="line-inner text-zinc-600 text-[10px] tracking-[0.65em] uppercase"
              style={{ fontFamily: "'Cormorant Garamond', serif", display: 'block' }}
            >
              What makes Aeris
            </p>
          </div>
          <div className="overflow-hidden">
            <h2
              className="line-inner text-white leading-none"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(3rem, 7vw, 7rem)',
                fontWeight: 200,
                letterSpacing: '-0.025em',
                display: 'block',
              }}
            >
              Elevate Your
            </h2>
          </div>
          <div className="overflow-hidden">
            <h2
              className="line-inner italic text-zinc-400 leading-none"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(3rem, 7vw, 7rem)',
                fontWeight: 200,
                letterSpacing: '-0.025em',
                display: 'block',
              }}
            >
              Perspective
            </h2>
          </div>
        </div>

        {/* Four pillars grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-14 md:gap-y-20 mb-20">
          {PILLARS.map((p, i) => (
            <div
              key={p.num}
              ref={(el) => (pillarsRef.current[i] = el)}
              className="group"
              style={{ opacity: 0 }}
            >
              <div className="flex items-center gap-4 mb-5">
                <span
                  className="text-zinc-700 text-sm"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 200 }}
                >
                  {p.num}
                </span>
                <div className="h-px flex-1 bg-zinc-900 group-hover:bg-zinc-700 transition-colors duration-500" />
              </div>
              <h3
                className="text-white mb-4 leading-tight"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                  fontWeight: 300,
                  letterSpacing: '-0.01em',
                }}
              >
                {p.title}
              </h3>
              <p
                className="text-zinc-400 leading-[1.85] text-base"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
              >
                {p.body}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <motion.button
          onClick={scrollToGallery}
          className="relative overflow-hidden group border border-zinc-700 px-10 py-4 text-xs tracking-[0.35em] uppercase text-zinc-300 transition-all duration-500 hover:border-white"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10 group-hover:text-zinc-950 transition-colors duration-500">
            See the Gallery
          </span>
          <div className="absolute inset-0 bg-white translate-y-[102%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
        </motion.button>
      </div>
    </section>
  );
}
