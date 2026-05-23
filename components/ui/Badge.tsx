interface BadgeProps {
  label: string
  variant?: 'green' | 'red' | 'yellow' | 'gray' | 'blue'
  className?: string
}

export function Badge({ label, variant = 'gray', className = '' }: BadgeProps) {
  const variants = {
    green:  'bg-green-50 text-green-700',
    red:    'bg-red-50 text-red-700',
    yellow: 'bg-yellow-50 text-yellow-700',
    gray:   'bg-gray-100 text-gray-600',
    blue:   'bg-blue-50 text-blue-700',
  }
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}>
      {label}
    </span>
  )
}