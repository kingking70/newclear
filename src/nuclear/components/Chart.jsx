import { NESG_CHART_DATA } from '../data/i18n';

export default function Chart({ t }) {
  const max = Math.max(...NESG_CHART_DATA.map((d) => d.value));
  return (
    <div className="m5-chart" role="img" aria-label={t.chart.caption}>
      {NESG_CHART_DATA.map((d) => (
        <div className={"m5-chart-row" + (d.hero ? " is-hero" : "")} key={d.key}>
          <span className="m5-chart-label">{t.chart.labels[d.key]}</span>
          <span className="m5-chart-track">
            <span className="m5-chart-fill" style={{ width: Math.max((d.value / max) * 78, 1.2) + "%" }}></span>
            <span className="m5-chart-value">{d.value}</span>
          </span>
        </div>
      ))}
      <p className="m5-chart-caption">{t.chart.caption}</p>
    </div>
  );
}
