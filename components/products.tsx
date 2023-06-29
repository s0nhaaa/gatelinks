'use client'

import useEditProduct from '@/hooks/useEditProduct'
import { Product } from '@/types/product'
import { Edit, PackageOpen, PackageX } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface ProductsProps {
  products: Product[] | undefined
}

export default function Products(props: ProductsProps) {
  const [isOpen, setIsOpen, setCurrentProduct] = useEditProduct((s) => [s.isOpen, s.setIsOpen, s.setCurrentProduct])
  const [editable, setEditable] = useState(false)

  const openEditProductModal = (product: Product) => {
    setIsOpen(true)
    setCurrentProduct(product)
  }

  useEffect(() => {
    const path = new URL(window.location.toString()).pathname
    setEditable(path === '/dashboard')
  }, [])

  return (
    <div className='w-full flex flex-col px-7 py-5'>
      <h2 className='font-semibold text-lg flex gap-2 select-none'>
        <PackageOpen /> Products ({props.products?.length})
      </h2>

      <div className='w-full grid grid-cols-3 m-auto justify-center gap-5 mt-4 mb-20'>
        {props.products && props.products.length > 0 ? (
          props.products.map((product, index) => (
            <div
              key={index}
              className='flex items-center justify-center'
              // onClick={() => router.push(`/p/${product.id}`)}
            >
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
                  ${product.price}
                </button>
                {editable && (
                  <button
                    className='absolute top-2 right-2 px-2 flex w-fit btn btn-neutral btn-sm btn-active no-animation text-base-content btn-circle'
                    onClick={() => openEditProductModal(product)}>
                    <Edit size={14} />
                  </button>
                )}
                <div className='card-body p-5 h-[100px]'>
                  <h2 className='card-title text-lg'>{product.name}</h2>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='select-none text-[#CCC9D6] mt-10 col-span-3 w-full h-full flex items-center flex-col gap-4'>
            <PackageX size={30} />
            No products!
          </div>
        )}
      </div>
    </div>
  )
}
