import type { ReactElement } from "react";

interface IconProps {
  className?: string;
  fill?: string;
}

export default function Projects({
  className,
  fill = "fill-current",
}: IconProps): ReactElement {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="16"
      fill="none"
    >
      <path
        className={fill}
        d="M13.125 2.5H11.25A2.5 2.5 0 0 0 8.75 0h-2.5a2.5 2.5 0 0 0-2.5 2.5H1.875C.839 2.5 0 3.34 0 4.375V10c0 .345.28.625.625.625h.625v3.125c0 1.036.84 1.875 1.875 1.875h8.75c1.036 0 1.875-.84 1.875-1.875v-3.125h.625c.345 0 .625-.28.625-.625V4.375c0-1.036-.84-1.875-1.875-1.875M5 2.466c0-.671.545-1.216 1.216-1.216h2.568c.671 0 1.216.545 1.216 1.216q0 .018.003.034H4.997q.002-.016.003-.034m6.875 11.909h-8.75a.625.625 0 0 1-.625-.625v-3.125h4.375v.625a.625.625 0 1 0 1.25 0v-.625H12.5v3.125c0 .345-.28.625-.625.625m1.875-5H8.125V8.75a.625.625 0 1 0-1.25 0v.625H1.25v-5c0-.345.28-.625.625-.625h11.25c.345 0 .625.28.625.625z"
      ></path>
    </svg>
  );
}
