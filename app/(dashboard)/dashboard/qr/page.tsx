'use client'
import { useEffect, useState } from 'react'
import { QrCode, Download, RefreshCw, ExternalLink } from 'lucide-react'
import toast from 'react-hot-toast'
import { QRCodeSVG } from 'qrcode.react'
import { useRestaurantStore } from '@/store/restaurantStore'
import { qrApi } from '@/lib/api'
import { Button } from '@/components/ui/Button'
import type { QRCode as QRCodeType } from '@/lib/types'

export default function QRCodesPage() {
  const { restaurant, menus, loadRestaurant } = useRestaurantStore()
  const [qrMap, setQrMap] = useState<Record<string, QRCodeType>>({})
  const [generating, setGenerating] = useState<string | null>(null)

  useEffect(() => { loadRestaurant() }, [])

  const handleGenerate = async (menuId: string) => {
    setGenerating(menuId)
    try {
      const qr = await qrApi.generate(menuId)
      setQrMap(prev => ({ ...prev, [menuId]: qr }))
      toast.success('QR code generated!')
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to generate QR code')
    } finally { setGenerating(null) }
  }

  const handleDownload = (menuId: string) => {
    const url = qrApi.downloadUrl(menuId)
    window.open(url, '_blank')
  }

  const activeMenus = menus.filter(m => m.is_active)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">QR Codes</h1>
        <p className="text-gray-500 mt-1 text-sm">Generate and download QR codes for your menus</p>
      </div>

      {activeMenus.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-white p-12 text-center">
          <QrCode size={40} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 mb-2">No active menus</p>
          <p className="text-sm text-gray-400">Activate a menu to generate a QR code for it.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeMenus.map(menu => {
            const qr = qrMap[menu.id]
            const publicUrl = `${process.env.NEXT_PUBLIC_API_URL?.replace(':5000', ':3000')}/menu/${menu.id}`

            return (
              <div key={menu.id} className="rounded-2xl border border-gray-100 bg-white p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-gray-900">{menu.name}</h2>
                  <a
                    href={publicUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-green-600 flex items-center gap-1 hover:underline"
                  >
                    Preview <ExternalLink size={12} />
                  </a>
                </div>

                {/* QR preview */}
                <div className="flex items-center justify-center bg-gray-50 rounded-xl p-6 mb-4 min-h-[200px]">
                  {qr ? (
                    <QRCodeSVG value={qr.public_url} size={160} level="H" />
                  ) : (
                    <div className="text-center text-gray-400">
                      <QrCode size={48} className="mx-auto mb-2 opacity-30" />
                      <p className="text-sm">Not generated yet</p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="flex-1 gap-1"
                    onClick={() => handleGenerate(menu.id)}
                    loading={generating === menu.id}
                  >
                    <RefreshCw size={14} />
                    {qr ? 'Regenerate' : 'Generate'}
                  </Button>
                  {qr && (
                    <Button
                      size="sm"
                      className="flex-1 gap-1"
                      onClick={() => handleDownload(menu.id)}
                    >
                      <Download size={14} /> Download PNG
                    </Button>
                  )}
                </div>

                {qr && (
                  <p className="text-xs text-gray-400 mt-3 text-center break-all">{qr.public_url}</p>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
