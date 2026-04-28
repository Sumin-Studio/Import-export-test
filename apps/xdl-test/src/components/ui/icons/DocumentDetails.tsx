interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function DocumentDetails({
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
        d="M34 44C34 45.1046 33.1046 46 32 46H22C20.8954 46 20 45.1046 20 44C20 42.8954 20.8954 42 22 42H32C33.1046 42 34 42.8954 34 44ZM32 34H22C20.8954 34 20 34.8954 20 36C20 37.1046 20.8954 38 22 38H32C33.1046 38 34 37.1046 34 36C34 34.8954 33.1046 34 32 34ZM52 29.3137V54C52 55.1046 51.1046 56 50 56H14C12.8954 56 12 55.1046 12 54V10C12 8.89539 12.8954 8 14 8H30.6863C32.808 8 34.8428 8.84283 36.3431 10.3431L49.6569 23.6569C51.1572 25.1571 52 27.192 52 29.3137ZM36 24H44.3431L36 15.6569V24ZM48 30C48 28.8954 47.1046 28 46 28H34C32.8954 28 32 27.1046 32 26V14C32 12.8954 31.1046 12 30 12H16V52H48V30ZM42 34H40C38.8954 34 38 34.8954 38 36C38 37.1046 38.8954 38 40 38H42C43.1046 38 44 37.1046 44 36C44 34.8954 43.1046 34 42 34ZM42 42H40C38.8954 42 38 42.8954 38 44C38 45.1046 38.8954 46 40 46H42C43.1046 46 44 45.1046 44 44C44 42.8954 43.1046 42 42 42Z"
      />
    </svg>
  );
}
