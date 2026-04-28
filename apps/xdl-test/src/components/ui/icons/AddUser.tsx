interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function AddUser({
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
        d="M48.3242 34.0383C50.6123 31.7983 52 28.4456 52 24.5C52 17.2687 47.3625 12 41 12C34.6375 12 30 17.2687 30 24.5C30 28.4456 31.3877 31.7983 33.6758 34.0383C25.1332 36.6884 22 43.8081 22 48.0345C22 49.1027 22.9055 50 24.018 50H57.9821C59.0945 50 60 49.1027 60 48.0345C60 43.8081 56.8668 36.6884 48.3242 34.0383ZM41 16C45.1098 16 48 19.5095 48 24.5C48 29.4904 45.1098 33 41 33C36.8902 33 34 29.4904 34 24.5C34 19.5095 36.8902 16 41 16ZM26.3497 46C27.3598 42.5834 30.9595 37 41 37C51.0406 37 54.6403 42.5834 55.6504 46H26.3497ZM24 28H16V36C16 37.1046 15.1045 38 14 38C12.8955 38 12 37.1046 12 36V28H4C2.89551 28 2 27.1046 2 26C2 24.8954 2.89551 24 4 24H12V16C12 14.8954 12.8955 14 14 14C15.1045 14 16 14.8954 16 16V24H24C25.1045 24 26 24.8954 26 26C26 27.1046 25.1045 28 24 28Z"
      ></path>
    </svg>
  );
}
