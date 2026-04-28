import { cn } from "@/lib/utils";

const sizeMap = {
  xsmall: "size-2.5",
  small: "size-3",
  default: "size-3.5",
};

export function Loading({
  className,
  size = "default",
}: {
  className?: string;
  size?: "xsmall" | "small" | "default";
}) {
  const dotSize = sizeMap[size];

  return (
    <div
      className={cn("flex items-center justify-center gap-[3px]", className)}
    >
      <div
        className={cn("animate-scale-in rounded-full bg-current", dotSize)}
      />
      <div
        className={cn(
          "animate-scale-in rounded-full bg-current delay-250",
          dotSize
        )}
      />
      <div
        className={cn(
          "animate-scale-in rounded-full bg-current delay-500",
          dotSize
        )}
      />
    </div>
  );
}
