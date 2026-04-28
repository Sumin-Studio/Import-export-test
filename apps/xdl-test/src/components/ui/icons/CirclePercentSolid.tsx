interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function CirclePercentSolid({
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
        d="M24 27C22.8975 27 22 26.1025 22 25C22 23.8975 22.8975 23 24 23C25.1025 23 26 23.8975 26 25C26 26.1025 25.1025 27 24 27ZM56 32C56 45.2548 45.2549 56 32 56C18.7451 56 8 45.2548 8 32C8 18.7452 18.7451 8 32 8C45.2549 8 56 18.7452 56 32ZM24 31C27.3086 31 30 28.3086 30 25C30 21.6914 27.3086 19 24 19C20.6914 19 18 21.6914 18 25C18 28.3086 20.6914 31 24 31ZM42.5479 22.2666C43.2471 21.4111 43.1211 20.1514 42.2666 19.4521C41.4102 18.7539 40.1514 18.8779 39.4521 19.7334L21.4521 41.7334C20.7529 42.5889 20.8789 43.8486 21.7334 44.5479C22.5895 45.2467 23.8481 45.1219 24.5479 44.2666L42.5479 22.2666ZM46 39C46 35.6914 43.3086 33 40 33C36.6914 33 34 35.6914 34 39C34 42.3086 36.6914 45 40 45C43.3086 45 46 42.3086 46 39ZM40 37C38.8975 37 38 37.8975 38 39C38 40.1025 38.8975 41 40 41C41.1025 41 42 40.1025 42 39C42 37.8975 41.1025 37 40 37Z"
      ></path>
    </svg>
  );
}
