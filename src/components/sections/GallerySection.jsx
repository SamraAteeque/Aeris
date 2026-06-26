import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const IMAGES = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1800&q=90',
    alt: 'Fine dining atmosphere',
    label: 'The Table',
    sub: 'Where every evening begins',
    cls: 'md:col-span-2 md:row-span-2',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1000&q=90',
    alt: 'Artisan plated dish',
    label: 'The Plate',
    sub: 'Twelve courses of altitude',
    cls: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1000&q=90',
    alt: 'Mountain panorama',
    label: 'The View',
    sub: '3,200 metres above the world',
    cls: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1000&q=90',
    alt: 'Chef craft close-up',
    label: 'The Craft',
    sub: 'Precision in every movement',
    cls: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1400&q=90',
    alt: 'Wine cellar selection',
    label: 'The Cellar',
    sub: 'Glacial vintages, aged in silence',
    cls: 'md:col-span-2 md:row-span-1',
  },
];

export default function GallerySection() {
  const sectionRef = useRef(null);
  const headRef    = useRef(null);
  const gridRef    = useRef(null);
  const imgRefs    = useRef([]);
  const [hovered,  setHovered] = useState(null);
  const [lightbox, setLightbox] = useState(null);

  useGSAP(() => {
    // Heading
    gsap.fromTo(headRef.current, { opacity: 0, y: 32 }, {
      opacity: 1, y: 0,
      duration: 1.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
    });

    // Each image tile
    imgRefs.current.forEach((el, i) => {
      gsap.fromTo(el, { opacity: 0, scale: 0.95 }, {
        opacity: 1, scale: 1,
        duration: 1.2,
        ease: 'power3.out',
        delay: i * 0.1,
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });
    });
  }, { scope: sectionRef });

  return (
    <>
      <section
        ref={sectionRef}
        id="gallery"
        className="bg-zinc-950 pt-28 pb-0 overflow-hidden"
      >
        {/* Header — padded */}
        <div ref={headRef} className="px-8 md:px-16 lg:px-24 mb-14 max-w-[1700px] mx-auto" style={{ opacity: 0 }}>
          <div className="flex items-end justify-between">
            <div>
              <p
                className="text-zinc-600 text-[10px] tracking-[0.65em] uppercase mb-4"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Visual Journey
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
                Through the{' '}
                <span className="italic text-zinc-400">Lens</span>
              </h2>
            </div>
            <p
              className="hidden md:block text-zinc-700 text-[9px] tracking-[0.5em] uppercase pb-2"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {IMAGES.length} photographs
            </p>
          </div>
        </div>

        {/* Full-bleed grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 gap-1"
          style={{ gridAutoRows: 'calc((100vw - 2px) / 3)' }}
        >
          {IMAGES.map((img, i) => (
            <div
              key={img.id}
              ref={(el) => (imgRefs.current[i] = el)}
              className={`relative overflow-hidden cursor-pointer group ${img.cls}`}
              style={{ opacity: 0 }}
              onMouseEnter={() => setHovered(img.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setLightbox(img)}
            >
              <motion.img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
                loading="lazy"
                animate={{ scale: hovered === img.id ? 1.06 : 1 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* Permanent dark base */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-zinc-950/10 to-transparent" />

              {/* Hover overlay */}
              <motion.div
                className="absolute inset-0 bg-zinc-950/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: hovered === img.id ? 1 : 0 }}
                transition={{ duration: 0.4 }}
              />

              {/* Label — always visible */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-9 z-10">
                <motion.div
                  animate={{ y: hovered === img.id ? 0 : 6, opacity: 1 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex items-center gap-3 mb-1">
                    <div className="h-px w-6 bg-zinc-400" />
                    <p className="text-zinc-400 text-[9px] tracking-[0.45em] uppercase">
                      {img.label}
                    </p>
                  </div>
                  <motion.p
                    className="text-white"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)',
                      fontWeight: 300,
                    }}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: hovered === img.id ? 1 : 0, y: hovered === img.id ? 0 : 8 }}
                    transition={{ duration: 0.4, delay: 0.05 }}
                  >
                    {img.sub}
                  </motion.p>
                </motion.div>
              </div>

              {/* Expand icon */}
              <motion.div
                className="absolute top-5 right-5 w-8 h-8 border border-white/30 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: hovered === img.id ? 1 : 0, scale: hovered === img.id ? 1 : 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1 9l8-8M6 1h3v3" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-12"
            style={{ backgroundColor: 'rgba(9,9,11,0.95)', backdropFilter: 'blur(16px)' }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-5xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightbox.src}
                alt={lightbox.alt}
                className="w-full max-h-[78vh] object-cover"
              />
              <div className="flex items-center justify-between mt-4 px-1">
                <div>
                  <p className="text-zinc-500 text-[9px] tracking-[0.45em] uppercase">{lightbox.label}</p>
                  <p className="text-zinc-300 text-base mt-0.5"
                     style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
                    {lightbox.sub}
                  </p>
                </div>
                <button
                  onClick={() => setLightbox(null)}
                  className="text-zinc-500 hover:text-white transition-colors text-[10px] tracking-[0.3em] uppercase"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Close ×
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
