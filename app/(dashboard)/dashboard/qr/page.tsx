'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { QrCode, Download, RefreshCw, ExternalLink, Scan, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { QRCodeCanvas } from 'qrcode.react'
import { useRestaurantStore } from '@/store/restaurantStore'
import { qrApi } from '@/lib/api'
import type { QRCode as QRCodeType } from '@/lib/types'

// ─── Logo-in-QR component ───────────────────────────────────────────────────
// Renders a QRCodeCanvas onto a hidden canvas, draws the logo on top,
// then exposes a download function via imperative handle.
interface QRWithLogoProps {
  value: string
  size: number
  logoUrl?: string
  menuName: string
  canvasRef: { current: HTMLCanvasElement | null }
}

function QRWithLogo({ value, size, logoUrl, menuName, canvasRef }: QRWithLogoProps) {
  const qrCanvasRef = useRef<HTMLCanvasElement>(null)

  // Composite: copy QR → draw white circle → draw logo on final canvas
  const composite = useCallback(() => {
    const src = qrCanvasRef.current
    const dst = canvasRef.current
    if (!src || !dst) return

    const ctx = dst.getContext('2d')
    if (!ctx) return

    dst.width = size
    dst.height = size

    ctx.drawImage(src, 0, 0, size, size)

    const logoSize = Math.round(size * 0.22)
    const cx = size / 2
    const cy = size / 2
    const radius = logoSize / 2 + 6

    // White circle backdrop
    ctx.beginPath()
    ctx.arc(cx, cy, radius, 0, Math.PI * 2)
    ctx.fillStyle = '#ffffff'
    ctx.fill()

    if (logoUrl) {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        ctx.save()
        ctx.beginPath()
        ctx.arc(cx, cy, logoSize / 2, 0, Math.PI * 2)
        ctx.clip()
        ctx.drawImage(img, cx - logoSize / 2, cy - logoSize / 2, logoSize, logoSize)
        ctx.restore()

        // Thin ring
        ctx.beginPath()
        ctx.arc(cx, cy, logoSize / 2 + 2, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(0,0,0,0.08)'
        ctx.lineWidth = 1.5
        ctx.stroke()
      }
      img.src = logoUrl
    } else {
      // Fallback: emerald circle with "Q"
      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, logoSize / 2, 0, Math.PI * 2)
      ctx.fillStyle = '#10b981'
      ctx.fill()
      ctx.restore()
      ctx.fillStyle = '#ffffff'
      ctx.font = `bold ${Math.round(logoSize * 0.5)}px DM Sans, system-ui`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('Q', cx, cy)
    }
  }, [value, size, logoUrl, canvasRef])

  useEffect(() => {
    // Give qrcode.react a tick to paint its canvas
    const t = setTimeout(composite, 80)
    return () => clearTimeout(t)
  }, [composite])

  return (
    <>
      {/* Hidden source QR canvas */}
      <QRCodeCanvas
        ref={qrCanvasRef as any}
        value={value}
        size={size}
        level="H"
        style={{ display: 'none' }}
      />
      {/* Visible output canvas */}
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        style={{ borderRadius: 8 }}
      />
    </>
  )
}

