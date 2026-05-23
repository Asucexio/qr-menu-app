'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { UtensilsCrossed, QrCode, CreditCard, ArrowRight, Plus } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { useRestaurantStore } from '@/store/restaurantStore'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

export default function DashboardPage() {
  const { user } = useAuthStore()
  const { restaurant, menus, loading, loadRestaurant } = useRestaurantStore()

  useEffect(() => { loadRestaurant() }, [])

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-green-600 border-t-transparent" />
    </div>
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Good morning{user?.full_name ? `, ${user.full_name.split(' ')[0]}` : ''} 👋
        </h1>
        <p className="text-gray-500 mt-1">Here&apos;s an overview of your restaurant.</p>
      </div>

      {/* No restaurant state */}
      {!restaurant ? (
        <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-white p-12 text-center">
          <UtensilsCrossed size={40} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Set up your restaurant</h2>
          <p className="text-gray-500 text-sm mb-6">Create your restaurant profile to start building menus.</p>
          <Link href="/onboarding/restaurant">
            <Button><Plus size={16} className="mr-2" />Create restaurant</Button>
          </Link>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Total menus', value: menus.length, icon: UtensilsCrossed, href: '/dashboard/menus' },
              { label: 'Active menus', value: menus.filter(m => m.is_active).length, icon: QrCode, href: '/dashboard/qr' },
              { label: 'Restaurant', value: restaurant.name, icon: CreditCard, href: '/dashboard/settings' },
            ].map(({ label, value, icon: Icon, href }) => (
              <Link key={label} href={href} className="rounded-xl border border-gray-100 bg-white p-5 hover:shadow-sm transition-shadow group">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">{label}</span>
                  <Icon size={18} className="text-gray-300 group-hover:text-green-500 transition-colors" />
                </div>
                <p className="text-2xl font-bold text-gray-900 truncate">{value}</p>
              </Link>
            ))}
          </div>

          {/* Menus */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-900">Your menus</h2>
              <Link href="/dashboard/menus">
                <Button variant="ghost" size="sm" className="gap-1">View all <ArrowRight size={14} /></Button>
              </Link>
            </div>
            {menus.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-200 bg-white p-8 text-center">
                <p className="text-sm text-gray-400 mb-3">No menus yet</p>
                <Link href="/dashboard/menus"><Button size="sm"><Plus size={14} className="mr-1" />Create menu</Button></Link>
              </div>
            ) : (
              <div className="space-y-2">
                {menus.slice(0, 5).map(menu => (
                  <Link
                    key={menu.id}
                    href={`/dashboard/menus/${menu.id}`}
                    className="flex items-center justify-between rounded-xl border border-gray-100 bg-white px-4 py-3 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-center gap-3">
                      <UtensilsCrossed size={16} className="text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">{menu.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge label={menu.is_active ? 'Active' : 'Inactive'} variant={menu.is_active ? 'green' : 'gray'} />
                      <ArrowRight size={14} className="text-gray-300" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
