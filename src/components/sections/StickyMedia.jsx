import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export default function StickyMedia() {
  const sectionRef  = useRef(null);
  const bgRef       = useRef(null);
  const fgRef       = useRef(null);
  const captionRef  = useRef(null);

  useGSAP(() => {
    gsap.to(bgRef.current, {
      y: '25%',
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    gsap.to(fgRef.current, {
      y: '-8%',
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    gsap.fromTo(captionRef.current, { opacity: 0, y: 32 }, {
      opacity: 1, y: 0,
      duration: 1.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: captionRef.current,
        start: 'top 82%',
      },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="sticky-media"
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Parallax background */}
      <div
        ref={bgRef}
        className="absolute inset-0 scale-125"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          willChange: 'transform',
        }}
      />

      <div className="absolute inset-0 bg-zinc-950/55" />

      {/* Foreground */}
      <div
        ref={fgRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-10 px-8"
        style={{ willChange: 'transform' }}
      >
        <motion.div
          className="text-center max-w-3xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            className="text-zinc-500 text-[10px] tracking-[0.65em] uppercase mb-10"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            The Experience
          </p>

          <blockquote
            className="text-white leading-tight mb-10"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2rem, 5vw, 4.5rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              letterSpacing: '-0.01em',
            }}
          >
            "Dining among clouds,<br />
            <span className="not-italic font-extralight text-zinc-400">
              above the noise of the world."
            </span>
          </blockquote>

          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-px w-16 bg-zinc-700" />
            <div className="w-1 h-1 rounded-full bg-zinc-600" />
            <div className="h-px w-16 bg-zinc-700" />
          </div>

          <div className="grid grid-cols-3 gap-8 text-center">
            {[
              { num: '3,200', label: 'Metres above sea level' },
              { num: '12',    label: 'Michelin stars awarded' },
              { num: '1',     label: 'Table under open sky' },
            ].map(({ num, label }) => (
              <div key={num}>
                <p
                  className="text-white mb-1"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(1.6rem, 3.5vw, 3rem)',
                    fontWeight: 200,
                  }}
                >
                  {num}
                </p>
                <p className="text-zinc-600 text-[9px] tracking-[0.3em] uppercase">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div ref={captionRef} className="absolute bottom-10 left-10 z-20" style={{ opacity: 0 }}>
        <p className="text-zinc-600 text-[9px] tracking-[0.4em] uppercase">
          Himalayan Range · 28°N
        </p>
      </div>
    </section>
  );
}
