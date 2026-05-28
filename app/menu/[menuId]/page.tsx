import { menuApi } from '@/lib/api'
import { formatPrice } from '@/lib/utils'
import { MapPin, Phone, UtensilsCrossed, Clock } from 'lucide-react'
import type { Menu, Category, Item } from '@/lib/types'

export const dynamic = 'force-dynamic'

async function getMenu(menuId: string): Promise<Menu | null> {
  try {
    return await menuApi.getPublic(menuId)
  } catch {
    return null
  }
}

export default async function ModernPublicMenuPage({ params }: { params: Promise<{ menuId: string }> }) {
  const { menuId } = await params
  const menu = await getMenu(menuId)

  if (!menu) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F7F4] px-6">
        <div className="w-20 h-20 rounded-3xl bg-white border border-gray-100 shadow-sm flex items-center justify-center mb-6">
          <UtensilsCrossed size={36} className="text-gray-300" />
        </div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-3 tracking-tight">Menu not found</h1>
        <p className="text-gray-500 text-center max-w-xs">This menu may have been removed or is no longer available.</p>
      </div>
    )
  }

  const restaurant = menu.restaurants

  return (
    <div className="min-h-screen bg-[#F8F7F4]" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      
      {/* Modern Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-5 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {restaurant?.logo_url ? (
                <img
                  src={restaurant.logo_url}
                  alt={restaurant.name}
                  className="h-12 w-12 rounded-2xl object-cover ring-1 ring-black/5"
                />
              ) : (
                <div className="h-12 w-12 rounded-2xl bg-emerald-100 flex items-center justify-center">
                  <UtensilsCrossed size={22} className="text-emerald-600" />
                </div>
              )}
              <div>
                <h1 className="text-[17px] font-semibold text-gray-900 tracking-tight">{restaurant?.name}</h1>
                {restaurant?.address && (
                  <div className="flex items-center gap-1.5 text-[12px] text-gray-500 mt-0.5">
                    <MapPin size={12} />
                    {restaurant.address}
                  </div>
                )}
              </div>
            </div>

            {restaurant?.phone && (
              <a 
                href={`tel:${restaurant.phone}`} 
                className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-2xl text-sm font-medium hover:bg-emerald-700 transition-colors"
              >
                <Phone size={14} /> Call
              </a>
            )}
          </div>
        </div>

        {/* Category Navigation */}
        {menu.categories && menu.categories.length > 0 && (
          <div className="max-w-2xl mx-auto px-5 pb-3 overflow-x-auto scrollbar-hide">
            <div className="flex gap-2">
              {menu.categories.map((cat: Category) => (
                <a
                  key={cat.id}
                  href={`#cat-${cat.id}`}
                  className="flex-shrink-0 px-5 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-600 hover:border-emerald-400 hover:text-emerald-700 hover:bg-white transition-all whitespace-nowrap"
                >
                  {cat.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="max-w-2xl mx-auto px-5 pt-8 pb-16">
        
        {/* Menu Header */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-3xl font-semibold text-gray-900 tracking-tight">{menu.name}</h2>
              <p className="text-gray-500 mt-1">Scan • Browse • Enjoy</p>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                <Clock size={12} /> Updated today
              </div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        {!menu.categories?.length ? (
          <div className="text-center py-16">
            <div className="mx-auto w-16 h-16 rounded-3xl bg-white border border-gray-100 flex items-center justify-center mb-4">
              <UtensilsCrossed size={28} className="text-gray-300" />
            </div>
            <p className="text-gray-400">Menu is being prepared. Check back soon!</p>
          </div>
        ) : (
          menu.categories.map((category: Category) => (
            <section key={category.id} id={`cat-${category.id}`} className="mb-14 scroll-mt-24">
              
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 tracking-tight">{category.name}</h3>
                <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent" />
              </div>

              {/* Items Grid */}
              <div className="grid gap-4">
                {category.items?.length ? (
                  category.items.map((item: Item) => (
                    <div 
                      key={item.id} 
                      className="group bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-300 flex"
                    >
                      {/* Item Content */}
                      <div className="flex-1 p-5 flex flex-col justify-between min-w-0">
                        <div>
                          <h4 className="font-semibold text-[17px] text-gray-900 tracking-tight group-hover:text-emerald-600 transition-colors">
                            {item.name}
                          </h4>
                          {item.description && (
                            <p className="text-[13.5px] text-gray-500 mt-2 leading-relaxed line-clamp-2">
                              {item.description}
                            </p>
                          )}
                        </div>
                        
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-xl font-semibold text-emerald-600 tracking-tight">
                            {formatPrice(item.price)}
                          </span>
                          
                          <button 
                            className="opacity-0 group-hover:opacity-100 text-xs font-semibold bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-black transition-all active:scale-95"
                          >
                            Add
                          </button>
                        </div>
                      </div>

                      {/* Item Image */}
                      {item.image_url ? (
                        <div className="relative w-[130px] h-[130px] flex-shrink-0">
                          <img
                            src={item.image_url}
                            alt={item.name}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      ) : (
                        <div className="w-[130px] h-[130px] bg-gray-100 flex items-center justify-center flex-shrink-0">
                          <UtensilsCrossed size={28} className="text-gray-300" />
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-400 py-8">No items in this category yet.</p>
                )}
              </div>
            </section>
          ))
        )}

        {/* Footer */}
        <div className="text-center pt-12 border-t border-gray-100">
          <p className="text-xs text-gray-400 tracking-[1px]">
            POWERED BY <span className="font-semibold text-emerald-600">UMENU</span>
          </p>
          <p className="text-[10px] text-gray-300 mt-1">Digital menus for modern restaurants</p>
        </div>
      </main>
    </div>
  )
}