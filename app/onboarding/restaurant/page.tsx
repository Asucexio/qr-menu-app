'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { UtensilsCrossed, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'
import { useRestaurantStore } from '@/store/restaurantStore'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import type { Restaurant } from '@/lib/types'

export default function OnboardingRestaurantPage() {
  const { createRestaurant } = useRestaurantStore()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<Partial<Restaurant>>()

  const onSubmit = async (data: Partial<Restaurant>) => {
    setLoading(true)
    try {
      await createRestaurant(data)
      toast.success('Restaurant created!')
      router.push('/dashboard')
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to create restaurant')
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-16">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-10">
        <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
          <div className="h-6 w-6 rounded-full bg-green-600 text-white flex items-center justify-center text-xs">✓</div>
          Choose plan
        </div>
        <div className="h-px w-8 bg-green-300" />
        <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
          <div className="h-6 w-6 rounded-full bg-green-600 text-white flex items-center justify-center text-xs">2</div>
          Setup restaurant
        </div>
        <div className="h-px w-8 bg-gray-200" />
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <div className="h-6 w-6 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center text-xs">3</div>
          Build menu
        </div>
      </div>

      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
        <div className="text-center mb-8">
          <div className="h-12 w-12 rounded-2xl bg-green-50 flex items-center justify-center mx-auto mb-4">
            <UtensilsCrossed size={24} className="text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Set up your restaurant</h1>
          <p className="text-gray-500 mt-2 text-sm">Tell us about your restaurant</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            id="name"
            label="Restaurant name *"
            placeholder="e.g. Habesha Kitchen"
            error={errors.name?.message}
            {...register('name', { required: 'Restaurant name is required' })}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              placeholder="Briefly describe your restaurant..."
              rows={3}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 resize-none"
              {...register('description')}
            />
          </div>
          <Input
            id="address"
            label="Address"
            placeholder="e.g. Bole, Addis Ababa"
            {...register('address')}
          />
          <Input
            id="phone"
            label="Phone number"
            placeholder="+251911234567"
            {...register('phone')}
          />
          <Button type="submit" size="lg" loading={loading} className="w-full gap-2 mt-2">
            Continue to dashboard <ArrowRight size={16} />
          </Button>
        </form>
      </div>
    </div>
  )
}
