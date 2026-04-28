import type { ReactElement } from "react";
interface IconProps {
  className?: string;
  fill?: string;
}

export default function Arrow({
  className,
  fill = "fill-current",
}: IconProps): ReactElement {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g>
        <path
          d="M9.125 15.9999C9.125 15.6548 9.40483 15.3749 9.75 15.3749L20.7412 15.3749L16.8081 11.4419C16.564 11.1978 16.564 10.8021 16.8081 10.558C17.0522 10.3139 17.448 10.3139 17.692 10.558L22.692 15.558C22.936 15.8021 22.936 16.1978 22.692 16.4419L17.692 21.4419C17.448 21.686 17.0522 21.686 16.8081 21.4419C16.5641 21.1979 16.564 20.8021 16.8081 20.558L20.7412 16.6249H9.75C9.40483 16.6249 9.125 16.3451 9.125 15.9999Z"
          className={fill}
        />
      </g>
    </svg>
  );
}
