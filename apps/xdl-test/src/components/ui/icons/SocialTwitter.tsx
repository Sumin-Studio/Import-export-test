interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function SocialTwitter({
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
      viewBox="0 0 14 14"
      className={className}
      focusable="false"
      aria-hidden="true"
    >
      <path
        className={fill}
        d="M8.15275 5.92805L13.25254 0H12.04404L7.61591 5.14724L4.07919 0H0L5.34822 7.78354L0 13.99999H1.20855L5.88475 8.56435L9.61978 13.99999H13.69894L8.15275 5.92805ZM1.64401 0.90978H3.50026L12.04464 13.13159H10.18834L1.64401 0.90978Z"
        fillRule="evenodd"
      />
    </svg>
  );
}
