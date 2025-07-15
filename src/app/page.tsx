import Contact from "@/components/sections/contact";
import Hero from "@/components/sections/hero";
import Projects from "@/components/sections/projects";
import { TypingChallenge } from "@/components/ui/typing-challenge";

export default function Home() {
  return (
    <>
      <div className="mt-24 md:mt-28 lg:mt-32 2xl:mt-36 scroll-mt-30 lg:scroll-mt-40 items-center flex justify-center">
        <TypingChallenge sentence="ciao io sono lollo"/>

      </div>
      <Hero />
      <Projects />
      <Contact />
    </>
  );
}
