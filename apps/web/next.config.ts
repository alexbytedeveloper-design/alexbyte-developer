import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const securityHeaders = [
  {key: 'X-Content-Type-Options', value: 'nosniff'},
  {key: 'X-Frame-Options', value: 'DENY'},
  {key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin'},
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  },
  {key: 'Cross-Origin-Opener-Policy', value: 'same-origin'},
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  transpilePackages: ['@alexbyte/shared'],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        source: '/brand/:path*',
        headers: [
          {key: 'Cache-Control', value: 'public, max-age=31536000, immutable'},
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
