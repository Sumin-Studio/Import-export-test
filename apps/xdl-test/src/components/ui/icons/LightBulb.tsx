interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function LightBulb({
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
        d="M32 4C20.4209 4 11 13.4204 11 25C11 32.6895 15.2773 39.7944 22 43.4468V50C22 50.1636 22.0205 50.3267 22.0596 50.4849L24.0596 58.4849C24.2822 59.3755 25.082 60 26 60H38C38.918 60 39.7178 59.3755 39.9404 58.4849L41.9404 50.4849C41.9795 50.3267 42 50.1636 42 50V43.4468C48.7227 39.7944 53 32.6895 53 25C53 13.4204 43.5791 4 32 4ZM38 44V48H26V44H38ZM27.5615 56L26.5615 52H37.4385L36.4385 56H27.5615ZM39.9451 40H34V27H40C41.1045 27 42 26.1045 42 25C42 23.8955 41.1045 23 40 23H24C22.8955 23 22 23.8955 22 25C22 26.1045 22.8955 27 24 27H30V40H24.0549C18.5295 37.0657 15 31.2766 15 25C15 15.626 22.626 8 32 8C41.374 8 49 15.626 49 25C49 31.2766 45.4705 37.0657 39.9451 40Z"
      ></path>
    </svg>
  );
}
