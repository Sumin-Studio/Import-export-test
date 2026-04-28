interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function CircleQuestion({
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
        d="M32 8C18.7451 8 8 18.7452 8 32C8 45.2548 18.7451 56 32 56C45.2549 56 56 45.2548 56 32C56 18.7452 45.2549 8 32 8ZM32 52C20.9543 52 12 43.0457 12 32C12 20.9543 20.9543 12 32 12C43.0457 12 52 20.9543 52 32C52 43.0457 43.0457 52 32 52ZM35 42C35 43.6569 33.6569 45 32 45C30.3431 45 29 43.6569 29 42C29 40.3431 30.3431 39 32 39C33.6569 39 35 40.3431 35 42ZM41.5 24.875C41.5 28.4502 38.7744 30.0186 36.7842 31.1641C34.8057 32.3027 34 32.8887 34 34.125C34 35.2295 33.1045 36.125 32 36.125C30.8955 36.125 30 35.2295 30 34.125C30 30.4531 32.7676 28.8604 34.7891 27.6973C36.7158 26.5889 37.5 26.0225 37.5 24.875C37.5 23.4463 35.8682 22 32.75 22C29.5186 22 27.6123 24.1914 27.5332 24.2842C26.8203 25.1211 25.5605 25.2285 24.7207 24.5264C23.8799 23.8213 23.7578 22.5762 24.4561 21.7285C24.582 21.5762 27.5859 18 32.75 18C38.4941 18 41.5 21.459 41.5 24.875Z"
      ></path>
    </svg>
  );
}
