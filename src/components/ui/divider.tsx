import { cn } from '@/utils/cn';

interface DividerProps {
  className?: string;
}

export default function Divider({ className }: DividerProps) {
  return <div className={cn('h-px bg-sidebar-border', className)} />;
}
