import Image from 'next/image';
import {cn} from '@/lib/utils';

export function Wordmark({className}: {className?: string}) {
  return (
    <span className={cn('font-mono font-semibold tracking-tight', className)}>
      <span className="text-accent">&lt;</span>
      alexbyte
      <span className="text-accent">/&gt;</span>
    </span>
  );
}

export function BrandLogo({
  priority = false,
  className,
}: {
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={cn('relative isolate', className)}>
      <div
        aria-hidden
        className="absolute inset-6 -z-10 rounded-full bg-primary/30 blur-3xl animate-pulse-glow"
      />
      <div
        aria-hidden
        className="absolute -inset-4 -z-10 rounded-[2.5rem] border border-white/5"
      />
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#05070f] p-2 shadow-[0_30px_90px_rgba(0,0,0,.55)]">
        <Image
          src="/brand/alexbyte-logo.png"
          alt="Logotipo de <alexbyte/>"
          width={1024}
          height={1024}
          priority={priority}
          sizes="(max-width: 768px) 70vw, 420px"
          className="h-auto w-full rounded-[1.6rem]"
        />
      </div>
    </div>
  );
}
