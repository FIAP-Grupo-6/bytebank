import React from "react";

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: keyof typeof sizeMap;
}

const sizeMap = {
  h1: "text-3xl",
  h2: "text-2xl",
  h3: "text-xl",
  h4: "text-lg",
  h5: "text-base",
  h6: "text-sm",
};

export default function Title({
  children,
  as = "h1",
  size = "h1",
  className = "",
  ...props
}: TitleProps) {
  const Component = as;

  return (
    <Component
      className={`${sizeMap[size]} font-semibold ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}