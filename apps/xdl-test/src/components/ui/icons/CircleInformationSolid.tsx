interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function CaretUp({
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
        d="M32 8C18.7451 8 8 18.7452 8 32C8 45.2548 18.7451 56 32 56C45.2549 56 56 45.2548 56 32C56 18.7452 45.2549 8 32 8ZM32 19C33.6569 19 35 20.3431 35 22C35 23.6569 33.6569 25 32 25C30.3431 25 29 23.6569 29 22C29 20.3431 30.3431 19 32 19ZM36 46H28C26.8955 46 26 45.1046 26 44C26 42.8954 26.8955 42 28 42H30V32H28C26.8955 32 26 31.1046 26 30C26 28.8954 26.8955 28 28 28H32C33.1045 28 34 28.8954 34 30V42H36C37.1045 42 38 42.8954 38 44C38 45.1046 37.1045 46 36 46Z"
      ></path>
    </svg>
  );
}
