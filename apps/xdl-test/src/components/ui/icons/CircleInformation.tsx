interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function CircleInformation({
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
        d="M29 22C29 20.3431 30.3431 19 32 19C33.6569 19 35 20.3431 35 22C35 23.6569 33.6569 25 32 25C30.3431 25 29 23.6569 29 22ZM36 42H34V30C34 28.8954 33.1045 28 32 28H28C26.8955 28 26 28.8954 26 30C26 31.1046 26.8955 32 28 32H30V42H28C26.8955 42 26 42.8954 26 44C26 45.1046 26.8955 46 28 46H36C37.1045 46 38 45.1046 38 44C38 42.8954 37.1045 42 36 42ZM56 32C56 45.2548 45.2549 56 32 56C18.7451 56 8 45.2548 8 32C8 18.7452 18.7451 8 32 8C45.2549 8 56 18.7452 56 32ZM52 32C52 20.9543 43.0457 12 32 12C20.9543 12 12 20.9543 12 32C12 43.0457 20.9543 52 32 52C43.0457 52 52 43.0457 52 32Z"
      ></path>
    </svg>
  );
}
