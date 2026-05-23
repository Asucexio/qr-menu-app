import { create } from 'zustand'
import { restaurantApi, menuApi, categoryApi, itemApi } from '@/lib/api'
import type { Restaurant, Menu, Category, Item } from '@/lib/types'

interface RestaurantState {
  restaurant: Restaurant | null
  menus: Menu[]
  activeMenu: Menu | null
  loading: boolean

  loadRestaurant: () => Promise<void>
  createRestaurant: (data: Partial<Restaurant>) => Promise<void>
  updateRestaurant: (data: Partial<Restaurant>) => Promise<void>
  setActiveMenu: (menu: Menu | null) => void

  createMenu: (name: string) => Promise<void>
  updateMenu: (menuId: string, data: Partial<Menu>) => Promise<void>
  deleteMenu: (menuId: string) => Promise<void>

  createCategory: (menuId: string, name: string, sortOrder?: number) => Promise<void>
  updateCategory: (categoryId: string, data: Partial<Category>) => Promise<void>
  deleteCategory: (categoryId: string) => Promise<void>

  createItem: (data: Partial<Item> & { category_id: string; name: string; price: number }) => Promise<void>
  updateItem: (itemId: string, data: Partial<Item>) => Promise<void>
  toggleItem: (itemId: string) => Promise<void>
  deleteItem: (itemId: string) => Promise<void>
}

export const useRestaurantStore = create<RestaurantState>((set, get) => ({
  restaurant: null,
  menus: [],
  activeMenu: null,
  loading: false,

  loadRestaurant: async () => {
    set({ loading: true })
    try {
      const restaurant = await restaurantApi.getMine()
      set({ restaurant })
      if (restaurant) {
        const menus = await menuApi.listByRestaurant(restaurant.id)
        set({ menus })
      }
    } catch (err) {
      console.error('Failed to load restaurant profile:', err)
      // It's possible the user doesn't have a restaurant yet, so we keep restaurant: null
      set({ restaurant: null, menus: [] })
    } finally {
      set({ loading: false })
    }
  },

  createRestaurant: async (data) => {
    set({ loading: true })
    try {
      const restaurant = await restaurantApi.create(data)
      set({ restaurant })
    } finally {
      set({ loading: false })
    }
  },

  updateRestaurant: async (data) => {
    const { restaurant } = get()
    if (!restaurant) return
    set({ loading: true })
    try {
      const updated = await restaurantApi.update(restaurant.id, data)
      set({ restaurant: updated })
    } finally {
      set({ loading: false })
    }
  },

  setActiveMenu: (menu) => {
    set({ activeMenu: menu })
  },

  createMenu: async (name) => {
    const { restaurant, menus } = get()
    if (!restaurant) return
    set({ loading: true })
    try {
      const newMenu = await menuApi.create({ restaurant_id: restaurant.id, name })
      set({ menus: [...menus, newMenu] })
    } finally {
      set({ loading: false })
    }
  },

  updateMenu: async (menuId, data) => {
    const { menus } = get()
    set({ loading: true })
    try {
      const updated = await menuApi.update(menuId, data)
      set({
        menus: menus.map((m) => (m.id === menuId ? { ...m, ...updated } : m)),
      })
    } finally {
      set({ loading: false })
    }
  },

  deleteMenu: async (menuId) => {
    const { menus } = get()
    set({ loading: true })
    try {
      await menuApi.remove(menuId)
      set({ menus: menus.filter((m) => m.id !== menuId) })
    } finally {
      set({ loading: false })
    }
  },

  createCategory: async (menuId, name, sortOrder) => {
    const { activeMenu } = get()
    set({ loading: true })
    try {
      const newCategory = await categoryApi.create({ menu_id: menuId, name, sort_order: sortOrder })
      if (activeMenu && activeMenu.id === menuId) {
        set({
          activeMenu: {
            ...activeMenu,
            categories: [...(activeMenu.categories || []), { ...newCategory, items: [] }],
          },
        })
      }
    } finally {
      set({ loading: false })
    }
  },

  updateCategory: async (categoryId, data) => {
    const { activeMenu } = get()
    set({ loading: true })
    try {
      const updated = await categoryApi.update(categoryId, data)
      if (activeMenu && activeMenu.categories) {
        set({
          activeMenu: {
            ...activeMenu,
            categories: activeMenu.categories.map((c) =>
              c.id === categoryId ? { ...c, ...updated } : c
            ),
          },
        })
      }
    } finally {
      set({ loading: false })
    }
  },

  deleteCategory: async (categoryId) => {
    const { activeMenu } = get()
    set({ loading: true })
    try {
      await categoryApi.remove(categoryId)
      if (activeMenu && activeMenu.categories) {
        set({
          activeMenu: {
            ...activeMenu,
            categories: activeMenu.categories.filter((c) => c.id !== categoryId),
          },
        })
      }
    } finally {
      set({ loading: false })
    }
  },

  createItem: async (data) => {
    const { activeMenu } = get()
    set({ loading: true })
    try {
      const newItem = await itemApi.create(data)
      if (activeMenu && activeMenu.categories) {
        set({
          activeMenu: {
            ...activeMenu,
            categories: activeMenu.categories.map((c) => {
              if (c.id === data.category_id) {
                return { ...c, items: [...(c.items || []), newItem] }
              }
              return c
            }),
          },
        })
      }
    } finally {
      set({ loading: false })
    }
  },

  updateItem: async (itemId, data) => {
    const { activeMenu } = get()
    set({ loading: true })
    try {
      const updated = await itemApi.update(itemId, data)
      if (activeMenu && activeMenu.categories) {
        set({
          activeMenu: {
            ...activeMenu,
            categories: activeMenu.categories.map((c) => ({
              ...c,
              items: c.items?.map((item) => (item.id === itemId ? { ...item, ...updated } : item)),
            })),
          },
        })
      }
    } finally {
      set({ loading: false })
    }
  },

  toggleItem: async (itemId) => {
    const { activeMenu } = get()
    try {
      const updated = await itemApi.toggle(itemId)
      if (activeMenu && activeMenu.categories) {
        set({
          activeMenu: {
            ...activeMenu,
            categories: activeMenu.categories.map((c) => ({
              ...c,
              items: c.items?.map((item) => (item.id === itemId ? { ...item, ...updated } : item)),
            })),
          },
        })
      }
    } catch (err) {
      console.error('Failed to toggle item availability:', err)
      throw err
    }
  },

  deleteItem: async (itemId) => {
    const { activeMenu } = get()
    set({ loading: true })
    try {
      await itemApi.remove(itemId)
      if (activeMenu && activeMenu.categories) {
        set({
          activeMenu: {
            ...activeMenu,
            categories: activeMenu.categories.map((c) => ({
              ...c,
              items: c.items?.filter((item) => item.id !== itemId),
            })),
          },
        })
      }
    } finally {
      set({ loading: false })
    }
  },
}))
