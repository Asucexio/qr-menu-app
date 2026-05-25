'use client'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CheckCircle, XCircle, Loader2, RefreshCw, ArrowRight } from 'lucide-react'
import { subscriptionApi } from '@/lib/api'

type Status = 'verifying' | 'success' | 'failed' | 'pending'

export default function PaymentReturnPage() {
  const router = useRouter()
  const params = useSearchParams()
  const [status, setStatus] = useState<Status>('verifying')
  const [message, setMessage] = useState('')
  const [expiresAt, setExpiresAt] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const txRef =
    params.get('tx_ref') ||
    params.get('trx_ref') ||
    params.get('ref') ||
    params.get('transaction_id')

  const verify = async () => {
    if (!txRef) {
      setStatus('failed')
      setMessage('No transaction reference found in the URL.')
      return
    }
    try {
      const result = await subscriptionApi.verify(txRef)
      if (result.verified && result.status === 'active') {
        setStatus('success')
        setExpiresAt(result.expires_at || null)
        setTimeout(() => router.push('/dashboard/menus'), 2500)
      } else if (result.status === 'pending') {
        setStatus('pending')
        setMessage('Your payment is still being processed. Check again in a moment.')
      } else {
        setStatus('failed')
        setMessage(`Payment returned status: "${result.status}". If you completed payment, click Retry.`)
      }
    } catch (err: any) {
      const msg = err?.response?.data?.error || err?.message || 'Unknown error'
      setStatus('failed')
      setMessage(msg)
    }
  }

  useEffect(() => { verify() }, [])

  const handleRetry = async () => {
    setLoading(true)
    setStatus('verifying')
    await verify()
    setLoading(false)
  }

  const stateConfig = {
    verifying: {
      icon: (
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
          <Loader2 size={28} className="text-emerald-500 animate-spin" />
        </div>
      ),
      title: 'Verifying payment',
      subtitle: 'Please wait while we confirm your subscription.',
      color: 'emerald',
    },
    success: {
      icon: (
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
          <CheckCircle size={28} className="text-emerald-500" />
        </div>
      ),
      title: 'Subscription activated!',
      subtitle: 'You can now create menus and generate QR codes.',
      color: 'emerald',
    },
    pending: {
      icon: (
        <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center">
          <Loader2 size={28} className="text-amber-500 animate-spin" />
        </div>
      ),
      title: 'Payment processing',
      subtitle: null,
      color: 'amber',
    },
    failed: {
      icon: (
        <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center">
          <XCircle size={28} className="text-red-400" />
        </div>
      ),
      title: 'Verification failed',
      subtitle: null,
      color: 'red',
    },
  }

  const state = stateConfig[status]

  return (
    <div
      className="min-h-screen bg-[#F7F6F2] flex items-center justify-center px-4"
      style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
    >
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 w-full max-w-md text-center">

        {/* Branding mark */}
        <div className="flex items-center justify-center gap-1.5 mb-8">
          <div className="w-6 h-6 rounded-lg bg-emerald-500 flex items-center justify-center">
            <span className="text-white text-[11px] font-bold">Q</span>
          </div>
          <span className="text-[13px] font-semibold text-gray-500">QR Menu</span>
        </div>

        <div className="flex justify-center mb-5">{state.icon}</div>

        <h1 className="text-xl font-semibold text-gray-900 tracking-tight mb-2">{state.title}</h1>

        {status === 'verifying' && (
          <p className="text-[13.5px] text-gray-500">{state.subtitle}</p>
        )}

        {status === 'success' && (
          <>
            <p className="text-[13.5px] text-gray-500 mb-1">{state.subtitle}</p>
            {expiresAt && (
              <p className="text-[12px] text-gray-400 mb-6">
                Active until {new Date(expiresAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            )}
            <div className="mt-4 flex items-center justify-center gap-2 text-[12.5px] text-gray-400">
              <Loader2 size={12} className="animate-spin" />
              Redirecting to your dashboard...
            </div>
          </>
        )}

        {status === 'pending' && (
          <>
            <p className="text-[13.5px] text-gray-500 mb-7">{message}</p>
            <button
              onClick={handleRetry}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white py-2.5 rounded-xl text-[14px] font-semibold transition-all active:scale-[0.99] disabled:opacity-60"
            >
              {loading ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Checking...</>
              ) : (
                <><RefreshCw size={14} /> Check again</>
              )}
            </button>
          </>
        )}

        {status === 'failed' && (
          <>
            <p className="text-[13.5px] text-gray-500 mb-7 leading-relaxed">{message}</p>
            <div className="space-y-3">
              <button
                onClick={handleRetry}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white py-2.5 rounded-xl text-[14px] font-semibold transition-all active:scale-[0.99] disabled:opacity-60"
              >
                {loading ? (
                  <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Retrying...</>
                ) : (
                  <><RefreshCw size={14} /> Retry verification</>
                )}
              </button>
              <button
                onClick={() => router.push('/dashboard/billing')}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-[14px] font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-all"
              >
                Go to billing <ArrowRight size={13} />
              </button>
            </div>
            {txRef && (
              <p className="text-[11px] text-gray-300 mt-6 font-mono break-all bg-gray-50 rounded-lg px-3 py-2">
                ref: {txRef}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}