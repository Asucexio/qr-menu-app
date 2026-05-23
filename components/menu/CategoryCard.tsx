'use client'
import { useState } from 'react'
import { Plus, Pencil, Trash2, Eye, EyeOff, ChevronDown, ChevronUp } from 'lucide-react'
import toast from 'react-hot-toast'
import { useRestaurantStore } from '@/store/restaurantStore'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { ItemForm } from './ItemForm'
import { formatPrice } from '@/lib/utils'
import type { Category, Item } from '@/lib/types'

interface CategoryCardProps {
  category: Category
}

export function CategoryCard({ category }: CategoryCardProps) {
  const { createItem, updateItem, toggleItem, deleteItem, deleteCategory, updateCategory } = useRestaurantStore()
  const [expanded, setExpanded] = useState(true)
  const [addItemOpen, setAddItemOpen] = useState(false)
  const [editItem, setEditItem] = useState<Item | null>(null)
  const [editingName, setEditingName] = useState(false)
  const [catName, setCatName] = useState(category.name)
  const [loading, setLoading] = useState(false)

  const handleAddItem = async (data: Partial<Item>) => {
    setLoading(true)
    try {
      await createItem({ ...data, category_id: category.id } as any)
      toast.success('Item added')
      setAddItemOpen(false)
    } catch { toast.error('Failed to add item') }
    finally { setLoading(false) }
  }

  const handleUpdateItem = async (data: Partial<Item>) => {
    if (!editItem) return
    setLoading(true)
    try {
      await updateItem(editItem.id, data)
      toast.success('Item updated')
      setEditItem(null)
    } catch { toast.error('Failed to update item') }
    finally { setLoading(false) }
  }

  const handleToggle = async (item: Item) => {
    try {
      await toggleItem(item.id)
    } catch { toast.error('Failed to toggle item') }
  }

  const handleDeleteItem = async (item: Item) => {
    if (!confirm(`Delete "${item.name}"?`)) return
    try {
      await deleteItem(item.id)
      toast.success('Item deleted')
    } catch { toast.error('Failed to delete item') }
  }

  const handleDeleteCategory = async () => {
    if (!confirm(`Delete category "${category.name}" and all its items?`)) return
    try {
      await deleteCategory(category.id)
      toast.success('Category deleted')
    } catch { toast.error('Failed to delete category') }
  }

  const handleRenameCategory = async () => {
    if (catName === category.name) { setEditingName(false); return }
    try {
      await updateCategory(category.id, { name: catName })
      toast.success('Category renamed')
    } catch { toast.error('Failed to rename') }
    setEditingName(false)
  }

  return (
    <div className="rounded-xl border border-gray-100 bg-white overflow-hidden">
      {/* Category header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border-b border-gray-100">
        {editingName ? (
          <input
            autoFocus
            value={catName}
            onChange={e => setCatName(e.target.value)}
            onBlur={handleRenameCategory}
            onKeyDown={e => e.key === 'Enter' && handleRenameCategory()}
            className="flex-1 text-sm font-semibold bg-white border border-green-300 rounded px-2 py-0.5 outline-none"
          />
        ) : (
          <span
            className="flex-1 text-sm font-semibold text-gray-900 cursor-pointer hover:text-green-600"
            onClick={() => setEditingName(true)}
          >
            {category.name}
          </span>
        )}
        <span className="text-xs text-gray-400">{category.items?.length || 0} items</span>
        <Button size="sm" variant="ghost" onClick={() => setAddItemOpen(true)} className="gap-1">
          <Plus size={14} /> Add item
        </Button>
        <Button size="sm" variant="ghost" onClick={handleDeleteCategory} className="text-red-400 hover:text-red-600">
          <Trash2 size={14} />
        </Button>
        <button onClick={() => setExpanded(!expanded)} className="text-gray-400 hover:text-gray-600">
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {/* Items list */}
      {expanded && (
        <div className="divide-y divide-gray-50">
          {!category.items?.length ? (
            <div className="px-4 py-6 text-center text-sm text-gray-400">
              No items yet. Click &quot;Add item&quot; to get started.
            </div>
          ) : (
            category.items.map(item => (
              <div key={item.id} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
                {item.image_url && (
                  <img src={item.image_url} alt={item.name} className="h-10 w-10 rounded-lg object-cover" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{item.name}</p>
                  {item.description && <p className="text-xs text-gray-500 truncate">{item.description}</p>}
                </div>
                <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">{formatPrice(item.price)}</span>
                <Badge label={item.is_available ? 'Available' : 'Hidden'} variant={item.is_available ? 'green' : 'gray'} />
                <button onClick={() => handleToggle(item)} className="text-gray-400 hover:text-gray-600">
                  {item.is_available ? <Eye size={15} /> : <EyeOff size={15} />}
                </button>
                <button onClick={() => setEditItem(item)} className="text-gray-400 hover:text-gray-600">
                  <Pencil size={15} />
                </button>
                <button onClick={() => handleDeleteItem(item)} className="text-gray-400 hover:text-red-500">
                  <Trash2 size={15} />
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Add item modal */}
      <Modal open={addItemOpen} onClose={() => setAddItemOpen(false)} title={`Add item to ${category.name}`}>
        <ItemForm categoryId={category.id} onSubmit={handleAddItem} onCancel={() => setAddItemOpen(false)} loading={loading} />
      </Modal>

      {/* Edit item modal */}
      <Modal open={!!editItem} onClose={() => setEditItem(null)} title="Edit item">
        {editItem && (
          <ItemForm categoryId={category.id} item={editItem} onSubmit={handleUpdateItem} onCancel={() => setEditItem(null)} loading={loading} />
        )}
      </Modal>
    </div>
  )
}