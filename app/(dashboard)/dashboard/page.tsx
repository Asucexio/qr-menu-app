'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { UtensilsCrossed, QrCode, CreditCard, ArrowRight, Plus, TrendingUp } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { useRestaurantStore } from '@/store/restaurantStore'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

function StatCard({
  label, value, icon: Icon, href, accent = false,
}: {
  label: string; value: string | number; icon: React.ElementType; href: string; accent?: boolean
}) {
  return (
    <Link
      href={href}
      className="group relative rounded-2xl border border-gray-100 bg-white p-5 hover:border-green-200 hover:shadow-sm transition-all duration-200 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/0 to-green-50/0 group-hover:from-green-50/60 group-hover:to-transparent transition-all duration-300" />
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">{label}</span>
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${accent ? 'bg-green-100' : 'bg-gray-50'} group-hover:bg-green-100 transition-colors`}>
            <Icon size={16} className={accent ? 'text-green-600' : 'text-gray-400 group-hover:text-green-600 transition-colors'} />
          </div>
        </div>
        <p className="text-2xl font-bold text-gray-900 truncate">{value}</p>
      </div>
    </Link>
  )
}

export default function DashboardPage() {
  const { user } = useAuthStore()
  const { restaurant, menus, loading, loadRestaurant } = useRestaurantStore()

  useEffect(() => { loadRestaurant() }, [])

  const greeting = () => {
    const h = new Date().getHours()
    if (h < 12) return 'Good morning'
    if (h < 17) return 'Good afternoon'
    return 'Good evening'
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="h-7 w-7 animate-spin rounded-full border-2 border-green-600 border-t-transparent" />
    </div>
  )

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-green-600 mb-1">Dashboard</p>
          <h1 className="text-2xl font-bold text-gray-900">
            {greeting()}{user?.full_name ? `, ${user.full_name.split(' ')[0]}` : ''} 👋
          </h1>
          <p className="text-gray-400 mt-1 text-sm">
            {restaurant ? `Managing ${restaurant.name}` : 'Set up your restaurant to get started'}
          </p>
        </div>
        {restaurant && (
          <Link href="/dashboard/menus">
            <Button size="sm" className="gap-1.5 shadow-sm">
              <Plus size={14} /> New menu
            </Button>
          </Link>
        )}
      </div>

      {/* No restaurant */}
      {!restaurant ? (
        <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-white p-14 text-center">
          <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center mx-auto mb-5">
            <UtensilsCrossed size={26} className="text-green-600" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Set up your restaurant</h2>
          <p className="text-gray-400 text-sm mb-7 max-w-xs mx-auto">
            Create your restaurant profile to start building beautiful digital menus.
          </p>
          <Link href="/onboarding/restaurant">
            <Button className="shadow-sm">
              <Plus size={15} className="mr-2" />Create restaurant
            </Button>
          </Link>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <StatCard label="Total menus"   value={menus.length}                         icon={UtensilsCrossed} href="/dashboard/menus"    />
            <StatCard label="Active menus"  value={menus.filter(m => m.is_active).length} icon={QrCode}          href="/dashboard/qr"      accent />
            <StatCard label="Restaurant"    value={restaurant.name}                        icon={CreditCard}      href="/dashboard/settings" />
          </div>

          {/* Menus section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-gray-900">Your menus</h2>
                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-medium">
                  {menus.length}
                </span>
              </div>
              <Link href="/dashboard/menus">
                <Button variant="ghost" size="sm" className="gap-1 text-gray-400 hover:text-gray-700">
                  View all <ArrowRight size={13} />
                </Button>
              </Link>
            </div>

            {menus.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-10 text-center">
                <p className="text-sm text-gray-400 mb-4">No menus yet — create your first one</p>
                <Link href="/dashboard/menus">
                  <Button size="sm" variant="secondary">
                    <Plus size={14} className="mr-1.5" />Create menu
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
                {menus.slice(0, 5).map((menu, i) => (
                  <Link
                    key={menu.id}
                    href={`/dashboard/menus/${menu.id}`}
                    className={`flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors group ${i !== 0 ? 'border-t border-gray-50' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                        <UtensilsCrossed size={14} className="text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{menu.name}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(menu.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge label={menu.is_active ? 'Active' : 'Inactive'} variant={menu.is_active ? 'green' : 'gray'} />
                      <ArrowRight size={14} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
                    </div>
                  </Link>
                ))}
                {menus.length > 5 && (
                  <div className="border-t border-gray-50 px-5 py-3">
                    <Link href="/dashboard/menus" className="text-xs font-medium text-green-600 hover:text-green-700 flex items-center gap-1">
                      +{menus.length - 5} more menus <ArrowRight size={12} />
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick actions */}
          <div>
            <h2 className="text-sm font-bold text-gray-900 mb-4">Quick actions</h2>
            <div className="grid grid-cols-3 gap-3">
              {[
                { href: '/dashboard/menus', label: 'Create menu', icon: UtensilsCrossed, desc: 'Build a digital menu' },
                { href: '/dashboard/qr',    label: 'Get QR code',  icon: QrCode,          desc: 'Share with customers' },
                { href: '/dashboard/billing', label: 'Upgrade plan', icon: TrendingUp,   desc: 'Unlock all features' },
              ].map(({ href, label, icon: Icon, desc }) => (
                <Link
                  key={href}
                  href={href}
                  className="group flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 hover:border-green-200 hover:shadow-sm transition-all duration-200"
                >
                  <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-green-50 transition-colors">
                    <Icon size={16} className="text-gray-400 group-hover:text-green-600 transition-colors" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}