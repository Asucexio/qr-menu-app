import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type Profile = {
  name: string
  avatar: string
  count?: number
}

const profiles: Profile[] = [
  {
    name: 'Noah Bennett',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiOwabdPau7ZLlhQ5R7y-OcSWm2J6W27c5rYARBgFNUA&s',
  }
  
]

const getInitials = (name: string) =>
  name
    .split(/\s+/)
    .map((word) => word.slice(0, 1))
    .join('')

const Avatar11 = () => {
  return (
    <div className="flex items-center gap-3">
      {profiles.map((profile, index) => (
        <div key={index} className="relative w-fit">
          <Avatar className="size-10 rounded-sm">
            <AvatarImage
              src={profile.avatar}
              alt={profile.name}
              className="rounded-sm object-cover"
            />

            <AvatarFallback className="text-xs">
              {getInitials(profile.name)}
            </AvatarFallback>
          </Avatar>
        </div>
      ))}
    </div>
  )
}

export default Avatar11