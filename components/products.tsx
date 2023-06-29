'use client'

import { Product } from '@/types/product'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface ProductsProps {
  products: Product[] | undefined
}

export default function Products(props: ProductsProps) {
  const router = useRouter()

  return (
    <div className='w-full flex flex-col px-7 py-5'>
      <h2 className='font-semibold text-lg'>Products</h2>

      <div className='w-full grid grid-cols-3 m-auto justify-center gap-5 mt-4 mb-20'>
        {props.products &&
          props.products.length > 0 &&
          props.products.map((product, index) => (
            <div
              key={index}
              className='flex items-center justify-center'
              onClick={() => router.push(`/p/${product.id}`)}>
              <div className='relative hover:ring ring-primary ring-offset-base-100 ring-offset-2 card w-full bg-base-200 shadow-xl select-none transition-all hover:cursor-pointer'>
                <figure className='w-full h-[200px]'>
                  <Image
                    className='w-full h-full object-cover'
                    src={product.thumbnail}
                    alt={product.name}
                    width={300}
                    height={300}
                  />
                </figure>
                <button className='absolute inset-0 top-2 left-2 px-2 flex w-fit btn btn-neutral btn-sm btn-active no-animation text-base-content'>
                  <Image src='https://cryptologos.cc/logos/usd-coin-usdc-logo.png' alt='USDC' width={18} height={18} />{' '}
                  {product.price}
                </button>
                <div className='card-body p-5 h-[100px]'>
                  <h2 className='card-title text-lg'>{product.name}</h2>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
