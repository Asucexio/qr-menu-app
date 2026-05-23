import axios from 'axios'
import { tokenStorage } from './auth'
import type {
  User, AuthTokens, SignUpPayload, SignInPayload,
  Restaurant, Menu, Category, Item, QRCode, Subscription,
} from './types'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

// ── Attach token to every request ────────────────────────────
api.interceptors.request.use((config) => {
  const token = tokenStorage.getAccess()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  } else {
    console.warn('[API] No token for request:', config.method?.toUpperCase(), config.url)
  }
  return config
})

// ── Auto-refresh on 401 ──────────────────────────────────────
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true
      const refresh = tokenStorage.getRefresh()
      if (refresh) {
        try {
          const { data } = await axios.post(`${BASE_URL}/api/auth/refresh`, {
            refresh_token: refresh,
          })
          tokenStorage.set(data.access_token, data.refresh_token)
          original.headers.Authorization = `Bearer ${data.access_token}`
          return api(original)
        } catch {
          tokenStorage.clear()
          if (typeof window !== 'undefined') window.location.href = '/signin'
        }
      } else {
        if (typeof window !== 'undefined') window.location.href = '/signin'
      }
    }
    return Promise.reject(error)
  }
)

// ── AUTH ─────────────────────────────────────────────────────
export const authApi = {
  signUp: (payload: SignUpPayload) =>
    api.post<{ message: string; user: User }>('/api/auth/signup', payload).then(r => r.data),

  signIn: (payload: SignInPayload) =>
    api.post<AuthTokens & { user: User }>('/api/auth/signin', payload).then(r => r.data),

  refresh: (refresh_token: string) =>
    api.post<AuthTokens>('/api/auth/refresh', { refresh_token }).then(r => r.data),

  getProfile: () =>
    api.get<User>('/api/auth/profile').then(r => r.data),

  updateProfile: (data: Partial<Pick<User, 'full_name' | 'avatar_url'>>) =>
    api.patch<User>('/api/auth/profile', data).then(r => r.data),

  changePassword: (password: string) =>
    api.patch<{ message: string }>('/api/auth/change-password', { password }).then(r => r.data),
}

// ── RESTAURANTS ──────────────────────────────────────────────
export const restaurantApi = {
  create: (data: Partial<Restaurant>) =>
    api.post<Restaurant>('/api/restaurants', data).then(r => r.data),

  getMine: () =>
    api.get<Restaurant>('/api/restaurants/me').then(r => r.data),

  getBySlug: (slug: string) =>
    api.get<Restaurant>(`/api/restaurants/slug/${slug}`).then(r => r.data),

  update: (id: string, data: Partial<Restaurant>) =>
    api.patch<Restaurant>(`/api/restaurants/${id}`, data).then(r => r.data),

  remove: (id: string) =>
    api.delete(`/api/restaurants/${id}`).then(r => r.data),
}

// ── MENUS ────────────────────────────────────────────────────
export const menuApi = {
  create: (data: { restaurant_id: string; name: string }) =>
    api.post<Menu>('/api/menus', data).then(r => r.data),

  listByRestaurant: (restaurantId: string) =>
    api.get<Menu[]>(`/api/menus/restaurant/${restaurantId}`).then(r => r.data),

  getById: (id: string) =>
    api.get<Menu>(`/api/menus/${id}`).then(r => r.data),

  getPublic: (menuId: string) =>
    api.get<Menu>(`/api/menus/public/${menuId}`).then(r => r.data),

  update: (id: string, data: Partial<Menu>) =>
    api.patch<Menu>(`/api/menus/${id}`, data).then(r => r.data),

  remove: (id: string) =>
    api.delete(`/api/menus/${id}`).then(r => r.data),
}

// ── CATEGORIES ───────────────────────────────────────────────
export const categoryApi = {
  create: (data: { menu_id: string; name: string; sort_order?: number }) =>
    api.post<Category>('/api/categories', data).then(r => r.data),

  listByMenu: (menuId: string) =>
    api.get<Category[]>(`/api/categories/menu/${menuId}`).then(r => r.data),

  update: (id: string, data: Partial<Category>) =>
    api.patch<Category>(`/api/categories/${id}`, data).then(r => r.data),

  remove: (id: string) =>
    api.delete(`/api/categories/${id}`).then(r => r.data),
}

// ── ITEMS ────────────────────────────────────────────────────
export const itemApi = {
  create: (data: Partial<Item> & { category_id: string; name: string; price: number }) =>
    api.post<Item>('/api/items', data).then(r => r.data),

  listByCategory: (categoryId: string) =>
    api.get<Item[]>(`/api/items/category/${categoryId}`).then(r => r.data),

  getById: (id: string) =>
    api.get<Item>(`/api/items/${id}`).then(r => r.data),

  update: (id: string, data: Partial<Item>) =>
    api.patch<Item>(`/api/items/${id}`, data).then(r => r.data),

  toggle: (id: string) =>
    api.patch<Item>(`/api/items/${id}/toggle`).then(r => r.data),

  remove: (id: string) =>
    api.delete(`/api/items/${id}`).then(r => r.data),
}

// ── QR CODES ─────────────────────────────────────────────────
export const qrApi = {
  generate: (menuId: string) =>
    api.post<QRCode>(`/api/qr/${menuId}/generate`).then(r => r.data),

  getByMenu: (menuId: string) =>
    api.get<QRCode>(`/api/qr/${menuId}`).then(r => r.data),

  downloadUrl: (menuId: string) =>
    `${BASE_URL}/api/qr/${menuId}/download`,
}

// ── SUBSCRIPTIONS ────────────────────────────────────────────
export const subscriptionApi = {
  getStatus: () =>
    api.get<Subscription>('/api/subscriptions/status').then(r => r.data),

  initialize: (data: {
    plan: string; email: string; first_name: string; last_name: string
  }) =>
    api.post<{ checkout_url: string; tx_ref: string }>(
      '/api/subscriptions/initialize', data
    ).then(r => r.data),

  // public — no auth needed
  verify: (txRef: string) =>
    axios.get<{ verified: boolean; status: string; expires_at?: string }>(
      `${BASE_URL}/api/subscriptions/verify/${txRef}`
    ).then(r => r.data),
}

export default api
