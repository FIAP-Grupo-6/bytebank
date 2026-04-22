'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navItems } from '@/constants/navigation';
import { Separator } from '@/components/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Logo } from './logo';

export function AppSidebar() {
  const pathname = usePathname();

  const isRouteActive = (href: string) => pathname === href

  return (
    <Sidebar variant="sidebar" collapsible="icon" side="left">
      <SidebarHeader className="p-4">
        <Link href={'/dashboard'} aria-label="Home">
          <Logo />
        </Link>
      </SidebarHeader>
      <Separator />
      <SidebarContent className="py-2">
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {navItems.map(({ href, label, icon: Icon }) => (
              <SidebarMenuItem key={href}>
                <SidebarMenuButton tooltip={label} isActive={isRouteActive(href)} asChild>
                  <Link href={href} aria-label={label}>
                    <Icon />
                    <span>{label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
