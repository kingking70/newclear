import { useState, useEffect } from 'react';
import './nuclear.css';
import { NESG_I18N, NESG_LANGS } from './data/i18n';
import { NESG_JOURNEY } from './data/journey';
import Gate from './components/Gate';
import Masthead from './components/Masthead';
import Cover from './components/Cover';
import RailNav from './components/RailNav';
import LedgerChapter from './components/LedgerChapter';
import BeatChapter from './components/BeatChapter';
import LinksChapter from './components/LinksChapter';
import Footer from './components/Footer';

function useMag5Scroll(entered, setActive) {
  useEffect(() => {
    if (!entered) return;
    let current = -1;
    const update = () => {
      const doc = document.scrollingElement || document.documentElement;
      const els = Array.from(document.querySelectorAll("[data-m5-anchor]"));
      if (!els.length) return;
      const mid = doc.scrollTop + window.innerHeight * 0.45;
      let idx = 0;
      for (let i = 0; i < els.length; i++) {
        if (mid >= els[i].offsetTop) idx = i;
      }
      if (idx !== current) { current = idx; setActive(idx); }
      const fill = document.getElementById("m5-progress-fill");
      const max = doc.scrollHeight - window.innerHeight;
      if (fill && max > 0) fill.style.width = ((doc.scrollTop / max) * 100).toFixed(1) + "%";
    };
    let ticking = false;
    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(() => { update(); ticking = false; }); }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, [entered]);
}

function useMag5Reveal(entered, lang) {
  useEffect(() => {
    if (!entered) return;
    document.body.classList.add("m5-anim");
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    document.querySelectorAll(".rv").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [entered, lang]);
}

export default function NuclearExplained() {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem("nesg-lang") || null; } catch { return null; }
  });
  const [entered, setEntered] = useState(() => !!lang);
  const [textScale, setTextScale] = useState(() => {
    try {
      const v = parseFloat(localStorage.getItem("nesg-textscale"));
      return v >= 0.5 && v <= 2 ? v : 1;
    } catch { return 1; }
  });
  const [active, setActive] = useState(0);

  const t = NESG_I18N[lang || "en"];
  const J = NESG_JOURNEY[lang || "en"];

  useMag5Scroll(entered, setActive);
  useMag5Reveal(entered, lang);

  const pickLang = (code) => {
    setLang(code);
    try { localStorage.setItem("nesg-lang", code); } catch {}
  };

  const enter = (code) => {
    pickLang(code);
    setEntered(true);
    window.scrollTo(0, 0);
  };

  const bumpText = (delta) => {
    setTextScale((prev) => {
      const next = Math.min(2, Math.max(0.5, Math.round((prev + delta) * 100) / 100));
      try { localStorage.setItem("nesg-textscale", String(next)); } catch {}
      return next;
    });
  };

  useEffect(() => {
    document.documentElement.style.fontSize = (18 * textScale).toFixed(2) + "px";
    const meta = NESG_LANGS.find((l) => l.code === lang);
    document.documentElement.setAttribute("lang", meta ? meta.htmlLang : "en");
    document.body.style.overflow = entered ? "" : "hidden";
  }, [lang, textScale, entered]);

  return (
    <>
      <Masthead
        t={t} lang={lang || "en"} onLang={pickLang}
        scale={textScale} onBump={bumpText} show={entered} active={active}
      />
      <RailNav show={entered} active={active} />

      <main>
        <Cover t={t} />
        <LedgerChapter t={t} />
        <BeatChapter num={2} id="s2" t={t} J={J} />
        <BeatChapter num={3} id="s3" t={t} J={J} />
        <BeatChapter num={4} id="s4" t={t} J={J} />
        <LinksChapter t={t} J={J} />
      </main>

      <Footer t={t} />

      <Gate visible={!entered} onPick={enter} scale={textScale} onBump={bumpText} t={t} />
    </>
  );
}
