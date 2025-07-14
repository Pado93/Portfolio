"use client";

import { motion } from "framer-motion";

import Container from "../layout/container";
import ExpandableCardDemo from "../ui/expandable-card-demo";

export default function Projects() {
  return (
    <Container
      as="section"
      id="projects"
      className="mt-24 md:mt-28 lg:mt-32 2xl:mt-36 scroll-mt-30 lg:scroll-mt-40"
    >
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-center mb-12 md:mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        My <span className="hidden md:inline">Latest</span> Work
      </motion.h2>

      <ExpandableCardDemo />
    </Container>
  );
}