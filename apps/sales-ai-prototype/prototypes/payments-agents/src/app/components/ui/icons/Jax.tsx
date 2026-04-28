import type { ReactElement } from "react";

interface IconProps {
  className?: string;
  fill?: string;
}

export default function Jax({
  className,
  fill = "fill-current",
}: IconProps): ReactElement {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="19"
      fill="none"
    >
      <path
        className={fill}
        d="M9.588 1.32c.082-.427.741-.427.823 0 1.095 5.733 2.533 7.172 8.268 8.266.427.082.427.741 0 .823-5.734 1.094-7.174 2.532-8.268 8.265-.082.427-.741.427-.823 0-1.094-5.733-2.533-7.17-8.268-8.265-.427-.082-.427-.74 0-.823C7.055 8.492 8.494 7.053 9.588 1.32M4.614.036c.209-.135.485.14.35.35-1.084 1.683-1.084 2.543 0 4.227.135.209-.141.484-.35.35-1.684-1.084-2.545-1.084-4.229 0-.209.134-.484-.141-.35-.35C1.12 2.93 1.12 2.068.036.385c-.134-.209.141-.484.35-.35C2.07 1.12 2.93 1.12 4.614.036"
      ></path>
    </svg>
  );
}
