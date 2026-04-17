import { ArrowLeftRight, LayoutDashboard } from 'lucide-react';
import { NavItem } from '@/types/navigation';

export const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/transactions', label: 'Transações', icon: ArrowLeftRight },
];
