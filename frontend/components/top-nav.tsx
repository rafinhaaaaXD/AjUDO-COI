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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CoiLogo } from '@/components/coi-logo'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'

type TopNavProps = {
  onOpenMobileMenu: () => void
}

export function TopNav({ onOpenMobileMenu }: TopNavProps) {
  const router = useRouter()
  
  const { data: session } = authClient.useSession()

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/login')
        },
      },
    })
  }

  const userName = session?.user?.name || 'Usuário'
  const userInitials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase()

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
            <p className="truncate text-sm font-semibold tracking-tight">ajUDO COI</p>
            <p className="truncate text-[11px] text-sidebar-foreground/60">
              Unidade de Desenvolvimento Organizacional · UDO
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
            <Avatar className="size-8">
              <AvatarImage src={session?.user?.image || ''} alt={userName} />
              <AvatarFallback className="flex h-full w-full items-center justify-center bg-accent text-[11px] font-semibold text-accent-foreground">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            
            <span className="hidden text-left leading-tight sm:block">
              <span className="block text-xs font-medium truncate max-w-[120px]">{userName}</span>
              <span className="block text-[11px] text-sidebar-foreground/60">Analista · COI</span>
            </span>
            <ChevronDown className="size-3.5 text-sidebar-foreground/60" />
            <span className="sr-only">Abrir menu do usuário</span>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-80 rounded-[24px] p-2 shadow-2xl border-border/60">
            
            <div className="flex items-center gap-4 p-3 mb-1">
              <Avatar className="size-14 border shadow-sm">
                <AvatarImage src={session?.user?.image || ''} alt={userName} />
                <AvatarFallback className="flex h-full w-full items-center justify-center bg-accent text-lg font-semibold text-accent-foreground">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col min-w-0">
                <span className="text-base font-semibold truncate">{userName}</span>
                <span className="text-sm text-muted-foreground truncate">
                  {session?.user?.email || 'Carregando...'}
                </span>
              </div>
            </div>
            
            <DropdownMenuSeparator className="mx-2" />
            
            <div className="p-1 space-y-1">
              <DropdownMenuItem 
                onClick={() => router.push('/perfil')} 
                className="cursor-pointer rounded-xl p-3 text-sm font-medium transition-colors"
              >
                {/* Ícone agora usa a cor text-sidebar (azul escuro) */}
                <UserRound className="size-5 mr-3 text-sidebar" />
                Gerenciar Conta
              </DropdownMenuItem>
              
              <DropdownMenuItem className="cursor-pointer rounded-xl p-3 text-sm font-medium transition-colors">
                <Settings className="size-5 mr-3 text-sidebar" />
                Preferências
              </DropdownMenuItem>
              
              <DropdownMenuItem className="cursor-pointer rounded-xl p-3 text-sm font-medium transition-colors">
                <HelpCircle className="size-5 mr-3 text-sidebar" />
                Ajuda e suporte
              </DropdownMenuItem>
            </div>
            
            <DropdownMenuSeparator className="mx-2" />
            
            <div className="p-1">
              <DropdownMenuItem 
                onClick={handleSignOut} 
                className="cursor-pointer rounded-xl p-3 text-sm font-medium text-red-600 focus:text-red-700 focus:bg-red-100 dark:focus:bg-red-950/50 transition-colors"
              >
                <LogOut className="size-5 mr-3" />
                Sair do login
              </DropdownMenuItem>
            </div>
            
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}