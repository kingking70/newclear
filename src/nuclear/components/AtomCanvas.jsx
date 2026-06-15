import { useRef, useEffect } from 'react';

export default function AtomCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, dpr = 1, raf = 0, running = true, visible = true;

    const dust = Array.from({ length: 70 }, () => ({
      x: Math.random(), y: Math.random(),
      r: 0.6 + Math.random() * 1.6,
      vx: (Math.random() - 0.5) * 0.012,
      vy: (Math.random() - 0.5) * 0.012,
      a: 0.08 + Math.random() * 0.22,
    }));
    const orbits = [
      { tilt: 0.15, rx: 0.42, ry: 0.15, n: 3, speed: 0.22 },
      { tilt: 1.2, rx: 0.36, ry: 0.13, n: 2, speed: -0.16 },
      { tilt: 2.25, rx: 0.46, ry: 0.17, n: 3, speed: 0.12 },
    ];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = Math.max(1, w * dpr);
      canvas.height = Math.max(1, h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (tms) => {
      const tSec = tms / 1000;
      ctx.clearRect(0, 0, w, h);
      const cx = w * 0.72, cy = h * 0.34, S = Math.min(w, h);
      const accRGB = "232,161,58";

      for (const d of dust) {
        if (!reduced) {
          d.x = (d.x + d.vx * 0.016 + 1) % 1;
          d.y = (d.y + d.vy * 0.016 + 1) % 1;
        }
        ctx.beginPath();
        ctx.arc(d.x * w, d.y * h, d.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(236,233,226," + d.a.toFixed(3) + ")";
        ctx.fill();
      }

      for (const o of orbits) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(o.tilt);
        ctx.beginPath();
        ctx.ellipse(0, 0, o.rx * S, o.ry * S, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(236,233,226,0.14)";
        ctx.lineWidth = 1;
        ctx.stroke();
        for (let i = 0; i < o.n; i++) {
          const ph = tSec * o.speed * 1.4 + (i / o.n) * Math.PI * 2;
          const ex = Math.cos(ph) * o.rx * S;
          const ey = Math.sin(ph) * o.ry * S;
          ctx.beginPath();
          ctx.arc(ex, ey, 2.6, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(" + accRGB + ",0.9)";
          ctx.fill();
        }
        ctx.restore();
      }

      const breathe = 1 + (reduced ? 0 : Math.sin(tSec * 1.4) * 0.08);
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, S * 0.085 * breathe);
      grad.addColorStop(0, "rgba(" + accRGB + ",0.55)");
      grad.addColorStop(1, "rgba(" + accRGB + ",0)");
      ctx.beginPath();
      ctx.arc(cx, cy, S * 0.085 * breathe, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx.fillStyle = "rgb(" + accRGB + ")";
      ctx.fill();
    };

    const loop = (tms) => {
      if (running && visible) draw(tms);
      if (!reduced) raf = requestAnimationFrame(loop);
    };

    resize();
    if (reduced) { draw(0); }
    else { raf = requestAnimationFrame(loop); }

    const io = new IntersectionObserver((es) => { visible = es[0].isIntersecting; });
    io.observe(canvas);
    window.addEventListener("resize", resize);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas className="m5-cover-canvas" ref={ref} aria-hidden="true" />;
}
