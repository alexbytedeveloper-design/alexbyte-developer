import {AlertCircle} from '@/components/ui/icons';

export function DemoNotice({text, className}: {text: string; className?: string}) {
  return (
    <p
      className={`flex items-start gap-2 rounded-lg border border-border/70 bg-surface/50 px-3 py-2 text-xs leading-relaxed text-muted ${className ?? ''}`}
    >
      <AlertCircle className="mt-0.5 size-3.5 shrink-0 text-primary" />
      <span>{text}</span>
    </p>
  );
}
