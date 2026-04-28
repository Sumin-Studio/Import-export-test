interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function If({
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
        d="M20 22V42H24C25.1045 42 26 42.8955 26 44C26 45.1045 25.1045 46 24 46H12C10.8955 46 10 45.1045 10 44C10 42.8955 10.8955 42 12 42H16V22H12C10.8955 22 10 21.1045 10 20C10 18.8955 10.8955 18 12 18H24C25.1045 18 26 18.8955 26 20C26 21.1045 25.1045 22 24 22H20ZM55.9727 25.6709L54.9727 19.6709C54.8125 18.707 53.9775 18 53 18H32C30.8955 18 30 18.8955 30 20C30 21.1045 30.8955 22 32 22H36V42H32C30.8955 42 30 42.8955 30 44C30 45.1045 30.8955 46 32 46H44C45.1045 46 46 45.1045 46 44C46 42.8955 45.1045 42 44 42H40V34H48C49.1045 34 50 33.1045 50 32C50 30.8955 49.1045 30 48 30H40V22H51.3057L52.0273 26.3291C52.2099 27.4231 53.2445 28.1534 54.3291 27.9727C55.418 27.791 56.1543 26.7607 55.9727 25.6709Z"
      ></path>
    </svg>
  );
}
