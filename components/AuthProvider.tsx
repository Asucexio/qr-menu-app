'use client'
import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { loadProfile, initialized } = useAuthStore()

  useEffect(() => {
    loadProfile()
  }, [])

  // only block render if not yet initialized
  if (!initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-green-600 border-t-transparent" />
      </div>
    )
  }

  return <>{children}</>
}
