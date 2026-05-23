'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle, Zap, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'
import { subscriptionApi } from '@/lib/api'
import { useAuthStore } from '@/store/authStore'
import { Button } from '@/components/ui/Button'
import { PLANS } from '@/lib/types'
import { formatPrice } from '@/lib/utils'

export default function OnboardingPlansPage() {
  const { user } = useAuthStore()
  const router = useRouter()
  const [paying, setPaying] = useState<string | null>(null)

  const handleSubscribe = async (plan: 'basic' | 'pro') => {
    if (!user) return
    setPaying(plan)
    try {
      const nameParts = (user.full_name || 'Owner').split(' ')
      const result = await subscriptionApi.initialize({
        plan,
        email: user.email,
        first_name: nameParts[0],
        last_name: nameParts.slice(1).join(' ') || 'Owner',
      })
      window.location.href = result.checkout_url
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Payment initialization failed')
      setPaying(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-16">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-10">
        <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
          <div className="h-6 w-6 rounded-full bg-green-600 text-white flex items-center justify-center text-xs">1</div>
          Choose plan
        </div>
        <div className="h-px w-8 bg-gray-200" />
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <div className="h-6 w-6 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center text-xs">2</div>
          Setup restaurant
        </div>
        <div className="h-px w-8 bg-gray-200" />
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <div className="h-6 w-6 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center text-xs">3</div>
          Build menu
        </div>
      </div>

      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Choose your plan</h1>
        <p className="text-gray-500 mt-2">Subscribe to start creating menus and QR codes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-2xl">
        {PLANS.map(plan => (
          <div
            key={plan.id}
            className={`rounded-2xl border p-6 bg-white relative ${plan.popular ? 'border-green-500 shadow-md shadow-green-100' : 'border-gray-100'}`}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Most popular
              </span>
            )}
            <div className="flex items-center gap-2 mb-3">
              <Zap size={18} className={plan.popular ? 'text-green-600' : 'text-gray-400'} />
              <h3 className="font-bold text-gray-900 text-lg">{plan.name}</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-5">
              {formatPrice(plan.price)}
              <span className="text-sm font-normal text-gray-400"> /month</span>
            </p>
            <ul className="space-y-2.5 mb-6">
              {plan.features.map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle size={15} className="text-green-500 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Button
              className="w-full gap-2"
              variant={plan.popular ? 'primary' : 'secondary'}
              onClick={() => handleSubscribe(plan.id)}
              loading={paying === plan.id}
            >
              Subscribe <ArrowRight size={15} />
            </Button>
          </div>
        ))}
      </div>

      <button
        onClick={() => router.push('/onboarding/restaurant')}
        className="mt-8 text-sm text-gray-400 hover:text-gray-600 underline"
      >
        Skip for now — set up restaurant first
      </button>
    </div>
  )
}
