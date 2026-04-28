interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function MailDetails({
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
        d="M55.1099 20.608L52 18.5334V8C52 6.89551 51.1045 6 50 6H14C12.8955 6 12 6.89551 12 8V18.5334L8.89014 20.608C8.33398 20.979 8 21.6033 8 22.2718V54C8 55.1046 8.89551 56 10 56H54C55.1045 56 56 55.1046 56 54V22.2718C56 21.6033 55.666 20.979 55.1099 20.608ZM16 10H48V27.7278L32 38.3945L16 27.7278V10ZM52 52H12V29.8685L29.7812 41.7227C31.1248 42.6184 32.8752 42.6184 34.2188 41.7227L52 29.8685V52ZM38 16C38 14.8954 38.8955 14 40 14H42C43.1045 14 44 14.8954 44 16C44 17.1046 43.1045 18 42 18H40C38.8955 18 38 17.1046 38 16ZM38 24C38 22.8954 38.8955 22 40 22H42C43.1045 22 44 22.8954 44 24C44 25.1046 43.1045 26 42 26H40C38.8955 26 38 25.1046 38 24ZM20 24C20 22.8954 20.8955 22 22 22H32C33.1045 22 34 22.8954 34 24C34 25.1046 33.1045 26 32 26H22C20.8955 26 20 25.1046 20 24ZM20 16C20 14.8954 20.8955 14 22 14H32C33.1045 14 34 14.8954 34 16C34 17.1046 33.1045 18 32 18H22C20.8955 18 20 17.1046 20 16Z"
      ></path>
    </svg>
  );
}
