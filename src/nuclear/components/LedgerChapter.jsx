import Opener from './Opener';
import Chart from './Chart';
import Rich from './Rich';

export default function LedgerChapter({ t }) {
  return (
    <section className="m5-chapter" id="s1" data-m5-anchor="">
      <Opener num={1} title={t.sections.s1.title} stand={t.sections.s1.teaser} t={t} />
      <div className="m5-body">
        <div className="m5-wrap">
          <div className="m5-body-head">
            <p className="m5-tag">{t.scrapIntro}</p>
          </div>
          <ol className="m5-ledger">
            {t.myths.map((m, i) => (
              <li key={i} className="rv">
                <div className="m5-row">
                  <div className="m5-cell myth">
                    <p className="m5-cell-tag">
                      <span className="glyph" aria-hidden="true">✗</span>
                      <span className="lab">{t.ui.mythLabel}</span>
                      <span className="src">
                        {t.ui.rumourCounter.replace("{n}", String(i + 1))} · {m.tag}
                      </span>
                    </p>
                    <p className="m5-myth-text">
                      &ldquo;{m.headline}<span className="m5-myth-q">&rdquo;</span>
                    </p>
                  </div>
                  <div className="m5-cell fact">
                    <p className="m5-cell-tag">
                      <span className="glyph" aria-hidden="true">✓</span>
                      <span className="lab">{t.ui.truthLabel}</span>
                    </p>
                    <p className="m5-fact-text">
                      <Rich text={m.truth} />
                    </p>
                    {m.chart ? <Chart t={t} /> : null}
                    <p className="m5-fact-src">{t.ui.sourceLabel} — {m.source}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
