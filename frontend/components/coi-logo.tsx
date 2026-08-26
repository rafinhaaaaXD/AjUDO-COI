import { cn } from '@/lib/utils'

export function CoiLogo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent font-mono text-[11px] font-bold tracking-tight text-accent-foreground',
        className,
      )}
      aria-hidden="true"
    >
      UDO
    </div>
  )
}
