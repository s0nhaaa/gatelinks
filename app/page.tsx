'use client'

import WalletAdapter from '@/components/wallet-adapter'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (
    <main className='bg-base-200 w-full h-screen'>
      <WalletAdapter>
        <button className='btn btn-primary' onClick={() => router.push('/dashboard')}>
          Launch app
        </button>
      </WalletAdapter>
    </main>
  )
}
