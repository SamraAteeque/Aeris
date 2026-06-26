# Summit · Fine Dining Website

Award-winning luxury restaurant website built with React + Vite + GSAP + Lenis + Framer Motion.

## Stack
- **React 19** + **Vite 6**
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **GSAP 3** + `@gsap/react` — scroll-scrubbed video, parallax, editorial reveals
- **Lenis** — physics-based smooth momentum scrolling, synced with GSAP ScrollTrigger
- **Framer Motion** — hover states, entry animations, micro-interactions

## Setup

```bash
npm install
npm run dev
```

## Structure

```
src/
├── App.jsx                        # Root — wraps everything in LenisScroll
├── main.jsx
├── index.css                      # Cormorant Garamond font + global resets
└── components/
    ├── ui/
    │   ├── LenisScroll.jsx        # Lenis + GSAP ScrollTrigger sync
    │   └── CustomCursor.jsx       # Magnetic custom cursor
    └── sections/
        ├── HeroSection.jsx        # Scroll-scrubbed video + parallax text + char reveals
        ├── StickyMedia.jsx        # Parallax mountain background
        ├── EditorialText.jsx      # Staggered line-by-line text reveals
        ├── MenuPreview.jsx        # Asymmetric bento-box dish grid
        └── Footer.jsx
```

## Key Techniques

### Video Scrubbing (HeroSection)
Video is paused on mount. A single GSAP tween (killed and recreated each tick) maps
`scrollTrigger.progress → video.currentTime`. No stacked tweens = no stutter.

### Lenis + GSAP Sync (LenisScroll)
Lenis runs inside `gsap.ticker.add()` — same RAF loop. On every scroll tick,
`ScrollTrigger.update()` is called so pinning and scrubbing stay perfectly aligned.

### Parallax (StickyMedia)
Background moves at 25% of scroll speed via `scrub: true`. Foreground moves at normal
speed. The offset creates cinematic depth perception.

### Editorial Reveals (EditorialText)
Each headline line is wrapped in `overflow: hidden`. GSAP animates `y: '105%' → '0%'`
so text appears to slide up from behind a mask — classic editorial reveal.

## If video is still choppy
Compress your video: H.264, 720p, CFR 30fps, ~3–5MB.
Use HandBrake (free) — this single step makes more difference than any code change.
