import AtomMark from './AtomMark';
import TextSizeStepper from './TextSizeStepper';
import { NESG_LANGS } from '../data/i18n';

export default function Gate({ visible, onPick, scale, onBump, t }) {
  return (
    <div className={"m5-gate" + (visible ? "" : " hide")} aria-hidden={!visible}>
      <div className="m5-gate-inner">
        <AtomMark className="atom-mark" />
        <h1 className="m5-gate-title">Nuclear, Explained · 核能，说清楚</h1>
        <p className="m5-gate-sub">Pilih bahasa · மொழியைத் தேர்ந்தெடுக்கவும் · अपनी भाषा चुनें</p>
        <ul className="m5-lang-list">
          {NESG_LANGS.map((l) => (
            <li key={l.code}>
              <button className="m5-lang-btn" onClick={() => onPick(l.code)} lang={l.htmlLang}>
                <span className="m5-lang-native">{l.native}</span>
                <span className="m5-lang-hint">{l.hint}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="m5-gate-controls">
          <span className="m5-tag">{t.ui.textSize}</span>
          <TextSizeStepper scale={scale} onBump={onBump} label={t.ui.textSize} />
        </div>
      </div>
    </div>
  );
}
