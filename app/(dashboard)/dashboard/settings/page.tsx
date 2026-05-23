'use client'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useAuthStore } from '@/store/authStore'
import { useRestaurantStore } from '@/store/restaurantStore'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import type { Restaurant } from '@/lib/types'

export default function SettingsPage() {
  const { user, updateProfile } = useAuthStore()
  const { restaurant, loadRestaurant, updateRestaurant } = useRestaurantStore()
  const [savingProfile, setSavingProfile] = useState(false)
  const [savingRestaurant, setSavingRestaurant] = useState(false)

  const profileForm = useForm({ defaultValues: { full_name: user?.full_name || '' } })
  const restaurantForm = useForm<Partial<Restaurant>>({
    defaultValues: {
      name: restaurant?.name || '',
      description: restaurant?.description || '',
      address: restaurant?.address || '',
      phone: restaurant?.phone || '',
    },
  })

  useEffect(() => {
    loadRestaurant()
  }, [])

  useEffect(() => {
    if (restaurant) {
      restaurantForm.reset({
        name: restaurant.name,
        description: restaurant.description,
        address: restaurant.address,
        phone: restaurant.phone,
      })
    }
  }, [restaurant])

  const handleSaveProfile = async (data: { full_name: string }) => {
    setSavingProfile(true)
    try {
      await updateProfile(data)
      toast.success('Profile updated')
    } catch { toast.error('Failed to update profile') }
    finally { setSavingProfile(false) }
  }

  const handleSaveRestaurant = async (data: Partial<Restaurant>) => {
    setSavingRestaurant(true)
    try {
      await updateRestaurant(data)
      toast.success('Restaurant updated')
    } catch { toast.error('Failed to update restaurant') }
    finally { setSavingRestaurant(false) }
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1 text-sm">Manage your profile and restaurant details</p>
      </div>

      {/* Profile */}
      <section className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Profile</h2>
        <form onSubmit={profileForm.handleSubmit(handleSaveProfile)} className="space-y-4">
          <Input label="Email" value={user?.email || ''} disabled className="bg-gray-50 text-gray-400" />
          <Input
            label="Full name"
            error={profileForm.formState.errors.full_name?.message}
            {...profileForm.register('full_name', { required: 'Name is required' })}
          />
          <Button type="submit" loading={savingProfile}>Save profile</Button>
        </form>
      </section>

      {/* Restaurant */}
      {restaurant && (
        <section className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Restaurant details</h2>
          <form onSubmit={restaurantForm.handleSubmit(handleSaveRestaurant)} className="space-y-4">
            <Input label="Restaurant name" {...restaurantForm.register('name')} />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                rows={3}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 resize-none"
                {...restaurantForm.register('description')}
              />
            </div>
            <Input label="Address" placeholder="e.g. Bole, Addis Ababa" {...restaurantForm.register('address')} />
            <Input label="Phone" placeholder="+251911234567" {...restaurantForm.register('phone')} />
            <Button type="submit" loading={savingRestaurant}>Save restaurant</Button>
          </form>
        </section>
      )}
    </div>
  )
}
