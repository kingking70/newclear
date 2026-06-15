import { Fragment } from 'react';

export default function Rich({ text }) {
  const parts = String(text).split("**");
  return parts.map((p, i) =>
    i % 2 === 1
      ? <mark key={i}>{p}</mark>
      : <Fragment key={i}>{p}</Fragment>
  );
}
