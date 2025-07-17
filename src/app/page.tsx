import ReactLenis from "lenis/react";

import Contact from "@/components/sections/contact";
import Hero from "@/components/sections/hero";
import Projects from "@/components/sections/projects";

export default function Home() {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        smoothWheel: true,
      }}
    >
      <Hero />
      <Projects />
      <Contact />
    </ReactLenis>
  );
}
