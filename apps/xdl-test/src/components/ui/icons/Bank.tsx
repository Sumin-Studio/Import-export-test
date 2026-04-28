interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function Bank({
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
        d="M54 30C55.1045 30 56 29.1046 56 28V26.4037C56 25.4006 55.4988 24.4639 54.6641 23.9075L34 10.1315V8H36C37.1045 8 38 7.10455 38 6C38 4.89539 37.1045 4 36 4H32C30.8955 4 30 4.89539 30 6V10.1315L9.33594 23.9075C8.50122 24.4639 8 25.4006 8 26.4037V28C8 29.1046 8.89551 30 10 30H14V44H10C8.89551 44 8 44.8954 8 46V54C8 55.1046 8.89551 56 10 56H54C55.1045 56 56 55.1046 56 54V46C56 44.8954 55.1045 44 54 44H50V30H54ZM52 48V52H12V48H52ZM18 44V30H22V44H18ZM26 44V30H30V44H26ZM34 44V30H38V44H34ZM42 44V30H46V44H42ZM13.4083 26L32 13.6055L50.5917 26H13.4083Z"
      ></path>
    </svg>
  );
}
