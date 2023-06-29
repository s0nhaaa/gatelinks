import { BORINGAVATAR_COLORS } from '@/helpers/constants'
import Avatar from 'boring-avatars'
import React from 'react'

interface ProfileAvatarProps {
  address: string
}

export default function ProfileAvatar(props: ProfileAvatarProps) {
  return (
    <div className='avatar'>
      <div className='w-28 ring ring-primary ring-offset-base-100 ring-offset-2 mask mask-squircle'>
        <Avatar square size={120} name={props.address} variant='beam' colors={BORINGAVATAR_COLORS} />
      </div>
    </div>
  )
}
