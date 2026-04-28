interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function TextBlock({
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
        d="M52 10H12C10.8954 10 10 10.8954 10 12V52C10 53.1046 10.8954 54 12 54H52C53.1046 54 54 53.1046 54 52V12C54 10.8954 53.1046 10 52 10ZM50 50H14V14H50V50ZM18.0273 25.6709L19.0273 19.6709C19.188 18.707 20.0225 18 21 18H43C43.9775 18 44.812 18.707 44.9727 19.6709L45.9727 25.6709C46.1543 26.7607 45.4185 27.791 44.3286 27.9727C43.2471 28.1537 42.2101 27.4243 42.0273 26.3291L41.3057 22H34V42H38C39.1045 42 40 42.8955 40 44C40 45.1045 39.1045 46 38 46H26C24.8955 46 24 45.1045 24 44C24 42.8955 24.8955 42 26 42H30V22H22.6943L21.9727 26.3291C21.791 27.418 20.7612 28.1533 19.6714 27.9727C18.5815 27.791 17.8457 26.7607 18.0273 25.6709Z"
      />
    </svg>
  );
}
