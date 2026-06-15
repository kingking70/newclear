import Opener from './Opener';

export default function BeatChapter({ num, id, t, J }) {
  const beats = J.beats.filter((b) => b.sec === num);
  return (
    <section className="m5-chapter" id={id} data-m5-anchor="">
      <Opener num={num} title={t.sections[id].title} stand={t.sections[id].teaser} t={t} />
      <div className="m5-body">
        <div className="m5-wrap">
          <div className="m5-beats">
            {beats.map((b, j) => (
              <article className="m5-beat rv" key={b.key}>
                <div className="m5-beat-head">
                  <span className="m5-beat-num" aria-hidden="true">{num}.{j + 1}</span>
                  <h3>{b.title}</h3>
                </div>
                <p className="m5-beat-sub">{b.sub}</p>
                {b.facts.map((f, i) => (
                  <p className="m5-beat-fact" key={i}>{f}</p>
                ))}
                {b.src ? <p className="m5-beat-src">{t.ui.sourceLabel} — {b.src}</p> : null}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
