export default function Opener({ num, title, stand, t }) {
  return (
    <div className="m5-open">
      <span className="m5-open-num" aria-hidden="true">{"0" + num}</span>
      <div className="m5-open-inner m5-wrap">
        <p className="m5-open-kicker">{t.ui.sectionWord} {num}</p>
        <h2 className="rv">{title}</h2>
        <p className="m5-open-stand rv">{stand}</p>
      </div>
    </div>
  );
}
