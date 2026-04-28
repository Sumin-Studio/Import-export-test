interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function Strikethrough({
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
        d="M56 32C56 33.1045 55.1045 34 54 34H45.9018C47.787 35.9119 49 38.5751 49 42.4209C49 50.2891 41.8506 56 32 56C22.4722 56 16.8926 51.0635 16.6602 50.8525C15.8398 50.1123 15.7754 48.8477 16.5151 48.0283C17.2544 47.2109 18.5137 47.1455 19.333 47.877C19.3799 47.9189 24.0791 52 32 52C39.5327 52 45 47.9717 45 42.4209C45 37.3718 42.3199 35.3189 37.6935 34H10C8.89551 34 8 33.1045 8 32C8 30.8955 8.89551 30 10 30H21.925C18.5202 28.3023 16 25.5112 16 20.4209C16 12.9912 22.4297 8 32 8C39.5859 8 45.1133 12.9414 45.3447 13.1514C46.1621 13.8936 46.2231 15.1592 45.4805 15.9766C44.7378 16.7949 43.4731 16.8545 42.6553 16.1123C42.6138 16.0752 38.0059 12 32 12C24.7104 12 20 15.3057 20 20.4209C20 26.2354 24.6855 27.375 32.3301 28.752C34.2397 29.0962 36.268 29.4651 38.2298 30H54C55.1045 30 56 30.8955 56 32Z"
      />
    </svg>
  );
}
