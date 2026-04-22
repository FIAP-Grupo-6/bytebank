import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import { type LucideIcon } from 'lucide-react';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:brightness-110 active:brightness-95',
        secondary: 'bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground',
        destructive:
          'bg-destructive text-destructive-foreground hover:brightness-110 active:brightness-95',
      },
      shape: {
        default: '',
        circle: 'rounded-full',
      },
      size: {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-sm',
        lg: 'px-8 py-4 text-base',
      },
      full: {
        true: 'w-full',
        false: 'w-auto',
      },
    },
    compoundVariants: [
      {
        shape: 'circle',
        size: 'sm',
        class: 'w-10 h-10 p-0',
      },
      {
        shape: 'circle',
        size: 'md',
        class: 'w-12 h-12 p-0',
      },
      {
        shape: 'circle',
        size: 'lg',
        class: 'w-14 h-14 p-0',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      shape: 'default',
      size: 'md',
      full: false,
    },
  }
);

type ButtonBaseProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
type ButtonCvaProps = VariantProps<typeof buttonVariants>;

type ButtonProps = ButtonBaseProps &
  ButtonCvaProps & {
    label?: string;
    icon?: LucideIcon;
    iconPosition?: 'left' | 'right';
    iconClassName?: string;
  } & ({ shape?: 'default'; label: string } | { shape: 'circle'; 'aria-label': string });

function Button({
  className,
  variant,
  shape,
  size,
  full,
  label,
  icon: Icon,
  iconPosition = 'left',
  iconClassName,
  type,
  ...props
}: ButtonProps) {
  const isCircle = shape === 'circle';

  return (
    <button
      type={type ?? 'button'}
      className={cn(buttonVariants({ variant, shape, size, full }), className)}
      {...props}
    >
      {isCircle ? (
        Icon && <Icon className={cn('size-6', iconClassName)} />
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className={cn('size-4', iconClassName)} />}

          {label}

          {Icon && iconPosition === 'right' && <Icon className={cn('size-4', iconClassName)} />}
        </>
      )}
    </button>
  );
}

export { Button, buttonVariants };
