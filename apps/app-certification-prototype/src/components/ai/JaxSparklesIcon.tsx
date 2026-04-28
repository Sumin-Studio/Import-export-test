/** JAX-style paired sparkle marks (filled, for pill chrome). */
export default function JaxSparklesIcon({ className }: { className?: string }) {
  const star =
    "M12 3l1.8 5.6h5.9l-4.8 3.5 1.8 5.6L12 14.2l-4.7 3.5 1.8-5.6-4.8-3.5h5.9L12 3z";
  return (
    <svg
      className={className}
      width={20}
      height={20}
      viewBox="0 0 20 20"
      aria-hidden
    >
      <g fill="currentColor">
        <g transform="translate(0.5 1.5) scale(0.52)">
          <path d={star} />
        </g>
        <g transform="translate(10.5 8) scale(0.34)">
          <path d={star} />
        </g>
      </g>
    </svg>
  );
}
