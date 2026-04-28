interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function GiftBox({
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
        d="M54 16H49.315C49.7495 15.0892 50 14.0745 50 13C50 9.14014 46.8599 6 43 6C41.4951 6 40.0039 6.49707 38.7998 7.3999L32 12.5L25.2002 7.3999C23.9961 6.49707 22.5049 6 21 6C17.1401 6 14 9.14014 14 13C14 14.0745 14.2505 15.0892 14.685 16H10C8.89545 16 8 16.8954 8 18V30C8 31.1046 8.89545 32 10 32H12V54C12 55.1046 12.8954 56 14 56H50C51.1046 56 52 55.1046 52 54V32H54C55.1046 32 56 31.1046 56 30V18C56 16.8954 55.1046 16 54 16ZM41.2002 10.6001C41.7158 10.2129 42.355 10 43 10C44.6543 10 46 11.3457 46 13C46 14.6543 44.6543 16 43 16H34L41.2002 10.6001ZM18 13C18 11.3457 19.3457 10 21 10C21.645 10 22.2842 10.2129 22.7998 10.6001L30 16H21C19.3457 16 18 14.6543 18 13ZM12 28V20H30V28H12ZM16 32H30V52H16V32ZM48 52H34V32H48V52ZM52 28H34V20H52V28Z"
      ></path>
    </svg>
  );
}
