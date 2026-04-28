import type { ReactElement } from "react";

interface IconProps {
  className?: string;
  fill?: string;
}

/** Solid info-in-circle; inner shapes are cut out (even-odd fill). */
export default function InfoFilled({
  className,
  fill = "fill-current",
}: IconProps): ReactElement {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
        className={fill}
      />
    </svg>
  );
}
