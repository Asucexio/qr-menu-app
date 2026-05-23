'use client'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CheckCircle, XCircle, Loader2, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/Button'

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

    // use fetch directly — no axios interceptors, no auth header needed
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
    const url = `${apiUrl}/api/subscriptions/verify/${txRef}`

    console.log('[Payment] calling:', url)

    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })

      const data = await res.json()
      console.log('[Payment] response:', res.status, data)

      if (!res.ok) {
        setStatus('failed')
        setMessage(data?.error || `Server error ${res.status}`)
        return
      }

      if (data.verified && data.status === 'active') {
        setStatus('success')
        setExpiresAt(data.expires_at || null)
        setTimeout(() => router.push('/dashboard/menus'), 2500)
      } else if (data.status === 'pending') {
        setStatus('pending')
        setMessage('Payment is still processing. Click "Check again" in a few seconds.')
      } else {
        setStatus('failed')
        setMessage(`Payment status: "${data.status}". If you completed payment, run the fix script on your server.`)
      }
    } catch (err: any) {
      console.error('[Payment] fetch error:', err)
      setStatus('failed')
      setMessage(
        `Cannot reach the server at ${apiUrl}. ` +
        `Make sure your backend is running and NEXT_PUBLIC_API_URL is correct in .env.local`
      )
    }
  }

  useEffect(() => { verify() }, [])

  const handleRetry = async () => {
    setLoading(true)
    setStatus('verifying')
    setMessage('')
    await verify()
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 w-full max-w-md text-center">

        {status === 'verifying' && (
          <>
            <Loader2 size={48} className="mx-auto text-green-500 animate-spin mb-4" />
            <h1 className="text-xl font-bold text-gray-900 mb-2">Verifying payment...</h1>
            <p className="text-gray-500 text-sm">Please wait while we confirm your subscription.</p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
            <h1 className="text-xl font-bold text-gray-900 mb-2">Subscription activated!</h1>
            <p className="text-gray-500 text-sm mb-2">You can now create menus and generate QR codes.</p>
            {expiresAt && (
              <p className="text-xs text-gray-400 mb-4">
                Expires {new Date(expiresAt).toLocaleDateString()}
              </p>
            )}
            <p className="text-xs text-gray-400">Redirecting to your menus...</p>
          </>
        )}

        {status === 'pending' && (
          <>
            <Loader2 size={48} className="mx-auto text-yellow-400 mb-4" />
            <h1 className="text-xl font-bold text-gray-900 mb-2">Payment processing</h1>
            <p className="text-gray-500 text-sm mb-6">{message}</p>
            <Button onClick={handleRetry} loading={loading} className="w-full gap-2">
              <RefreshCw size={15} /> Check again
            </Button>
          </>
        )}

        {status === 'failed' && (
          <>
            <XCircle size={48} className="mx-auto text-red-400 mb-4" />
            <h1 className="text-xl font-bold text-gray-900 mb-2">Could not verify</h1>
            <p className="text-gray-500 text-sm mb-6">{message}</p>
            <div className="space-y-3">
              <Button onClick={handleRetry} loading={loading} className="w-full gap-2">
                <RefreshCw size={15} /> Retry
              </Button>
              <button
                onClick={() => router.push('/dashboard/billing')}
                className="w-full text-sm text-gray-400 hover:text-gray-600 underline"
              >
                Go to billing page
              </button>
            </div>
            {txRef && (
              <p className="text-xs text-gray-300 mt-6 font-mono break-all">ref: {txRef}</p>
            )}
          </>
        )}

      </div>
    </div>
  )
}
