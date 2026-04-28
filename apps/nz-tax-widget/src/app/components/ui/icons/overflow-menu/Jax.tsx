import type { ReactElement } from "react";

interface IconProps {
  className?: string;
  fill?: string;
}

export default function OverflowJax({
  className,
  fill = "fill-current",
}: IconProps): ReactElement {
  return (
    <svg
      className={className}
      fill="none"
      height="19"
      width="17"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={fill}
        clipRule="evenodd"
        d="M.187 3.363a.48.48 0 00-.141.586l-.002-.002a.48.48 0 00.54.267c1.563-.34 1.796-.256 2.776 1.008.14.18.38.237.586.141a.48.48 0 00.268-.54c-.342-1.562-.257-1.796 1.007-2.776a.48.48 0 00.142-.585.48.48 0 00-.54-.267c-1.563.34-1.796.256-2.776-1.008a.482.482 0 00-.853.4c.342 1.562.257 1.796-1.007 2.776zm10.292-.56c.445 5.372 1.138 6.292 6.18 8.2a.53.53 0 01-.143 1.021c-5.373.445-6.293 1.138-8.201 6.18a.529.529 0 01-1.021-.143c-.445-5.373-1.137-6.293-6.18-8.201a.529.529 0 01.143-1.021c5.373-.444 6.293-1.137 8.201-6.18a.529.529 0 011.021.143z"
        fillRule="evenodd"
      />
    </svg>
  );
}
