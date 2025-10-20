"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  HardDrive,
  Upload,
  BarChart,
  Users,
  Bell,
  Settings,
} from 'lucide-react';

const mainNavItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/offers', label: 'Products', icon: HardDrive },
  { href: '/new-offer', label: 'Upload', icon: Upload },
];

const analyticsNavItems = [
    { href: '/stats', label: 'Statistics', icon: BarChart },
    { href: '/competitors', label: 'Competitors', icon: Users },
];

const accountNavItems = [
    { href: '/notifications', label: 'Notifications', icon: Bell, badge: '3' },
    { href: '/profile', label: 'Settings', icon: Settings },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <>
      <SidebarGroup>
          <SidebarGroupLabel>MAIN</SidebarGroupLabel>
          <SidebarMenu>
            {mainNavItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
      </SidebarGroup>
      
      <SidebarGroup>
        <SidebarGroupLabel>ANALYTICS</SidebarGroupLabel>
        <SidebarMenu>
          {analyticsNavItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith(item.href)}
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
      
      <SidebarSeparator />
      
      <SidebarGroup>
        <SidebarGroupLabel>ACCOUNT</SidebarGroupLabel>
        <SidebarMenu>
          {accountNavItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith(item.href)}
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>

    </>
  );
}
