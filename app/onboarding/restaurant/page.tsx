'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { ArrowRight, Store, UploadCloud } from 'lucide-react'
import toast from 'react-hot-toast'
import { useRestaurantStore } from '@/store/restaurantStore'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import type { Restaurant } from '@/lib/types'

const readFileAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })

export default function OnboardingRestaurantPage() {
  const { createRestaurant } = useRestaurantStore()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [logoPreview, setLogoPreview] = useState<string>('')
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<Partial<Restaurant>>()

  const logoUrl = watch('logo_url') || ''

  const onLogoChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file')
      return
    }

    const maxFileSize = 2 * 1024 * 1024
    if (file.size > maxFileSize) {
      toast.error('Logo must be smaller than 2MB')
      return
    }

    try {
      const dataUrl = await readFileAsDataUrl(file)
      setValue('logo_url', dataUrl, { shouldDirty: true })
      setLogoPreview(dataUrl)
    } catch {
      toast.error('Could not read the selected file')
    }
  }

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
    <div className="min-h-screen bg-slate-950 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 px-4 py-4 sm:px-6">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">Onboarding</div>
          <div className="grid gap-3 text-sm sm:grid-cols-3">
            <div className="rounded-xl bg-emerald-500/20 px-3 py-2 text-emerald-200">✓ Choose plan</div>
            <div className="rounded-xl bg-emerald-500 px-3 py-2 font-medium text-white">2. Setup restaurant</div>
            <div className="rounded-xl bg-slate-800 px-3 py-2 text-slate-400">3. Build menu</div>
          </div>
        </div>

        <div className="grid overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl shadow-slate-950/50 lg:grid-cols-5">
          <section className="relative overflow-hidden bg-gradient-to-br from-emerald-500 via-cyan-500 to-blue-600 p-8 text-white lg:col-span-2">
            <div className="absolute -left-20 top-16 h-56 w-56 rounded-full bg-white/20 blur-3xl" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]">
                <Store size={14} /> Brand setup
              </div>
              <h1 className="mt-4 text-3xl font-bold leading-tight">Make your restaurant look premium from day one.</h1>
              <p className="mt-3 text-sm text-white/90">Upload your logo and key business details. Your branding will automatically appear on digital menus and QR experiences.</p>
              <div className="mt-8 rounded-2xl border border-white/30 bg-white/15 p-4 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-white/80">What happens next</p>
                <ul className="mt-3 space-y-2 text-sm text-white/90">
                  <li>• Build your first menu categories and items</li>
                  <li>• Generate QR codes for each active menu</li>
                  <li>• Share with customers instantly</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 sm:p-8 lg:col-span-3">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">Restaurant profile</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-900">Set up your restaurant</h2>
                <p className="mt-1 text-sm text-slate-500">This is required to personalize your menu and brand identity.</p>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Restaurant logo *</label>
                <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-sm text-slate-600 transition hover:border-emerald-400 hover:bg-emerald-50">
                  <UploadCloud size={16} /> Upload logo image
                  <input type="file" accept="image/*" className="hidden" onChange={onLogoChange} />
                </label>
                {(logoPreview || logoUrl) && (
                  <div className="mt-3 flex items-center gap-3 rounded-xl border border-slate-200 p-3">
                    <img src={logoPreview || logoUrl} alt="Restaurant logo preview" className="h-12 w-12 rounded-lg object-cover" />
                    <div className="text-xs text-slate-500">
                      <p className="font-medium text-slate-700">Logo uploaded</p>
                      <p>Displayed on your public menu and branding surfaces.</p>
                    </div>
                  </div>
                )}
                {!logoUrl && <p className="mt-1 text-xs text-rose-500">Logo is required.</p>}
              </div>

              <input type="hidden" {...register('logo_url', { required: true })} />

              <Input
                id="name"
                label="Restaurant name *"
                placeholder="e.g. Habesha Kitchen"
                error={errors.name?.message}
                {...register('name', { required: 'Restaurant name is required' })}
              />
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Description</label>
                <textarea
                  placeholder="Briefly describe your restaurant..."
                  rows={3}
                  className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                  {...register('description')}
                />
              </div>
              <Input id="address" label="Address" placeholder="e.g. Bole, Addis Ababa" {...register('address')} />
              <Input id="phone" label="Phone number" placeholder="+251911234567" {...register('phone')} />

              <Button type="submit" size="lg" loading={loading} className="mt-2 w-full gap-2">
                Continue to dashboard <ArrowRight size={16} />
              </Button>
            </form>
          </section>
        </div>
      </div>
    </div>
  )
}