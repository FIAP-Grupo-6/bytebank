export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  type?: | "default" | "yellow" | "blue" | "green" | "purple" | "pink" | "red" | "teal";
}

const typeMap = {
  default: "bg-muted text-muted-foreground",
  yellow: "bg-yellow-500/15 text-yellow-500 border border-yellow-500/20",
  blue: "bg-blue-500/15 text-blue-500 border border-blue-500/20",
  green: "bg-emerald-500/15 text-emerald-500 border border-emerald-500/20",
  purple: "bg-purple-500/15 text-purple-500 border border-purple-500/20",
  pink: "bg-pink-500/15 text-pink-500 border border-pink-500/20",
  red: "bg-red-500/15 text-red-500 border border-red-500/20",
  teal: "bg-teal-500/15 text-teal-500 border border-teal-500/20"
};

export function Badge({
  children,
  type = "default",
  className = "",
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-xs rounded-full font-medium ${typeMap[type]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}