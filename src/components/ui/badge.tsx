export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  type?: | "default" | "yellow" | "blue" | "green" | "purple" | "pink" | "red" | "teal";
}

const typeMap = {
  default: "bg-muted text-muted-foreground",
  yellow: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
  blue: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
  green: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
  purple: "bg-purple-500/20 text-purple-300 border border-purple-500/30",
  pink: "bg-pink-500/20 text-pink-300 border border-pink-500/30",
  red: "bg-red-500/20 text-red-300 border border-red-500/30",
  teal: "bg-teal-500/20 text-teal-300 border border-teal-500/30"
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