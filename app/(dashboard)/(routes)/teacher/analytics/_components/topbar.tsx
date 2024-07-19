// components/Topbar.tsx
"use client";
import Link from 'next/link';
import { Menu, Package2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { usePathname } from 'next/navigation';

export const Topbar = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <div className="flex items-center gap-2 text-lg font-semibold md:text-base">
          <Package2 className="h-6 w-6" />
        </div>
        <Link 
          href="/teacher/analytics" 
          className={`transition-colors ${pathname === '/teacher/analytics' ? 'text-foreground font-semibold' : 'text-muted-foreground hover:text-foreground'}`}
        >
          Dashboard
        </Link>
        <Link 
          href="/teacher/analytics/courses" 
          className={`transition-colors ${pathname === '/teacher/analytics/courses' ? 'text-foreground font-semibold' : 'text-muted-foreground hover:text-foreground'}`}
        >
          Courses
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <Package2 className="h-6 w-6" />
            </div>
            <Link 
              href="/teacher/analytics" 
              className={`transition-colors ${pathname === '/teacher/analytics' ? 'text-foreground font-semibold' : 'hover:text-foreground'}`}
            >
              Dashboard
            </Link>
            <Link 
              href="/teacher/analytics/courses" 
              className={`transition-colors ${pathname === '/teacher/analytics/courses' ? 'text-foreground font-semibold' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Courses
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
};
