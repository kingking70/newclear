export default function TextSizeStepper({ scale, onBump, label }) {
  const atMin = scale <= 0.5 + 1e-6;
  const atMax = scale >= 2 - 1e-6;
  return (
    <div className="m5-textsize" role="group" aria-label={label}>
      <button onClick={() => onBump(-0.25)} disabled={atMin} aria-label="Smaller text" title="Smaller text">A</button>
      <button onClick={() => onBump(0.25)} disabled={atMax} aria-label="Larger text" title="Larger text">A+</button>
    </div>
  );
}
