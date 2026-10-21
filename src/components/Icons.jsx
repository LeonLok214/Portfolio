export function ArrowUpRight({ size = 16, strokeWidth = 1.5, className = '' }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path d="M4 12 12 4M5 4h7v7" stroke="currentColor" strokeWidth={strokeWidth} />
    </svg>
  );
}

export function ArrowDown({ size = 16, className = '' }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 2v12M3.5 9.5 8 14l4.5-4.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function ArrowRight({ size = 16, className = '' }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 8h12M9.5 3.5 14 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function PlusMark({ className = '' }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M6 0v12M0 6h12" stroke="currentColor" strokeWidth=".75" />
    </svg>
  );
}
