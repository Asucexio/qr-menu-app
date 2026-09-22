import { Sidebar } from '@/components/dashboard/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#F7F6F3]">
      <Sidebar />

      <main className="lg:ml-[232px] min-h-screen">
        <div className="mx-auto w-full max-w-5xl px-4 py-6 pb-24 sm:px-6 sm:py-8 lg:px-8 lg:py-10 lg:pb-10">
          {children}
        </div>
      </main>
    </div>
  )
}