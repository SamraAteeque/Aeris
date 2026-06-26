import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export default function ChefSection() {
  const containerRef    = useRef(null);
  const imageRef        = useRef(null);
  const linesRef        = useRef([]);

  useGSAP(() => {
    linesRef.current.forEach((el, i) => {
      gsap.fromTo(el, { y: '100%', opacity: 0 }, {
        y: '0%', opacity: 1,
        duration: 1.2,
        ease: 'power4.out',
        delay: i * 0.14,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });
    });

    gsap.fromTo(imageRef.current, { y: -28, scale: 1.05 }, {
      y: 28, scale: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="chef"
      className="relative bg-zinc-900 py-32 md:py-48 px-8 md:px-16 lg:px-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24">

        {/* Text */}
        <div className="w-full md:w-1/2 order-2 md:order-1">
          <div className="mb-6 overflow-hidden">
            <motion.p
              className="text-zinc-500 text-[10px] tracking-[0.55em] uppercase"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              The Visionary
            </motion.p>
          </div>

          <h2
            className="text-white mb-10 leading-none"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
              fontWeight: 200,
              letterSpacing: '-0.025em',
            }}
          >
            <div className="overflow-hidden">
              <div ref={(el) => (linesRef.current[0] = el)}>Chef Elias</div>
            </div>
            <div className="overflow-hidden">
              <div ref={(el) => (linesRef.current[1] = el)} className="italic text-zinc-400">
                Vanguard
              </div>
            </div>
          </h2>

          <div className="overflow-hidden mb-8">
            <div ref={(el) => (linesRef.current[2] = el)}>
              <p
                className="text-zinc-300 leading-relaxed"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.15rem',
                  fontWeight: 300,
                }}
              >
                "Cooking at 3,200 meters changes everything. Water boils differently,
                flavors intensify, and the cold air demands warmth from the plate.
                We don't just cook here; we collaborate with the mountain."
              </p>
            </div>
          </div>

          {/* Accolades */}
          <div className="overflow-hidden mt-10">
            <div ref={(el) => (linesRef.current[3] = el)}>
              <div className="flex flex-col gap-3">
                {[
                  'Trained under Alain Ducasse, Monaco',
                  'Former Head Chef, Le Bernardin New York',
                  '3 Michelin Stars · 2021 – 2024',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-4">
                    <div className="w-8 h-px bg-zinc-700 shrink-0" />
                    <span className="text-zinc-500 text-xs tracking-[0.2em] uppercase">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="w-full md:w-1/2 order-1 md:order-2 h-[50vh] md:h-[70vh] relative overflow-hidden">
          <div className="absolute inset-0 z-10 bg-gradient-to-tr from-zinc-950/50 to-transparent mix-blend-overlay" />
          <img
            ref={imageRef}
            src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=900&q=80"
            alt="Chef preparing a dish"
            className="absolute inset-0 w-full h-full object-cover grayscale contrast-[1.15]"
          />
          <div className="absolute inset-5 border border-zinc-500/15 z-20 pointer-events-none hidden md:block" />
        </div>
      </div>
    </section>
  );
}
