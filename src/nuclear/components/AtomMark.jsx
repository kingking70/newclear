export default function AtomMark({ className }) {
  return (
    <svg className={className || "atom-mark"} viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="4.5" fill="#FFE600" />
      <ellipse cx="32" cy="32" rx="24" ry="10" fill="none" stroke="currentColor" strokeWidth="2" />
      <ellipse cx="32" cy="32" rx="24" ry="10" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(60 32 32)" />
      <ellipse cx="32" cy="32" rx="24" ry="10" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(-60 32 32)" />
    </svg>
  );
}
