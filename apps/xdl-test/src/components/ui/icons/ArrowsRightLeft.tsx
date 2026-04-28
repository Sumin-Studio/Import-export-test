interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function ArrowsOut({
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
        d="M10 18.0001C10 16.8955 10.8954 16.0001 12 16.0001H47.1717L38.5859 7.41432C37.8049 6.63326 37.8049 5.36696 38.5859 4.58589C39.367 3.80482 40.6335 3.8047 41.4146 4.58577L53.4142 16.5859C54.1953 17.3669 54.1953 18.6332 53.4142 19.4143L41.4145 31.4144C40.6335 32.1955 39.3671 32.1955 38.5861 31.4144C37.805 30.6334 37.8048 29.3669 38.5859 28.5858L47.1717 20.0001H12C10.8954 20.0001 10 19.1046 10 18.0001ZM52 44H16.8283L25.4141 35.4141C26.1951 34.6331 26.1951 33.3668 25.4141 32.5857C24.6331 31.8046 23.3665 31.8045 22.5855 32.5856L10.5858 44.5858C9.80475 45.3668 9.80475 46.6331 10.5858 47.4141L22.5854 59.4143C23.3665 60.1953 24.6329 60.1953 25.4139 59.4143C26.195 58.6332 26.1951 57.3667 25.4141 56.5857L16.8283 48H52C53.1046 48 54 47.1045 54 46C54 44.8953 53.1046 44 52 44Z"
      ></path>
    </svg>
  );
}
