import { create } from 'zustand'
import { authApi } from '@/lib/api'
import { tokenStorage } from '@/lib/auth'
import type { User, SignUpPayload, SignInPayload } from '@/lib/types'

interface AuthState {
  user: User | null
  loading: boolean
  initialized: boolean
  signUp:        (payload: SignUpPayload) => Promise<void>
  signIn:        (payload: SignInPayload) => Promise<void>
  signOut:       () => void
  loadProfile:   () => Promise<void>
  updateProfile: (data: Partial<Pick<User, 'full_name' | 'avatar_url'>>) => Promise<void>
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user:        null,
  loading:     false,
  initialized: false,

  // ── Sign up: create account then auto sign in ────────────
  signUp: async (payload) => {
    set({ loading: true })
    try {
      await authApi.signUp(payload)
      // auto sign in after signup
      await get().signIn({ email: payload.email, password: payload.password })
    } finally {
      set({ loading: false })
    }
  },

  // ── Sign in: get tokens + user, save everything ──────────
  signIn: async (payload) => {
    set({ loading: true })
    try {
      const data = await authApi.signIn(payload)

      if (!data.access_token) throw new Error('No access token returned')

      tokenStorage.set(data.access_token, data.refresh_token)
      set({ user: data.user, initialized: true })
    } finally {
      set({ loading: false })
    }
  },

  // ── Sign out: clear everything ───────────────────────────
  signOut: () => {
    tokenStorage.clear()
    set({ user: null, initialized: true })
  },

  // ── Load profile on app start using stored token ─────────
  loadProfile: async () => {
    if (!tokenStorage.hasToken()) {
      set({ initialized: true })
      return
    }

    try {
      const user = await authApi.getProfile()
      set({ user, initialized: true })
    } catch (err: any) {
      const status = err?.response?.status
      if (status === 401) {
        // token expired — try refresh
        const refresh = tokenStorage.getRefresh()
        if (refresh) {
          try {
            const data = await authApi.refresh(refresh)
            tokenStorage.set(data.access_token, data.refresh_token)
            const user = await authApi.getProfile()
            set({ user, initialized: true })
            return
          } catch {
            // refresh also failed
          }
        }
        tokenStorage.clear()
      }
      set({ user: null, initialized: true })
    }
  },

  updateProfile: async (data) => {
    const updated = await authApi.updateProfile(data)
    set({ user: updated })
  },
}))
