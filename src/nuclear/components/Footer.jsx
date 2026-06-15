import { Fragment } from 'react';

function Disclaimer({ text }) {
  const parts = String(text).split("||");
  return (
    <p className="disclaimer">
      {parts.map((p, i) =>
        i % 2 === 1
          ? <a key={i} className="m5-credit" href="https://kingstonkoh.com" target="_blank" rel="noopener noreferrer">{p}</a>
          : <Fragment key={i}>{p}</Fragment>
      )}
    </p>
  );
}

export default function Footer({ t }) {
  return (
    <footer className="m5-footer">
      <div className="m5-wrap">
        <p className="m5-tag">{t.ui.siteName}</p>
        <p>{t.ui.footerNote}</p>
        <Disclaimer text={t.ui.disclaimer} />
      </div>
    </footer>
  );
}
