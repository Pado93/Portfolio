"use client";

import Link from "next/link";

import { useScrolled } from "@/hooks/use-scrolled";

import Container from "./container";
import DesktopNav from "./desktop-nav";
import MobileNav from "./mobile-nav";
import SocialIcons from "../ui/social-icons";

export function Header() {
  const scrolled = useScrolled(10);

  return (
    <Container
      as="header"
      id="header"
      className={`sticky top-0 z-50 py-3 flex items-center justify-between font-exo transition-[padding,background,box-shadow] ease-in-out duration-100 lg:duration-1000 ${
        scrolled
          ? "bg-background lg:bg-zinc-900/80 lg:backdrop-blur-md  lg:py-4 rounded-lg shadow-lg"
          : "bg-transparent lg:pt-12"
      }`}
    >
      <div className="flex items-center">
        <Link
          href={"#hero"}
          className="flex items-center cursor-pointer text-[2rem]"
          aria-label="Scroll to hero section"
        >
          fp
        </Link>
      </div>

      <div className="hidden lg:block">
        <DesktopNav />
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:block">
          <SocialIcons limit={2} />
        </div>

        <div className="lg:hidden">
          <MobileNav />
        </div>
      </div>
    </Container>
  );
}
