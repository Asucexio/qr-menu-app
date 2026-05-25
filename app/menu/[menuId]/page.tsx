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
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F7F6F2] px-4">
        <div className="w-16 h-16 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center mb-5">
          <UtensilsCrossed size={28} className="text-gray-300" />
        </div>
        <h1 className="text-xl font-semibold text-gray-900 mb-2 tracking-tight">Menu not found</h1>
        <p className="text-gray-400 text-sm">This menu may have been removed or deactivated.</p>
      </div>
    )
  }

  const restaurant = menu.restaurants

  return (
    <div className="min-h-screen bg-[#F7F6F2]" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100/80 sticky top-0 z-20">
        <div className="max-w-xl mx-auto px-5 pt-5 pb-4">
          <div className="flex items-center gap-4">
            {restaurant?.logo_url ? (
              <img
                src={restaurant.logo_url}
                alt={restaurant.name}
                className="h-11 w-11 rounded-xl object-cover ring-1 ring-black/5 flex-shrink-0"
              />
            ) : (
              <div className="h-11 w-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0">
                <UtensilsCrossed size={20} className="text-emerald-500" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <h1 className="text-[15px] font-semibold text-gray-900 truncate tracking-tight leading-snug">
                {restaurant?.name}
              </h1>
              <div className="flex items-center gap-3 mt-0.5">
                {restaurant?.address && (
                  <span className="flex items-center gap-1 text-[11px] text-gray-400 truncate">
                    <MapPin size={10} className="flex-shrink-0" />
                    {restaurant.address}
                  </span>
                )}
                {restaurant?.phone && (
                  <a
                    href={`tel:${restaurant.phone}`}
                    className="flex items-center gap-1 text-[11px] text-emerald-600 hover:text-emerald-700 transition-colors flex-shrink-0"
                  >
                    <Phone size={10} />
                    {restaurant.phone}
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Menu badge */}
          <div className="mt-3">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              {menu.name}
            </span>
          </div>
        </div>

        {/* Category pills */}
        {menu.categories && menu.categories.length > 0 && (
          <div className="max-w-xl mx-auto px-5 pb-3 flex gap-2 overflow-x-auto scrollbar-hide">
            {menu.categories.map((cat: Category) => (
              <a
                key={cat.id}
                href={`#cat-${cat.id}`}
                className="flex-shrink-0 px-3.5 py-1.5 rounded-full border border-gray-200 text-[12px] font-medium text-gray-600 hover:border-emerald-400 hover:text-emerald-700 hover:bg-emerald-50 transition-all"
              >
                {cat.name}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Content */}
      <main className="max-w-xl mx-auto px-5 py-7 space-y-10">
        {!menu.categories?.length ? (
          <div className="text-center py-20">
            <div className="w-14 h-14 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center mx-auto mb-4">
              <UtensilsCrossed size={24} className="text-gray-300" />
            </div>
            <p className="text-gray-400 text-sm">Menu is being prepared. Check back soon!</p>
          </div>
        ) : (
          menu.categories.map((category: Category) => (
            <section key={category.id} id={`cat-${category.id}`} className="scroll-mt-36">
              {/* Category heading */}
              <div className="flex items-center gap-3 mb-5">
                <h2 className="text-[13px] font-semibold text-gray-400 uppercase tracking-[0.1em] whitespace-nowrap">
                  {category.name}
                </h2>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              {/* Items */}
              <div className="space-y-2.5">
                {!category.items?.length ? (
                  <p className="text-sm text-gray-400 px-1">No items in this category yet.</p>
                ) : (
                  category.items.map((item: Item) => (
                    <div
                      key={item.id}
                      className="group flex items-center gap-4 bg-white rounded-2xl border border-gray-100 p-4 hover:border-gray-200 hover:shadow-sm transition-all duration-200"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-[14px] text-gray-900 tracking-tight leading-snug">
                          {item.name}
                        </p>
                        {item.description && (
                          <p className="text-[12.5px] text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>
                        )}
                        <p className="text-[14px] font-semibold text-emerald-600 mt-2 tracking-tight">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="h-[72px] w-[72px] rounded-xl object-cover flex-shrink-0 group-hover:scale-[1.02] transition-transform duration-200"
                        />
                      ) : (
                        <div className="h-[72px] w-[72px] rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0">
                          <UtensilsCrossed size={16} className="text-gray-200" />
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </section>
          ))
        )}

        {/* Footer */}
        <div className="text-center pt-6 pb-10 border-t border-gray-100">
          <p className="text-[11px] text-gray-300 tracking-wide">
            Powered by <span className="font-semibold text-gray-400">QR Menu</span>
          </p>
        </div>
      </main>
    </div>
  )
}