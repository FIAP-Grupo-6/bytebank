'use client';

import { cn } from '@/utils/cn';
import { ArrowRightLeft, LayoutDashboard, LogOut, Settings, TrendingUp } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Divider from '../ui/divider';
import Avatar from '../ui/avatar';
import { useIsMobile } from '@/hooks/use-is-mobile';

const sidebarItems = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
  },
  {
    label: 'Transações',
    icon: ArrowRightLeft,
    href: '/transactions',
  },
  {
    label: 'Investimentos',
    icon: TrendingUp,
    href: '/investments',
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const isMobile = useIsMobile();

  if (isMobile) return null;

  return (
    <aside className="h-screen w-64 flex flex-col justify-between bg-sidebar-background text-sidebar-foreground ">
      <div className="flex-1 py-8 px-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">ByteBank</div>
          <nav className="flex flex-col gap-2">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 hover:text-sidebar-primary hover:bg-sidebar-accent rounded-md p-2 transition-colors',
                  pathname === item.href && 'text-sidebar-primary bg-sidebar-accent'
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <Divider />
      <div className="p-6 flex flex-col gap-7">
        <div className="flex items-center gap-3">
          <Avatar fallback="JB" />
          <div className="flex flex-col gap-0.5">
            <span className="text-white text-sm">jown@bytebank.com</span>
            <span className="text-sidebar-foreground text-xs">John Doe</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 cursor-pointer">
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Sair</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
