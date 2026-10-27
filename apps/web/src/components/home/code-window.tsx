import {Typewriter} from './typewriter';

type CodeWindowProps = {
  file: string;
  phrase: string;
  accent: string;
};

export function CodeWindow({file, phrase, accent}: CodeWindowProps) {
  return (
    <div className="code-window relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
      />
      <div className="flex items-center gap-3 border-b border-border/70 bg-white/[0.02] px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
          <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
          <span className="size-2.5 rounded-full bg-[#28c840]/80" />
        </div>
        <div className="ml-1 flex items-center gap-2 rounded-md border border-border/60 bg-bg/60 px-2.5 py-1 font-mono text-[0.68rem] text-muted">
          <span className="size-1.5 rounded-full bg-accent" aria-hidden />
          {file}
        </div>
        <span className="ml-auto hidden font-mono text-[0.62rem] uppercase tracking-widest text-muted sm:block">
          TypeScript
        </span>
      </div>

      <div className="relative overflow-hidden px-4 py-5 sm:px-6 sm:py-6">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-primary/10 blur-3xl"
        />
        <div className="grid grid-cols-[1.5rem_1fr] gap-x-3 gap-y-2 font-mono text-[0.76rem] leading-relaxed sm:grid-cols-[2rem_1fr] sm:text-[0.86rem]">
          <span className="select-none text-right text-muted/40">1</span>
          <code className="min-w-0 whitespace-pre-wrap break-words">
            <span className="text-[#c4a7ff]">const</span>{' '}
            <span className="text-[#9ecbff]">mission</span>{' '}
            <span className="text-muted">=</span>{' '}
            <span className="text-[#7ee7c7]">&quot;</span>
            <Typewriter text={phrase} accent={accent} />
            <span className="text-[#7ee7c7]">&quot;</span>
            <span className="text-muted">;</span>
          </code>

          <span className="select-none text-right text-muted/40">2</span>
          <code className="text-muted/80">
            <span className="text-[#5d6b85]">
              // build, learn, share — with judgement.
            </span>
          </code>

          <span className="select-none text-right text-muted/40">3</span>
          <code>
            <span className="text-[#c4a7ff]">export default</span>{' '}
            <span className="text-[#9ecbff]">alex</span>
            <span className="text-muted">;</span>
          </code>

          <span className="select-none text-right text-muted/40">4</span>
          <code>
            <span className="text-[#c4a7ff]">type</span>{' '}
            <span className="text-[#2ffefe]">Craft</span>{' '}
            <span className="text-muted">=</span>{' '}
            <span className="text-[#7ee7c7]">&quot;detail&quot;</span>{' '}
            <span className="text-muted">|</span>{' '}
            <span className="text-[#7ee7c7]">&quot;clarity&quot;</span>
            <span className="text-muted">;</span>
          </code>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border/60 bg-white/[0.015] px-4 py-2 font-mono text-[0.62rem] text-muted">
        <span className="flex items-center gap-3">
          <span>UTF-8</span>
          <span className="hidden sm:inline">TypeScript 5</span>
        </span>
        <span className="flex items-center gap-1.5 text-accent/80">
          <span className="size-1.5 animate-pulse rounded-full bg-accent" />
          live
        </span>
      </div>
    </div>
  );
}
