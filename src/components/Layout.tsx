"use client";

import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Home, ListFilter, Menu, GraduationCap, FileText, LogIn, UserPlus, LogOut, MessageSquareText, MessageSquareMore, MessageSquare, Bell, UserCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ShortlistedCollegesDisplay from "./ShortlistedCollegesDisplay";
import { mockColleges } from "@/lib/data";
import { useAuth } from "@/components/AuthContext";
import { getUserById } from "@/utils/auth";
import UserYearTagDisplay from "./UserYearTagDisplay"; // Import the new component
import UserProfileSettings from "./UserProfileSettings"; // Import the new component

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
    <NavLink to="/prepare-documents">
      <FileText className="h-4 w-4" />
      Prepare Your Documents
    </NavLink>
    <NavLink to="/ils-round">
      <Home className="h-4 w-4" />
      ILS Round
    </NavLink>
    <NavLink to="/college-network">
      <MessageSquareText className="h-4 w-4" />
      College Network
    </NavLink>
    <NavLink to="/college-chats">
      <MessageSquareMore className="h-4 w-4" />
      College Chats
    </NavLink>
    <NavLink to="/direct-messages">
      <MessageSquare className="h-4 w-4" />
      Direct Messages
    </NavLink>
  </nav>
);

const Layout = () => {
  const [shortlistedCollegesCount, setShortlistedCollegesCount] = React.useState(0);
  const [shortlistedCollegeIds, setShortlistedCollegeIds] = React.useState<string[]>([]);
  const { user, logout, isLoading } = useAuth();
  const [pendingFriendRequestsCount, setPendingFriendRequestsCount] = React.useState(0);
  const [currentUserYearTag, setCurrentUserYearTag] = React.useState<string | undefined>(undefined);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = React.useState(false);


  React.useEffect(() => {
    const storedShortlist = localStorage.getItem('shortlistedColleges');
    if (storedShortlist) {
      const ids = JSON.parse(storedShortlist);
      setShortlistedCollegeIds(ids);
      setShortlistedCollegesCount(ids.length);
    }

    if (user) {
      const currentUserData = getUserById(user.id);
      setPendingFriendRequestsCount(currentUserData?.receivedFriendRequests?.length || 0);
      setCurrentUserYearTag(currentUserData?.yearTag); // Set the year tag
    } else {
      setPendingFriendRequestsCount(0);
      setCurrentUserYearTag(undefined);
    }
  }, [user, isProfileDialogOpen]); // Re-fetch user data when profile dialog closes

  const finalShortlistedColleges = mockColleges.filter(college => shortlistedCollegeIds.includes(college.id));

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-sidebar md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-16 items-center border-b border-sidebar-border px-4 lg:h-[70px] lg:px-6">
            <Link to="/" className="flex items-center gap-2 font-semibold text-sidebar-primary-foreground">
              <img src="/cet-compass-logo.jpeg" alt="CET-COMPASS Logo" className="h-10 w-10 object-contain" />
              <div className="flex flex-col leading-tight">
                <span className="text-base font-bold gradient-text">CET-COMPASS</span>
                <span className="text-xs text-muted-foreground">Your Guide to Engineering<br />Admissions</span>
              </div>
            </Link>
          </div>
          <div className="flex-1 py-2">
            <SidebarContent />
          </div>
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
                  <img src="/cet-compass-logo.jpeg" alt="CET-COMPASS Logo" className="h-10 w-10 object-contain" />
                  <div className="flex flex-col leading-tight">
                    <span className="text-base font-bold gradient-text">CET-COMPASS</span>
                    <span className="text-xs text-muted-foreground">Your Guide to Engineering<br />Admissions</span>
                  </div>
                </Link>
                <SidebarContent />
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1 flex items-center justify-between">
            <div className="hidden md:flex items-center gap-4">
              <Button asChild className="gradient-button" size="sm">
                <Link to="/college-finder">Admission Process</Link>
              </Button>
              <Button asChild className="gradient-button" size="sm">
                <Link to="/college-network">College Network</Link>
              </Button>
              <Button asChild className="gradient-button" size="sm">
                <Link to="/college-chats">College Chats</Link>
              </Button>
              <Button asChild className="gradient-button" size="sm">
                <Link to="/direct-messages">Direct Messages</Link>
              </Button>
            </div>
            <div className="ml-auto flex items-center gap-4">
              {!isLoading && (
                user ? (
                  <>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-muted-foreground hidden sm:inline">
                        Hello, {user.username}!
                      </span>
                      {currentUserYearTag && <UserYearTagDisplay yearTag={currentUserYearTag} />}
                    </div>
                    {pendingFriendRequestsCount > 0 && (
                      <Link to="/direct-messages" className="relative">
                        <Button variant="ghost" size="icon" className="text-app-blue">
                          <Bell className="h-5 w-5" />
                          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                            {pendingFriendRequestsCount}
                          </span>
                          <span className="sr-only">Pending Friend Requests</span>
                        </Button>
                      </Link>
                    )}
                    <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-app-purple">
                          <UserCircle className="h-5 w-5" />
                          <span className="sr-only">User Profile</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <UserProfileSettings onClose={() => setIsProfileDialogOpen(false)} />
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline" onClick={logout} className="flex items-center gap-2">
                      <LogOut className="h-4 w-4" /> Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <Button variant="outline" className="flex items-center gap-2">
                        <LogIn className="h-4 w-4" /> Login
                      </Button>
                    </Link>
                    <Link to="/signup">
                      <Button className="gradient-button flex items-center gap-2">
                        <UserPlus className="h-4 w-4" /> Sign Up
                      </Button>
                    </Link>
                  </>
                )
              )}
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
                    casteCategory={"OPEN"}
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