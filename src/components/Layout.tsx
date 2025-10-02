"use client";

import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { MadeWithDyad } from "./made-with-dyad";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children }) => (
  <Link
    to={to}
    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
  >
    {children}
  </Link>
);

const SidebarContent = () => (
  <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
    <NavLink to="/college-finder">College Finder with Percentile</NavLink>
    <NavLink to="/form-filling-guide">Form Filling Guide</NavLink>
    <NavLink to="/ils-round">ILS Round</NavLink>
  </nav>
);

const Layout = () => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <span>MHT-CET Guide</span>
            </Link>
          </div>
          <div className="flex-1">
            <SidebarContent />
          </div>
          <MadeWithDyad />
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  to="/"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <span>MHT-CET Guide</span>
                </Link>
                <SidebarContent />
              </nav>
              <MadeWithDyad />
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            {/* Future: Add search or other header elements */}
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;