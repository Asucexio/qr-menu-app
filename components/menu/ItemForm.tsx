'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { UploadCloud } from 'lucide-react'
import toast from 'react-hot-toast'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import type { Item } from '@/lib/types'
import { optimizeImageToDataUrl } from '@/components/ui/imageDataUrl'

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
  const [imagePreview, setImagePreview] = useState(item?.image_url || '')
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<ItemFormData>({
    defaultValues: {
      name: item?.name || '',
      description: item?.description || '',
      price: item?.price || 0,
      image_url: item?.image_url || '',
    },
  })

  const imageUrl = watch('image_url')

  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be smaller than 5MB')
      return
    }

    try {
      const dataUrl = await optimizeImageToDataUrl(file, {
        maxWidth: 720,
        maxHeight: 720,
        quality: 0.72,
        maxBytes: 65 * 1024,
      })
      setValue('image_url', dataUrl, { shouldDirty: true })
      setImagePreview(dataUrl)
    } catch {
      toast.error('Could not optimize image. Try a smaller one.')
      return
    }
  }

  const handleFormSubmit = (data: ItemFormData) => {
    onSubmit({ ...data, category_id: categoryId, price: Number(data.price) })
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <Input id="name" label="Item name" placeholder="e.g. Tibs" error={errors.name?.message} {...register('name', { required: 'Name is required' })} />
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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Item image upload (optional)</label>
        <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-4 text-sm text-gray-600 transition hover:border-green-400 hover:bg-green-50">
          <UploadCloud size={16} /> Choose image
          <input type="file" accept="image/*" className="hidden" onChange={onImageChange} />
        </label>
        {imagePreview || imageUrl ? (
          <div className="mt-3 rounded-xl border border-gray-200 p-3">
            <img src={imagePreview || imageUrl} alt="Item preview" className="h-24 w-24 rounded-lg object-cover" />
          </div>
        ) : null}
      </div>

      <input type="hidden" {...register('image_url')} />

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">Cancel</Button>
        <Button type="submit" loading={loading} className="flex-1">{item ? 'Update' : 'Add Item'}</Button>
      </div>
    </form>
  )
}