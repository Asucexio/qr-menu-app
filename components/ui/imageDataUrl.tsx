export interface ImageDataUrlOptions {
  maxWidth?: number
  maxHeight?: number
  quality?: number
  mimeType?: 'image/jpeg' | 'image/webp'
  maxBytes?: number
}

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('Failed to load image'))
    img.src = src
  })

const fileToDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })

const dataUrlByteLength = (dataUrl: string) => {
  const base64 = dataUrl.split(',')[1] || ''
  return Math.floor((base64.length * 3) / 4)
}

export async function optimizeImageToDataUrl(file: File, options: ImageDataUrlOptions = {}) {
  const {
    maxWidth = 1024,
    maxHeight = 1024,
    quality = 0.78,
    mimeType = 'image/jpeg',
    maxBytes = 180 * 1024,
  } = options

  const srcDataUrl = await fileToDataUrl(file)
  const image = await loadImage(srcDataUrl)

  const ratio = Math.min(maxWidth / image.width, maxHeight / image.height, 1)
  const width = Math.max(1, Math.round(image.width * ratio))
  const height = Math.max(1, Math.round(image.height * ratio))

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')

  if (!ctx) throw new Error('Canvas not supported')

  ctx.drawImage(image, 0, 0, width, height)

  let currentQuality = quality
  let result = canvas.toDataURL(mimeType, currentQuality)

  while (dataUrlByteLength(result) > maxBytes && currentQuality > 0.45) {
    currentQuality -= 0.08
    result = canvas.toDataURL(mimeType, currentQuality)
  }

  if (dataUrlByteLength(result) > maxBytes) {
    throw new Error('Image is still too large after optimization')
  }

  return result
}
