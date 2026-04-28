interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function CardContactless({
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
        d="M52 24H50V10C50 8.89551 49.1045 8 48 8H8C6.89551 8 6 8.89551 6 10V36C6 37.1045 6.89551 38 8 38H16V50C16 53.3137 18.6863 56 22 56H52C55.3137 56 58 53.3137 58 50V30C58 26.6863 55.3137 24 52 24ZM46 12V16C43.7939 16 42 14.2056 42 12H46ZM10 12H14C14 14.2056 12.2061 16 10 16V12ZM10 34V30C12.2061 30 14 31.7944 14 34H10ZM16.1128 28.8504C14.6442 27.1099 12.4503 26 10 26V20C14.4111 20 18 16.4111 18 12H38C38 16.4111 41.5889 20 46 20V24H34.948C34.9792 23.6733 35 23.3413 35 23C35 18.3643 32.0557 15 28 15C23.9443 15 21 18.3643 21 23C21 23.3698 21.0251 23.728 21.0618 24.0806C18.5718 24.4726 16.5906 26.39 16.1128 28.8504ZM31 23C31 23.3373 30.963 23.6715 30.9087 24H25.0913C25.037 23.6715 25 23.3373 25 23C25 21.0088 25.9277 19 28 19C30.0723 19 31 21.0088 31 23ZM54 50C54 51.1046 53.1046 52 52 52H22C20.8955 52 20 51.1046 20 50V40H54V50ZM54 32H20V30C20 28.8954 20.8955 28 22 28H52C53.1046 28 54 28.8954 54 30V32Z"
      />
    </svg>
  );
}
