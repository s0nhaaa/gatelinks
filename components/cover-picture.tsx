import { BORINGAVATAR_COLORS } from '@/helpers/constants'
import Avatar from 'boring-avatars'

interface CoverPictureProps {
  seed: string
}

export default function CoverPicture(props: CoverPictureProps) {
  return (
    <div className='w-full h-[150px] rounded-b-2xl overflow-hidden'>
      <Avatar square size={1000} name={props.seed} variant='marble' colors={BORINGAVATAR_COLORS} />
    </div>
  )
}
