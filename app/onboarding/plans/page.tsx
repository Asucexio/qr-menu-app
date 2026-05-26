'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle, Zap, ArrowRight, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'
import { subscriptionApi } from '@/lib/api'
import { useAuthStore } from '@/store/authStore'
import { Button } from '@/components/ui/Button'
import { PLANS } from '@/lib/types'
import { formatPrice } from '@/lib/utils'

const STEPS = [
  { n: 1, label: 'Choose plan' },
  { n: 2, label: 'Setup restaurant' },
  { n: 3, label: 'Build menu' },
]

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
    <div
      className="min-h-screen bg-[#F7F6F2] flex flex-col items-center justify-center px-4 py-16"
      style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
    >
      {/* Step indicator */}
      <div className="flex items-center gap-1 mb-12 bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-2.5">
        {STEPS.map((step, i) => (
          <div key={step.n} className="flex items-center gap-1">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-[12px] font-medium transition-all ${
              step.n === 1
                ? 'bg-emerald-600 text-white'
                : 'text-gray-400'
            }`}>
              <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                step.n === 1 ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {step.n}
              </div>
              {step.label}
            </div>
            {i < STEPS.length - 1 && (
              <div className="w-4 h-px bg-gray-200 mx-1" />
            )}
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="text-center mb-10 max-w-sm">
        <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">Choose your plan</h1>
        <p className="text-gray-500 mt-2 text-[14.5px] leading-relaxed">
          Subscribe to start creating digital menus and QR codes
        </p>
      </div>

      {/* Plan cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
        {PLANS.map(plan => (
          <div
            key={plan.id}
            className={`relative rounded-2xl border p-7 transition-all duration-200 ${
              plan.popular
                ? 'bg-gray-900 border-gray-800 text-white shadow-xl shadow-gray-900/20'
                : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-md hover:shadow-gray-100'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1 bg-emerald-500 text-white text-[11px] font-semibold px-3 py-1 rounded-full shadow-sm">
                  <Sparkles size={10} />
                  Most popular
                </span>
              </div>
            )}

            <div className="flex items-center gap-2.5 mb-4">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                plan.popular ? 'bg-emerald-500' : 'bg-emerald-50'
              }`}>
                <Zap size={15} className={plan.popular ? 'text-white' : 'text-emerald-600'} />
              </div>
              <h3 className={`font-semibold text-[16px] ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                {plan.name}
              </h3>
            </div>

            <div className="mb-6">
              <span className={`text-4xl font-semibold tracking-tight ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                {formatPrice(plan.price)}
              </span>
              <span className={`text-[13px] ml-1 ${plan.popular ? 'text-gray-400' : 'text-gray-400'}`}>/month</span>
            </div>

            <ul className="space-y-2.5 mb-7">
              {plan.features.map(f => (
                <li key={f} className="flex items-start gap-2.5 text-[13.5px]">
                  <CheckCircle
                    size={14}
                    className={`flex-shrink-0 mt-0.5 ${plan.popular ? 'text-emerald-400' : 'text-emerald-500'}`}
                  />
                  <span className={plan.popular ? 'text-gray-300' : 'text-gray-600'}>{f}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSubscribe(plan.id)}
              disabled={!!paying}
              className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-[13.5px] font-semibold transition-all duration-150 active:scale-[0.98] disabled:opacity-60 ${
                plan.popular
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-white'
                  : 'bg-gray-900 hover:bg-gray-800 text-white'
              }`}
            >
              {paying === plan.id ? (
                <span className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </span>
              ) : (
                <>Get started <ArrowRight size={14} /></>
              )}
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => router.push('/onboarding/restaurant')}
        className="mt-8 text-[13px] text-gray-400 hover:text-gray-600 transition-colors underline underline-offset-2"
      >
        Skip for now — set up restaurant first
      </button>
    </div>
  )
}