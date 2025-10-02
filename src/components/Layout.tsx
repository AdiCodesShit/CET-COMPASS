"use client";

import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Home, ListFilter, Menu, GraduationCap, FileText } from "lucide-react"; // Added FileText icon
import { MadeWithDyad } from "./made-with-dyad";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ShortlistedCollegesDisplay from "./ShortlistedCollegesDisplay";
import { mockColleges } from "@/lib/data"; // To get college data for shortlist display

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children }) => (
  <Link
    to={to}
    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
  >
    {children}
  </Link>
);

const SidebarContent = () => (
  <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
    <NavLink to="/college-finder">
      <GraduationCap className="h-4 w-4" />
      College Finder
    </NavLink>
    <NavLink to="/form-filling-guide">
      <ListFilter className="h-4 w-4" />
      Form Filling Guide
    </NavLink>
    <NavLink to="/prepare-documents"> {/* New NavLink for Prepare Documents */}
      <FileText className="h-4 w-4" />
      Prepare Your Documents
    </NavLink>
    <NavLink to="/ils-round">
      <Home className="h-4 w-4" /> {/* Using Home as a placeholder for a relevant icon */}
      ILS Round
    </NavLink>
  </nav>
);

const Layout = () => {
  // This state would ideally come from a global context or prop
  const [shortlistedCollegesCount, setShortlistedCollegesCount] = React.useState(0);
  const [shortlistedCollegeIds, setShortlistedCollegeIds] = React.useState<string[]>([]);

  // This is a temporary way to get the count for the header button
  // In a real app, this would be managed by a global state (e.g., React Context)
  React.useEffect(() => {
    const storedShortlist = localStorage.getItem('shortlistedColleges');
    if (storedShortlist) {
      const ids = JSON.parse(storedShortlist);
      setShortlistedCollegeIds(ids);
      setShortlistedCollegesCount(ids.length);
    }
  }, []);

  const finalShortlistedColleges = mockColleges.filter(college => shortlistedCollegeIds.includes(college.id));


  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-sidebar md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b border-sidebar-border px-4 lg:h-[60px] lg:px-6">
            <Link to="/" className="flex items-center gap-2 font-semibold text-sidebar-primary-foreground">
              <GraduationCap className="h-6 w-6 text-app-purple" />
              <div className="flex flex-col leading-tight">
                <span className="text-lg font-bold text-app-purple">MHT-CET Predictor</span>
                <span className="text-xs text-muted-foreground">Find Your Perfect College</span>
              </div>
            </Link>
          </div>
          <div className="flex-1 py-2">
            <SidebarContent />
          </div>
          <MadeWithDyad />
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 lg:h-[60px] lg:px-6">
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
            <SheetContent side="left" className="flex flex-col bg-sidebar text-sidebar-foreground">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  to="/"
                  className="flex items-center gap-2 text-lg font-semibold text-sidebar-primary-foreground"
                >
                  <GraduationCap className="h-6 w-6 text-app-purple" />
                  <div className="flex flex-col leading-tight">
                    <span className="text-lg font-bold text-app-purple">MHT-CET Predictor</span>
                    <span className="text-xs text-muted-foreground">Find Your Perfect College</span>
                  </div>
                </Link>
                <SidebarContent />
              </nav>
              <MadeWithDyad />
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1 flex items-center justify-between">
            <div className="hidden md:flex items-center gap-4">
              <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-primary">Home</Link>
            </div>
            <div className="ml-auto">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="relative">
                    <ListFilter className="h-4 w-4 mr-2" />
                    My Shortlist ({shortlistedCollegesCount})
                    {shortlistedCollegesCount > 0 && (
                      <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-app-purple text-xs text-white">
                        {shortlistedCollegesCount}
                      </span>
                    )}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[900px] p-0">
                  <DialogHeader className="p-6 pb-0">
                    <DialogTitle>Your Shortlisted Colleges</DialogTitle>
                  </DialogHeader>
                  <ShortlistedCollegesDisplay
                    shortlistedColleges={finalShortlistedColleges}
                    casteCategory={"OPEN"} // This might need to be dynamic if shortlist is global
                  />
                </DialogContent>
              </Dialog>
            </div>
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