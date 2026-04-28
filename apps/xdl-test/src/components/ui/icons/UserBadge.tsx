interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function User({
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
        d="M44 10H39V6C39 4.89545 38.1046 4 37 4H27C25.8954 4 25 4.89545 25 6V10H20C16.6863 10 14 12.6863 14 16V50C14 53.3137 16.6863 56 20 56H44C47.3137 56 50 53.3137 50 50V16C50 12.6863 47.3137 10 44 10ZM29 8H35V16H29V8ZM32 46C38.1965 46 40.7462 49.4326 41.616 52H22.384C23.2538 49.4326 25.8035 46 32 46ZM27 36C27 32.4974 29.0812 30 32 30C34.9188 30 37 32.4974 37 36C37 39.5026 34.9188 42 32 42C29.0812 42 27 39.5026 27 36ZM46 50C46 50.4601 45.8375 50.8792 45.5754 51.2175C44.6934 48.1564 42.3926 44.9046 38.3613 43.201C40.0059 41.4094 41 38.8859 41 36C41 30.2991 37.1309 26 32 26C26.8691 26 23 30.2991 23 36C23 38.8859 23.9941 41.4094 25.6387 43.201C21.6074 44.9046 19.3066 48.1563 18.4246 51.2175C18.1625 50.8792 18 50.4601 18 50V16C18 14.8972 18.8972 14 20 14H25V18C25 19.1046 25.8954 20 27 20H37C38.1046 20 39 19.1046 39 18V14H44C45.1028 14 46 14.8972 46 16V50Z"
      />
    </svg>
  );
}
