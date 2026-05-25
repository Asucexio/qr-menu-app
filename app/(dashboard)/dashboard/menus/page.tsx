'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, UtensilsCrossed, Trash2, Eye, EyeOff, Pencil, Loader2, ChevronRight } from 'lucide-react'
import toast from 'react-hot-toast'
import { useRestaurantStore } from '@/store/restaurantStore'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import type { Menu } from '@/lib/types'

export default function MenusPage() {
  const { restaurant, menus, loading, loadRestaurant, createMenu, updateMenu, deleteMenu } = useRestaurantStore()
  const [createOpen, setCreateOpen]   = useState(false)
  const [newMenuName, setNewMenuName] = useState('')
  const [submitting, setSubmitting]   = useState(false)
  const [deletingId, setDeletingId]   = useState<string | null>(null)

  useEffect(() => { loadRestaurant() }, [])

  const handleCreateMenu = async () => {
    if (!newMenuName.trim()) return
    setSubmitting(true)
    try {
      await createMenu(newMenuName.trim())
      toast.success('Menu created!')
      setCreateOpen(false)
      setNewMenuName('')
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to create menu')
    } finally { setSubmitting(false) }
  }

  const handleToggleActive = async (menu: Menu) => {
    try {
      await updateMenu(menu.id, { is_active: !menu.is_active })
      toast.success(menu.is_active ? 'Menu deactivated' : 'Menu activated!')
    } catch { toast.error('Failed to update menu') }
  }

  const handleDelete = async (menu: Menu) => {
    if (!confirm(`Delete "${menu.name}"? This cannot be undone.`)) return
    setDeletingId(menu.id)
    try {
      await deleteMenu(menu.id)
      toast.success('Menu deleted')
    } catch { toast.error('Failed to delete menu') }
    finally { setDeletingId(null) }
  }

  if (loading && menus.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 size={22} className="animate-spin text-green-600" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-green-600 mb-1">Menus</p>
          <h1 className="text-2xl font-bold text-gray-900">Your menus</h1>
          <p className="text-gray-400 mt-1 text-sm">Build and manage your restaurant menus</p>
        </div>
        <Button onClick={() => setCreateOpen(true)} size="sm" className="gap-1.5 shadow-sm">
          <Plus size={14} /> New menu
        </Button>
      </div>

      {/* Stats bar */}
      {menus.length > 0 && (
        <div className="flex items-center gap-6 px-5 py-3.5 rounded-xl bg-white border border-gray-100 text-sm">
          <div>
            <span className="text-gray-400 mr-2">Total</span>
            <span className="font-bold text-gray-900">{menus.length}</span>
          </div>
          <div className="h-4 w-px bg-gray-100" />
          <div>
            <span className="text-gray-400 mr-2">Active</span>
            <span className="font-bold text-green-600">{menus.filter(m => m.is_active).length}</span>
          </div>
          <div className="h-4 w-px bg-gray-100" />
          <div>
            <span className="text-gray-400 mr-2">Inactive</span>
            <span className="font-bold text-gray-500">{menus.filter(m => !m.is_active).length}</span>
          </div>
        </div>
      )}

      {/* Menus List */}
      {menus.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-white p-14 text-center">
          <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center mx-auto mb-5">
            <UtensilsCrossed size={24} className="text-green-600" />
          </div>
          <p className="text-gray-900 font-semibold mb-1">No menus yet</p>
          <p className="text-sm text-gray-400 mb-7">Create your first menu to start listing your dishes.</p>
          <Button onClick={() => setCreateOpen(true)} size="sm">
            <Plus size={14} className="mr-2" />Create first menu
          </Button>
        </div>
      ) : (
        <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
          {menus.map((menu, i) => (
            <div
              key={menu.id}
              className={`group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-gray-50/80 ${i !== 0 ? 'border-t border-gray-50' : ''}`}
            >
              {/* Icon */}
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${menu.is_active ? 'bg-green-50' : 'bg-gray-50'}`}>
                <UtensilsCrossed size={16} className={menu.is_active ? 'text-green-600' : 'text-gray-300'} />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2.5 mb-0.5">
                  <h2 className="font-semibold text-gray-900 text-sm truncate">{menu.name}</h2>
                  <Badge
                    label={menu.is_active ? 'Active' : 'Inactive'}
                    variant={menu.is_active ? 'green' : 'gray'}
                  />
                </div>
                <p className="text-xs text-gray-400">
                  Created {new Date(menu.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleToggleActive(menu)}
                  title={menu.is_active ? 'Deactivate' : 'Activate'}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
                >
                  {menu.is_active
                    ? <><EyeOff size={13} /> Deactivate</>
                    : <><Eye size={13} /> Activate</>
                  }
                </button>

                <Link href={`/dashboard/menus/${menu.id}`}>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors">
                    <Pencil size={13} /> Edit
                  </button>
                </Link>

                <button
                  onClick={() => handleDelete(menu)}
                  disabled={deletingId === menu.id}
                  className="p-1.5 rounded-lg text-gray-300 hover:bg-red-50 hover:text-red-400 transition-colors"
                >
                  {deletingId === menu.id
                    ? <Loader2 size={14} className="animate-spin" />
                    : <Trash2 size={14} />
                  }
                </button>
              </div>

              {/* Edit arrow (always visible) */}
              <Link href={`/dashboard/menus/${menu.id}`} className="ml-1">
                <ChevronRight size={16} className="text-gray-200 group-hover:text-gray-400 transition-colors" />
              </Link>
            </div>
          ))}

          {/* Add more row */}
          <button
            onClick={() => setCreateOpen(true)}
            className="w-full flex items-center justify-center gap-2 py-3.5 border-t border-gray-50 text-xs font-medium text-gray-400 hover:text-green-600 hover:bg-green-50/50 transition-colors"
          >
            <Plus size={13} /> Add another menu
          </button>
        </div>
      )}

      {/* Create Modal */}
      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="Create menu" size="sm">
        <div className="space-y-4 pt-1">
          <Input
            label="Menu name"
            placeholder="e.g. Standard Menu, Lunch Specials, Drinks"
            value={newMenuName}
            onChange={(e) => setNewMenuName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCreateMenu()}
            autoFocus
          />
          <p className="text-xs text-gray-400">You can always rename or add categories after creating.</p>
          <div className="flex gap-3 pt-1">
            <Button variant="secondary" onClick={() => setCreateOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleCreateMenu} loading={submitting} className="flex-1">
              Create menu
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}