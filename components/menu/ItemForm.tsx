'use client'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import type { Item } from '@/lib/types'

interface ItemFormData {
  name: string
  description: string
  price: number
  image_url: string
}

interface ItemFormProps {
  categoryId: string
  item?: Item
  onSubmit: (data: Partial<Item>) => Promise<void>
  onCancel: () => void
  loading?: boolean
}

export function ItemForm({ categoryId, item, onSubmit, onCancel, loading }: ItemFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<ItemFormData>({
    defaultValues: {
      name: item?.name || '',
      description: item?.description || '',
      price: item?.price || 0,
      image_url: item?.image_url || '',
    },
  })

  const handleFormSubmit = (data: ItemFormData) => {
    onSubmit({ ...data, category_id: categoryId, price: Number(data.price) })
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <Input
        id="name"
        label="Item name"
        placeholder="e.g. Tibs"
        error={errors.name?.message}
        {...register('name', { required: 'Name is required' })}
      />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          placeholder="Short description..."
          rows={2}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 resize-none"
          {...register('description')}
        />
      </div>
      <Input
        id="price"
        label="Price (ETB)"
        type="number"
        step="0.01"
        min="0"
        placeholder="0.00"
        error={errors.price?.message}
        {...register('price', { required: 'Price is required', min: { value: 0, message: 'Price must be positive' } })}
      />
      <Input
        id="image_url"
        label="Image URL (optional)"
        type="url"
        placeholder="https://..."
        {...register('image_url')}
      />
      <div className="flex gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">Cancel</Button>
        <Button type="submit" loading={loading} className="flex-1">{item ? 'Update' : 'Add Item'}</Button>
      </div>
    </form>
  )
}