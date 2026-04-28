interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function Formula({
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
        d="M54 18.1426C54 19.2471 53.1045 20.1426 52 20.1426C50.8955 20.1426 50 19.2471 50 18.1426C50 14.4688 47.5312 12 43.8574 12C40.8096 12 38.6377 13.6963 37.8984 16.6533L35.0618 28H45C46.1045 28 47 28.8955 47 30C47 31.1045 46.1045 32 45 32H34.0618L29.9824 48.3174C28.7979 53.0557 25.0273 56 20.1426 56C14.2656 56 10 51.7344 10 45.8574C10 44.7529 10.8955 43.8574 12 43.8574C13.1045 43.8574 14 44.7529 14 45.8574C14 49.5312 16.4688 52 20.1426 52C23.1904 52 25.3623 50.3037 26.1016 47.3467L29.9382 32H21C19.8955 32 19 31.1045 19 30C19 28.8955 19.8955 28 21 28H30.9382L34.0176 15.6826C35.2021 10.9443 38.9727 8 43.8574 8C49.7344 8 54 12.2656 54 18.1426Z"
      ></path>
    </svg>
  );
}
