interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function Underline({
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
        d="M16 32V12C16 10.8955 16.8955 10 18 10C19.1045 10 20 10.8955 20 12V32C20 39.0654 24.9346 44 32 44C39.0654 44 44 39.0654 44 32V12C44 10.8955 44.8955 10 46 10C47.1045 10 48 10.8955 48 12V32C48 41.2715 41.271 48 32 48C22.729 48 16 41.2715 16 32ZM48 52H16C14.8955 52 14 52.8955 14 54C14 55.1045 14.8955 56 16 56H48C49.1045 56 50 55.1045 50 54C50 52.8955 49.1045 52 48 52Z"
      />
    </svg>
  );
}
