
'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { LogOut, MoreHorizontal, PanelLeft, QrCode, PlusCircle, User } from 'lucide-react';
import { MainNav } from '@/components/main-nav';
import { Logo } from '@/components/icons';
import { userProfile } from '@/lib/data';
import Link from 'next/link';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlertProvider } from '@/context/alert-context';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <AlertProvider>
      <SidebarProvider>
        <Sidebar side="left" variant="sidebar" collapsible="icon">
          <SidebarHeader className="border-b border-sidebar-border">
            <div className="flex items-center gap-2">
              <Logo className="size-7 text-primary" />
              <div className="group-data-[state=expanded]:block hidden">
                <h1 className="font-headline text-lg font-semibold text-sidebar-foreground">
                  VendorWorld
                </h1>
                <p className="text-xs text-sidebar-foreground/80">Seller Dashboard</p>
              </div>
              <SidebarTrigger className="ml-auto" />
            </div>
          </SidebarHeader>
          <SidebarContent>
            <MainNav />
          </SidebarContent>
          <SidebarFooter className="mt-auto border-t border-sidebar-border p-3">
            <div className="flex items-center gap-3">
              <Avatar className="size-9">
                <AvatarImage src={userProfile.avatarUrl} alt={userProfile.name} />
                <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden group-data-[state=expanded]:block hidden">
                  <p className="truncate text-sm font-semibold text-sidebar-foreground">
                    {userProfile.name}
                  </p>
                  <p className="truncate text-xs text-sidebar-foreground/80">
                    {userProfile.email}
                  </p>
              </div>
              <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="size-8 shrink-0 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground group-data-[state=expanded]:block hidden">
                          <MoreHorizontal />
                      </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" align="end" className="w-56">
                      <DropdownMenuLabel className="font-normal">
                          <div className="flex flex-col space-y-1">
                              <p className="text-sm font-medium leading-none">{userProfile.name}</p>
                              <p className="text-xs leading-none text-muted-foreground">
                                  {userProfile.email}
                              </p>
                          </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                       <DropdownMenuItem asChild>
                           <Link href="/profile">
                              <User className="mr-2 h-4 w-4" />
                              <span>Profile</span>
                           </Link>
                       </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Log out</span>
                      </DropdownMenuItem>
                  </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <div className="flex flex-col min-h-screen">
              <header className="flex items-center justify-between gap-4 p-4 border-b">
                   <div className="flex items-center gap-4">
                      <SidebarTrigger className="md:hidden" />
                      <h1 className="text-xl font-semibold font-headline tracking-tight">VendorWorld</h1>
                   </div>
                   <div className="flex shrink-0 items-center gap-2">
                      <Button variant="default" asChild>
                          <Link href="/qr-scan">
                              <QrCode className="mr-2 h-4 w-4" />
                              QR Scan
                          </Link>
                      </Button>
                       <Button variant="success" asChild>
                          <Link href="/new-offer">
                              <PlusCircle className="mr-2 h-4 w-4" />
                              Add Product
                          </Link>
                      </Button>
                  </div>
              </header>
              <div className="flex-1">
                  {children}
              </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </AlertProvider>
  );
}
