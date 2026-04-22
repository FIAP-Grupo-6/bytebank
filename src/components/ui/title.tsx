import React from "react";

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const sizeMap = {
  h1: "text-3xl",
  h2: "text-2xl",
  h3: "text-xl",
  h4: "text-lg",
  h5: "text-base",
  h6: "text-sm",
};

export default function Title({ children, type = "h1", className = "", ...props }: TitleProps) {
  const Component = type;

  return (
    <Component className={`${sizeMap[type]} font-semibold ${className}`} {...props}>
      {children}
    </Component>
  );
}
