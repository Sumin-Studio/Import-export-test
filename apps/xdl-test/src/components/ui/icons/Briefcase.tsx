interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function Briefcase({
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
        d="M50 14H44C44 9.58173 40.4183 6 36 6H28C23.5817 6 20 9.58173 20 14H14C10.6863 14 8 16.6863 8 20V38C8 39.1046 8.89543 40 10 40H12V50C12 53.3137 14.6863 56 18 56H46C49.3137 56 52 53.3137 52 50V40H54C55.1046 40 56 39.1046 56 38V20C56 16.6863 53.3137 14 50 14ZM24 13.8928C24 11.7429 25.7429 10 27.8928 10H36.1072C38.2571 10 40 11.7429 40 13.8928C40 13.929 40.0073 13.964 40.0091 14H23.9909C23.9927 13.964 24 13.929 24 13.8928ZM46 52H18C16.8954 52 16 51.1046 16 50V40H30V41.9999C30 43.1045 30.8954 43.9999 32 43.9999C33.1046 43.9999 34 43.1045 34 41.9999V40H48V50C48 51.1046 47.1046 52 46 52ZM52 36H34V33.9999C34 32.8954 33.1046 31.9999 32 31.9999C30.8954 31.9999 30 32.8954 30 33.9999V36H12V20C12 18.8954 12.8954 18 14 18H50C51.1046 18 52 18.8954 52 20V36Z"
      ></path>
    </svg>
  );
}
