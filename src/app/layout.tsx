import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";
import "@/styles/globals.css";
import { Toaster } from "sonner";

import { BackgroundWrapper } from "@/components/layout/background-wrapper";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

const exo2 = Exo_2({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-exo2",
});

export const metadata: Metadata = {
  title: "Fabio Padoin | Frontend Developer Portfolio",
  description:
    "Portfolio of Fabio Padoin, a frontend developer specialized in React and Next.js. Check out my projects, skills, and contact info.",
  openGraph: {
    title: "Fabio Padoin | Frontend Developer",
    description: "Creating high-performance web apps with modern UX and clean code.",
    url: "https://Pado93.github.io/",
    siteName: "Fabio Padoin Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${exo2.variable} font-exo antialiased`}>
        <BackgroundWrapper>
          <Header />
          {children}
          <Toaster position="bottom-left" />
          <Footer />
        </BackgroundWrapper>
      </body>
    </html>
  );
}
