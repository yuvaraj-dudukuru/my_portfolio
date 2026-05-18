// Tiny className combiner. Avoids pulling in clsx for a one-liner.
export function cn(...args) {
  return args.filter(Boolean).join(' ');
}

export default cn;
