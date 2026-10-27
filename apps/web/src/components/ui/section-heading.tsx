import type {ReactNode} from 'react';
import {cn} from '@/lib/utils';

type SectionHeadingProps = {
  kicker: string;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

export function SectionHeading({
  kicker,
  title,
  description,
  action,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-6 md:flex-row md:items-end md:justify-between',
        className,
      )}
    >
      <div className="max-w-2xl">
        <p className="kicker">{kicker}</p>
        <h2 className="heading-2 mt-4">{title}</h2>
        {description ? <p className="lead mt-4">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
