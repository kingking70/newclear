import AtomCanvas from './AtomCanvas';

export default function Cover({ t }) {
  const ids = ["s1", "s2", "s3", "s4", "s5"];
  return (
    <section className="m5-cover" id="cover" data-m5-anchor="">
      <AtomCanvas />
      <div className="m5-cover-inner m5-wrap">
        <p className="m5-issue">
          <span className="lab">{t.ui.siteName} — 01 — Singapore</span>
        </p>
        <h1 className="m5-cover-title rv">{t.hero.title}</h1>
        <p className="m5-cover-stand rv">{t.hero.standfirst}</p>
        <nav className="m5-toc rv" aria-label={t.ui.contents}>
          <p className="m5-toc-heading m5-tag">{t.ui.contents}</p>
          <ol>
            {ids.map((id, i) => (
              <li key={id}>
                <a href={"#" + id}>
                  <span className="m5-toc-num" aria-hidden="true">{"0" + (i + 1)}</span>
                  <span className="m5-toc-title">{t.sections[id].title}</span>
                  <span className="m5-toc-arrow" aria-hidden="true">↓</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
      <p className="m5-scrollcue" aria-hidden="true">
        {t.ui.scrollHint} <span className="arr">↓</span>
      </p>
    </section>
  );
}
