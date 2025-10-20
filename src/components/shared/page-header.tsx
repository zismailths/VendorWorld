import { cn } from '@/lib/utils';
import { SidebarTrigger } from '@/components/ui/sidebar';

type PageHeaderProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
};

export function PageHeader({ title, description, children, className }: PageHeaderProps) {
  return (
    <header className={cn("flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 pb-4 border-b", className)}>
      <div className="flex items-center gap-4">
        <SidebarTrigger className="md:hidden" />
        <div className="grid gap-1">
          <h1 className="font-headline text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
      </div>
      {children && <div className="flex shrink-0 items-center gap-2 ml-auto">{children}</div>}
    </header>
  );
}
