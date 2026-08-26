import { cn } from '@/lib/utils'
import { CoiLogo } from '@/components/coi-logo'

export type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
  time: string
}

export function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === 'user'

  return (
    <div className={cn('flex w-full gap-3', isUser ? 'justify-end' : 'justify-start')}>
      {!isUser && <CoiLogo className="mt-0.5 size-8 rounded-md text-xs" />}
      <div className={cn('flex max-w-[78%] flex-col gap-1', isUser && 'items-end')}>
        <div
          className={cn(
            'whitespace-pre-line px-4 py-3 text-[14px] leading-relaxed shadow-sm',
            isUser
              ? 'rounded-2xl rounded-br-sm bg-primary text-primary-foreground'
              : 'rounded-2xl rounded-bl-sm border border-border bg-card text-card-foreground',
          )}
        >
          {message.content}
        </div>
        <span className="px-1 text-[11px] text-muted-foreground">
          {isUser ? 'Você' : 'ajUDO'} · {message.time}
        </span>
      </div>
      {isUser && (
        <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-secondary text-[11px] font-semibold text-secondary-foreground">
          MR
        </span>
      )}
    </div>
  )
}

export function TypingIndicator() {
  return (
    <div className="flex w-full gap-3">
      <CoiLogo className="mt-0.5 size-8 rounded-md text-xs" />
      <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm border border-border bg-card px-4 py-4">
        <span className="sr-only">ajUDO está digitando</span>
        {[0, 150, 300].map((delay) => (
          <span
            key={delay}
            className="size-1.5 animate-bounce rounded-full bg-muted-foreground/60"
            style={{ animationDelay: `${delay}ms` }}
          />
        ))}
      </div>
    </div>
  )
}
