"use client";
import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: string[]) {
  const [activeId, setActiveId] = useState<string>("");

  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrollDirection(currentScrollY > lastScrollY ? "down" : "up");
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleObserve = (entries: IntersectionObserverEntry[]) => {
      let newActiveId = activeId;
      let highestVisibleRatio = 0;

      entries.forEach((entry) => {
        const ratio = entry.intersectionRatio;
        const id = `#${entry.target.id}`;

        if (scrollDirection === "down" && entry.isIntersecting) {
          newActiveId = id;
          return;
        }

        if (scrollDirection === "up" && ratio > highestVisibleRatio) {
          highestVisibleRatio = ratio;
          newActiveId = id;
        }
      });

      if (newActiveId !== activeId) {
        setActiveId(newActiveId);
      }
    };

    const observer = new IntersectionObserver(handleObserve, {
      root: null,
      rootMargin: "-30% 0px -50% 0px",
      threshold: 0.1,
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds, scrollDirection, activeId]);

  return activeId;
}
