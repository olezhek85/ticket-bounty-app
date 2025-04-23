import { LucideBook, LucideLibrary } from "lucide-react";
import { homePath, ticketsPath } from "@/paths";
import { NavItem } from "./types";

export const navItems: NavItem[] = [
  {
    title: "All tickets",
    icon: <LucideLibrary />,
    href: homePath(),
  },
  {
    title: "My tickets",
    icon: <LucideBook />,
    href: ticketsPath(),
  },
];

export const closedClassName =
  "text-background opacity-80 transition-all duration-300 group-hover:z-40 group-hover:ml-4 group-hover:rounded group-hover:bg-background group-hover:p-2 group-hover:opacity-100";
