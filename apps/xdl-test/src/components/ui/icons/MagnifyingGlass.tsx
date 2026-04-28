interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function MagnifyingGlass({
  className,
  fill = "fill-current",
  size = 27,
  width,
  height,
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || size}
      height={height || size}
      fill="none"
      viewBox="0 0 27 27"
      className={className}
      focusable="false"
      aria-hidden="true"
    >
      <path
        className={fill}
        d="M23.0835 21.9053L17.3996 16.2214C18.5002 14.8619 19.1619 13.1325 19.1619 11.2472C19.1619 6.876 15.6184 3.3325 11.2472 3.3325C6.87605 3.3325 3.33252 6.876 3.33252 11.2472C3.33252 15.6183 6.87605 19.1619 11.2472 19.1619C13.1326 19.1619 14.8619 18.5001 16.2214 17.3996L21.9053 23.0835C22.2306 23.4088 22.7582 23.4088 23.0835 23.0835C23.4089 22.7581 23.4089 22.2306 23.0835 21.9053ZM11.2472 17.4956C7.79628 17.4956 4.99877 14.6981 4.99877 11.2472C4.99877 7.79626 7.79628 4.99875 11.2472 4.99875C14.6981 4.99875 17.4956 7.79626 17.4956 11.2472C17.4956 14.6981 14.6981 17.4956 11.2472 17.4956Z"
      ></path>
    </svg>
  );
}
