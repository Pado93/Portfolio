import Container from "@/components/layout/container";
import { MagicCard } from "@/components/magicui/magic-card";
import CodeBlock from "@/components/ui/code-block";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";

export default function Hero() {
  return (
    <Container
      as="section"
      id="hero"
      className="mt-6 md:mt-28 lg:mt-32 2xl:mt-36 flex flex-col lg:flex-row gap-16 scroll-mt-60"
    >
      <div className="relative w-full sm:max-w-4/5 lg:max-w-1/2 lg:w-1/2 lg:my-auto">

        <h1 className="text-zinc-300  mt-4 sm:mt-6 xl:mt-8 font-bold text-3xl xs:text-4xl sm:text-5xl xl:text-6xl tracking-tight leading-tight">
          <span className="block">Hi, I&apos;m Fabio</span>

          <span className="block mt-2 sm:mt-4 xl:mt-4 text-foreground ">Front-End Developer</span>
        </h1>

        <ContainerTextFlip />

        <div className="text-lg text-zinc-400 mt-6 sm:mt-8 xl:mt-10 font-bold flex flex-col">
          <span className="font-normal italic mt-2 text-pretty">
            Creating high-performance web apps with clean, well-structured code to provide seamless
            and modern user experiences
          </span>
        </div>
        <MagicCard className="mt-4 sm:mt-6 md:mt-8 rounded-lg shadow-lg border bg-zinc-800/50">
          <div className=" w-full  flex items-center justify-center ">
            <a
              href="/fabio_padoin_cv.pdf"
              download="fabio_padoin_cv.pdf"
              className="flex flex-col gap-1 text-center w-full h-full py-2 lg:py-6"
              aria-label="Download my CV (lightweight PDF)"
            >
              <span>Resume</span>
              <span className="text-zinc-400 text-bas ">(Click to download)</span>
            </a>
          </div>
        </MagicCard>
      </div>

      <CodeBlock />
    </Container>
  );
}
