import { JSX } from "react";

import { StaticImageData } from "next/image";

import aidifyImage from "@/assets/aidifyImage.png";
import bdroppyImage from "@/assets/bdroppyImage.png";
import customerTrackImage from "@/assets/customerTrackImage.png";
import visualBoostImage from "@/assets/visualBoostImage.png";

export type Project = {
  description: string;
  title: string;
  src: string | StaticImageData;
  year: string;
  explore: string;
  ctaText: string;
  ctaLink: string;
  github?: string;
  content: () => JSX.Element;
};

export const projectsData: Project[] = [
  {
    description: "Next.js, TypeScript, GraphQL, Supabase, Langchain, AI Chatbot",
    title: "Aidify – AI Chatbot for E-commerce",
    src: aidifyImage,
    year: "2023",
    explore: "Explore",
    ctaText: "Live",
    ctaLink: "https://aidify.cx/en",
    content: () => {
      return (
        <>
          <p>
            Ongoing development of <strong>Aidify</strong>, an AI-powered chatbot designed to handle customer care across multiple e-commerce platforms.
          </p>
          <p>
            Built with <strong>Next.js, Supabase, Langchain, and GraphQL</strong>, the chatbot integrates easily with Shopify, WooCommerce, and others. Fully tested with <strong>Cypress</strong> for end-to-end reliability.
          </p>
        </>
      );
    },
  },
  {
    description: "Next.js, Tailwind CSS, SEO",
    title: "BDroppy – B2B Dropshipping platform",
    src: bdroppyImage,
    year: "2021",
    explore: "Explore",
    ctaText: "Live",
    ctaLink: "https://www.bdroppy.com/",
    content: () => {
      return (
        <>
          <p>
            Complete migration of <strong>BDroppy</strong>, a B2B dropshipping platform, from React 14 to Next.js with TypeScript for better performance and maintainability.
          </p>
          <p>
            Implemented payment services, SEO optimization, and advanced tracking using GTM, Google Analytics, Meta for Business, and Google Merchant. Integrated multiple site builders like Shopify, WooCommerce, Wix, and Squarespace.
          </p>
        </>
      );
    },
  },
  {
    description: "Next.js, SEO, Analytics, Tracking Systems",
    title: "Visual Boost – Performance Marketing Agency",
    src: visualBoostImage,
    year: "2024",
    explore: "Explore",
    ctaText: "Live",
    ctaLink: "https://visual-boost.com/en/",
    content: () => {
      return (
        <>
          <p>
            Frontend development for <strong>Visual Boost</strong>, a marketing agency specialized in lead generation and customer acquisition.
          </p>
          <p>
            Optimized the site for SEO and performance, implemented tracking infrastructure with GTM and Google Analytics, and ensured full mobile responsiveness.
          </p>
        </>
      );
    },
  },
  {
    description: "React Native, Windows App, In-store Analytics",
    title: "CustomerTrack – Physical Store Tracking",
    src: customerTrackImage,
    year: "2025",
    explore: "Explore",
    ctaText: "Live",
    ctaLink: "https://customertrack.io/en/",
    content: () => {
      return (
        <>
          <p>
            Developed a white-label solution for tracking customer behavior in physical retail environments for <strong>CustomerTrack</strong>.
          </p>
          <p>
            Created a React Native Windows app dashboard to monitor and interact with in-store analytics in real time, with customizable data views and integration options.
          </p>
        </>
      );
    },
  },
];
