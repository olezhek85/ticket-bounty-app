"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { navItems } from "../constants";
import { SidebarItem } from "./sidebar-item";

const AuthenticatedSidebar = () => {
  const { data: session } = useSession();

  const [isTransition, setTransition] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const handleToggle = (open: boolean) => {
    setTransition(true);
    setOpen(open);
    setTimeout(() => {
      setTransition(false);
    }, 200);
  };

  if (!session?.user) {
    return <div className="w-[78px] bg-secondary/20" />;
  }

  return (
    <nav
      className={cn(
        "h-screen border-r pt-24",
        isTransition && "duration-200",
        isOpen ? "md:w-60 w-[78px]" : "w-[78px]",
        "animate-[var(--animation-sidebar-from-left)]"
      )}
      onMouseEnter={() => handleToggle(true)}
      onMouseLeave={() => handleToggle(false)}
    >
      <div className="px-3 py-2">
        <nav className="space-y-2">
          {navItems.map((navItem) => (
            <SidebarItem
              key={navItem.title}
              isOpen={isOpen}
              navItem={navItem}
            />
          ))}
        </nav>
      </div>
    </nav>
  );
};

const Sidebar = () => (
  <SessionProvider>
    <AuthenticatedSidebar />
  </SessionProvider>
);

export { Sidebar };
