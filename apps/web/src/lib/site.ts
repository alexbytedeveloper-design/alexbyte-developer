import {SITE} from '@alexbyte/shared';

export const socialLinks = [
  {key: 'github', label: 'GitHub', href: SITE.social.github},
  {key: 'linkedin', label: 'LinkedIn', href: SITE.social.linkedin},
  {key: 'email', label: SITE.email, href: `mailto:${SITE.email}`},
] as const;

export const navItems = [
  {href: '/projects', key: 'projects'},
  {href: '/blog', key: 'blog'},
  {href: '/resources', key: 'resources'},
  {href: '/about', key: 'about'},
  {href: '/contact', key: 'contact'},
] as const;

export const stack = [
  'Next.js',
  'React',
  'TypeScript',
  'Node.js',
  'PostgreSQL',
  'Tailwind CSS',
  'Framer Motion',
  'IA aplicada',
] as const;

export const contactEmail = SITE.email;
