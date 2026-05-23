'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Plus, QrCode, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { menuApi } from '@/lib/api'
import { useRestaurantStore } from '@/store/restaurantStore'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { CategoryCard } from '@/components/menu/CategoryCard'
import { Badge } from '@/components/ui/Badge'

export default function MenuEditorPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const { activeMenu, setActiveMenu, createCategory } = useRestaurantStore()
  const [loading, setLoading] = useState(true)
  const [addCatOpen, setAddCatOpen] = useState(false)
  const [catName, setCatName] = useState('')
  const [adding, setAdding] = useState(false)

  useEffect(() => {
    menuApi.getById(id).then(menu => {
      setActiveMenu(menu)
      setLoading(false)
    }).catch(() => {
      toast.error('Menu not found')
      router.push('/dashboard/menus')
    })
    return () => setActiveMenu(null)
  }, [id])

  const handleAddCategory = async () => {
    if (!catName.trim() || !activeMenu) return
    setAdding(true)
    try {
      await createCategory(activeMenu.id, catName.trim(), activeMenu.categories?.length || 0)
      toast.success('Category added')
      setAddCatOpen(false)
      setCatName('')
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to add category')
    } finally { setAdding(false) }
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 size={24} className="animate-spin text-green-600" />
    </div>
  )

  if (!activeMenu) return null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/menus">
          <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
            <ArrowLeft size={18} />
          </button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-gray-900">{activeMenu.name}</h1>
            <Badge label={activeMenu.is_active ? 'Active' : 'Inactive'} variant={activeMenu.is_active ? 'green' : 'gray'} />
          </div>
          <p className="text-sm text-gray-400 mt-0.5">{activeMenu.categories?.length || 0} categories</p>
        </div>
        <Link href={`/dashboard/qr`}>
          <Button variant="secondary" size="sm" className="gap-2">
            <QrCode size={15} /> QR Code
          </Button>
        </Link>
        <Button onClick={() => setAddCatOpen(true)} size="sm" className="gap-1">
          <Plus size={15} /> Add category
        </Button>
      </div>

      {/* Categories */}
      {!activeMenu.categories?.length ? (
        <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-white p-12 text-center">
          <p className="text-gray-400 mb-4">No categories yet. Add a category like &quot;Starters&quot; or &quot;Main Course&quot;.</p>
          <Button onClick={() => setAddCatOpen(true)}><Plus size={16} className="mr-2" />Add first category</Button>
        </div>
      ) : (
        <div className="space-y-4">
          {activeMenu.categories.map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
          <button
            onClick={() => setAddCatOpen(true)}
            className="w-full rounded-xl border-2 border-dashed border-gray-200 py-4 text-sm text-gray-400 hover:border-green-300 hover:text-green-600 transition-colors"
          >
            <Plus size={16} className="inline mr-2" />Add category
          </button>
        </div>
      )}

      <Modal open={addCatOpen} onClose={() => setAddCatOpen(false)} title="Add category" size="sm">
        <div className="space-y-4">
          <Input
            label="Category name"
            placeholder="e.g. Starters, Main Course, Drinks"
            value={catName}
            onChange={e => setCatName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAddCategory()}
            autoFocus
          />
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setAddCatOpen(false)} className="flex-1">Cancel</Button>
            <Button onClick={handleAddCategory} loading={adding} className="flex-1">Add</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
