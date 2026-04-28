interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function Clipboard({
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
        d="M48 10H45.6512C44.8267 7.67114 42.6113 6 40 6H38.921C37.5372 3.61108 34.9594 2 32 2C29.0406 2 26.4628 3.61108 25.079 6H24C21.3887 6 19.1733 7.67114 18.3488 10H16C12.6863 10 10 12.6863 10 16V50C10 53.3137 12.6863 56 16 56H48C51.3137 56 54 53.3137 54 50V16C54 12.6863 51.3137 10 48 10ZM22 12C22 10.8972 22.8972 10 24 10H28C28 7.79437 29.7944 6 32 6C34.2056 6 36 7.79437 36 10H40C41.1028 10 42 10.8972 42 12V18H22V12ZM48 52H16C14.8954 52 14 51.1046 14 50V16C14 14.8954 14.8954 14 16 14H18V20C18 21.1046 18.8954 22 20 22H44C45.1046 22 46 21.1046 46 20V14H48C49.1046 14 50 14.8954 50 16V50C50 51.1046 49.1046 52 48 52Z"
      ></path>
    </svg>
  );
}
