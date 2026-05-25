import Link from 'next/link'
import { CheckCircle2, QrCode, ShieldCheck, Sparkles } from 'lucide-react'
import type { ReactNode } from 'react'

type AuthSplitLayoutProps = {
  title: string
  subtitle: string
  children: ReactNode
}

const highlights = [
  'Create elegant QR menus in minutes',
  'Update menu items instantly with no re-print cost',
  'Built-in analytics for scans and top-performing items',
]

export function AuthSplitLayout({ title, subtitle, children }: AuthSplitLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950 p-4 sm:p-6 lg:p-10">
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-7xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl shadow-slate-950/50 lg:grid-cols-2">
        <section className="relative hidden overflow-hidden bg-green from-emerald-500 via-cyan-500 to-blue-600 p-10 lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -left-20 top-16 h-56 w-56 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-8 right-8 h-52 w-52 rounded-full bg-slate-900/20 blur-3xl" />

          <div className="relative z-10">
            <Link href="/" className="inline-flex items-center gap-3 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
              <span className="rounded-lg bg-white/20 p-2"><QrCode size={16} /></span>
               MenuQR
            </Link>

            <div className="mt-12 max-w-md text-white">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]">
                <Sparkles size={14} /> Built for modern restaurants
              </p>
              <h2 className="mt-4 text-4xl font-bold leading-tight">Turn every table into a smarter ordering experience.</h2>
              <p className="mt-4 text-sm text-white/90">Launch branded digital menus, manage updates in real time, and keep guests engaged with a seamless mobile journey.</p>
            </div>

            <ul className="mt-8 space-y-3 text-sm text-white">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5" size={16} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative z-10 mt-8 grid grid-cols-2 gap-4 text-white">
            <div className="rounded-2xl bg-white/20 p-4 backdrop-blur">
              <p className="text-2xl font-bold">15+</p>
              <p className="mt-1 text-xs text-white/80">Restaurants onboarded</p>
            </div>
            <div className="rounded-2xl bg-white/20 p-4 backdrop-blur">
              <p className="flex items-center gap-1 text-2xl font-bold"><ShieldCheck size={20} /> 90.9%</p>
              <p className="mt-1 text-xs text-white/80">Platform uptime</p>
            </div>
          </div>
        </section>

        <section className="flex items-center bg-white px-5 py-10 sm:px-10">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">Welcome</p>
              <h1 className="mt-2 text-3xl font-bold text-slate-900">{title}</h1>
              <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
            </div>
            {children}
          </div>
        </section>
      </div>
    </div>
  )
}
