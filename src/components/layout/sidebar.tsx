'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navItems } from '@/constants/navigation';
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

  const isRouteActive = (href: string) => pathname === href;

  return (
    <Sidebar variant="sidebar" collapsible="icon" side="left">
      <SidebarHeader className="pt-10 pb-4 px-4">
        <Link href={'/dashboard'} aria-label="Home">
          <Logo />
        </Link>
      </SidebarHeader>
      <SidebarContent className="py-2">
        <SidebarGroup className="px-3">
          <SidebarMenu className="gap-1">
            {navItems.map(({ href, label, icon: Icon }) => (
              <SidebarMenuItem key={href}>
                <SidebarMenuButton
                  tooltip={label}
                  isActive={isRouteActive(href)}
                  className="px-4 py-5 hover:text-green-500 data-[active=true]:text-green-500"
                  asChild
                >
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
