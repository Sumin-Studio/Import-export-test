interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function SocialYoutube({
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
      viewBox="0 0 15 15"
      className={className}
      focusable="false"
      aria-hidden="true"
    >
      <path
        className={fill}
        d="M7.5 15.00003C3.35785 15.00003 0 11.64213 0 7.5C0 3.35787 3.35785 0 7.5 0C11.64216 0 14.99996 3.35787 14.99996 7.5C14.99996 11.64213 11.64216 15.00003 7.5 15.00003ZM10.90456 6.94092L5.90454 4.44092C5.48904 4.23388 5 4.53576 5 5V10.00003C5 10.46293 5.48775 10.76653 5.90454 10.55913L10.90456 8.05909C11.36446 7.82916 11.36446 7.17087 10.90456 6.94092Z"
        fillRule="evenodd"
      />
    </svg>
  );
}
