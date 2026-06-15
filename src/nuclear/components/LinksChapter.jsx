import Opener from './Opener';

export default function LinksChapter({ t, J }) {
  return (
    <section className="m5-chapter" id="s5" data-m5-anchor="">
      <Opener num={5} title={t.sections.s5.title} stand={J.linksSub} t={t} />
      <div className="m5-body">
        <div className="m5-wrap">
          <ul className="m5-links">
            {J.links.map((l, i) => (
              <li key={i} className="rv">
                <a href={l.url} target="_blank" rel="noopener noreferrer">
                  <span className="m5-link-name">{l.name}</span>
                  <span className="m5-link-arrow" aria-hidden="true">↗</span>
                  <span className="m5-link-desc">{l.desc}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
