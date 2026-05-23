'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, UtensilsCrossed, Trash2, Eye, EyeOff, Edit, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { useRestaurantStore } from '@/store/restaurantStore'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import type { Menu } from '@/lib/types'

export default function MenusPage() {
  const { restaurant, menus, loading, loadRestaurant, createMenu, updateMenu, deleteMenu } = useRestaurantStore()
  const [createOpen, setCreateOpen] = useState(false)
  const [newMenuName, setNewMenuName] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    loadRestaurant()
  }, [])

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
    } finally {
      setSubmitting(false)
    }
  }

  const handleToggleActive = async (menu: Menu) => {
    try {
      await updateMenu(menu.id, { is_active: !menu.is_active })
      toast.success(menu.is_active ? 'Menu deactivated' : 'Menu activated!')
    } catch {
      toast.error('Failed to update menu status')
    }
  }

  const handleDelete = async (menu: Menu) => {
    if (!confirm(`Are you sure you want to delete the menu "${menu.name}"?`)) return
    try {
      await deleteMenu(menu.id)
      toast.success('Menu deleted')
    } catch {
      toast.error('Failed to delete menu')
    }
  }

  if (loading && menus.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 size={24} className="animate-spin text-green-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Menus</h1>
          <p className="text-gray-500 mt-1 text-sm">Manage and build your restaurant menus</p>
        </div>
        <Button onClick={() => setCreateOpen(true)} size="sm" className="gap-1">
          <Plus size={16} /> Create Menu
        </Button>
      </div>

      {/* Menus List */}
      {menus.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-white p-12 text-center">
          <UtensilsCrossed size={40} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 mb-2 font-medium">No menus created yet</p>
          <p className="text-sm text-gray-400 mb-6">Create your first menu to start listing items.</p>
          <Button onClick={() => setCreateOpen(true)} size="sm">
            <Plus size={16} className="mr-2" /> Create first menu
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {menus.map((menu) => (
            <div key={menu.id} className="rounded-2xl border border-gray-100 bg-white p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h2 className="font-semibold text-gray-900 text-lg">{menu.name}</h2>
                  <Badge
                    label={menu.is_active ? 'Active' : 'Inactive'}
                    variant={menu.is_active ? 'green' : 'gray'}
                  />
                </div>
                <p className="text-xs text-gray-400">Created: {new Date(menu.created_at).toLocaleDateString()}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleToggleActive(menu)}
                  className="gap-1.5"
                >
                  {menu.is_active ? (
                    <>
                      <EyeOff size={14} /> Deactivate
                    </>
                  ) : (
                    <>
                      <Eye size={14} /> Activate
                    </>
                  )}
                </Button>

                <Link href={`/dashboard/menus/${menu.id}`}>
                  <Button variant="secondary" size="sm" className="gap-1.5">
                    <Edit size={14} /> Edit Items
                  </Button>
                </Link>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(menu)}
                  className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Menu Modal */}
      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="Create Menu" size="sm">
        <div className="space-y-4">
          <Input
            label="Menu Name"
            placeholder="e.g. Standard Menu, Lunch Specials, Drinks Menu"
            value={newMenuName}
            onChange={(e) => setNewMenuName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCreateMenu()}
            autoFocus
          />
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setCreateOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleCreateMenu} loading={submitting} className="flex-1">
              Create
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
