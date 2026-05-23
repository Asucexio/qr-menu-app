import Link from 'next/link'
import { QrCode, UtensilsCrossed, Smartphone, Zap } from 'lucide-react'

const features = [
  { icon: UtensilsCrossed, title: 'Build your menu', desc: 'Create categories and add items with prices and photos in minutes.' },
  { icon: QrCode,          title: 'Generate QR codes', desc: 'Get a unique QR code for each menu. Print it on table cards instantly.' },
  { icon: Smartphone,      title: 'Customers scan & browse', desc: 'No app needed. Customers scan and see your menu on any phone.' },
  { icon: Zap,             title: 'Update instantly', desc: 'Change prices or hide items in real-time. QR code stays the same.' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-gray-100 px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-green-600 flex items-center justify-center">
            <QrCode size={18} className="text-white" />
          </div>
          <span className="font-bold text-gray-900 text-lg">QR Menu</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/signin" className="text-sm text-gray-600 hover:text-gray-900 font-medium">Sign in</Link>
          <Link href="/signup" className="bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Get started free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 rounded-full px-4 py-1.5 text-sm font-medium mb-8">
          <Zap size={14} /> Built for Ethiopian restaurants
        </div>
        <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
          Digital menus with<br />QR codes — in minutes
        </h1>
        <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
          Create a beautiful digital menu, generate a QR code, and let your customers browse without touching a physical menu.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/signup" className="bg-green-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-green-700 transition-colors text-base">
            Start for free
          </Link>
          <Link href="/signin" className="text-gray-600 font-medium px-8 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors text-base">
            Sign in
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
              <div className="h-10 w-10 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                <Icon size={20} className="text-green-700" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-500 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-gray-50 border-t border-gray-100 py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple pricing</h2>
          <p className="text-gray-500 mb-12">30-day subscriptions, cancel anytime.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {[
              { name: 'Basic', price: '199 ETB', period: '/month', features: ['1 restaurant', '3 menus', 'QR generation', 'Email support'] },
              { name: 'Pro', price: '499 ETB', period: '/month', features: ['1 restaurant', 'Unlimited menus', 'QR generation', 'Custom branding', 'Priority support'], popular: true },
            ].map(plan => (
              <div key={plan.name} className={`rounded-2xl p-6 text-left ${plan.popular ? 'bg-green-600 text-white' : 'bg-white border border-gray-200'}`}>
                {plan.popular && <span className="text-xs font-semibold bg-white/20 rounded-full px-3 py-1 mb-4 inline-block">Most popular</span>}
                <h3 className={`text-lg font-bold mb-1 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
                <p className={`text-3xl font-bold mb-6 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                  {plan.price}<span className={`text-sm font-normal ${plan.popular ? 'text-green-100' : 'text-gray-400'}`}>{plan.period}</span>
                </p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map(f => (
                    <li key={f} className={`text-sm flex items-center gap-2 ${plan.popular ? 'text-green-100' : 'text-gray-600'}`}>
                      <span className="text-green-400">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/signup"
                  className={`block text-center py-2.5 rounded-xl text-sm font-semibold transition-colors ${plan.popular ? 'bg-white text-green-700 hover:bg-green-50' : 'bg-green-600 text-white hover:bg-green-700'}`}
                >
                  Get started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
