interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function SocialFacebook({
  className,
  fill = "fill-current",
  size = 64,
  width,
  height,
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || size}
      height={height || size}
      fill="none"
      viewBox="0 0 7 14"
      className={className}
      focusable="false"
      aria-hidden="true"
    >
      <path
        className={fill}
        d="M2.14902 13.99999V7.61398H0V5.12519H2.14902V3.2898C2.14902 1.15981 3.44989 0 5.35003 0C6.26016 0 7.04238 0.06778 7.27044 0.09806V2.32401L5.95252 2.32462C4.91919 2.32462 4.71912 2.81565 4.71912 3.53621V5.12519H7.18357L6.86264 7.61398H4.71912V13.99999H2.14902Z"
        fillRule="evenodd"
      />
    </svg>
  );
}
