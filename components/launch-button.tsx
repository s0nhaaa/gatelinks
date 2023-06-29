'use client'

import { useRouter } from 'next/navigation'

export default function LaunchButton() {
  const router = useRouter()

  return (
    <button className='btn btn-primary' onClick={() => router.push('/dashboard')}>
      Launch app
    </button>
  )
}
