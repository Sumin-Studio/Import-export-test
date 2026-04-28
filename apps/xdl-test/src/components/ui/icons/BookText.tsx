interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function BookText({
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
        d="M48 8H12C10.8955 8 10 8.89551 10 10V18H8C6.89551 18 6 18.8954 6 20C6 21.1046 6.89551 22 8 22H10V30H8C6.89551 30 6 30.8954 6 32C6 33.1046 6.89551 34 8 34H10V42H8C6.89551 42 6 42.8954 6 44C6 45.1046 6.89551 46 8 46H10V54C10 55.1045 10.8955 56 12 56H48C51.3086 56 54 53.3086 54 50V14C54 10.6914 51.3086 8 48 8ZM50 50C50 51.103 49.1025 52 48 52H14V46H16C17.1045 46 18 45.1046 18 44C18 42.8954 17.1045 42 16 42H14V34H16C17.1045 34 18 33.1046 18 32C18 30.8954 17.1045 30 16 30H14V22H16C17.1045 22 18 21.1046 18 20C18 18.8954 17.1045 18 16 18H14V12H48C49.1025 12 50 12.897 50 14V50ZM46 28C46 29.1046 45.1045 30 44 30H24C22.8955 30 22 29.1046 22 28C22 26.8954 22.8955 26 24 26H44C45.1045 26 46 26.8954 46 28ZM38 36C38 37.1046 37.1045 38 36 38H24C22.8955 38 22 37.1046 22 36C22 34.8954 22.8955 34 24 34H36C37.1045 34 38 34.8954 38 36ZM22 20C22 18.8954 22.8955 18 24 18L40 17.9999C41.1045 17.9999 42 18.8954 42 19.9999C42 21.1046 41.1045 21.9999 40 21.9999L24 22C22.8955 22 22 21.1046 22 20Z"
      ></path>
    </svg>
  );
}
