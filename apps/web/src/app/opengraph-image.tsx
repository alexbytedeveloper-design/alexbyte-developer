import {ImageResponse} from 'next/og';

export const runtime = 'edge';
export const size = {width: 1200, height: 630};
export const contentType = 'image/png';
export const alt = '<alexbyte/> — Desarrollador web y UI/UX';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background:
            'radial-gradient(60% 60% at 50% 0%, rgba(47,123,255,0.25), transparent 60%), #05070f',
          color: '#f5f7ff',
          fontFamily: 'system-ui, sans-serif',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 64,
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            fontSize: 72,
            fontWeight: 800,
            letterSpacing: -2,
            lineHeight: 1,
            background:
              'linear-gradient(100deg, #ffffff, #4f8cff, #2ffefe)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
        >
          &lt;alexbyte/&gt;
        </div>
        <p
          style={{
            marginTop: 32,
            fontSize: 24,
            color: '#8a97b1',
            textAlign: 'center',
          }}
        >
          Un lugar entre desarrolladores para aprender y apoyarnos.
        </p>
      </div>
    ),
    {size}
  );
}
