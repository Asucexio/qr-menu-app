import Link from 'next/link'
import { ArrowRight, QrCode } from 'lucide-react'

export default function Hero() {
  return (
    <section className="max-w-5xl mx-auto px-6 pt-16 pb-20 text-center">
      <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-green-100 mb-8">
        <QrCode size={32} className="text-green-700" />
      </div>
      <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-6">
        Digital menus your customers scan in seconds
      </h1>
      <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10">
        Build your restaurant menu online, generate a QR code, and let guests browse on any phone — no app required.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/signup"
          className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors"
        >
          Create your free menu
          <ArrowRight size={16} />
        </Link>
        <Link
          href="/signin"
          className="inline-flex items-center gap-2 text-gray-600 px-6 py-3 rounded-xl text-sm font-semibold hover:text-gray-900 transition-colors"
        >
          Sign in
        </Link>
      </div>
    </section>
  )
}
