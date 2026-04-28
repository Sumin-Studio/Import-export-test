import type { ReactElement } from "react";

interface IconProps {
  className?: string;
}

export default function Home({ className }: IconProps): ReactElement {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="16"
      fill="none"
    >
      <path
        stroke="stroke-current"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.133 9.625v5.866H7.4v-4.266a1.066 1.066 0 0 1 1.067-1.067h1.066a1.067 1.067 0 0 1 1.067 1.067v4.266h4.267V9.625M1 8.558l7.246-7.245a1.067 1.067 0 0 1 1.508 0L17 8.558"
      ></path>
    </svg>
  );
}
