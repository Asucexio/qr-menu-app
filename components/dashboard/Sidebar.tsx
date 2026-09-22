'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  UtensilsCrossed,
  QrCode,
  CreditCard,
  Settings,
  LogOut,
} from 'lucide-react'

import { useAuthStore } from '@/store/authStore'
import { cn } from '@/lib/utils'

const NAV = [
  {
    href: '/dashboard',
    label: 'Home',
    icon: LayoutDashboard,
  },
  {
    href: '/dashboard/menus',
    label: 'Menus',
    icon: UtensilsCrossed,
  },
  {
    href: '/dashboard/qr',
    label: 'QR',
    icon: QrCode,
  },
  {
    href: '/dashboard/billing',
    label: 'Billing',
    icon: CreditCard,
  },
  {
    href: '/dashboard/settings',
    label: 'Settings',
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const { user, signOut } = useAuthStore()

  const handleSignOut = async () => {
    await signOut()
    router.push('/auth/signin')
  }

  const initials = (user?.full_name || 'U')
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === href
    }

    return pathname.startsWith(href)
  }

  return (
    <>
      {/* ================= DESKTOP SIDEBAR ================= */}

      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[232px] flex-col border-r border-gray-100 bg-white lg:flex">
        {/* Logo */}

        <div className="border-b border-gray-100 px-6 py-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5"
          >
            <img
              src="https://ik.imagekit.io/sl226drpx/grok-image-56a72e42-b19a-46fa-b7fc-1322508bd538-removebg-preview.png"
              alt="Hamenu Logo"
              width={32}
              height={32}
              className="h-8 w-8 rounded-lg shadow-sm"
            />

            <div>
              <span className="text-sm font-bold tracking-tight text-gray-900">
                hamenu
              </span>

              <span className="mt-0.5 block text-[10px] font-medium uppercase tracking-widest leading-none text-gray-400">
                Studio
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation */}

        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = isActive(href)

            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  active
                    ? 'bg-green-50 text-green-700'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                )}
              >
                <Icon
                  size={17}
                  className={
                    active
                      ? 'text-green-600'
                      : 'text-gray-400'
                  }
                />

                {label}

                {active && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-green-500" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* User */}

        <div className="space-y-1 border-t border-gray-100 px-3 pb-4 pt-3">
          <div className="flex items-center gap-3 rounded-lg px-3 py-2.5">
            <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700">
              {initials}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-gray-800">
                {user?.full_name || 'Owner'}
              </p>

              <p className="truncate text-[11px] text-gray-400">
                {user?.email}
              </p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
          >
            <LogOut size={16} />

            Sign out
          </button>
        </div>
      </aside>

      {/* ================= MOBILE TOP BAR ================= */}

      <header className="flex h-14 items-center justify-between border-b border-gray-100 bg-white px-4 lg:hidden">
        <Link
          href="/dashboard"
          className="flex items-center gap-2"
        >
          <img
            src="https://ik.imagekit.io/sl226drpx/grok-image-56a72e42-b19a-46fa-b7fc-1322508bd538-removebg-preview.png"
            alt="Hamenu"
            width={30}
            height={30}
            className="h-7 w-7 rounded-lg"
          />

          <span className="text-sm font-bold text-gray-900">
            hamenu
          </span>
        </Link>

        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700">
          {initials}
        </div>
      </header>

      {/* ================= MOBILE BOTTOM NAV ================= */}

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white/95 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-md items-center justify-around">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = isActive(href)

            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex min-w-[60px] flex-col items-center gap-1 px-2 py-2 text-[10px] font-medium transition-colors',
                  active
                    ? 'text-green-600'
                    : 'text-gray-400'
                )}
              >
                <Icon size={19} />

                <span>{label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}