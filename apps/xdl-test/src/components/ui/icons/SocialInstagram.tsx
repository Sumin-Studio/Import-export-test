interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function SocialInstagram({
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
      viewBox="0 0 14 14"
      className={className}
      focusable="false"
      aria-hidden="true"
    >
      <path
        className={fill}
        d="M11.50004 3.5C11.50004 4.05229 11.05224 4.5 10.50004 4.5C9.94774 4.5 9.5 4.05229 9.5 3.5C9.5 2.94772 9.94774 2.5 10.50004 2.5C11.05224 2.5 11.50004 2.94772 11.50004 3.5ZM7 9.99999C8.65686 9.99999 10.00004 8.65686 10.00004 7C10.00004 5.34315 8.65686 4 7 4C5.34315 4 4 5.34315 4 7C4 8.65686 5.34315 9.99999 7 9.99999ZM9 7C9 8.10457 8.10457 9 7 9C5.89543 9 5 8.10457 5 7C5 5.89543 5.89543 5 7 5C8.10457 5 9 5.89543 9 7ZM10.00004 0H4C2 0 0 2 0 4V9.99999C0 11.99999 2 13.99999 4 13.99999H10.00004C12.00004 13.99999 14.00004 11.99999 14.00004 9.99999V4C14.00004 2 12.00004 0 10.00004 0ZM9.57143 1H4.42858C2.71429 1 1 2.71429 1 4.42857V9.57139C1 11.28569 2.71429 12.99999 4.42858 12.99999H9.57143C11.28574 12.99999 13.00004 11.28569 13.00004 9.57139V4.42857C13.00004 2.71429 11.28574 1 9.57143 1Z"
        fillRule="evenodd"
      />
    </svg>
  );
}
