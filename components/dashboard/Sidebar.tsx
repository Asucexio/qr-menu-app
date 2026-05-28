'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, UtensilsCrossed, QrCode,
  CreditCard, Settings, LogOut,
} from 'lucide-react'
import Image from 'next/image'
import { useAuthStore } from '@/store/authStore'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/dashboard',          label: 'Overview',      icon: LayoutDashboard },
  { href: '/dashboard/menus',    label: 'Menus',         icon: UtensilsCrossed },
  { href: '/dashboard/qr',       label: 'QR Codes',      icon: QrCode },
  { href: '/dashboard/billing',  label: 'Billing',       icon: CreditCard },
  { href: '/dashboard/settings', label: 'Settings',      icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const router   = useRouter()
  const { user, signOut } = useAuthStore()

  const handleSignOut = async () => {
    await signOut()
    router.push('/auth/signin')
  }

  const initials = (user?.full_name || 'U')
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <aside className="w-[232px] flex-shrink-0 h-screen flex flex-col bg-white border-r border-gray-100">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-gray-100">
        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          <Image
            src="/grok-image-56a72e42-b19a-46fa-b7fc-1322508bd538.svg"
            alt="QR Menu Logo"
            width={32}
            height={32}
            className="w-8 h-8 rounded-lg shadow-sm"
          />
          <div>
            <span className="font-bold text-gray-900 text-sm tracking-tight">QR Menu</span>
            <span className="block text-[10px] text-gray-400 leading-none mt-0.5 font-medium tracking-widest uppercase">Studio</span>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV.map(({ href, label, icon: Icon }) => {
          const exact   = href === '/dashboard'
          const active  = exact ? pathname === href : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                active
                  ? 'bg-green-50 text-green-700'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
              )}
            >
              <Icon
                size={17}
                className={cn(
                  'flex-shrink-0 transition-colors',
                  active ? 'text-green-600' : 'text-gray-400'
                )}
              />
              {label}
              {active && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-green-500" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer / user */}
      <div className="px-3 pb-4 border-t border-gray-100 pt-3 space-y-1">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1">
          <div className="w-7 h-7 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-gray-800 truncate">{user?.full_name || 'Owner'}</p>
            <p className="text-[11px] text-gray-400 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors font-medium"
        >
          <LogOut size={16} className="flex-shrink-0" />
          Sign out
        </button>
      </div>
    </aside>
  )
}