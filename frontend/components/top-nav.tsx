'use client'

import {
  Bell,
  ChevronDown,
  HelpCircle,
  LogOut,
  Menu,
  Settings,
  ShieldCheck,
  UserRound,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CoiLogo } from '@/components/coi-logo'

type TopNavProps = {
  onOpenMobileMenu: () => void
}

export function TopNav({ onOpenMobileMenu }: TopNavProps) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-sidebar-border bg-sidebar px-3 text-sidebar-foreground md:px-5">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="rounded-md p-2 text-sidebar-foreground/75 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground md:hidden"
        >
          <Menu className="size-5" />
          <span className="sr-only">Abrir menu de navegação</span>
        </button>

        <div className="flex min-w-0 items-center gap-3">
          <CoiLogo />
          <div className="min-w-0 leading-tight">
            <p className="truncate text-sm font-semibold tracking-tight">AjUDO COI</p>
            <p className="truncate text-[11px] text-sidebar-foreground/60">
              Universidade de Oriente · UDO
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 md:gap-3">
        <div className="hidden items-center gap-2 rounded-full border border-sidebar-border px-3 py-1.5 lg:flex">
          <ShieldCheck className="size-3.5 text-accent" />
          <span className="text-[11px] font-medium text-sidebar-foreground/75">Rede interna</span>
        </div>

        <button
          type="button"
          className="relative rounded-md p-2 text-sidebar-foreground/75 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <Bell className="size-4.5" />
          <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-accent" />
          <span className="sr-only">Notificações</span>
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 outline-none transition-colors hover:bg-sidebar-accent focus-visible:ring-2 focus-visible:ring-accent">
            <span className="flex size-8 items-center justify-center rounded-full bg-accent text-[11px] font-semibold text-accent-foreground">
              MR
            </span>
            <span className="hidden text-left leading-tight sm:block">
              <span className="block text-xs font-medium">Marcos Ribeiro</span>
              <span className="block text-[11px] text-sidebar-foreground/60">Analista · COI</span>
            </span>
            <ChevronDown className="size-3.5 text-sidebar-foreground/60" />
            <span className="sr-only">Abrir menu do usuário</span>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="flex flex-col gap-0.5">
              <span className="text-sm font-medium">Marcos Ribeiro</span>
              <span className="text-[11px] font-normal text-muted-foreground">
                marcos.ribeiro@udo.edu
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <UserRound className="size-4" />
              Meu perfil
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="size-4" />
              Preferências
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HelpCircle className="size-4" />
              Ajuda e suporte
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <LogOut className="size-4" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
