import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, PanelLeft } from "lucide-react";
import { MainNav } from '@/components/main-nav';
import { Logo } from '@/components/icons';
import { userProfile } from "@/lib/data";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
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
              <AvatarImage src={userProfile.avatarUrl} alt={userProfile.name} data-ai-hint="person face" />
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
            <Button variant="ghost" size="icon" className="size-8 shrink-0 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground group-data-[state=expanded]:block hidden">
                <MoreHorizontal />
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
