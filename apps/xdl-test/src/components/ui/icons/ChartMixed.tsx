interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function ChartMixed({
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
        d="M56 52H52V38C52 36.8954 51.1046 36 50 36H40V30C40 28.8954 39.1046 28 38 28H26C24.8954 28 24 28.8954 24 30V42H14C12.8954 42 12 42.8954 12 44V52H8C6.89551 52 6 52.8954 6 54C6 55.1046 6.89551 56 8 56H56C57.1045 56 58 55.1046 58 54C58 52.8954 57.1045 52 56 52ZM16 52V46H24V52H16ZM28 52V32H36V52H28ZM40 52V40H48V52H40ZM8.61035 35.438C7.81543 34.6704 7.79395 33.4043 8.56152 32.6099L27.8955 12.6099C28.6621 11.8169 29.9268 11.7949 30.7217 12.5601L38.6592 20.2144L49.1348 10H42C40.8955 10 40 9.10449 40 8C40 6.89551 40.8955 6 42 6H54C55.1045 6 56 6.89551 56 8V20C56 21.1045 55.1045 22 54 22C52.8955 22 52 21.1045 52 20V12.7938L40.0635 24.4321C39.29 25.1865 38.0576 25.1904 37.2783 24.4399L29.3828 16.8262L11.4385 35.3901C10.6694 36.1851 9.40218 36.2049 8.61035 35.438Z"
      ></path>
    </svg>
  );
}
