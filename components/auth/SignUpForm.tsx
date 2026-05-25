'use client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useAuthStore } from '@/store/authStore'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import type { SignUpPayload } from '@/lib/types'

type FormData = SignUpPayload & { confirm_password: string }

export function SignUpForm() {
  const { signUp, loading } = useAuthStore()
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    if (data.password !== data.confirm_password) {
      toast.error('Passwords do not match')
      return
    }
    try {
      // signUp already calls signIn internally — token is set after this
      await signUp({
        email: data.email,
        password: data.password,
        full_name: data.full_name,
      })
      toast.success('Account created!')
      router.push('/onboarding/plans')
    } catch (err: any) {
      toast.error(err?.response?.data?.error || err?.message || 'Registration failed')
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          id="full_name"
          label="Full name"
          placeholder="Abebe Kebede"
          error={errors.full_name?.message}
          {...register('full_name', { required: 'Full name is required' })}
        />
        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="you@restaurant.com"
          error={errors.email?.message}
          {...register('email', { required: 'Email is required' })}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register('password', {
            required: 'Password required',
            minLength: { value: 6, message: 'Min 6 characters' },
          })}
        />
        <Input
          id="confirm_password"
          label="Confirm password"
          type="password"
          placeholder="••••••••"
          error={errors.confirm_password?.message}
          {...register('confirm_password', { required: 'Please confirm password' })}
        />
        <div className="rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
          Pro tip: Use your business email so your team can collaborate easily later.
        </div>
        <Button type="submit" size="lg" loading={loading} className="w-full mt-1">
          Create Account
        </Button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Already have an account?{' '}
        <Link href="/signin" className="text-green-600 font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}
