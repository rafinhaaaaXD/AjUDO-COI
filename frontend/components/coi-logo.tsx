import { cn } from '@/lib/utils'
import Image from 'next/image'

export function CoiLogo({ className }: { className?: string }) {
  return (
    <div className={cn('relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-lg', className)}>
      <Image 
        src="/ajUDO-logotipo.svg" 
        alt="Logotipo AjUDO" 
        fill
        sizes="36px"
        style={{ objectFit: 'contain', width: '100%', height: '100%' }}
        priority
      />
    </div>
  )
}