interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function DocumentText({
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
        d="M49.6569 23.6569L36.3431 10.3431C34.8428 8.84283 32.808 8 30.6863 8H14C12.8954 8 12 8.89539 12 10V54C12 55.1046 12.8954 56 14 56H50C51.1046 56 52 55.1046 52 54V29.3137C52 27.192 51.1572 25.1571 49.6569 23.6569ZM36 15.6569L44.3431 24H36V15.6569ZM48 52H16V12H30C31.1046 12 32 12.8954 32 14V26C32 27.1046 32.8954 28 34 28H46C47.1046 28 48 28.8954 48 30V52ZM36 44C36 45.1046 35.1046 46 34 46H22C20.8954 46 20 45.1046 20 44C20 42.8954 20.8954 42 22 42H34C35.1046 42 36 42.8954 36 44ZM44 36C44 37.1046 43.1046 38 42 38H22C20.8954 38 20 37.1046 20 36C20 34.8954 20.8954 34 22 34H42C43.1046 34 44 34.8954 44 36Z"
      />
    </svg>
  );
}
