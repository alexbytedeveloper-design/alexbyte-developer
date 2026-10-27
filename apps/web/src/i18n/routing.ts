import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['es', 'en', 'pt', 'fr', 'it'],
  defaultLocale: 'es',
  localePrefix: 'always',
  pathnames: {
    '/': '/',
    '/about': {
      es: '/sobre-mi',
      en: '/about',
      pt: '/sobre-mim',
      fr: '/a-propos',
      it: '/chi-sono',
    },
    '/projects': {
      es: '/proyectos',
      en: '/projects',
      pt: '/projetos',
      fr: '/projets',
      it: '/progetti',
    },
    '/projects/[slug]': {
      es: '/proyectos/[slug]',
      en: '/projects/[slug]',
      pt: '/projetos/[slug]',
      fr: '/projets/[slug]',
      it: '/progetti/[slug]',
    },
    '/blog': '/blog',
    '/blog/[slug]': '/blog/[slug]',
    '/snippets/[slug]': '/snippets/[slug]',
    '/resources': {
      es: '/recursos',
      en: '/resources',
      pt: '/recursos',
      fr: '/ressources',
      it: '/risorse',
    },
    '/newsletter': '/newsletter',
    '/contact': {
      es: '/contacto',
      en: '/contact',
      pt: '/contacto',
      fr: '/contact',
      it: '/contatti',
    },
    '/privacy': {
      es: '/privacidad',
      en: '/privacy',
      pt: '/privacidade',
      fr: '/confidentialite',
      it: '/privacy',
    },
    '/terms': {
      es: '/terminos',
      en: '/terms',
      pt: '/termos',
      fr: '/conditions',
      it: '/termini',
    },
    '/cookies': '/cookies',
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathnames = keyof typeof routing.pathnames;
