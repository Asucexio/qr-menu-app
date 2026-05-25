'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { ArrowRight, Store, UploadCloud, MapPin, Phone, AlignLeft, Check } from 'lucide-react'
import toast from 'react-hot-toast'
import { useRestaurantStore } from '@/store/restaurantStore'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import type { Restaurant } from '@/lib/types'
import { optimizeImageToDataUrl } from '@/components/ui/imageDataUrl'

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
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Logo must be smaller than 5MB')
      return
    }
    try {
      const dataUrl = await optimizeImageToDataUrl(file, {
        maxWidth: 560, maxHeight: 560, quality: 0.72, maxBytes: 55 * 1024,
      })
      setValue('logo_url', dataUrl, { shouldDirty: true })
      setLogoPreview(dataUrl)
    } catch {
      toast.error('Could not process image. Please use a smaller image.')
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
    <div
      className="min-h-screen bg-[#F7F6F2] flex flex-col"
      style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
    >
      {/* Top progress bar */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-2">
          {[
            { n: 1, label: 'Choose plan', done: true },
            { n: 2, label: 'Setup restaurant', active: true },
            { n: 3, label: 'Build menu' },
          ].map((step, i, arr) => (
            <div key={step.n} className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0 ${
                  step.done
                    ? 'bg-emerald-500 text-white'
                    : step.active
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}>
                  {step.done ? <Check size={12} strokeWidth={3} /> : step.n}
                </div>
                <span className={`text-[12.5px] font-medium hidden sm:block ${
                  step.active ? 'text-gray-900' : step.done ? 'text-gray-400' : 'text-gray-300'
                }`}>
                  {step.label}
                </span>
              </div>
              {i < arr.length - 1 && (
                <div className={`w-8 h-px mx-1 ${step.done ? 'bg-emerald-200' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex items-start justify-center px-4 py-10">
        <div className="w-full max-w-3xl">
          <div className="grid lg:grid-cols-5 rounded-2xl overflow-hidden shadow-sm border border-gray-100">

            {/* Left panel */}
            <div className="lg:col-span-2 bg-gray-900 p-8 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/10 text-white text-[11px] font-semibold px-3 py-1.5 rounded-full mb-6 tracking-wide">
                  <Store size={12} />
                  Brand setup
                </div>
                <h2 className="text-2xl font-semibold text-white leading-snug tracking-tight mb-3">
                  Make your restaurant shine from day one.
                </h2>
                <p className="text-[13.5px] text-gray-400 leading-relaxed">
                  Your logo and details appear on every menu and QR experience you create.
                </p>
              </div>

              <div className="mt-10 space-y-3">
                {[
                  'Build menu categories and items',
                  'Generate QR codes for each menu',
                  'Share with customers instantly',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-[13px] text-gray-400">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                      <Check size={10} className="text-emerald-400" strokeWidth={2.5} />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Right form */}
            <div className="lg:col-span-3 bg-white p-8">
              <div className="mb-7">
                <p className="text-[11px] font-semibold text-emerald-600 uppercase tracking-[0.15em] mb-1">
                  Restaurant profile
                </p>
                <h3 className="text-xl font-semibold text-gray-900 tracking-tight">Set up your restaurant</h3>
                <p className="text-[13px] text-gray-500 mt-1">Fill in your details to personalize your menu.</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Logo upload */}
                <div>
                  <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                    Restaurant logo <span className="text-rose-400">*</span>
                  </label>

                  {logoPreview || logoUrl ? (
                    <div className="flex items-center gap-4 p-3.5 rounded-xl border border-emerald-200 bg-emerald-50">
                      <img
                        src={logoPreview || logoUrl}
                        alt="Logo preview"
                        className="h-12 w-12 rounded-lg object-cover ring-1 ring-black/5"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-medium text-gray-800">Logo uploaded</p>
                        <p className="text-[12px] text-gray-500 mt-0.5">Shown on your public menu pages</p>
                      </div>
                      <label className="cursor-pointer text-[12px] text-emerald-600 hover:text-emerald-700 font-medium">
                        Change
                        <input type="file" accept="image/*" className="hidden" onChange={onLogoChange} />
                      </label>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 px-4 py-7 text-center cursor-pointer hover:border-emerald-300 hover:bg-emerald-50 transition-all group">
                      <div className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center group-hover:border-emerald-200 transition-colors">
                        <UploadCloud size={17} className="text-gray-400 group-hover:text-emerald-500 transition-colors" />
                      </div>
                      <div>
                        <p className="text-[13px] font-medium text-gray-700">Click to upload logo</p>
                        <p className="text-[12px] text-gray-400 mt-0.5">PNG, JPG up to 5MB</p>
                      </div>
                      <input type="file" accept="image/*" className="hidden" onChange={onLogoChange} />
                    </label>
                  )}

                  {!logoUrl && errors.logo_url && (
                    <p className="mt-1.5 text-[12px] text-rose-500">Logo is required</p>
                  )}
                </div>

                <input type="hidden" {...register('logo_url', { required: true })} />

                {/* Name */}
                <div>
                  <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                    Restaurant name <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <Store size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input
                      placeholder="e.g. Habesha Kitchen"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 text-[14px] text-gray-900 placeholder-gray-400 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
                      {...register('name', { required: 'Restaurant name is required' })}
                    />
                  </div>
                  {errors.name && <p className="mt-1.5 text-[12px] text-rose-500">{errors.name.message}</p>}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-[13px] font-medium text-gray-700 mb-1.5">Description</label>
                  <div className="relative">
                    <AlignLeft size={15} className="absolute left-3 top-3 text-gray-400 pointer-events-none" />
                    <textarea
                      placeholder="Briefly describe your restaurant..."
                      rows={3}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 text-[14px] text-gray-900 placeholder-gray-400 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all resize-none"
                      {...register('description')}
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-[13px] font-medium text-gray-700 mb-1.5">Address</label>
                  <div className="relative">
                    <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input
                      placeholder="e.g. Bole, Addis Ababa"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 text-[14px] text-gray-900 placeholder-gray-400 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
                      {...register('address')}
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-[13px] font-medium text-gray-700 mb-1.5">Phone number</label>
                  <div className="relative">
                    <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input
                      placeholder="+251911234567"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 text-[14px] text-gray-900 placeholder-gray-400 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
                      {...register('phone')}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white py-2.5 rounded-xl text-[14px] font-semibold transition-all active:scale-[0.99] disabled:opacity-60 mt-2"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>Continue to dashboard <ArrowRight size={15} /></>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}