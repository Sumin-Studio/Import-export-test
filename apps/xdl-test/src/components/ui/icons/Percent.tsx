interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function Percent({
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
        d="M44 38.5C39.5889 38.5 36 42.0889 36 46.5C36 50.9111 39.5889 54.5 44 54.5C48.4111 54.5 52 50.9111 52 46.5C52 42.0889 48.4111 38.5 44 38.5ZM44 50.5C41.7939 50.5 40 48.7061 40 46.5C40 44.2939 41.7939 42.5 44 42.5C46.2061 42.5 48 44.2939 48 46.5C48 48.7061 46.2061 50.5 44 50.5ZM20 25.5C24.4111 25.5 28 21.9111 28 17.5C28 13.0889 24.4111 9.5 20 9.5C15.5889 9.5 12 13.0889 12 17.5C12 21.9111 15.5889 25.5 20 25.5ZM20 13.5C22.2061 13.5 24 15.2939 24 17.5C24 19.7061 22.2061 21.5 20 21.5C17.7939 21.5 16 19.7061 16 17.5C16 15.2939 17.7939 13.5 20 13.5ZM49.5615 13.249L17.5615 53.249C16.8727 54.1118 15.6126 54.2517 14.751 53.5615C13.8877 52.8721 13.748 51.6133 14.4385 50.751L46.4385 10.751C47.1289 9.88672 48.3887 9.74902 49.249 10.4385C50.1123 11.1279 50.252 12.3867 49.5615 13.249Z"
      />
    </svg>
  );
}
