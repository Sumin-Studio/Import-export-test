interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function Inbox({
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
        d="M55.9446 35.5496C55.9421 35.5383 55.9432 35.5264 55.9404 35.5151L49.9404 11.5151C49.7178 10.6245 48.918 10 48 10H16C15.082 10 14.2822 10.6245 14.0596 11.5151L8.05957 35.5151C8.05676 35.5264 8.05786 35.5383 8.05542 35.5496C8.02173 35.6949 8 35.8445 8 36V48C8 51.3086 10.6914 54 14 54H50C53.3086 54 56 51.3086 56 48V36C56 35.8445 55.9783 35.6949 55.9446 35.5496ZM17.5615 14H46.4385L51.4385 34H40C38.8955 34 38 34.8955 38 36C38 39.3086 35.3086 42 32 42C28.6914 42 26 39.3086 26 36C26 34.8955 25.1045 34 24 34H12.5615L17.5615 14ZM50 50H14C12.8975 50 12 49.103 12 48V38H22.2012C23.1299 42.5586 27.1709 46 32 46C36.8291 46 40.8701 42.5586 41.7988 38H52V48C52 49.103 51.1025 50 50 50Z"
      ></path>
    </svg>
  );
}
