'use client'

import { formatWallet } from '@/helpers/format-wallet'
import useEditProfile from '@/hooks/useEditProfile'
import { Edit } from 'lucide-react'
import ProfileAvatar from './profile-avatar'
import { useCopyToClipboard } from 'react-use'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface ProfileProps {
  username: string
  wallet: string
  isAuthor?: boolean
}

export default function Profile(props: ProfileProps) {
  const [setCurrentUsername, setIsOpen, setWallet] = useEditProfile((s) => [
    s.setCurrentUsername,
    s.setIsOpen,
    s.setWallet,
  ])
  const [state, copyToClipboard] = useCopyToClipboard()
  const [editable, setEditable] = useState(false)

  const openEditProfileModal = () => {
    if (!editable) return

    setIsOpen(true)
    setCurrentUsername(props.username)
    setWallet(props.wallet)
  }

  useEffect(() => {
    const path = new URL(window.location.toString()).pathname
    setEditable(path === '/dashboard')
  }, [])

  return (
    <div className='w-full flex flex-col items-center -mt-14 select-none'>
      <ProfileAvatar address={props.wallet} />
      <span className=' font-semibold text-lg mt-2 text-base-content'>
        <div className='badge badge-primary p-1'>🔥</div> {props.username}{' '}
        <div className='tooltip' data-tip='Edit profile'>
          {editable && (
            <button className='btn btn-sm btn-square' onClick={openEditProfileModal}>
              <Edit size={14} />
            </button>
          )}
        </div>
      </span>

      <div className='tooltip tooltip-bottom' data-tip='Copy'>
        <button
          className='btn btn-ghost btn-sm hover:bg-transparent text-[#CCC9D6] text-sm normal-case'
          onClick={() => copyToClipboard(props.wallet)}>
          {formatWallet(props.wallet)}
        </button>
      </div>

      <div className='flex gap-2'>
        <div className='badge badge-success badge-outline'>🌱 Newbie</div>
      </div>
    </div>
  )
}
