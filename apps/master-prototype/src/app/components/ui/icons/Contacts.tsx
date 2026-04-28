import type { ReactElement } from "react";

interface IconProps {
  className?: string;
  stroke?: string;
}

export default function Contacts({
  className,
  stroke = "stroke-current",
}: IconProps): ReactElement {
  return (
    <svg
      className={className}
      fill="none"
      height="20"
      role="presentation"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        className={stroke}
        clipPath="url(#a)"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2.383 5.313a1.754 1.754 0 003.001 1.242 1.757 1.757 0 10-3.001-1.242zm1.758 2.929a2.94 2.94 0 00-2.072.858 2.933 2.933 0 00-.858 2.072v1.758h1.172l.586 4.687h2.344m8.789-12.304a1.757 1.757 0 103.513 0 1.757 1.757 0 00-3.513 0zm1.757 2.929a2.932 2.932 0 012.93 2.93v1.758h-1.172l-.586 4.687h-2.343M7.656 3.555a2.344 2.344 0 104.687-.001 2.344 2.344 0 00-4.687.001zm6.446 7.617a4.102 4.102 0 00-8.204 0v1.758h1.758l.586 5.859h3.516l.586-5.859h1.758v-1.758z" />
      </g>
      <defs>
        <clipPath id="a">
          <path d="M0 0h20v20H0z" fill="#fff" />
        </clipPath>
      </defs>
    </svg>
  );
}
