function AvatarGroup({
  children,
  size = "medium",
}: {
  children: React.ReactNode;
  size?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge";
}) {
  const sizeSpacing = {
    xxsmall: "space-x-[-0.6875rem]",
    xsmall: "space-x-[-1rem]",
    small: "space-x-[-1rem]",
    medium: "space-x-[-1.125rem]",
    large: "space-x-[-1.625rem]",
    xlarge: "space-x-[-3.75rem]",
  } as const;

  return (
    <div className={` ${sizeSpacing[size as keyof typeof sizeSpacing]}`}>
      {children}
    </div>
  );
}

export { AvatarGroup };
