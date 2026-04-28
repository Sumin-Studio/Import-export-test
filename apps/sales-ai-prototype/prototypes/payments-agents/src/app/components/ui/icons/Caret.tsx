import type { ReactElement } from "react";

interface IconProps {
  className?: string;
  fill?: string;
}

export default function Caret({
  className,
  fill = "fill-current",
}: IconProps): ReactElement {
  return (
    <svg
      className={className}
      fill="none"
      height="6"
      width="10"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={fill}
        d="M5.36 5.626a.5.5 0 01-.72 0l-3.155-3.28a.5.5 0 01.36-.846h6.31a.5.5 0 01.36.847L5.362 5.626z"
      />
    </svg>
  );
}
