import * as React from "react"
import { cn } from "@/utils/cn"
import { cva, type VariantProps } from "class-variance-authority"
import { type LucideIcon } from "lucide-react"

const buttonCircleVariants = cva(
  "inline-flex items-center justify-center p-0 rounded-full font-semibold transition-all duration-200 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:brightness-110",
        secondary: "bg-muted text-muted-foreground hover:bg-accent",
        destructive: "bg-destructive text-destructive-foreground hover:brightness-110",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        sm: "size-10",
        md: "size-12",
        lg: "size-14",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

const iconSizeMap = {
    sm: "size-4",
    md: "size-5",
    lg: "size-6"
}

type ButtonCircleSize = keyof typeof iconSizeMap
type ButtonCircleVariantProps = VariantProps<typeof buttonCircleVariants>

export interface ButtonCircleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonCircleVariantProps {
  icon: LucideIcon
  size?: ButtonCircleSize
  "aria-label": string
}

export function ButtonCircle({
  icon: Icon,
  className,
  variant,
  size = "md",
  "aria-label": ariaLabel,
  ...props
}: ButtonCircleProps) {
  return (
    <button
      aria-label={ariaLabel}
      className={cn(buttonCircleVariants({ variant, size }), className)}
      {...props}
    >
      <Icon className={iconSizeMap[size]} />
    </button>
  )
}
