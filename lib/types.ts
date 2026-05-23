// ── Auth ────────────────────────────────────────────────────
export interface User {
  id: string
  email: string
  full_name: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface AuthTokens {
  access_token: string
  refresh_token: string
  expires_in: number
}

export interface SignUpPayload {
  email: string
  password: string
  full_name: string
}

export interface SignInPayload {
  email: string
  password: string
}

// ── Restaurant ───────────────────────────────────────────────
export interface Restaurant {
  id: string
  owner_id: string
  name: string
  slug: string
  description?: string
  logo_url?: string
  address?: string
  phone?: string
  created_at: string
  updated_at: string
  menus?: Menu[]
}

// ── Menu ─────────────────────────────────────────────────────
export interface Menu {
  id: string
  restaurant_id: string
  name: string
  is_active: boolean
  created_at: string
  updated_at: string
  categories?: Category[]
  restaurants?: Pick<Restaurant, 'name' | 'logo_url' | 'address' | 'phone'>
}

// ── Category ─────────────────────────────────────────────────
export interface Category {
  id: string
  menu_id: string
  name: string
  sort_order: number
  created_at: string
  items?: Item[]
}

// ── Item ─────────────────────────────────────────────────────
export interface Item {
  id: string
  category_id: string
  name: string
  description?: string
  price: number
  image_url?: string
  is_available: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

// ── QR Code ──────────────────────────────────────────────────
export interface QRCode {
  id: string
  menu_id: string
  public_url: string
  image_path: string
  created_at: string
}

// ── Subscription ─────────────────────────────────────────────
export interface Subscription {
  plan: 'free' | 'basic' | 'pro'
  status: 'pending' | 'active' | 'inactive' | 'expired' | 'cancelled'
  started_at?: string
  expires_at?: string
  active: boolean
}

export const PLANS = [
  {
    id: 'basic' as const,
    name: 'Basic',
    price: 199,
    currency: 'ETB',
    features: ['1 restaurant', 'Up to 3 menus', 'Unlimited items', 'QR code generation', 'Email support'],
  },
  {
    id: 'pro' as const,
    name: 'Pro',
    price: 499,
    currency: 'ETB',
    features: ['1 restaurant', 'Unlimited menus', 'Unlimited items', 'QR code generation', 'Custom branding', 'Priority support'],
    popular: true,
  },
]
