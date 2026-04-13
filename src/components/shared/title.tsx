import React from "react";

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3";
}

export default function Title({ children, as = "h1", className = "", ...props }: TitleProps) {
  const Component = as;

  return (
    <Component className={`text-2xl font-semibold ${className}`} {...props}>
      {children}
    </Component>
  );
}
