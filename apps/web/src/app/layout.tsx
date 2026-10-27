/**
 * Root layout is intentionally minimal and locale-agnostic.
 * All localized layouts live under apps/web/src/app/[locale]/layout.tsx.
 * This file is only kept so `apps/web/src/app` remains a valid App Router root
 * directory for Turbopack during development.
 */
import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: '<alexbyte/>',
  description: 'Un lugar entre desarrolladores para aprender y apoyarnos.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
