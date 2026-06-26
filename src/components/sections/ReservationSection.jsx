import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCES = [
  { id: 'tasting',     label: "Chef's Tasting Menu", price: '£680 / person',  courses: '12 courses · 4 hrs' },
  { id: 'chefs-table', label: "Chef's Table",         price: '£920 / person',  courses: '8 courses · 3 hrs'  },
  { id: 'private',     label: 'Private Dining',       price: 'from £8,000',    courses: 'Exclusive buyout'   },
];

function generateRef() {
  return 'AER-' + Math.random().toString(36).substring(2, 8).toUpperCase();
}

export default function ReservationSection({ onOpenReservation }) {
  const containerRef  = useRef(null);
  const leftRef       = useRef(null);
  const rightRef      = useRef(null);

  /* booking modal state */
  const [modalOpen,   setModalOpen]   = useState(false);
  const [step,        setStep]        = useState(1); // 1=form, 2=confirm-screen
  const [sending,     setSending]     = useState(false);
  const [bookingRef,  setBookingRef]  = useState('');
  const [error,       setError]       = useState('');
  const [form,        setForm]        = useState({
    name: '', email: '', phone: '', experience: '', date: '', guests: '2', occasion: '', dietary: '',
  });

  useGSAP(() => {
    // Slide up only — opacity stays 1 so content is always readable
    gsap.fromTo(leftRef.current, { y: 40 }, {
      y: 0,
      duration: 1.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    });
    gsap.fromTo(rightRef.current, { y: 30 }, {
      y: 0,
      duration: 1.2,
      ease: 'power3.out',
      delay: 0.1,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    });
  }, { scope: containerRef });

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const openModal = () => {
    setModalOpen(true);
    setStep(1);
    setError('');
    setBookingRef('');
    window.__lenis?.stop();
  };

  const closeModal = () => {
    setModalOpen(false);
    setForm({ name: '', email: '', phone: '', experience: '', date: '', guests: '2', occasion: '', dietary: '' });
    setStep(1);
    setSending(false);
    setError('');
    window.__lenis?.start();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError('');

    const ref        = generateRef();
    const expLabel   = EXPERIENCES.find((x) => x.id === form.experience)?.label || form.experience;
    const formattedDate = form.date
      ? new Date(form.date + 'T12:00:00').toLocaleDateString('en-GB', {
          weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
        })
      : form.date;

    const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TPL_OWNER   = import.meta.env.VITE_EMAILJS_TEMPLATE_OWNER;
    const TPL_GUEST   = import.meta.env.VITE_EMAILJS_TEMPLATE_GUEST;
    const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const OWNER_EMAIL = import.meta.env.VITE_OWNER_EMAIL || 'reservations@aeris.dine';

    const emailConfigured = SERVICE_ID && TPL_OWNER && PUBLIC_KEY
      && SERVICE_ID !== 'YOUR_SERVICE_ID';

    if (emailConfigured) {
      try {
        // ── Notify restaurant owner ──
        await emailjs.send(SERVICE_ID, TPL_OWNER, {
          to_email:    OWNER_EMAIL,
          booking_ref: ref,
          guest_name:  form.name,
          guest_email: form.email,
          phone:       form.phone || 'Not provided',
          experience:  expLabel,
          date:        formattedDate,
          guests:      form.guests,
          occasion:    form.occasion || 'Not specified',
          dietary:     form.dietary  || 'None',
        }, PUBLIC_KEY);

        // ── Confirmation to guest (optional template) ──
        if (TPL_GUEST && TPL_GUEST !== 'YOUR_GUEST_TEMPLATE_ID') {
          await emailjs.send(SERVICE_ID, TPL_GUEST, {
            to_email:    form.email,
            booking_ref: ref,
            guest_name:  form.name,
            experience:  expLabel,
            date:        formattedDate,
            guests:      form.guests,
          }, PUBLIC_KEY);
        }
      } catch (err) {
        console.error('EmailJS error:', err);
        setError('Email delivery failed, but your booking is recorded. Please screenshot this confirmation.');
      }
    }
    // Always show confirmation (even without email config)
    setBookingRef(ref);
    setSending(false);
    setStep(2);
  };

  const canSubmit = form.name && form.email && form.date && form.experience;

  return (
    <>
      {/* ── SECTION ── */}
      <section
        ref={containerRef}
        id="reservation"
        className="relative bg-zinc-950 py-36 md:py-52 px-8 md:px-16 lg:px-24 overflow-hidden border-t border-zinc-900/50"
      >
        {/* Dot-grid accent */}
        <div
          className="absolute top-0 right-0 w-1/2 h-full opacity-[0.022] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '34px 34px',
          }}
        />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-start">

          {/* ── Left: copy ── */}
          <div ref={leftRef}>
            <p
              className="text-zinc-600 text-[10px] tracking-[0.6em] uppercase mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Join the Ascent
            </p>

            <h2
              className="text-white leading-none mb-10"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(3rem, 6vw, 5.5rem)',
                fontWeight: 200,
                letterSpacing: '-0.025em',
              }}
            >
              Reserve Your<br />
              <span className="italic text-zinc-400">Journey</span>
            </h2>

            <p
              className="text-zinc-400 leading-[1.9] mb-14 max-w-md"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', fontWeight: 300 }}
            >
              We accept reservations up to three months in advance.
              A single seating per evening preserves the intimacy of the experience.
              Private helicopter transfers depart from the valley at golden hour.
            </p>

            <div className="flex flex-col gap-5 mb-14">
              {[
                'Private helicopter transfers available',
                'All dietary requirements accommodated',
                'Full restaurant buyout on request',
                'Bespoke menu creation for private events',
              ].map((item) => (
                <div key={item} className="flex items-center gap-4">
                  <div className="w-8 h-px bg-zinc-800 shrink-0" />
                  <p className="text-zinc-500 text-xs tracking-[0.2em] uppercase">{item}</p>
                </div>
              ))}
            </div>

          </div>

          {/* ── Right: experience cards + Book button ── */}
          <div ref={rightRef} className="flex flex-col gap-4">
            <p
              className="text-zinc-600 text-[9px] tracking-[0.5em] uppercase mb-2"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Available Experiences
            </p>

            {EXPERIENCES.map((exp) => (
              <motion.button
                key={exp.id}
                onClick={openModal}
                whileHover={{ x: 6 }}
                transition={{ duration: 0.25 }}
                className="group text-left w-full border border-zinc-800/70 px-8 py-7 hover:border-zinc-500 transition-all duration-300 hover:bg-zinc-900/30"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3
                    className="text-white group-hover:text-zinc-200 transition-colors"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', fontWeight: 300 }}
                  >
                    {exp.label}
                  </h3>
                  <span
                    className="text-zinc-400 text-sm shrink-0 ml-4"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {exp.price}
                  </span>
                </div>
                <p className="text-zinc-600 text-[9px] tracking-[0.25em] uppercase">{exp.courses}</p>
              </motion.button>
            ))}

            {/* ── BOOK BUTTON — always visible, right below experiences ── */}
            <motion.button
              onClick={openModal}
              className="w-full mt-2 text-xs tracking-[0.4em] uppercase font-medium flex items-center justify-center gap-3"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                backgroundColor: '#ffffff',
                color: '#09090b',
                padding: '20px 40px',
                border: 'none',
                cursor: 'pointer',
              }}
              whileHover={{ scale: 1.01, backgroundColor: '#f4f4f5' }}
              whileTap={{ scale: 0.98 }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="3" width="12" height="10" rx="1" stroke="currentColor" strokeWidth="1.2" />
                <path d="M4 1v3M10 1v3M1 7h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              Book Your Table
            </motion.button>

            <p
              className="text-zinc-600 text-[9px] tracking-[0.25em] uppercase text-center -mt-1"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Instant confirmation · Email sent to you &amp; our team
            </p>

            <div className="mt-3 px-8 py-6 border border-dashed border-zinc-800/50">
              <p className="text-zinc-600 text-[9px] tracking-[0.3em] uppercase mb-2">Contact</p>
              <a
                href="mailto:reservations@aeris.dine"
                className="text-zinc-400 hover:text-zinc-200 transition-colors text-sm block"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                reservations@aeris.dine
              </a>
              <p className="text-zinc-600 text-sm mt-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                +91 98765 43210
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOOKING MODAL ── */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            key="booking-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
            style={{ backgroundColor: 'rgba(9,9,11,0.97)' }}
            onClick={(e) => e.target === e.currentTarget && closeModal()}
          >
            {/* Grain */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
                opacity: 0.14,
              }}
            />

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="form-panel"
                  initial={{ opacity: 0, y: 28, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.97 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full max-w-2xl bg-zinc-900/85 border border-zinc-800/50 backdrop-blur-2xl overflow-y-auto"
                  style={{ maxHeight: '92vh' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close */}
                  <button
                    onClick={closeModal}
                    className="absolute top-5 right-5 z-20 text-zinc-600 hover:text-zinc-200 transition-colors p-1.5"
                    aria-label="Close"
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M14 4L4 14M4 4l10 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  </button>

                  <form onSubmit={handleSubmit} className="p-8 md:p-12">
                    {/* Header */}
                    <p
                      className="text-zinc-600 text-[9px] tracking-[0.55em] uppercase mb-2"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      Aeris · Table Reservation
                    </p>
                    <h3
                      className="text-white mb-10 leading-tight"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
                        fontWeight: 200,
                        letterSpacing: '-0.01em',
                      }}
                    >
                      Complete Your Booking
                    </h3>

                    <div className="flex flex-col gap-10">

                      {/* Experience */}
                      <div>
                        <p className="text-zinc-500 text-[9px] tracking-[0.45em] uppercase mb-4"
                           style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                          Select Experience *
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {EXPERIENCES.map((exp) => (
                            <button
                              key={exp.id}
                              type="button"
                              onClick={() => update('experience', exp.id)}
                              className={`text-left p-4 border transition-all duration-250 ${
                                form.experience === exp.id
                                  ? 'border-zinc-400 bg-zinc-800/50'
                                  : 'border-zinc-800 hover:border-zinc-700'
                              }`}
                            >
                              <p
                                className="text-white text-sm leading-snug mb-1"
                                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
                              >
                                {exp.label}
                              </p>
                              <p className="text-zinc-500 text-[8px] tracking-[0.25em] uppercase">{exp.courses}</p>
                              <p className="text-zinc-400 text-xs mt-1"
                                 style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                                {exp.price}
                              </p>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Date + Guests */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <BookingField label="Preferred Date *" type="date"
                          value={form.date} onChange={(v) => update('date', v)}
                          min={new Date().toISOString().split('T')[0]} required />

                        <div>
                          <p className="text-zinc-500 text-[9px] tracking-[0.45em] uppercase mb-3"
                             style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                            Party Size
                          </p>
                          <div className="flex items-center gap-5 border-b border-zinc-700 pb-2">
                            <button type="button"
                              onClick={() => update('guests', String(Math.max(1, parseInt(form.guests) - 1)))}
                              className="text-zinc-500 hover:text-white transition-colors w-5 h-5 text-lg leading-none">−</button>
                            <span className="text-zinc-200 text-lg w-4 text-center tabular-nums"
                                  style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                              {form.guests}
                            </span>
                            <button type="button"
                              onClick={() => update('guests', String(Math.min(4, parseInt(form.guests) + 1)))}
                              className="text-zinc-500 hover:text-white transition-colors w-5 h-5 text-lg leading-none">+</button>
                            <span className="text-zinc-600 text-[9px] tracking-widest uppercase ml-1">
                              {parseInt(form.guests) === 1 ? 'Guest' : 'Guests'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Name + Email */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <BookingField label="Full Name *"     type="text"  value={form.name}  onChange={(v) => update('name', v)}  required />
                        <BookingField label="Email Address *" type="email" value={form.email} onChange={(v) => update('email', v)} required />
                      </div>

                      {/* Phone + Occasion */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <BookingField label="Phone (optional)" type="tel" value={form.phone} onChange={(v) => update('phone', v)} />
                        <div>
                          <p className="text-zinc-500 text-[9px] tracking-[0.45em] uppercase mb-3"
                             style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                            Occasion
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {['Anniversary', 'Birthday', 'Proposal', 'Business', 'Celebration'].map((o) => (
                              <button
                                key={o} type="button"
                                onClick={() => update('occasion', form.occasion === o ? '' : o)}
                                className={`px-3 py-1.5 text-[8px] tracking-[0.25em] uppercase border transition-all duration-200 ${
                                  form.occasion === o
                                    ? 'border-zinc-400 text-zinc-100 bg-zinc-800/50'
                                    : 'border-zinc-800 text-zinc-600 hover:border-zinc-700'
                                }`}
                                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                              >
                                {o}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Dietary */}
                      <div>
                        <p className="text-zinc-500 text-[9px] tracking-[0.45em] uppercase mb-3"
                           style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                          Dietary Requirements
                        </p>
                        <textarea
                          rows={2}
                          value={form.dietary}
                          onChange={(e) => update('dietary', e.target.value)}
                          placeholder="Allergies, intolerances, preferences…"
                          className="w-full bg-transparent border-b border-zinc-700 py-2 text-zinc-200 text-sm focus:outline-none focus:border-zinc-400 transition-colors resize-none placeholder:text-zinc-700"
                        />
                      </div>

                      {/* Error */}
                      {error && (
                        <p className="text-amber-600/80 text-xs tracking-wide border border-amber-900/40 px-4 py-3 bg-amber-950/20">
                          {error}
                        </p>
                      )}

                      {/* Submit */}
                      <motion.button
                        type="submit"
                        disabled={!canSubmit || sending}
                        className="w-full text-xs tracking-[0.4em] uppercase font-medium flex items-center justify-center gap-3 disabled:cursor-not-allowed"
                        whileHover={{ scale: canSubmit && !sending ? 1.005 : 1 }}
                        whileTap={{ scale: 0.998 }}
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          backgroundColor: '#ffffff',
                          color: '#09090b',
                          padding: '20px 40px',
                          opacity: (!canSubmit || sending) ? 0.3 : 1,
                          transition: 'opacity 0.3s',
                        }}
                      >
                        {sending ? (
                          <>
                            <motion.div
                              className="w-3 h-3 border border-zinc-500 border-t-zinc-950 rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                            />
                            Sending…
                          </>
                        ) : (
                          <>
                            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                              <path d="M1 6.5L12 6.5M7 2l5 4.5L7 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Confirm Booking
                          </>
                        )}
                      </motion.button>

                      <p className="text-zinc-700 text-[8px] tracking-[0.25em] uppercase text-center -mt-4">
                        Confirmation sent to your email & our team instantly
                      </p>
                    </div>
                  </form>
                </motion.div>
              )}

              {step === 2 && (
                <ConfirmationPanel
                  key="confirm-panel"
                  bookingRef={bookingRef}
                  form={form}
                  onClose={closeModal}
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Reusable input field ── */
function BookingField({ label, type, value, onChange, required, min }) {
  return (
    <div>
      <p className="text-zinc-500 text-[9px] tracking-[0.45em] uppercase mb-3"
         style={{ fontFamily: "'Cormorant Garamond', serif" }}>
        {label}
      </p>
      <input
        type={type}
        value={value}
        required={required}
        min={min}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border-b border-zinc-700 py-2 text-zinc-200 text-sm focus:outline-none focus:border-zinc-400 transition-colors duration-300 [color-scheme:dark] placeholder:text-zinc-700"
      />
    </div>
  );
}

/* ── Booking confirmation screen ── */
function ConfirmationPanel({ bookingRef, form, onClose }) {
  const exp = EXPERIENCES.find((e) => e.id === form.experience);
  const formattedDate = form.date
    ? new Date(form.date + 'T12:00:00').toLocaleDateString('en-GB', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
      })
    : '—';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-lg bg-zinc-900/90 border border-zinc-800/50 backdrop-blur-2xl overflow-y-auto"
      style={{ maxHeight: '92vh' }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-8 md:p-12 flex flex-col items-center text-center">

        {/* Animated tick */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
          className="w-16 h-16 border border-zinc-600 flex items-center justify-center mb-8 mt-2"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <motion.path
              d="M4 12l5.5 5.5L20 7"
              stroke="white"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            />
          </svg>
        </motion.div>

        <p className="text-zinc-600 text-[9px] tracking-[0.55em] uppercase mb-2"
           style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Booking Confirmed
        </p>
        <h2
          className="text-white leading-tight mb-1"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2rem, 5vw, 2.8rem)',
            fontWeight: 200,
            letterSpacing: '-0.01em',
          }}
        >
          Thank You, {form.name.split(' ')[0]}
        </h2>
        <p
          className="text-zinc-400 mb-10"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.05rem',
            fontStyle: 'italic',
            fontWeight: 300,
          }}
        >
          We look forward to welcoming you.
        </p>

        {/* Reference box */}
        <div className="w-full border border-zinc-800 bg-zinc-950/60 px-8 py-6 mb-8">
          <p className="text-zinc-600 text-[8px] tracking-[0.5em] uppercase mb-2">Booking Reference</p>
          <p
            className="text-white tracking-[0.35em]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(1.5rem, 4vw, 2rem)',
              fontWeight: 200,
            }}
          >
            {bookingRef}
          </p>
        </div>

        {/* Summary */}
        <div className="w-full text-left mb-8 space-y-0">
          {[
            { label: 'Experience', val: exp?.label },
            { label: 'Date',       val: formattedDate },
            { label: 'Guests',     val: `${form.guests} ${parseInt(form.guests) === 1 ? 'Guest' : 'Guests'}` },
            form.occasion && { label: 'Occasion', val: form.occasion },
          ].filter(Boolean).map(({ label, val }) => (
            <div key={label} className="flex justify-between py-3 border-b border-zinc-900">
              <span className="text-zinc-600 text-[9px] tracking-[0.35em] uppercase"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {label}
              </span>
              <span className="text-zinc-300 text-sm text-right"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {val}
              </span>
            </div>
          ))}
        </div>

        {/* Email note */}
        <div className="w-full bg-zinc-800/30 border border-zinc-800/50 px-6 py-4 mb-8 text-left">
          <div className="flex items-start gap-3">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5">
              <rect x="1" y="3" width="14" height="10" rx="1" stroke="#52525b" strokeWidth="1.1" />
              <path d="M1 6l7 4.5L15 6" stroke="#52525b" strokeWidth="1.1" strokeLinecap="round" />
            </svg>
            <div>
              <p className="text-zinc-400 text-xs mb-0.5"
                 style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Confirmation sent to <span className="text-zinc-200">{form.email}</span>
              </p>
              <p className="text-zinc-600 text-[9px] tracking-[0.2em] uppercase">
                Our team will contact you within 24 hours
              </p>
            </div>
          </div>
        </div>

        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="text-[10px] tracking-[0.35em] uppercase border border-zinc-700 px-10 py-3.5 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200 transition-all duration-300"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Close
        </motion.button>

      </div>
    </motion.div>
  );
}
