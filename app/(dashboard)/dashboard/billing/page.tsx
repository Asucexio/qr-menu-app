'use client'
import { useEffect, useState } from 'react'
import { CheckCircle, CreditCard, Clock, Zap } from 'lucide-react'
import toast from 'react-hot-toast'
import { subscriptionApi } from '../../../../lib/api'
import { useAuthStore } from '../../../../store/authStore'
import { Button } from '../../../../components/ui/Button'
import { Badge } from '../../../../components/ui/Badge'
import { PLANS, type Subscription } from '../../../../lib/types'
import { formatPrice } from '../../../../lib/utils'

export default function BillingPage() {
  const { user } = useAuthStore()
  const [sub, setSub] = useState<Subscription | null>(null)
  const [loading, setLoading] = useState(true)
  const [paying, setPaying] = useState<string | null>(null)

  useEffect(() => {
    subscriptionApi.getStatus().then(setSub).finally(() => setLoading(false))
    // check if returning from Chapa
    const params = new URLSearchParams(window.location.search)
    const ref = params.get('ref')
    if (ref) {
      subscriptionApi.verify(ref).then(result => {
        if (result.verified) {
          toast.success('Subscription activated!')
          subscriptionApi.getStatus().then(setSub)
        }
      })
    }
  }, [])

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
      toast.error(err.response?.data?.error || 'Failed to initialize payment')
    } finally { setPaying(null) }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Billing & Subscription</h1>
        <p className="text-gray-500 mt-1 text-sm">Manage your subscription plan</p>
      </div>

      {/* Current status */}
      {!loading && sub && (
        <div className={`rounded-xl p-5 flex items-center gap-4 ${sub.active ? 'bg-green-50 border border-green-100' : 'bg-gray-50 border border-gray-100'}`}>
          {sub.active ? <CheckCircle size={24} className="text-green-600 flex-shrink-0" /> : <Clock size={24} className="text-gray-400 flex-shrink-0" />}
          <div>
            <p className="font-semibold text-gray-900">
              {sub.active ? `${sub.plan.charAt(0).toUpperCase() + sub.plan.slice(1)} plan — active` : 'No active subscription'}
            </p>
            {sub.active && sub.expires_at && (
              <p className="text-sm text-gray-500">Expires {new Date(sub.expires_at).toLocaleDateString()}</p>
            )}
            {!sub.active && <p className="text-sm text-gray-500">Subscribe to create menus and generate QR codes</p>}
          </div>
          {sub.active && (
            <Badge label="Active" variant="green" className="ml-auto" />
          )}
        </div>
      )}

      {/* Plans */}
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-4">Choose a plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PLANS.map(plan => (
            <div
              key={plan.id}
              className={`rounded-2xl border p-6 relative ${plan.popular ? 'border-green-500 bg-green-50' : 'border-gray-100 bg-white'}`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Most popular
                </span>
              )}
              <div className="flex items-center gap-2 mb-4">
                <Zap size={18} className={plan.popular ? 'text-green-600' : 'text-gray-400'} />
                <h3 className="font-bold text-gray-900 text-lg">{plan.name}</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">
                {formatPrice(plan.price)}
                <span className="text-sm font-normal text-gray-400"> /month</span>
              </p>
              <ul className="space-y-2 my-5">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle size={15} className="text-green-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                className="w-full"
                variant={plan.popular ? 'primary' : 'secondary'}
                onClick={() => handleSubscribe(plan.id)}
                loading={paying === plan.id}
                disabled={sub?.active && sub.plan === plan.id}
              >
                {sub?.active && sub.plan === plan.id ? 'Current plan' : `Subscribe — ${formatPrice(plan.price)}`}
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-gray-50 border border-gray-100 p-4 flex items-start gap-3">
        <CreditCard size={18} className="text-gray-400 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-gray-500">
          Payments are processed securely by <strong>Chapa</strong>. You will be redirected to complete payment in ETB.
          After payment, your subscription activates immediately.
        </p>
      </div>
    </div>
  )
}
