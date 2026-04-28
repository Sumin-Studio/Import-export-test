interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function MailOpen({
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
      viewBox="0 0 64 64"
      className={className}
      focusable="false"
      aria-hidden="true"
    >
      <path
        className={fill}
        d="M8 22.2718V54C8 55.1046 8.89543 56 10 56H54C55.1046 56 56 55.1046 56 54V22.2718C56 21.6033 55.666 20.979 55.1099 20.6081L34.2188 6.67175C32.8751 5.77608 31.1249 5.77608 29.7812 6.67175L8.89011 20.6081C8.33399 20.979 8 21.6033 8 22.2718ZM52 52H12V29.8685L29.7812 41.7227C31.1249 42.6184 32.8751 42.6184 34.2188 41.7227L52 29.8685V52ZM52 25.0612L32 38.3945L12 25.0612V23.3333L32 10L52 23.3333V25.0612Z"
      ></path>
    </svg>
  );
}
