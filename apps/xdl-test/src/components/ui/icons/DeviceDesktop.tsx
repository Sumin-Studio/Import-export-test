interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function CurrencyWithdraw({
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
        d="M54 10H10C8.89551 10 8 10.8955 8 12V44C8 45.1045 8.89551 46 10 46H22V50H20C18.8955 50 18 50.8955 18 52C18 53.1045 18.8955 54 20 54H44C45.1045 54 46 53.1045 46 52C46 50.8955 45.1045 50 44 50H42V46H54C55.1045 46 56 45.1045 56 44V12C56 10.8955 55.1045 10 54 10ZM38 50H26V46H38V50ZM52 42H12V14H52V42ZM42 21.9999V19.9999C42 18.8953 42.8954 17.9999 44 17.9999H46C47.1046 17.9999 48 18.8953 48 19.9999V21.9999C48 23.1045 47.1046 23.9999 46 23.9999H44C42.8954 23.9999 42 23.1045 42 21.9999ZM42 31.9999V29.9999C42 28.8953 42.8954 27.9999 44 27.9999H46C47.1046 27.9999 48 28.8953 48 29.9999V31.9999C48 33.1045 47.1046 33.9999 46 33.9999H44C42.8954 33.9999 42 33.1045 42 31.9999Z"
      />
    </svg>
  );
}
