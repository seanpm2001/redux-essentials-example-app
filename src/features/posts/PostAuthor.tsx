import { useAppSelector } from '@/app/hooks'

interface PostAuthorProps {
  userId: string
}

export const PostAuthor = ({ userId }: PostAuthorProps) => {
  const author = useAppSelector((state) => state.users.find((user) => user.id === userId))

  return <span>by {author?.name ?? 'Unknown author'}</span>
}
