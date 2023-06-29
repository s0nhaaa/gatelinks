'use client'

import { checkIsBought } from '@/actions/check-is-bought'
import PayButton from '@/components/pay-button'
import PriceInput from '@/components/price-input'
import { Product } from '@/types/product'
import { User } from '@/types/user'
import { useWallet } from '@solana/wallet-adapter-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import DownloadButton from './download-button'
import { useSearchParams } from 'next/navigation'
import { doc, onSnapshot } from 'firebase/firestore'
import { firestore } from '@/libs/firebase'

interface ProductPageProps {
  product: Product
  user: User
}

export default function ProductPage({ product, user }: ProductPageProps) {
  const { publicKey } = useWallet()
  const [isBought, setIsBought] = useState(false)
  const status = useSearchParams()?.get('status')
  const [isAdded, setIsAdded] = useState(false)

  useEffect(() => {
    const checkIsWalletBought = async () => {
      if (!publicKey) {
        setIsBought(false)
        return
      }

      const isBought = await checkIsBought(product.id, publicKey.toString())
      setIsBought(isBought)
    }

    checkIsWalletBought()
  }, [product.id, publicKey, isAdded])

  useEffect(() => {
    if (!publicKey) return

    if (status === 'paid') {
      const unsub = onSnapshot(doc(firestore, 'products', product.id), (doc) => {
        if ((doc.data() as Product).buyer.includes(publicKey.toString())) setIsAdded(true)
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, publicKey])

  return (
    <div className='w-[900px] bg-base-100 min-h-screen overflow-hidden'>
      <div className='w-full px-10 flex justify-between items-center pt-10'>
        <div className='flex gap-3'>
          <button className='px-2 flex w-fit btn btn-primary btn-sm btn-active no-animation text-[16px] normal-case'>
            ${product.price}
          </button>
          <h1 className='font-semibold text-2xl'>{product.name}</h1>
        </div>
      </div>

      <div className='w-full px-10 py-6'>
        <figure className='aspect-[1/1] rounded-xl overflow-hidden'>
          <Image
            className='w-full h-full object-cover'
            src={product.thumbnail}
            alt={product.name}
            width={1000}
            height={1000}
          />
        </figure>
      </div>

      <div className='w-full px-10 mb-28'>
        <div className='w-full px-7 py-5 bg-base-200 rounded-xl grid grid-cols-10 gap-5'>
          <div className='col-span-6 flex flex-col gap-3'>
            <div>
              <span className='text-xl font-semibold'>{product.name}</span>
            </div>
            <div>
              <span className='text-[#716E88]'>
                By{' '}
                <Link href={`/u/${product.owner}`} className='text-primary font-semibold hover:underline'>
                  {user.username}
                </Link>
              </span>
            </div>
            <div>
              <span className='text-lg text-[#CCC9D6]'>{product.description}</span>
            </div>
          </div>
          <div className='col-span-4 flex'>
            <div className='flex flex-col gap-2 w-full'>
              {status === 'paid' && !isAdded && (
                <span className='text-[#CCC9D6]'>The download link is generating ...</span>
              )}
              {isBought && <DownloadButton id={product.id} name={product.name} />}
              {!(status === 'paid') && !isBought && (
                <>
                  {parseFloat(product.price) === 0.0 && <PriceInput />}
                  <PayButton
                    productID={product.id}
                    productURL={window.location.toString()}
                    isFree={parseFloat(product.price) === 0.0}
                    content={parseFloat(product.price) === 0.0 ? 'Pay' : `Pay $${product.price}`}
                    name={product.name}
                    image={product.thumbnail}
                    price={parseFloat(product.price)}
                    ownerUsername={user.username}
                    ownerWallet={user.wallet}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
