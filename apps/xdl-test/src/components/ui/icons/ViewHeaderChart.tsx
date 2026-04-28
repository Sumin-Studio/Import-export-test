interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function ViewHeaderChart({
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
        d="M52 10H12C10.8955 10 10 10.8955 10 12V52C10 53.1045 10.8955 54 12 54H52C53.1045 54 54 53.1045 54 52V12C54 10.8955 53.1045 10 52 10ZM50 14V22H14V14H50ZM22 50V42H30V50H22ZM34 50V34H42V50H34ZM46 50V32C46 30.8954 45.1046 30 44 30H32C30.8954 30 30 30.8954 30 32V38H20C18.8954 38 18 38.8954 18 40V50H14V26H50V50H46Z"
      />
    </svg>
  );
}
