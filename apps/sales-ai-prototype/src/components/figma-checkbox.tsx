/**
 * Visual checkbox with optional interactivity. Renders the checkmark as an
 * inline SVG so Figma's HTML-to-design capture can see it.
 */
export function FigmaCheckbox({
  checked,
  onChange,
  className = "",
}: {
  checked?: boolean
  onChange?: () => void
  className?: string
}) {
  return (
    <span
      role={onChange ? "checkbox" : undefined}
      aria-checked={onChange ? !!checked : undefined}
      tabIndex={onChange ? 0 : undefined}
      onClick={onChange ? (e) => { e.preventDefault(); e.stopPropagation(); onChange(); } : undefined}
      onKeyDown={onChange ? (e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); onChange(); } } : undefined}
      className={`inline-flex shrink-0 items-center justify-center rounded ${onChange ? "cursor-pointer" : ""} ${className}`}
      style={{
        width: 16,
        height: 16,
        background: checked ? "#1f68dd" : "#fff",
        border: checked ? "1px solid #1f68dd" : "1px solid #e2e8f0",
      }}
    >
      {checked && (
        <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
          <path
            d="M3 8.5L6.5 12L13 4"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>
  )
}
