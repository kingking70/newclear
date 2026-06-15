import AtomMark from './AtomMark';
import TextSizeStepper from './TextSizeStepper';
import { NESG_LANGS } from '../data/i18n';

export default function Masthead({ t, lang, onLang, scale, onBump, show, active }) {
  return (
    <header className={"mast5" + (show ? " show" : "")}>
      <div className="mast5-row">
        <a className="mast5-brand" href="#cover">
          <AtomMark />
          <span>{t.ui.siteName}</span>
        </a>
        <span className="mast5-folio" aria-hidden="true">
          <strong>{active > 0 ? "0" + active : "—"}</strong>{" / 05"}
        </span>
        <select
          className="m5-lang-select"
          value={lang}
          onChange={(e) => onLang(e.target.value)}
          aria-label="Language"
        >
          {NESG_LANGS.map((l) => (
            <option value={l.code} key={l.code}>{l.native}</option>
          ))}
        </select>
        <TextSizeStepper scale={scale} onBump={onBump} label={t.ui.textSize} />
      </div>
      <div id="m5-progress"><div id="m5-progress-fill"></div></div>
    </header>
  );
}
