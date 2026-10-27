import type {MetadataRoute} from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '<alexbyte/>',
    short_name: 'alexbyte',
    description:
      'Un lugar entre desarrolladores para aprender y apoyarnos. Portafolio, blog técnico y recursos gratuitos.',
    start_url: '/',
    display: 'standalone',
    background_color: '#05070f',
    theme_color: '#2f7bff',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any maskable',
      },
      {
        src: '/brand/alexbyte-logo.png',
        sizes: '1024x1024',
        type: 'image/png',
      },
    ],
  };
}
