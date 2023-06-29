'use client'

import useNamePrice from '@/hooks/useNamePrice'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface PayButtonProps {
  name: string
  price: number
  image: string
  ownerWallet: string
  ownerUsername: string
  content: string
  isFree: boolean
  productURL: string
  productID: string
}

export default function PayButton({
  isFree,
  name,
  price,
  image,
  ownerUsername,
  ownerWallet,
  content,
  productURL,
  productID,
}: PayButtonProps) {
  const router = useRouter()
  const namePrice = useNamePrice((s) => s.price)
  const [loading, setLoading] = useState(false)

  const pay = async () => {
    try {
      setLoading(true)

      const response = await fetch('/api/create-session', {
        method: 'POST',
        body: JSON.stringify({
          name,
          price: isFree ? namePrice : price,
          image,
          ownerWallet,
          ownerUsername,
          productURL,
          productID,
        }),
      })
      const data = await response.json()

      router.push(data.response.payment_url)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button className='btn btn-primary normal-case mt-3' onClick={pay} disabled={loading}>
      {loading && <span className='loading loading-spinner'></span>}
      {content}
    </button>
  )
}
