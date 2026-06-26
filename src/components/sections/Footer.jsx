import { motion } from 'framer-motion';

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { duration: 1.8 });
  else el.scrollIntoView({ behavior: 'smooth' });
};

export default function Footer({ onOpenReservation }) {
  return (
    <footer id="contact" className="bg-zinc-950 border-t border-zinc-900/60 px-8 md:px-16 lg:px-24 pt-24 pb-12">
      <div className="max-w-7xl mx-auto">

        {/* Big CTA strip */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10 mb-24 pb-20 border-b border-zinc-900">
          <div>
            <p
              className="text-zinc-600 text-[10px] tracking-[0.6em] uppercase mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              One Sitting. One Night. One Memory.
            </p>
            <h2
              className="text-white leading-none"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(3rem, 7vw, 6rem)',
                fontWeight: 200,
                letterSpacing: '-0.025em',
              }}
            >
              Begin Your<br />
              <span className="italic text-zinc-400">Ascent</span>
            </h2>
          </div>

          <motion.button
            onClick={onOpenReservation}
            className="relative overflow-hidden group bg-white text-zinc-950 px-10 py-5 text-xs tracking-[0.35em] uppercase font-medium shrink-0 hover:bg-zinc-100 transition-colors duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Reserve a Table
          </motion.button>
        </div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 mb-20">

          {/* Brand */}
          <div>
            <p
              className="text-white text-2xl tracking-[0.45em] uppercase mb-3"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 200 }}
            >
              Aeris
            </p>
            <p className="text-zinc-700 text-[9px] tracking-[0.25em] uppercase mb-6">
              3,200m · Fine Dining
            </p>
            <p
              className="text-zinc-500 text-sm leading-relaxed"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              One table. One sitting.<br />An experience beyond the ordinary.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-zinc-600 text-[9px] tracking-[0.45em] uppercase mb-7">Navigate</p>
            <div className="flex flex-col gap-4">
              {[
                { label: 'Menu',        id: 'menu' },
                { label: 'Experience',  id: 'experience' },
                { label: 'The Chef',    id: 'chef' },
                { label: 'Gallery',     id: 'gallery' },
                { label: 'Reservations', id: 'reservation' },
              ].map(({ label, id }) => (
                <motion.button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="text-zinc-500 hover:text-zinc-200 text-sm text-left transition-colors duration-300"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  whileHover={{ x: 4 }}
                >
                  {label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-zinc-600 text-[9px] tracking-[0.45em] uppercase mb-7">Find Us</p>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-zinc-500 text-xs tracking-[0.1em] uppercase mb-1">Location</p>
                <p
                  className="text-zinc-400 text-sm"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Himalayan Range, 28°N 84°E
                </p>
              </div>
              <div>
                <p className="text-zinc-500 text-xs tracking-[0.1em] uppercase mb-1">Email</p>
                <a
                  href="mailto:reservations@aeris.dine"
                  className="text-zinc-400 hover:text-zinc-200 text-sm transition-colors duration-300"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  reservations@aeris.dine
                </a>
              </div>
              <div>
                <p className="text-zinc-500 text-xs tracking-[0.1em] uppercase mb-1">Phone</p>
                <a
                  href="tel:+919876543210"
                  className="text-zinc-400 hover:text-zinc-200 text-sm transition-colors duration-300"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  +91 98765 43210
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pt-8 border-t border-zinc-900 gap-4">
          <p className="text-zinc-700 text-[9px] tracking-[0.35em] uppercase">
            © 2025 Aeris. All rights reserved.
          </p>
          <div className="flex gap-8 flex-wrap">
            {['Privacy', 'Terms', 'Instagram', 'Press'].map((item) => (
              <motion.a
                key={item}
                href="#"
                className="text-zinc-700 text-[9px] tracking-[0.35em] uppercase hover:text-zinc-400 transition-colors duration-300"
                whileHover={{ y: -1 }}
                onClick={(e) => e.preventDefault()}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
