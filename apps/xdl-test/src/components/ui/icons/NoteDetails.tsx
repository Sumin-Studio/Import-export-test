interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function NoteDetails({
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
        d="M38 28C38 26.8954 38.8954 26 40 26H42C43.1046 26 44 26.8954 44 28C44 29.1046 43.1046 30 42 30H40C38.8954 30 38 29.1046 38 28ZM40 22H42C43.1046 22 44 21.1046 44 20C44 18.8954 43.1046 18 42 18H40C38.8954 18 38 18.8954 38 20C38 21.1046 38.8954 22 40 22ZM22 30H32C33.1046 30 34 29.1046 34 28C34 26.8954 33.1046 26 32 26H22C20.8954 26 20 26.8954 20 28C20 29.1046 20.8954 30 22 30ZM54 12V32.6863C54 34.808 53.1572 36.8428 51.6569 38.3431L38.3431 51.6569C36.8428 53.1571 34.808 54 32.6863 54H12C10.8954 54 10 53.1046 10 52V12C10 10.8954 10.8954 10 12 10H52C53.1046 10 54 10.8954 54 12ZM46.3431 38H38V46.3431L46.3431 38ZM50 14H14V50H32C33.1046 50 34 49.1046 34 48V36C34 34.8954 34.8954 34 36 34H48C49.1046 34 50 33.1046 50 32V14ZM22 22H32C33.1046 22 34 21.1046 34 20C34 18.8954 33.1046 18 32 18H22C20.8954 18 20 18.8954 20 20C20 21.1046 20.8954 22 22 22Z"
      ></path>
    </svg>
  );
}
