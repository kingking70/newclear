export default function RailNav({ show, active }) {
  const ids = ["s1", "s2", "s3", "s4", "s5"];
  return (
    <ol className={"m5-rail" + (show ? " show" : "")} aria-hidden="true">
      {ids.map((id, i) => (
        <li key={id}>
          <a href={"#" + id} className={active === i + 1 ? "active" : ""} tabIndex={-1}>
            {"0" + (i + 1)}
          </a>
        </li>
      ))}
    </ol>
  );
}
