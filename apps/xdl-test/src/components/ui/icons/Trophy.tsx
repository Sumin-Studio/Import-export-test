interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function Trophy({
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
        d="M56 16H50V12C50 10.8955 49.1045 10 48 10H16C14.8955 10 14 10.8955 14 12V16H8C6.89551 16 6 16.8955 6 18V30C6 33.3086 8.69141 36 12 36H15.8994C17.771 39.7507 20.9023 42.7604 24.7482 44.4615C21.8694 46.6556 20 50.1094 20 54C20 55.1045 20.8955 56 22 56H42C43.1045 56 44 55.1045 44 54C44 50.1094 42.1306 46.6556 39.2518 44.4615C43.0977 42.7604 46.229 39.7507 48.1006 36H52C55.3086 36 58 33.3086 58 30V18C58 16.8955 57.1045 16 56 16ZM12 32C10.8975 32 10 31.103 10 30V20H14V28C14 29.3763 14.1697 30.7114 14.4636 32H12ZM39.7471 52H24.2529C25.1436 48.5532 28.2793 46 32 46C35.7207 46 38.8564 48.5532 39.7471 52ZM32 42C24.2803 42 18 35.7197 18 28V14H46V28C46 35.7197 39.7197 42 32 42ZM54 30C54 31.103 53.1025 32 52 32H49.5364C49.8303 30.7114 50 29.3763 50 28V20H54V30Z"
      />
    </svg>
  );
}
