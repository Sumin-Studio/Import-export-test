interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function CurrencyReturn({
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
        d="M56 14H12.8285L19.4141 7.41406C20.1953 6.6333 20.1953 5.3667 19.4141 4.58594C18.6338 3.80469 17.3662 3.80469 16.5859 4.58594L6.58722 14.5847C5.80425 15.3661 5.81311 16.6427 6.58722 17.4153L16.5859 27.4141C16.9761 27.8047 17.4883 28 18 28C18.5117 28 19.0239 27.8047 19.4141 27.4141C20.1953 26.6333 20.1953 25.3667 19.4141 24.5859L12.8285 18H44C44 23.5142 48.4858 28 54 28V36C48.4858 36 44 40.4858 44 46H20C20 40.4858 15.5142 36 10 36H8C6.89551 36 6 36.8955 6 38V48C6 49.1045 6.89551 50 8 50H56C57.1045 50 58 49.1045 58 48V16C58 14.8955 57.1045 14 56 14ZM10 46V40C13.3086 40 16 42.6914 16 46H10ZM48 18H54V24C50.6914 24 48 21.3086 48 18ZM54 46H48C48 42.6914 50.6914 40 54 40V46ZM42 32C42 25.0469 37.7944 20 32 20C26.2056 20 22 25.0469 22 32C22 38.9531 26.2056 44 32 44C37.7944 44 42 38.9531 42 32ZM26 32C26 27.2896 28.4673 24 32 24C35.5327 24 38 27.2896 38 32C38 36.7104 35.5327 40 32 40C28.4673 40 26 36.7104 26 32Z"
      />
    </svg>
  );
}
