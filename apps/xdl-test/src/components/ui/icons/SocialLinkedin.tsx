interface IconProps {
  className?: string;
  fill?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export default function SocialLinkedin({
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
      viewBox="0 0 16 16"
      className={className}
      focusable="false"
      aria-hidden="true"
    >
      <path
        className={fill}
        d="M3.64913 5.61212V15.71356H0.2807V5.61212H3.64913ZM3.92983 1.82402C3.92983 2.83709 3.17156 3.64773 1.95328 3.64773H1.93052C0.75812 3.64773 0 2.83709 0 1.82402C0 0.78815 0.78134 0 1.97639 0C3.17156 0 3.90712 0.78815 3.92983 1.82402ZM9.26315 10.18086V15.71356H5.89485C5.89731 15.44916 5.93879 6.55988 5.89473 5.61213H9.26315V7.09576C9.78427 6.38551 10.60318 5.34276 12.46847 5.34276C14.51788 5.34276 15.99997 6.73451 15.99997 10.02546V15.71356H12.63157V10.42506C12.63157 8.97926 12.27228 8.07232 11.12697 8.07232C10.28497 8.07232 9.26315 8.97926 9.26315 10.18086ZM5.89485 15.71356C5.89485 15.72166 5.89478 15.72146 5.89485 15.71356Z"
        fillRule="evenodd"
      />
    </svg>
  );
}
