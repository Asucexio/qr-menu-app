
'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import {
  UtensilsCrossed,
  QrCode,
  CreditCard,
  ArrowRight,
  Plus,
  TrendingUp,
} from 'lucide-react'

import { useAuthStore } from '@/store/authStore'
import { useRestaurantStore } from '@/store/restaurantStore'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

function StatCard({
  label,
  value,
  icon: Icon,
  href,
  accent = false,
}: {
  label: string
  value: string | number
  icon: React.ElementType
  href: string
  accent?: boolean
}) {
  return (
    <Link
      href={href}
      className="group relative min-w-0 overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 transition-all duration-200 hover:border-green-200 hover:shadow-sm"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/0 to-green-50/0 transition-all duration-300 group-hover:from-green-50/60 group-hover:to-transparent" />

      <div className="relative">
        <div className="mb-3 flex items-start justify-between gap-2 sm:mb-4">
          <span className="truncate text-[10px] font-semibold uppercase tracking-widest text-gray-400 sm:text-xs">
            {label}
          </span>

          <div
            className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl ${
              accent ? 'bg-green-100' : 'bg-gray-50'
            } transition-colors group-hover:bg-green-100`}
          >
            <Icon
              size={16}
              className={
                accent
                  ? 'text-green-600'
                  : 'text-gray-400 transition-colors group-hover:text-green-600'
              }
            />
          </div>
        </div>

        <p className="truncate text-xl font-bold text-gray-900 sm:text-2xl">
          {value}
        </p>
      </div>
    </Link>
  )
}

export default function DashboardPage() {
  const { user } = useAuthStore()

  const {
    restaurant,
    menus,
    loading,
    loadRestaurant,
  } = useRestaurantStore()

  useEffect(() => {
    loadRestaurant()
  }, [loadRestaurant])

  const greeting = () => {
    const h = new Date().getHours()

    if (h < 12) return 'Good morning'
    if (h < 17) return 'Good afternoon'

    return 'Good evening'
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-7 w-7 animate-spin rounded-full border-2 border-green-600 border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="space-y-7 sm:space-y-10">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-green-600">
            Dashboard
          </p>

          <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
            {greeting()}
            {user?.full_name
              ? `, ${user.full_name.split(' ')[0]}`
              : ''}{' '}
            👋
          </h1>

          <p className="mt-1 truncate text-sm text-gray-400">
            {restaurant
              ? `Managing ${restaurant.name}`
              : 'Set up your restaurant to get started'}
          </p>
        </div>

        {restaurant && (
          <Link href="/dashboard/menus" className="w-full sm:w-auto">
            <Button
              size="sm"
              className="w-full gap-1.5 shadow-sm sm:w-auto"
            >
              <Plus size={14} />
              New menu
            </Button>
          </Link>
        )}
      </div>

      {/* No restaurant */}
      {!restaurant ? (
        <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-white p-7 text-center sm:p-14">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50">
            <UtensilsCrossed
              size={26}
              className="text-green-600"
            />
          </div>

          <h2 className="mb-2 text-lg font-bold text-gray-900">
            Set up your restaurant
          </h2>

          <p className="mx-auto mb-7 max-w-xs text-sm text-gray-400">
            Create your restaurant profile to start building
            beautiful digital menus.
          </p>

          <Link href="/onboarding/restaurant">
            <Button className="shadow-sm">
              <Plus size={15} className="mr-2" />
              Create restaurant
            </Button>
          </Link>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
            <StatCard
              label="Total menus"
              value={menus.length}
              icon={UtensilsCrossed}
              href="/dashboard/menus"
            />

            <StatCard
              label="Active menus"
              value={menus.filter((m) => m.is_active).length}
              icon={QrCode}
              href="/dashboard/qr"
              accent
            />

            <StatCard
              label="Restaurant"
              value={restaurant.name}
              icon={CreditCard}
              href="/dashboard/settings"
            />
          </div>

          {/* Menus */}
          <div>
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2">
                <h2 className="text-sm font-bold text-gray-900">
                  Your menus
                </h2>

                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500">
                  {menus.length}
                </span>
              </div>

              <Link href="/dashboard/menus">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1 text-gray-400 hover:text-gray-700"
                >
                  View all
                  <ArrowRight size={13} />
                </Button>
              </Link>
            </div>

            {menus.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-7 text-center sm:p-10">
                <p className="mb-4 text-sm text-gray-400">
                  No menus yet — create your first one
                </p>

                <Link href="/dashboard/menus">
                  <Button size="sm" variant="secondary">
                    <Plus size={14} className="mr-1.5" />
                    Create menu
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
                {menus.slice(0, 5).map((menu, i) => (
                  <Link
                    key={menu.id}
                    href={`/dashboard/menus/${menu.id}`}
                    className={`flex min-w-0 items-center justify-between gap-3 px-4 py-4 transition-colors hover:bg-gray-50 sm:px-5 ${
                      i !== 0
                        ? 'border-t border-gray-50'
                        : ''
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-green-50">
                        <UtensilsCrossed
                          size={14}
                          className="text-green-600"
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-gray-900">
                          {menu.name}
                        </p>

                        <p className="text-xs text-gray-400">
                          {new Date(
                            menu.created_at
                          ).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-shrink-0 items-center gap-2 sm:gap-3">
                      <Badge
                        label={
                          menu.is_active
                            ? 'Active'
                            : 'Inactive'
                        }
                        variant={
                          menu.is_active ? 'green' : 'gray'
                        }
                      />

                      <ArrowRight
                        size={14}
                        className="hidden text-gray-300 transition-colors group-hover:text-gray-500 sm:block"
                      />
                    </div>
                  </Link>
                ))}

                {menus.length > 5 && (
                  <div className="border-t border-gray-50 px-4 py-3 sm:px-5">
                    <Link
                      href="/dashboard/menus"
                      className="flex items-center gap-1 text-xs font-medium text-green-600 hover:text-green-700"
                    >
                      +{menus.length - 5} more menus
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick actions */}
          <div>
            <h2 className="mb-4 text-sm font-bold text-gray-900">
              Quick actions
            </h2>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                {
                  href: '/dashboard/menus',
                  label: 'Create menu',
                  icon: UtensilsCrossed,
                  desc: 'Build a digital menu',
                },
                {
                  href: '/dashboard/qr',
                  label: 'Get QR code',
                  icon: QrCode,
                  desc: 'Share with customers',
                },
                {
                  href: '/dashboard/billing',
                  label: 'Upgrade plan',
                  icon: TrendingUp,
                  desc: 'Unlock all features',
                },
              ].map(
                ({
                  href,
                  label,
                  icon: Icon,
                  desc,
                }) => (
                  <Link
                    key={href}
                    href={href}
                    className="group flex min-w-0 items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 transition-all duration-200 hover:border-green-200 hover:shadow-sm sm:flex-col sm:items-start"
                  >
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-gray-50 transition-colors group-hover:bg-green-50">
                      <Icon
                        size={16}
                        className="text-gray-400 transition-colors group-hover:text-green-600"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900">
                        {label}
                      </p>

                      <p className="mt-0.5 truncate text-xs text-gray-400">
                        {desc}
                      </p>
                    </div>
                  </Link>
                )
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

