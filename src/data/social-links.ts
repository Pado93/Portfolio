import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
} from "@tabler/icons-react";
import type { Icon } from "@tabler/icons-react";

export type SocialLink = {
  href: string;
  label: string;
  icon: Icon;
  isEmail?: boolean;
};

export const socialLinks: SocialLink[] = [
  {
    href: "https://github.com/Pado93",
    label: "GitHub",
    icon: IconBrandGithub,
  },
  {
    href: "https://www.linkedin.com/in/fabio-padoin-51622b14b/",
    label: "LinkedIn",
    icon: IconBrandLinkedin,
  },
  {
    href: "fabio.padoin@gmail.com",
    label: "Email",
    icon: IconMail,
    isEmail: true,
  }
];
