'use client'

import { useEffect, useRef, useState } from 'react'
import { TopNav } from '@/components/top-nav'
import { ChatSidebar, type ChatHistoryItem } from '@/components/chat-sidebar'
import { ChatMessage, TypingIndicator, type Message } from '@/components/chat-message'
import { ChatComposer } from '@/components/chat-composer'
import { CoiLogo } from '@/components/coi-logo'

const HISTORY: ChatHistoryItem[] = [
  { id: '1', title: 'Instalação VPN', group: 'Hoje' },
  { id: '2', title: 'Erro Servidor 04', group: 'Hoje' },
  { id: '3', title: 'Reset senha AD', group: 'Ontem' },
  { id: '4', title: 'Chamado nível 2', group: 'Ontem' },
  { id: '5', title: 'Backup noturno', group: 'Últimos 7 dias' },
  { id: '6', title: 'Link bloco C', group: 'Últimos 7 dias' },
  { id: '7', title: 'Inventário lab. 02', group: 'Últimos 7 dias' },
]

const SUGGESTIONS = [
  {
    title: 'Abrir um chamado',
    description: 'Como registrar uma ocorrência de nível 2 no sistema do COI?',
  },
  {
    title: 'Procedimento de rede',
    description: 'Quais os passos para diagnosticar queda de link em um bloco?',
  },
  {
    title: 'Acesso e senhas',
    description: 'Como solicitar reset de senha no Active Directory?',
  },
  {
    title: 'Política de backup',
    description: 'Qual a janela de backup dos servidores institucionais?',
  },
]

function now() {
  return new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}

export function AjudoChat() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeId, setActiveId] = useState<string | null>('1')
  const [messages, setMessages] = useState<Message[]>([])
  const [thinking, setThinking] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, thinking])

  function send(content: string, attachments: string[]) {
    const suffix = attachments.length ? `\n\nAnexos: ${attachments.join(', ')}` : ''
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: 'user', content: content + suffix, time: now() },
    ])
    setThinking(true)

    window.setTimeout(() => {
      setThinking(false)
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content:
            'Entendido. Consultei a base de conhecimento do COI e encontrei o procedimento correspondente.\n\n1. Registre a ocorrência no portal interno com o código do setor.\n2. Anexe evidências (prints, logs ou fotos do equipamento).\n3. Classifique a prioridade conforme o impacto no atendimento.\n\nQuer que eu detalhe algum desses passos ou gere o texto do chamado?',
          time: now(),
        },
      ])
    }, 1200)
  }

  function newChat() {
    setMessages([])
    setActiveId(null)
    setMobileOpen(false)
  }

  return (
    <div className="flex h-dvh w-full flex-col overflow-hidden bg-background">
      <TopNav onOpenMobileMenu={() => setMobileOpen(true)} />

      <div className="flex min-h-0 flex-1">
        {/* Sidebar desktop */}
        <div className="hidden md:block">
        <ChatSidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed((v) => !v)}
          history={HISTORY}
          activeId={activeId}
          onSelect={setActiveId}
          onNewChat={newChat}
        />
      </div>

      {/* Sidebar mobile */}
      {mobileOpen && (
        <div className="fixed inset-x-0 bottom-0 top-16 z-50 flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-foreground/40"
          >
            <span className="sr-only">Fechar menu</span>
          </button>
          <div className="relative z-10">
            <ChatSidebar
              collapsed={false}
              onToggle={() => setMobileOpen(false)}
              history={HISTORY}
              activeId={activeId}
              onSelect={(id) => {
                setActiveId(id)
                setMobileOpen(false)
              }}
              onNewChat={newChat}
            />
          </div>
        </div>
      )}

        {/* Área principal */}
        <main className="flex min-w-0 flex-1 flex-col">
          <div className="flex h-12 shrink-0 items-center justify-between gap-3 border-b border-border bg-card px-4 md:px-8">
            <h1 className="truncate text-[13px] font-semibold tracking-tight text-foreground">
              {activeId
                ? (HISTORY.find((h) => h.id === activeId)?.title ?? 'Nova consulta')
                : 'Nova consulta'}
            </h1>
            <span className="hidden truncate text-[11px] text-muted-foreground sm:block">
              Centro de Operações em Informática
            </span>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6 md:px-8">
            <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
              {messages.length === 0 && !thinking ? (
                <EmptyState onPick={(text) => send(text, [])} />
              ) : (
                <>
                  {messages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                  ))}
                  {thinking && <TypingIndicator />}
                </>
              )}
            </div>
          </div>

          <ChatComposer onSend={send} disabled={thinking} />
        </main>
      </div>
    </div>
  )
}

function EmptyState({ onPick }: { onPick: (text: string) => void }) {
  return (
    <div className="flex flex-col items-center py-10 text-center md:py-16">
      <CoiLogo className="size-12 rounded-xl text-base" />
      <h2 className="mt-5 text-balance text-2xl font-semibold tracking-tight text-foreground">
        Olá, sou o ajUDO
      </h2>
      <p className="mt-2 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
        Assistente interno do COI para procedimentos, chamados, infraestrutura e suporte técnico.
        Comece por uma das sugestões abaixo.
      </p>

      <div className="mt-8 grid w-full gap-3 sm:grid-cols-2">
        {SUGGESTIONS.map((item) => (
          <button
            key={item.title}
            type="button"
            onClick={() => onPick(item.description)}
            className="group rounded-xl border border-border bg-card p-4 text-left transition-colors hover:border-primary/35 hover:bg-secondary/50"
          >
            <p className="text-[13px] font-semibold text-foreground">{item.title}</p>
            <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}
