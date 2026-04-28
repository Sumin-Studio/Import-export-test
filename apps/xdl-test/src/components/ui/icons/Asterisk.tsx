interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function Asterisk({
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
        d="M52.5683 43.875C52.0831 44.7152 51.0098 44.9966 50.1776 44.5156L33.7499 35.0311V54C33.7499 54.9668 32.9667 55.75 31.9999 55.75C31.0331 55.75 30.2499 54.9668 30.2499 54V35.0311L13.8222 44.5156C12.9894 44.997 11.9164 44.7147 11.4315 43.875C10.9482 43.0381 11.2353 41.9678 12.0722 41.4844L28.4997 32L12.0722 22.5156C11.2353 22.0322 10.9482 20.9619 11.4315 20.125C11.9149 19.2881 12.9862 19.002 13.8222 19.4844L30.2499 28.9689V10C30.2499 9.0332 31.0331 8.25 31.9999 8.25C32.9667 8.25 33.7499 9.0332 33.7499 10V28.9689L50.1776 19.4844C51.0146 19.002 52.0858 19.2881 52.5683 20.125C53.0517 20.9619 52.7646 22.0322 51.9276 22.5156L35.5002 32L51.9276 41.4844C52.7646 41.9678 53.0517 43.0381 52.5683 43.875Z"
      ></path>
    </svg>
  );
}
