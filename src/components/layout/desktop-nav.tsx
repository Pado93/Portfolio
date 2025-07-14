import Link from "next/link";

import { navLinks } from "@/data/nav-links";
import { useActiveSection } from "@/hooks/use-active-section";

import { Button } from "../ui/button";

export default function DesktopNav() {
  const sectionIds = navLinks.map((link) => link.href.replace("#", ""));

  const activeHash = useActiveSection(sectionIds);

  return (
    <nav className="flex gap-6 items-center">
      {navLinks.map(({ href, label }) => {
        const isActive = activeHash === href;

        return (
          <Button
            key={href}
            asChild
            variant="ghost"
            className={`font-medium text-lg rounded-full transition-colors ${
              isActive
                ? "bg-white text-black hover:bg-white hover:text-black"
                : "text-foreground hover:bg-zinc-800"
            }`}
          >
            <Link href={href}>{label}</Link>
          </Button>
        );
      })}
    </nav>
  );
}
