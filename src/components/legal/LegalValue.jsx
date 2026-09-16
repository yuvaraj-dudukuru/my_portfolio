import { isPlaceholder, placeholderLabel } from '../../config/legal.js';

/**
 * Renders a value from src/config/legal.js.
 *
 * A confirmed value prints as-is. An unconfirmed `{{TOKEN}}` prints as a visible,
 * announced "to be confirmed" marker rather than raw braces, so an unfinished
 * legal page reads as unfinished to everyone — including a screen reader — and
 * never quietly ships a string that looks like a redaction bug.
 *
 * @param {object}  props
 * @param {unknown} props.value      The value from config.
 * @param {string} [props.label]     Overrides the label derived from the token.
 * @param {string} [props.className]
 */
export default function LegalValue({ value, label, className = '' }) {
  if (!isPlaceholder(value)) {
    return <span className={className}>{String(value)}</span>;
  }

  const name = label ?? placeholderLabel(value);

  return (
    <span
      data-placeholder
      className={`border-b-2 border-dashed border-critical font-mono text-[0.9em] text-critical ${className}`}
    >
      [ {name} — to be confirmed ]
    </span>
  );
}

/**
 * Same contract, but for a whole block that should disappear until its value is
 * confirmed — used where an unfinished line would read as a broken sentence
 * rather than a gap.
 *
 * @param {{ value: unknown, children: React.ReactNode }} props
 */
export function WhenConfirmed({ value, children }) {
  return isPlaceholder(value) || value == null ? null : children;
}
