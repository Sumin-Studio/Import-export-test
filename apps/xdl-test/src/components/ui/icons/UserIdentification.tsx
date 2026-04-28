interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function UserIdentification({
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
        d="M52 14H12C8.68628 14 6 16.6863 6 20V44C6 47.3137 8.68628 50 12 50H52C55.3137 50 58 47.3137 58 44V20C58 16.6863 55.3137 14 52 14ZM16.3828 46C17.2529 43.4326 19.8042 40 26 40C32.1958 40 34.7471 43.4326 35.6172 46H16.3828ZM21 30C21 26.4974 23.0811 24 26 24C28.9187 24 31 26.4974 31 30C31 33.5026 28.9187 36 26 36C23.0811 36 21 33.5026 21 30ZM54 44C54 45.1028 53.1028 46 52 46H39.7729C39.0781 42.7258 36.7383 39.0508 32.3613 37.201C34.0059 35.4094 35 32.8859 35 30C35 24.2991 31.1309 20 26 20C20.8691 20 17 24.2991 17 30C17 32.8859 17.994 35.4094 19.6387 37.201C15.2615 39.0508 12.9219 42.7258 12.2271 46H12C10.8972 46 10 45.1028 10 44V20C10 18.8972 10.8972 18 12 18H52C53.1028 18 54 18.8972 54 20V44ZM50 34C50 35.1046 49.1045 36 48 36H40C38.8955 36 38 35.1046 38 34C38 32.8954 38.8955 32 40 32H48C49.1045 32 50 32.8954 50 34ZM50 26C50 27.1046 49.1045 28 48 28H40C38.8955 28 38 27.1046 38 26C38 24.8954 38.8955 24 40 24H48C49.1045 24 50 24.8954 50 26Z"
      />
    </svg>
  );
}
