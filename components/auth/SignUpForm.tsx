'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { Button } from '@/components/ui/Button'

export default function SignUp() {
  const { signUp, loading } = useAuthStore()
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data: any) => {
    if (data.password !== data.confirm_password) {
      toast.error('Passwords do not match')
      return
    }
    try {
      await signUp({
        email: data.email,
        password: data.password,
        full_name: data.full_name,
      })
      toast.success('Account created successfully!')
      router.push('/dashboard')
    } catch (err: any) {
      toast.error(err?.response?.data?.error || 'Registration failed')
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
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
      </div>

      {/* Centered Form Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-white/10">
          
          {/* Logo */}
           {/* Logo - Bigger */}
          <div className="flex justify-center mb-6">
            <img 
              src="https://ik.imagekit.io/sl226drpx/grok-image-56a72e42-b19a-46fa-b7fc-1322508bd538-removebg-preview.png" 
              alt="Umenu Logo" 
              className="h-30 w-auto"
            />
          </div>

          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-slate-900">Create your account</h1>
            <p className="mt-1.5 text-sm text-slate-500">Start your 14-day free trial today</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
              <input 
                type="text" 
                {...register('full_name', { required: true })}
                className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Abebe Kebede"
              />
            </div>

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
                {...register('password', { 
                  required: true, 
                  minLength: { value: 6, message: 'Minimum 6 characters' } 
                })}
                className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm Password</label>
              <input 
                type="password" 
                {...register('confirm_password', { required: true })}
                className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="••••••••"
              />
            </div>

            <Button 
              type="submit" 
              loading={loading} 
              className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-base mt-3"
            >
              Create Account
            </Button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{' '}
            <Link href="/signin" className="font-semibold text-emerald-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}