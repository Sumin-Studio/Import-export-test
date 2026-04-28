import type { ReactElement } from "react";

interface IconProps {
  className?: string;
  stroke?: string;
}

export default function Settings({
  className,
  stroke = "stroke-current",
}: IconProps): ReactElement {
  return (
    <svg
      className={className}
      fill="none"
      height="16"
      role="presentation"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={stroke}
        d="M7.119 2.052a1.223 1.223 0 001.817 0l.592-.648a1.224 1.224 0 012.13.883l-.044.875a1.223 1.223 0 001.282 1.283l.875-.044a1.224 1.224 0 01.881 2.131l-.65.588a1.225 1.225 0 000 1.818l.65.587a1.224 1.224 0 01-.883 2.132l-.875-.045a1.223 1.223 0 00-1.285 1.285l.045.875a1.224 1.224 0 01-2.126.881l-.589-.65a1.224 1.224 0 00-1.817 0l-.59.65a1.225 1.225 0 01-2.13-.88l.046-.874a1.223 1.223 0 00-1.285-1.285l-.875.044a1.224 1.224 0 01-.885-2.13l.65-.587a1.225 1.225 0 000-1.818l-.65-.59a1.224 1.224 0 01.88-2.13l.875.045A1.224 1.224 0 004.444 3.16l-.041-.875a1.224 1.224 0 012.128-.881l.588.648z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className={stroke}
        d="M5.215 8.03a2.812 2.812 0 105.625 0 2.812 2.812 0 00-5.625 0z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
