import type { ReactElement } from "react";

interface IconProps {
  className?: string;
  fill?: string;
}

export default function Close({
  className,
  fill = "fill-current",
}: IconProps): ReactElement {
  return (
    <svg
      className={className}
      fill="none"
      height="40"
      viewBox="0 0 40 40"
      width="40"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={fill}
        clipRule="evenodd"
        d="M19.657 18.243L15.414 14 14 15.414l4.243 4.243L14 23.899l1.414 1.415 4.243-4.243 4.242 4.243 1.415-1.415-4.243-4.242 4.243-4.243L23.899 14l-4.242 4.243z"
        fillRule="evenodd"
      />
    </svg>
  );
}
