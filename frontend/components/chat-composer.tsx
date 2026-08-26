'use client'

import { useRef, useState, type KeyboardEvent } from 'react'
import { ArrowUp, Paperclip, X } from 'lucide-react'

type ChatComposerProps = {
  onSend: (value: string, attachments: string[]) => void
  disabled?: boolean
}

export function ChatComposer({ onSend, disabled }: ChatComposerProps) {
  const [value, setValue] = useState('')
  const [attachments, setAttachments] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  function submit() {
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed, attachments)
    setValue('')
    setAttachments([])
    if (textareaRef.current) textareaRef.current.style.height = 'auto'
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.nativeEvent.isComposing || event.keyCode === 229) return
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      submit()
    }
  }

  return (
    <div className="border-t border-border bg-background/80 px-4 py-4 backdrop-blur-sm md:px-8">
      <div className="mx-auto w-full max-w-3xl">
        <div className="rounded-3xl border border-border bg-card p-2 shadow-sm transition-colors focus-within:border-primary/40 focus-within:ring-4 focus-within:ring-primary/10">
          {attachments.length > 0 && (
            <ul className="flex flex-wrap gap-2 px-2 pb-2 pt-1">
              {attachments.map((name) => (
                <li
                  key={name}
                  className="flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-xs text-secondary-foreground"
                >
                  <Paperclip className="size-3" />
                  <span className="max-w-40 truncate">{name}</span>
                  <button
                    type="button"
                    onClick={() => setAttachments((prev) => prev.filter((n) => n !== name))}
                    className="rounded-full p-0.5 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <X className="size-3" />
                    <span className="sr-only">Remover {name}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="flex items-end gap-2">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={(event) => {
                const files = Array.from(event.target.files ?? []).map((file) => file.name)
                setAttachments((prev) => Array.from(new Set([...prev, ...files])))
                event.target.value = ''
              }}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mb-0.5 rounded-full p-2.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <Paperclip className="size-[18px]" />
              <span className="sr-only">Anexar documento</span>
            </button>

            <textarea
              ref={textareaRef}
              rows={1}
              value={value}
              onChange={(event) => {
                setValue(event.target.value)
                const el = event.target
                el.style.height = 'auto'
                el.style.height = `${Math.min(el.scrollHeight, 168)}px`
              }}
              onKeyDown={handleKeyDown}
              placeholder="Pergunte ao ajUDO…"
              className="max-h-42 flex-1 resize-none bg-transparent py-3 text-sm leading-relaxed text-foreground outline-none placeholder:text-muted-foreground"
            />

            <button
              type="button"
              onClick={submit}
              disabled={!value.trim() || disabled}
              className="mb-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ArrowUp className="size-[18px]" />
              <span className="sr-only">Enviar mensagem</span>
            </button>
          </div>
        </div>

        <p className="mt-2 text-center text-[11px] text-muted-foreground">
          Uso interno do COI. Verifique informações críticas antes de aplicar em ambiente de
          produção.
        </p>
      </div>
    </div>
  )
}
