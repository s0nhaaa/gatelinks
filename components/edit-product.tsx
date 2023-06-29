'use client'

import { uploadFile } from '@/helpers/upload-file'
import useEditProduct from '@/hooks/useEditProduct'
import { firestore } from '@/libs/firebase'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { Eye, Globe2, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { ChangeEvent, useEffect, useRef, useState } from 'react'

export default function EditProduct() {
  const [isOpen, currentProduct, setIsOpen] = useEditProduct((s) => [s.isOpen, s.currentProduct, s.setIsOpen])

  const nameRef = useRef<HTMLInputElement>(null)
  const contentRef = useRef<HTMLInputElement>(null)
  const thumbnailRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)
  const priceRef = useRef<HTMLInputElement>(null)

  const [thumbnail, setThumbnail] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    if (!nameRef.current || !descriptionRef.current || !priceRef.current || !currentProduct) return

    setLoading(true)

    let contentURL: string | undefined
    let thumbnailURL: string | undefined

    if (contentRef.current && contentRef.current.files && contentRef.current.files.length > 0)
      contentURL = await uploadFile(contentRef.current.files[0], `/contents/${currentProduct.id}`)

    if (thumbnailRef.current && thumbnailRef.current.files && thumbnailRef.current.files.length > 0)
      thumbnailURL = await uploadFile(thumbnailRef.current.files[0], `/thumbnails/${currentProduct.id}`)

    try {
      const data = {
        name: nameRef.current.value,
        description: descriptionRef.current.value,
        price: priceRef.current.value,
        ...(contentURL !== undefined && { content: contentURL }),
        ...(thumbnailURL !== undefined && { thumbnail: thumbnailURL }),
      }

      await updateDoc(doc(firestore, 'products', currentProduct.id), data)
      console.log('Document written with ID: ', currentProduct.id)
    } catch (error) {
      console.log('Write to firestore failed: ', error)
    } finally {
      setLoading(false)
      setIsOpen(false)
    }
  }

  const deleteProduct = async () => {
    if (!currentProduct) return

    setLoading(true)
    try {
      await deleteDoc(doc(firestore, 'products', currentProduct?.id))
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
      setIsOpen(false)
    }
  }

  useEffect(() => {
    if (!currentProduct) return

    const name = nameRef.current
    const description = descriptionRef.current
    const price = priceRef.current
    const content = contentRef.current
    const thumbnail = thumbnailRef.current

    if (name) name.value = currentProduct.name
    if (description) description.value = currentProduct.description
    if (price) price.value = currentProduct.price
    if (content) {
      content.files = null
      content.value = ''
    }
    if (thumbnail) {
      thumbnail.files = null
      thumbnail.value = ''
    }
    setThumbnail(currentProduct.thumbnail)
  }, [currentProduct])

  const handleThumbnailChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setThumbnail(URL.createObjectURL(event.target.files[0]))
    } else {
      setThumbnail('')
    }
  }

  return (
    <>
      <div className={`modal ${isOpen ? 'modal-open' : ''} `}>
        <div className='modal-box'>
          <button
            className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
            disabled={loading}
            onClick={() => setIsOpen(false)}>
            ✕
          </button>
          <h3 className='font-bold text-lg select-none'>Edit product: {currentProduct?.name}</h3>

          <div className='w-full h-[600px] overflow-auto no-scrollbar'>
            <div className='form-control w-full '>
              <label className='label'>
                <span className='label-text'>Name</span>
              </label>
              <input ref={nameRef} type='text' placeholder='Product name' className='input input-bordered w-full ' />
            </div>

            <div className='form-control w-full mt-3'>
              <label className='label'>
                <span className='label-text'>Content</span>
              </label>
              <Link target={'_blank'} className='w-full' href={currentProduct ? currentProduct.content : '#'}>
                <button className='btn w-full'>
                  <Eye size={16} /> View
                </button>
              </Link>
              <span className='text-sm text-[#CCC9D6] ml-2 mt-2'>Upload new?</span>
              <input
                ref={contentRef}
                type='file'
                className='file-input file-input-bordered file-input-secondary w-full mt-1'
              />
            </div>

            <div className='form-control w-full mt-3'>
              <label className='label'>
                <span className='label-text'>Thumbnail</span>
              </label>
              {thumbnail && (
                <figure className='w-full h-[200px] rounded-lg overflow-hidden mb-3'>
                  <img className='w-full h-full object-cover' loading='lazy' src={thumbnail} alt='Shoes' />
                </figure>
              )}
              <span className='text-sm text-[#CCC9D6] ml-2'>Upload new?</span>

              <input
                ref={thumbnailRef}
                onChange={handleThumbnailChange}
                type='file'
                accept='.png,.jpg,.jpeg'
                className='file-input file-input-bordered file-input-secondary w-full mt-1'
              />
            </div>

            <div className='form-control mt-3'>
              <label className='label'>
                <span className='label-text'>Description</span>
              </label>
              <textarea
                ref={descriptionRef}
                className='textarea textarea-bordered h-24'
                placeholder='Describe your product'></textarea>
            </div>

            <div className='form-control w-full mt-3'>
              <label className='label'>
                <span className='label-text'>Price (in USD)</span>
              </label>
              <input
                ref={priceRef}
                type='number'
                placeholder='Your product price in USD'
                className='input input-bordered w-full '
              />
            </div>
          </div>

          <div className='modal-action'>
            <button className='btn hover:bg-error ' disabled={loading} onClick={deleteProduct}>
              {loading ? (
                <>
                  <span className='loading loading-spinner'></span>
                  Deleting
                </>
              ) : (
                <>
                  <Trash2 size={16} />
                  Delete
                </>
              )}
            </button>
            <button className='btn btn-primary' onClick={submit} disabled={loading}>
              {loading ? (
                <>
                  <span className='loading loading-spinner'></span>
                  Hang on
                </>
              ) : (
                <>
                  <Globe2 size={16} />
                  Save and Publish
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
