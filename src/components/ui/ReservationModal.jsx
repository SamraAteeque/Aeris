import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EXPERIENCES = [
  {
    id: 'tasting',
    label: "Chef's Tasting",
    courses: '12 courses',
    duration: '4 hrs',
    price: '£680 / person',
    desc: 'A complete culinary journey through the alpine terroir',
  },
  {
    id: 'chefs-table',
    label: "Chef's Table",
    courses: '8 courses',
    duration: '3 hrs',
    price: '£920 / person',
    desc: 'An immersive kitchen experience at the heart of the action',
  },
  {
    id: 'private',
    label: 'Private Dining',
    courses: 'Exclusive',
    duration: 'Custom',
    price: 'from £8,000',
    desc: 'Complete restaurant buyout with bespoke menu creation',
  },
];

const OCCASIONS = ['Anniversary', 'Birthday', 'Proposal', 'Business', 'Celebration', 'Other'];

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 48 : -48, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir) => ({ x: dir > 0 ? -48 :  48, opacity: 0 }),
};

function generateCode() {
  return 'AER-' + Math.random().toString(36).substring(2, 8).toUpperCase();
}

export default function ReservationModal({ isOpen, onClose }) {
  const [step,         setStep]         = useState(1);
  const [dir,          setDir]          = useState(1);
  const [confirmed,    setConfirmed]    = useState(false);
  const [confirmCode,  setConfirmCode]  = useState('');
  const [form,         setForm]         = useState({
    experience: '',
    date:       '',
    guests:     '2',
    name:       '',
    email:      '',
    phone:      '',
    dietary:    '',
    occasion:   '',
  });

  // Pause/resume Lenis so overlay doesn't fight with scroll
  useEffect(() => {
    if (isOpen) {
      window.__lenis?.stop();
    } else {
      window.__lenis?.start();
    }
    return () => window.__lenis?.start();
  }, [isOpen]);

  const update = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const next = () => { setDir(1);  setStep((s) => s + 1); };
  const back = () => { setDir(-1); setStep((s) => s - 1); };

  const handleConfirm = () => {
    setConfirmCode(generateCode());
    setConfirmed(true);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setDir(1);
      setConfirmed(false);
      setForm({ experience: '', date: '', guests: '2', name: '', email: '', phone: '', dietary: '', occasion: '' });
    }, 600);
  };

  const canNext1 = form.experience && form.date && form.guests;
  const canNext2 = form.name.trim() && form.email.trim();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(9,9,11,0.96)' }}
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          {/* Subtle grain */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
              opacity: 0.15,
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl bg-zinc-900/80 border border-zinc-800/50 backdrop-blur-2xl overflow-hidden"
            style={{ maxHeight: '92vh' }}
          >
            {/* Close */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 z-20 text-zinc-600 hover:text-zinc-200 transition-colors duration-300 p-1.5"
              aria-label="Close reservation modal"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M14 4L4 14M4 4l10 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </button>

            {!confirmed ? (
              <div className="flex flex-col overflow-y-auto" style={{ maxHeight: '92vh' }}>
                <div className="px-8 md:px-10 pt-10 pb-6">
                  {/* Label */}
                  <p
                    className="text-zinc-600 text-[9px] tracking-[0.55em] uppercase mb-6"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    Reserve Your Journey
                  </p>

                  {/* Step indicator */}
                  <div className="flex items-center gap-3 mb-8">
                    {[1, 2, 3].map((s) => (
                      <div key={s} className="flex items-center gap-3">
                        <div
                          className={`w-7 h-7 flex items-center justify-center text-[10px] tracking-wider border transition-all duration-500 ${
                            step > s
                              ? 'bg-white border-white text-zinc-950'
                              : step === s
                              ? 'border-zinc-400 text-zinc-200'
                              : 'border-zinc-800 text-zinc-700'
                          }`}
                          style={{ fontFamily: "'Cormorant Garamond', serif" }}
                        >
                          {step > s ? (
                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                              <path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          ) : (
                            s
                          )}
                        </div>
                        {s < 3 && (
                          <div
                            className="h-px w-8 transition-colors duration-700"
                            style={{ backgroundColor: step > s ? 'rgba(161,161,170,0.6)' : 'rgba(63,63,70,0.6)' }}
                          />
                        )}
                      </div>
                    ))}
                    <span
                      className="ml-2 text-zinc-600 text-[9px] tracking-[0.3em] uppercase"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {step === 1 ? 'Experience' : step === 2 ? 'Your Details' : 'Review'}
                    </span>
                  </div>
                </div>

                {/* Step content */}
                <div className="px-8 md:px-10 pb-6 overflow-y-auto flex-1">
                  <AnimatePresence mode="wait" custom={dir}>
                    <motion.div
                      key={step}
                      custom={dir}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {step === 1 && <Step1 form={form} update={update} />}
                      {step === 2 && <Step2 form={form} update={update} />}
                      {step === 3 && <Step3 form={form} />}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Footer controls */}
                <div className="px-8 md:px-10 py-6 border-t border-zinc-800/50 flex items-center justify-between">
                  {step > 1 ? (
                    <button
                      onClick={back}
                      className="text-[10px] tracking-[0.3em] uppercase text-zinc-600 hover:text-zinc-300 transition-colors duration-300"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      ← Back
                    </button>
                  ) : (
                    <span />
                  )}

                  {step < 3 ? (
                    <motion.button
                      onClick={next}
                      disabled={step === 1 ? !canNext1 : !canNext2}
                      className="text-[10px] tracking-[0.3em] uppercase bg-white text-zinc-950 px-8 py-3 disabled:opacity-25 disabled:cursor-not-allowed hover:bg-zinc-100 transition-colors duration-300"
                      whileHover={{ scale: canNext1 || step !== 1 ? 1.01 : 1 }}
                      whileTap={{ scale: 0.99 }}
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      Continue →
                    </motion.button>
                  ) : (
                    <motion.button
                      onClick={handleConfirm}
                      className="text-[10px] tracking-[0.3em] uppercase bg-white text-zinc-950 px-8 py-3 hover:bg-zinc-100 transition-colors duration-300"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      Confirm Reservation
                    </motion.button>
                  )}
                </div>
              </div>
            ) : (
              <ConfirmScreen confirmCode={confirmCode} form={form} onClose={handleClose} />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Step 1: Experience + Date + Guests ── */
function Step1({ form, update }) {
  return (
    <div className="space-y-8 pb-2">
      <div>
        <p
          className="text-zinc-500 text-[9px] tracking-[0.45em] uppercase mb-4"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Select Experience
        </p>
        <div className="space-y-2.5">
          {EXPERIENCES.map((exp) => (
            <motion.button
              key={exp.id}
              onClick={() => update('experience', exp.id)}
              whileHover={{ x: 3 }}
              transition={{ duration: 0.2 }}
              className={`w-full text-left px-5 py-4 border transition-all duration-300 ${
                form.experience === exp.id
                  ? 'border-zinc-400 bg-zinc-800/50'
                  : 'border-zinc-800/80 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p
                    className="text-white text-[1.05rem] leading-tight"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
                  >
                    {exp.label}
                  </p>
                  <p className="text-zinc-600 text-[9px] tracking-[0.25em] uppercase mt-1">
                    {exp.courses} · {exp.duration}
                  </p>
                </div>
                <span
                  className="text-zinc-400 text-sm shrink-0 ml-4 mt-0.5"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {exp.price}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col gap-2">
          <label
            className="text-zinc-500 text-[9px] tracking-[0.45em] uppercase"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Preferred Date
          </label>
          <input
            type="date"
            value={form.date}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => update('date', e.target.value)}
            className="w-full bg-transparent border-b border-zinc-700 py-2 text-zinc-200 text-sm focus:outline-none focus:border-zinc-400 transition-colors duration-300 [color-scheme:dark]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            className="text-zinc-500 text-[9px] tracking-[0.45em] uppercase"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Guests (max 4)
          </label>
          <div className="flex items-center gap-5 border-b border-zinc-700 py-2">
            <button
              onClick={() => update('guests', String(Math.max(1, parseInt(form.guests) - 1)))}
              className="text-zinc-500 hover:text-white transition-colors duration-200 w-5 h-5 flex items-center justify-center text-lg leading-none"
            >
              −
            </button>
            <span
              className="text-zinc-200 text-base w-4 text-center tabular-nums"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {form.guests}
            </span>
            <button
              onClick={() => update('guests', String(Math.min(4, parseInt(form.guests) + 1)))}
              className="text-zinc-500 hover:text-white transition-colors duration-200 w-5 h-5 flex items-center justify-center text-lg leading-none"
            >
              +
            </button>
            <span className="text-zinc-600 text-[9px] tracking-widest uppercase">
              {parseInt(form.guests) === 1 ? 'Guest' : 'Guests'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Step 2: Personal Details ── */
function Step2({ form, update }) {
  return (
    <div className="space-y-7 pb-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        <FormField
          label="Full Name"
          type="text"
          value={form.name}
          placeholder="Your full name"
          onChange={(v) => update('name', v)}
          required
        />
        <FormField
          label="Email Address"
          type="email"
          value={form.email}
          placeholder="your@email.com"
          onChange={(v) => update('email', v)}
          required
        />
      </div>

      <FormField
        label="Phone (optional)"
        type="tel"
        value={form.phone}
        placeholder="+1 (000) 000-0000"
        onChange={(v) => update('phone', v)}
      />

      <div className="flex flex-col gap-3">
        <label
          className="text-zinc-500 text-[9px] tracking-[0.45em] uppercase"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Occasion (optional)
        </label>
        <div className="flex flex-wrap gap-2">
          {OCCASIONS.map((o) => (
            <button
              key={o}
              onClick={() => update('occasion', form.occasion === o ? '' : o)}
              className={`px-4 py-1.5 text-[9px] tracking-[0.25em] uppercase border transition-all duration-200 ${
                form.occasion === o
                  ? 'border-zinc-400 text-zinc-100 bg-zinc-800/50'
                  : 'border-zinc-800 text-zinc-600 hover:border-zinc-700 hover:text-zinc-400'
              }`}
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {o}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label
          className="text-zinc-500 text-[9px] tracking-[0.45em] uppercase"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Dietary Requirements
        </label>
        <textarea
          value={form.dietary}
          onChange={(e) => update('dietary', e.target.value)}
          rows={2}
          placeholder="Allergies, intolerances, preferences…"
          className="w-full bg-transparent border-b border-zinc-700 py-2 text-zinc-200 text-sm focus:outline-none focus:border-zinc-400 transition-colors duration-300 resize-none placeholder:text-zinc-700"
        />
      </div>
    </div>
  );
}

/* ── Reusable field ── */
function FormField({ label, type, value, placeholder, onChange, required }) {
  return (
    <div className="flex flex-col gap-2">
      <label
        className="text-zinc-500 text-[9px] tracking-[0.45em] uppercase"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        {label}
        {required && <span className="text-zinc-700 ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border-b border-zinc-700 py-2 text-zinc-200 text-sm focus:outline-none focus:border-zinc-400 transition-colors duration-300 placeholder:text-zinc-700"
      />
    </div>
  );
}

/* ── Step 3: Review ── */
function Step3({ form }) {
  const exp = EXPERIENCES.find((e) => e.id === form.experience);
  const formatted = form.date
    ? new Date(form.date + 'T12:00:00').toLocaleDateString('en-GB', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
      })
    : '—';

  const rows = [
    { label: 'Experience',    val: exp?.label },
    { label: 'Pricing',       val: exp?.price },
    { label: 'Date',          val: formatted },
    { label: 'Guests',        val: `${form.guests} ${parseInt(form.guests) === 1 ? 'Guest' : 'Guests'}` },
    { label: 'Name',          val: form.name },
    { label: 'Email',         val: form.email },
    form.phone    && { label: 'Phone',    val: form.phone },
    form.occasion && { label: 'Occasion', val: form.occasion },
    form.dietary  && { label: 'Dietary',  val: form.dietary },
  ].filter(Boolean);

  return (
    <div className="pb-2">
      <p
        className="text-zinc-400 text-sm leading-relaxed mb-7"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
      >
        Please review your details. A confirmation will be sent to{' '}
        <span className="text-white">{form.email || '—'}</span>.
      </p>

      <div className="space-y-0">
        {rows.map((row) => (
          <div key={row.label} className="flex justify-between py-3 border-b border-zinc-900/80">
            <span
              className="text-zinc-600 text-[9px] tracking-[0.3em] uppercase shrink-0"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {row.label}
            </span>
            <span
              className="text-zinc-300 text-sm text-right ml-4"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {row.val}
            </span>
          </div>
        ))}
      </div>

      <p className="text-zinc-700 text-[8px] tracking-[0.25em] uppercase mt-6 leading-relaxed">
        By confirming you agree to our cancellation policy.
        Full payment is required 72 hours before dining.
      </p>
    </div>
  );
}

/* ── Confirmation screen ── */
function ConfirmScreen({ confirmCode, form, onClose }) {
  const exp = EXPERIENCES.find((e) => e.id === form.experience);
  const formatted = form.date
    ? new Date(form.date + 'T12:00:00').toLocaleDateString('en-GB', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
      })
    : '—';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center text-center px-8 md:px-12 py-12 overflow-y-auto"
      style={{ maxHeight: '92vh' }}
    >
      {/* Animated checkmark */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.15, ease: [0.34, 1.56, 0.64, 1] }}
        className="w-14 h-14 border border-zinc-600 flex items-center justify-center mb-8"
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <motion.path
            d="M4 11l5 5L18 6"
            stroke="white"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
          />
        </svg>
      </motion.div>

      <p
        className="text-zinc-600 text-[9px] tracking-[0.55em] uppercase mb-2"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        Reservation Confirmed
      </p>
      <h2
        className="text-white mb-1 leading-tight"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(2rem, 5vw, 2.8rem)',
          fontWeight: 200,
          letterSpacing: '-0.01em',
        }}
      >
        We Look Forward
      </h2>
      <p
        className="text-zinc-400 mb-10"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '1.1rem',
          fontWeight: 300,
          fontStyle: 'italic',
        }}
      >
        to welcoming you.
      </p>

      {/* Confirmation code */}
      <div className="w-full border border-zinc-800 bg-zinc-900/60 px-8 py-6 mb-8">
        <p className="text-zinc-600 text-[8px] tracking-[0.5em] uppercase mb-2">Confirmation Reference</p>
        <p
          className="text-white tracking-[0.35em]"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.4rem, 4vw, 2rem)',
            fontWeight: 200,
          }}
        >
          {confirmCode}
        </p>
      </div>

      {/* Summary */}
      <div className="w-full text-left mb-8">
        {[
          { label: 'Experience', val: exp?.label },
          { label: 'Date',       val: formatted },
          { label: 'Guests',     val: `${form.guests} ${parseInt(form.guests) === 1 ? 'Guest' : 'Guests'}` },
        ].map(({ label, val }) => (
          <div key={label} className="flex justify-between py-3 border-b border-zinc-900">
            <span className="text-zinc-600 text-[9px] tracking-[0.3em] uppercase"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {label}
            </span>
            <span className="text-zinc-300 text-sm"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {val}
            </span>
          </div>
        ))}
      </div>

      <p
        className="text-zinc-600 text-sm mb-10"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        A detailed confirmation has been sent to{' '}
        <span className="text-zinc-400">{form.email}</span>
      </p>

      <motion.button
        onClick={onClose}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="text-[10px] tracking-[0.3em] uppercase border border-zinc-700 px-8 py-3 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200 transition-all duration-300"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        Close
      </motion.button>
    </motion.div>
  );
}
