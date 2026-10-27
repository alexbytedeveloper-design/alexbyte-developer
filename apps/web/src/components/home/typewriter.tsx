'use client';

import {useEffect, useMemo, useState} from 'react';
import {useReducedMotion} from 'framer-motion';

type TypewriterProps = {
  text: string;
  accent: string;
  startDelay?: number;
  speed?: number;
  className?: string;
};

export function Typewriter({
  text,
  accent,
  startDelay = 420,
  speed = 26,
  className,
}: TypewriterProps) {
  const reduceMotion = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      setCount(text.length);
      return;
    }

    let index = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      index += 1;
      setCount(index);

      if (index < text.length) {
        const jitter = index % 7 === 0 ? 64 : 0;
        timeout = setTimeout(tick, speed + jitter);
      }
    };

    timeout = setTimeout(tick, startDelay);
    return () => clearTimeout(timeout);
  }, [text, reduceMotion, startDelay, speed]);

  const segments = useMemo(() => {
    const visible = reduceMotion ? text : text.slice(0, count);
    const accentStart = Math.max(0, text.indexOf(accent));
    const accentEnd = accentStart + accent.length;

    return {
      before: visible.slice(0, Math.min(visible.length, accentStart)),
      highlight:
        visible.length > accentStart
          ? visible.slice(accentStart, Math.min(visible.length, accentEnd))
          : '',
      after: visible.length > accentEnd ? visible.slice(accentEnd) : '',
      done: visible.length >= text.length,
    };
  }, [accent, count, reduceMotion, text]);

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {segments.before}
        {segments.highlight ? (
          <span className="text-accent text-glow">{segments.highlight}</span>
        ) : null}
        {segments.after}
        <span
          className={`ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[0.18em] bg-accent ${
            segments.done ? 'animate-blink' : ''
          }`}
        />
      </span>
    </span>
  );
}
