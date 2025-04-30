"use client";

import { LucideKanban } from "lucide-react";
import Link from "next/link";
import { SessionProvider, useSession } from "next-auth/react";
import { AccountDropdown } from "@/components/account-dropdown";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { buttonVariants } from "@/components/ui/button";
import { homePath, signInPath, signUpPath } from "@/paths";

const AuthenticatedHeader = () => {
  const { data: session } = useSession();

  const navItems = session ? (
    <AccountDropdown session={session} />
  ) : (
    <>
      <Link
        href={signUpPath()}
        className={buttonVariants({ variant: "outline" })}
      >
        Sign Up
      </Link>
      <Link
        href={signInPath()}
        className={buttonVariants({ variant: "default" })}
      >
        Sign In
      </Link>
    </>
  );

  return (
    <nav className="animate-[var(--animation-header-from-top)] supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur w-full  flex py-2.5 px-5 justify-between">
      <div className="flex items-center gap-x-2">
        <Link
          href={homePath()}
          className={buttonVariants({ variant: "ghost" })}
        >
          <LucideKanban />
          <h1 className="text-lg font-semibold">TicketBounty</h1>
        </Link>
      </div>
      <div className="flex items-center gap-x-2">
        <ThemeSwitcher />
        {navItems}
      </div>
    </nav>
  );
};

const Header = () => (
  <SessionProvider>
    <AuthenticatedHeader />
  </SessionProvider>
);

export { Header };
