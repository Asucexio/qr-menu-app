'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export default function SignIn() {
  const { signIn, loading } = useAuthStore()
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data: any) => {
    try {
      await signIn(data)
      toast.success('Welcome back!')
      router.push('/dashboard')
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Invalid credentials')
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0f0a] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Image with Blur */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80" 
          alt="Restaurant Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-md" />
      </div>

      {/* Centered Form Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-10 border border-white/10">
          
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img 
              src="https://ik.imagekit.io/sl226drpx/grok-image-56a72e42-b19a-46fa-b7fc-1322508bd538-removebg-preview.png" 
              alt="Umenu Logo" 
              className="h-40 w-auto"
            />
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Welcome back</h1>
            <p className="mt-2 text-slate-500">Sign in to continue to your dashboard</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email address</label>
              <input 
                type="email" 
                {...register('email', { required: true })}
                className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="you@restaurant.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <input 
                type="password" 
                {...register('password', { required: true })}
                className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600">
                <input type="checkbox" className="rounded border-slate-300" />
                Remember me
              </label>
              <Link href="/forgot-password" className="text-emerald-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button 
              type="submit" 
              loading={loading} 
              className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-base mt-2"
            >
              Sign In
            </Button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-8">
            Don't have an account?{' '}
            <Link href="/signup" className="font-semibold text-emerald-600 hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}