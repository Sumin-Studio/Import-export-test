interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function Question({
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
        d="M35 51C35 52.6569 33.6569 54 32 54C30.3431 54 29 52.6569 29 51C29 49.3431 30.3431 48 32 48C33.6569 48 35 49.3431 35 51ZM33.5 8C21.7188 8 17.3447 17.7891 17.165 18.2051C16.7275 19.2158 17.1904 20.3857 18.1992 20.8281C19.2051 21.2666 20.3857 20.8105 20.832 19.8027C20.9736 19.4844 24.3965 12 33.5 12C41.4014 12 45 15.7578 45 19.25C45 22.8486 42.958 24.1631 39.3486 26.1748C35.1836 28.498 30 31.3887 30 40.25C30 41.3545 30.8955 42.25 32 42.25C33.1045 42.25 34 41.3545 34 40.25C34 33.7373 37.3818 31.8525 41.2969 29.6689C44.9072 27.6553 49 25.373 49 19.25C49 13.832 44.1494 8 33.5 8Z"
      />
    </svg>
  );
}
