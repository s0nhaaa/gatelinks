import { formatWallet } from '@/helpers/format-wallet'
import { Edit } from 'lucide-react'
import ProfileAvatar from './profile-avatar'

interface ProfileProps {
  username: string
  wallet: string
  isAuthor?: boolean
}

export default function Profile(props: ProfileProps) {
  return (
    <div className='w-full flex flex-col items-center -mt-14 select-none'>
      <ProfileAvatar address={props.wallet} />
      <span className=' font-semibold text-lg mt-2 text-base-content'>
        <div className='badge badge-primary p-1'>🔥</div> {props.username}{' '}
        <button className='btn btn-sm btn-square'>
          <Edit size={14} />
        </button>
      </span>

      <div className='tooltip tooltip-bottom' data-tip='Copy'>
        <button className='btn btn-ghost btn-sm hover:bg-transparent text-[#CCC9D6] text-sm normal-case'>
          {formatWallet(props.wallet)}
        </button>
      </div>

      <div className='flex gap-2'>
        <div className='badge badge-primary badge-outline'>🛒 Top Seller</div>
        <div className='badge badge-secondary badge-outline'>🌟 Raising Star</div>
      </div>
    </div>
  )
}
