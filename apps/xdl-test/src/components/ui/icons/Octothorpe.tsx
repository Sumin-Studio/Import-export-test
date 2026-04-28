interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function Octothorpe({
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
        d="M54 21H45.8118L47.9404 12.4854C48.208 11.4131 47.5566 10.3271 46.4854 10.0596C45.417 9.79102 44.3281 10.4434 44.0596 11.5146L41.6882 21H27.8118L29.9404 12.4854C30.208 11.4131 29.5566 10.3271 28.4854 10.0596C27.416 9.79102 26.3281 10.4434 26.0596 11.5146L23.6882 21H14C12.8955 21 12 21.8955 12 23C12 24.1045 12.8955 25 14 25H22.6882L19.1882 39H10C8.89551 39 8 39.8955 8 41C8 42.1045 8.89551 43 10 43H18.1882L16.0596 51.5146C15.792 52.5869 16.4434 53.6729 17.5146 53.9404C18.5698 54.2058 19.6688 53.5695 19.9404 52.4854L22.3118 43H36.1882L34.0596 51.5146C33.792 52.5869 34.4434 53.6729 35.5146 53.9404C36.5698 54.2058 37.6688 53.5695 37.9404 52.4854L40.3118 43H50C51.1045 43 52 42.1045 52 41C52 39.8955 51.1045 39 50 39H41.3118L44.8118 25H54C55.1045 25 56 24.1045 56 23C56 21.8955 55.1045 21 54 21ZM37.1882 39H23.3118L26.8118 25H40.6882L37.1882 39Z"
      ></path>
    </svg>
  );
}
