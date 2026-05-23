const ACCESS_KEY  = 'qrmenu_access_token'
const REFRESH_KEY = 'qrmenu_refresh_token'

export const tokenStorage = {
  getAccess: (): string | null => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(ACCESS_KEY)
  },
  getRefresh: (): string | null => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(REFRESH_KEY)
  },
  set: (access: string, refresh: string) => {
    localStorage.setItem(ACCESS_KEY, access)
    localStorage.setItem(REFRESH_KEY, refresh)
    // also set cookie for middleware
    document.cookie = `access_token=${access}; path=/; max-age=3600; SameSite=Lax`
  },
  clear: () => {
    localStorage.removeItem(ACCESS_KEY)
    localStorage.removeItem(REFRESH_KEY)
    document.cookie = 'access_token=; path=/; max-age=0'
  },
  hasToken: (): boolean => {
    if (typeof window === 'undefined') return false
    const t = localStorage.getItem(ACCESS_KEY)
    return !!t && t !== 'null' && t !== 'undefined'
  },
}
