import { menuApi } from '@/lib/api'
import { formatPrice } from '@/lib/utils'
import { MapPin, Phone, UtensilsCrossed } from 'lucide-react'
import type { Menu, Category, Item } from '@/lib/types'

export const dynamic = 'force-dynamic'

async function getMenu(menuId: string): Promise<Menu | null> {
  try {
    return await menuApi.getPublic(menuId)
  } catch {
    return null
  }
}

export default async function PublicMenuPage({ params }: { params: Promise<{ menuId: string }> }) {
  const { menuId } = await params
  const menu = await getMenu(menuId)

  if (!menu) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <UtensilsCrossed size={48} className="text-gray-300 mb-4" />
        <h1 className="text-xl font-bold text-gray-900 mb-2">Menu not found</h1>
        <p className="text-gray-500 text-sm">This menu may have been removed or deactivated.</p>
      </div>
    )
  }

  const restaurant = menu.restaurants

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Restaurant header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            {restaurant?.logo_url ? (
              <img src={restaurant.logo_url} alt={restaurant.name} className="h-12 w-12 rounded-xl object-cover" />
            ) : (
              <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                <UtensilsCrossed size={22} className="text-green-600" />
              </div>
            )}
            <div className="min-w-0">
              <h1 className="text-lg font-bold text-gray-900 truncate">{restaurant?.name}</h1>
              <div className="flex items-center gap-3 mt-0.5">
                {restaurant?.address && (
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <MapPin size={11} />{restaurant.address}
                  </span>
                )}
                {restaurant?.phone && (
                  <a href={`tel:${restaurant.phone}`} className="flex items-center gap-1 text-xs text-green-600">
                    <Phone size={11} />{restaurant.phone}
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Menu name */}
          <div className="mt-3 text-sm font-medium text-gray-500">{menu.name}</div>
        </div>

        {/* Category nav */}
        {menu.categories && menu.categories.length > 0 && (
          <div className="max-w-2xl mx-auto px-4 pb-3 flex gap-2 overflow-x-auto scrollbar-hide">
            {menu.categories.map((cat: Category) => (
              <a
                key={cat.id}
                href={`#cat-${cat.id}`}
                className="flex-shrink-0 px-4 py-1.5 rounded-full bg-gray-100 text-sm font-medium text-gray-600 hover:bg-green-100 hover:text-green-700 transition-colors"
              >
                {cat.name}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Menu content */}
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-8">
        {!menu.categories?.length ? (
          <div className="text-center py-16 text-gray-400">
            <UtensilsCrossed size={40} className="mx-auto mb-3 opacity-30" />
            <p>Menu is being prepared. Check back soon!</p>
          </div>
        ) : (
          menu.categories.map((category: Category) => (
            <section key={category.id} id={`cat-${category.id}`}>
              {/* Category title */}
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-base font-bold text-gray-900">{category.name}</h2>
                <div className="flex-1 h-px bg-gray-100" />
              </div>

              {/* Items */}
              <div className="space-y-3">
                {!category.items?.length ? (
                  <p className="text-sm text-gray-400 px-1">No items in this category yet.</p>
                ) : (
                  category.items.map((item: Item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 bg-white rounded-xl border border-gray-100 p-4 hover:shadow-sm transition-shadow"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900">{item.name}</p>
                        {item.description && (
                          <p className="text-sm text-gray-500 mt-0.5 line-clamp-2">{item.description}</p>
                        )}
                        <p className="text-base font-bold text-green-600 mt-1.5">{formatPrice(item.price)}</p>
                      </div>
                      {item.image_url && (
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="h-20 w-20 rounded-xl object-cover flex-shrink-0"
                        />
                      )}
                    </div>
                  ))
                )}
              </div>
            </section>
          ))
        )}

        {/* Footer */}
        <div className="text-center py-8 border-t border-gray-100">
          <p className="text-xs text-gray-400">Powered by <span className="font-semibold">QR Menu</span></p>
        </div>
      </div>
    </div>
  )
}
