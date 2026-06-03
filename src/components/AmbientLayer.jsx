import { useEffect, useRef } from 'react';

/**
 * AmbientLayer
 * ─────────────────────────────────────────────────────────────────────────────
 * A purely decorative, fixed-position canvas of large, blurred monochrome
 * gradient orbs that drift slowly with scroll parallax and a faint mouse
 * influence.
 *
 * Rules observed:
 *  • position: fixed — never participates in layout, cannot shift content.
 *  • pointer-events: none — invisible to all interactions.
 *  • will-change: transform — keeps every orb on its own GPU compositor layer.
 *  • z-index: 0 — sits behind all page content (Navbar is z-50, content z-10+).
 *  • All colours sampled directly from the Windoor design token palette.
 *  • Opacity hard-capped at 0.035 so orbs are felt, never seen.
 */

const ORBS = [
  // { x: %, y: %, size: vw, parallaxFactor, opacity }
  { x: 15,  y: 10,  size: 55, parallax: 0.12, opacity: 0.028 },
  { x: 80,  y: 25,  size: 65, parallax: 0.08, opacity: 0.022 },
  { x: 50,  y: 55,  size: 70, parallax: 0.15, opacity: 0.025 },
  { x: 10,  y: 70,  size: 50, parallax: 0.10, opacity: 0.030 },
  { x: 85,  y: 75,  size: 60, parallax: 0.07, opacity: 0.020 },
  { x: 40,  y: 90,  size: 75, parallax: 0.13, opacity: 0.022 },
];

// Monochrome gradient pairs — dark-grey to light-grey, matching design tokens
const GRADIENTS = [
  ['#222222', '#d1d1d1'],
  ['#0b0c0c', '#e2e2e2'],
  ['#444748', '#f1f4f5'],
  ['#5d5f5f', '#dadada'],
  ['#1a1c1c', '#eeeeee'],
  ['#0b0c0c', '#c4c7c7'],
];

export default function AmbientLayer() {
  const containerRef = useRef(null);
  const rafRef       = useRef(null);
  const stateRef     = useRef({
    scrollY:  0,
    mouseX:   0,
    mouseY:   0,
    targetMX: 0,
    targetMY: 0,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const orbs = Array.from(container.children);

    // ── scroll ────────────────────────────────────────────────────────────────
    const onScroll = () => {
      stateRef.current.scrollY = window.scrollY;
    };

    // ── mouse (very faint — normalised -0.5…0.5) ─────────────────────────────
    const onMouse = (e) => {
      stateRef.current.targetMX = (e.clientX / window.innerWidth  - 0.5);
      stateRef.current.targetMY = (e.clientY / window.innerHeight - 0.5);
    };

    // ── raf loop ──────────────────────────────────────────────────────────────
    const tick = () => {
      const s = stateRef.current;

      // Ease mouse toward target (very slow lerp)
      s.mouseX += (s.targetMX - s.mouseX) * 0.02;
      s.mouseY += (s.targetMY - s.mouseY) * 0.02;

      orbs.forEach((orb, i) => {
        const def = ORBS[i];
        // Scroll parallax — slower than page scroll
        const scrollDY = s.scrollY * def.parallax * -1;
        // Mouse parallax — even subtler
        const mouseDX  = s.mouseX * def.parallax * 60;
        const mouseDY  = s.mouseY * def.parallax * 60;

        orb.style.transform =
          `translate3d(${mouseDX}px, calc(${scrollDY}px + ${mouseDY}px), 0)`;
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener('scroll',    onScroll, { passive: true });
    window.addEventListener('mousemove', onMouse,  { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll',    onScroll);
      window.removeEventListener('mousemove', onMouse);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position:       'fixed',
        inset:           0,
        zIndex:          0,
        pointerEvents:  'none',
        overflow:       'hidden',
      }}
    >
      <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
        {ORBS.map((orb, i) => {
          const [c1, c2] = GRADIENTS[i % GRADIENTS.length];
          const sizePx   = `${orb.size}vw`;
          return (
            <div
              key={i}
              style={{
                position:        'absolute',
                left:            `${orb.x}%`,
                top:             `${orb.y}%`,
                width:            sizePx,
                height:           sizePx,
                transform:       'translate3d(0,0,0)',
                translateX:      '-50%',
                translateY:      '-50%',
                marginLeft:      `calc(-${orb.size / 2}vw)`,
                marginTop:       `calc(-${orb.size / 2}vw)`,
                borderRadius:    '50%',
                background:      `radial-gradient(circle at 40% 35%, ${c1}18, ${c2}08 55%, transparent 80%)`,
                filter:          'blur(72px)',
                opacity:          orb.opacity,
                willChange:      'transform',
                backfaceVisibility: 'hidden',
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
