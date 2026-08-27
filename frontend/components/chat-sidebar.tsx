'use client'

import {
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  MessageSquare,
  Settings,
  LifeBuoy,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from "next/image"

export type ChatHistoryItem = {
  id: string
  title: string
  group: string
}

type ChatSidebarProps = {
  collapsed: boolean
  onToggle: () => void
  history: ChatHistoryItem[]
  activeId: string | null
  onSelect: (id: string) => void
  onNewChat: () => void
}

export function ChatSidebar({
  collapsed,
  onToggle,
  history,
  activeId,
  onSelect,
  onNewChat,
}: ChatSidebarProps) {
  const groups = history.reduce<Record<string, ChatHistoryItem[]>>((acc, item) => {
    acc[item.group] = acc[item.group] ? [...acc[item.group], item] : [item]
    return acc
  }, {})

  return (
    <aside
      className={cn(
        'flex h-full flex-col bg-sidebar text-sidebar-foreground transition-[width] duration-300 ease-out',
        collapsed ? 'w-[68px]' : 'w-64',
      )}
      aria-label="Navegação de conversas"
    >
      {/* Cabeçalho */}
      <div
        className={cn(
          'flex items-center px-3 pt-3',
          collapsed ? 'justify-center' : 'justify-between',
        )}
      >
        {!collapsed && (
          <span className="px-2 text-[11px] font-medium uppercase tracking-wider text-sidebar-foreground/45">
            Navegação
          </span>
        )}
        <button
          type="button"
          onClick={onToggle}
          className="rounded-md p-1.5 text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          {collapsed ? (
            <PanelLeftOpen className="size-4" />
          ) : (
            <PanelLeftClose className="size-4" />
          )}
          <span className="sr-only">
            {collapsed ? 'Expandir barra lateral' : 'Recolher barra lateral'}
          </span>
        </button>
      </div>

      {/* Ações */}
      <div className="px-3 pt-3">
        <button
          type="button"
          onClick={onNewChat}
          className={cn(
            'flex w-full items-center rounded-lg bg-accent font-medium text-accent-foreground transition-colors hover:brightness-105',
            collapsed ? 'justify-center p-2.5' : 'gap-2 px-3 py-2.5 text-sm',
          )}
        >
          <Plus className="size-4 shrink-0" />
          {!collapsed && <span>Nova consulta</span>}
          {collapsed && <span className="sr-only">Nova consulta</span>}
        </button>
      </div>

      {/* Histórico */}
      <nav className="mt-6 flex-1 overflow-y-auto px-3 pb-4">
        {!collapsed && (
          <p className="mb-3 px-2 text-[11px] font-semibold uppercase tracking-wider text-sidebar-foreground/45">
            Conversas antigas
          </p>
        )}
        {collapsed ? (
          <div className="flex flex-col items-center gap-1">
            {history.slice(0, 6).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelect(item.id)}
                title={item.title}
                className={cn(
                  'rounded-lg p-2.5 transition-colors',
                  item.id === activeId
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                )}
              >
                <MessageSquare className="size-4" />
                <span className="sr-only">{item.title}</span>
              </button>
            ))}
          </div>
        ) : (
          Object.entries(groups).map(([group, items]) => (
            <div key={group} className="mb-5">
              <p className="mb-2 px-2 text-[11px] font-medium uppercase tracking-wider text-sidebar-foreground/45">
                {group}
              </p>
              <ul className="flex flex-col gap-0.5">
                {items.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => onSelect(item.id)}
                      className={cn(
                        'flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-[13px] transition-colors',
                        item.id === activeId
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                          : 'text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground',
                      )}
                    >
                      <MessageSquare className="size-3.5 shrink-0 opacity-70" />
                      <span className="truncate">{item.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </nav>

      {/* Rodapé */}
      <div className="border-t border-sidebar-border p-3">
        <div className={cn('flex flex-col gap-0.5', collapsed && 'items-center')}>
          <SidebarFooterLink collapsed={collapsed} icon={LifeBuoy} label="Abrir chamado" />
          <SidebarFooterLink collapsed={collapsed} icon={Settings} label="Configurações" />
        </div>
      </div>
    </aside>
  )
}

function SidebarFooterLink({
  collapsed,
  icon: Icon,
  label,
}: {
  collapsed: boolean
  icon: typeof Settings
  label: string
}) {
  return (
    <button
      type="button"
      title={label}
      className={cn(
        'flex items-center rounded-lg text-sidebar-foreground/65 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        collapsed ? 'justify-center p-2.5' : 'gap-2 px-2 py-2 text-[13px]',
      )}
    >
      <Icon className="size-4 shrink-0" />
      {collapsed ? <span className="sr-only">{label}</span> : <span>{label}</span>}
    </button>
  )
}