// ─── Main page ───────────────────────────────────────────────────────────────
export default function QRCodesPage() {
  const { restaurant, menus, loadRestaurant } = useRestaurantStore()
  const [qrMap, setQrMap] = useState<Record<string, QRCodeType>>({})
  const [generating, setGenerating] = useState<string | null>(null)
  const [downloaded, setDownloaded] = useState<string | null>(null)
  // Keyed canvas refs per menu
  const canvasRefs = useRef<Record<string, { current: HTMLCanvasElement | null }>>({})

  useEffect(() => { loadRestaurant() }, [])

  const getCanvasRef = (menuId: string): { current: HTMLCanvasElement | null } => {
    if (!canvasRefs.current[menuId]) {
      canvasRefs.current[menuId] = { current: null }
    }
    return canvasRefs.current[menuId]
  }

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

  const handleDownload = (menuId: string, menuName: string) => {
    const canvas = canvasRefs.current[menuId]?.current
    if (!canvas) {
      toast.error('QR canvas not ready. Please wait a moment.')
      return
    }

    // Create a padded export canvas (white background + padding)
    const pad = 32
    const exportSize = canvas.width + pad * 2
    const exportCanvas = document.createElement('canvas')
    exportCanvas.width = exportSize
    exportCanvas.height = exportSize + 40 // extra for label

    const ctx = exportCanvas.getContext('2d')!
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height)

    // Draw QR
    ctx.drawImage(canvas, pad, pad, canvas.width, canvas.height)

    // Draw restaurant name label at bottom
    const label = restaurant?.name || menuName
    ctx.fillStyle = '#111827'
    ctx.font = `600 14px DM Sans, system-ui`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(label, exportSize / 2, exportSize - 4)

    const link = document.createElement('a')
    link.download = `${menuName.replace(/\s+/g, '-').toLowerCase()}-qr.png`
    link.href = exportCanvas.toDataURL('image/png')
    link.click()

    setDownloaded(menuId)
    setTimeout(() => setDownloaded(null), 2000)
    toast.success('QR code downloaded!')
  }

  const activeMenus = menus.filter(m => m.is_active)

  return (
    <div
      className="space-y-7"
      style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
    >
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2.5 mb-0.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center">
              <Scan size={16} className="text-emerald-600" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900 tracking-tight">QR Codes</h1>
          </div>
          <p className="text-[13px] text-gray-400 mt-1 ml-[42px]">
            Generate and download QR codes with your restaurant logo embedded
          </p>
        </div>
      </div>

      {/* Empty state */}
      {activeMenus.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-white p-14 text-center">
          <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mx-auto mb-4">
            <QrCode size={24} className="text-gray-300" />
          </div>
          <p className="text-[14px] font-medium text-gray-700 mb-1">No active menus</p>
          <p className="text-[13px] text-gray-400">Activate a menu first to generate a QR code for it.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {activeMenus.map(menu => {
            const qr = qrMap[menu.id]
            const publicUrl = `${process.env.NEXT_PUBLIC_API_URL?.replace(':5000', ':3000')}/menu/${menu.id}`
            const canvasRef = getCanvasRef(menu.id)

            return (
              <div
                key={menu.id}
                className="group rounded-2xl border border-gray-100 bg-white overflow-hidden hover:border-gray-200 hover:shadow-md hover:shadow-gray-100/80 transition-all duration-200"
              >
                {/* Card header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <h2 className="text-[14px] font-semibold text-gray-900 tracking-tight">{menu.name}</h2>
                  </div>
                  <a
                    href={publicUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[12px] font-medium text-gray-400 hover:text-emerald-600 transition-colors"
                  >
                    Preview <ExternalLink size={11} />
                  </a>
                </div>

                {/* QR display area */}
                <div className="flex flex-col items-center justify-center bg-[#F7F6F2] py-8 px-6 min-h-[220px]">
                  {qr ? (
                    <div className="relative">
                      <div className="bg-white rounded-2xl p-4 shadow-sm ring-1 ring-black/[0.04]">
                        <QRWithLogo
                          value={qr.public_url}
                          size={160}
                          logoUrl={restaurant?.logo_url}
                          menuName={menu.name}
                          canvasRef={canvasRef as React.RefObject<HTMLCanvasElement>}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center mx-auto mb-3">
                        <QrCode size={26} className="text-gray-300" />
                      </div>
                      <p className="text-[13px] text-gray-400 font-medium">Not generated yet</p>
                      <p className="text-[12px] text-gray-300 mt-0.5">Click Generate to create your QR</p>
                    </div>
                  )}
                </div>

                {/* URL */}
                {qr && (
                  <div className="px-5 py-2.5 bg-gray-50 border-t border-gray-50">
                    <p className="text-[11px] text-gray-400 font-mono truncate text-center">{qr.public_url}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2.5 px-5 py-4">
                  <button
                    onClick={() => handleGenerate(menu.id)}
                    disabled={generating === menu.id}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-gray-200 bg-white text-[13px] font-medium text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all active:scale-[0.98] disabled:opacity-50"
                  >
                    {generating === menu.id ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-gray-200 border-t-gray-500 rounded-full animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <RefreshCw size={13} />
                        {qr ? 'Regenerate' : 'Generate'}
                      </>
                    )}
                  </button>

                  {qr && (
                    <button
                      onClick={() => handleDownload(menu.id, menu.name)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-white text-[13px] font-semibold transition-all active:scale-[0.98]"
                    >
                      {downloaded === menu.id ? (
                        <>
                          <CheckCircle size={13} className="text-emerald-400" />
                          Saved!
                        </>
                      ) : (
                        <>
                          <Download size={13} />
                          Download PNG
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Info note */}
      {activeMenus.length > 0 && (
        <p className="text-[12px] text-gray-400 text-center pb-2">
          QR codes include your restaurant logo and download as high-quality PNG files
        </p>
      )}
    </div>
  )
}