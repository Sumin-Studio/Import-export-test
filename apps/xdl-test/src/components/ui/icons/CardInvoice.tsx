interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function CardInvoice({
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
        d="M28 20C28 18.8954 28.8955 18 30 18H32C33.1045 18 34 18.8954 34 20C34 21.1046 33.1045 22 32 22H30C28.8955 22 28 21.1046 28 20ZM24 20C24 18.8954 23.1045 18 22 18H16C14.8955 18 14 18.8954 14 20C14 21.1046 14.8955 22 16 22H22C23.1045 22 24 21.1046 24 20ZM58 32V52C58 55.3137 55.3137 58 52 58H22C18.6863 58 16 55.3137 16 52V48H8C6.89551 48 6 47.1046 6 46V10C6 8.89539 6.89551 8 8 8H40C41.1045 8 42 8.89539 42 10V26H52C55.3137 26 58 28.6863 58 32ZM22 26H38V12H10V44H16V32C16 28.6863 18.6863 26 22 26ZM54 42H20V52C20 53.1046 20.8955 54 22 54H52C53.1046 54 54 53.1046 54 52V42ZM54 32C54 30.8954 53.1046 30 52 30H22C20.8955 30 20 30.8954 20 32V34H54V32Z"
      />
    </svg>
  );
}
