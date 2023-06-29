'use client'

import { randomID } from '@/helpers/random-id'
import useNewProductModal from '@/hooks/useNewProductModal'
import { firestore, storage } from '@/libs/firebase'
import { useWallet } from '@solana/wallet-adapter-react'
import { doc, setDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react'

export default function NewProduct() {
  const [isOpen, setIsOpen] = useNewProductModal((s) => [s.isOpen, s.setIsOpen])

  const nameRef = useRef<HTMLInputElement>(null)
  const contentRef = useRef<HTMLInputElement>(null)
  const thumbnailRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)
  const priceRef = useRef<HTMLInputElement>(null)

  const [thumbnail, setThumbnail] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const productID = useMemo(() => randomID(), [isOpen])

  const { publicKey } = useWallet()

  const handleUploadFile = async (file: File, path: string) => {
    if (!file) return

    const storageRef = ref(storage, path)

    try {
      await uploadBytes(storageRef, file)
      console.log('Uploaded a blob or file!')

      const downloadURL = await getDownloadURL(storageRef)

      return downloadURL
    } catch (error) {
      console.log('Upload failed: ', error)
    }
  }

  const submit = async () => {
    if (!nameRef.current || !descriptionRef.current || !priceRef.current || !publicKey) return

    setLoading(true)

    let contentURL: string | undefined
    let thumbnailURL: string | undefined

    if (contentRef.current && contentRef.current.files && contentRef.current.files.length > 0)
      contentURL = await handleUploadFile(contentRef.current.files[0], `/contents/${productID}`)

    if (thumbnailRef.current && thumbnailRef.current.files && thumbnailRef.current.files.length > 0)
      thumbnailURL = await handleUploadFile(thumbnailRef.current.files[0], `/thumbnails/${productID}`)

    try {
      await setDoc(doc(firestore, 'products', productID), {
        name: nameRef.current.value,
        content: contentURL,
        thumbnail: thumbnailURL,
        description: descriptionRef.current.value,
        price: priceRef.current.value,
        owner: publicKey?.toString(),
        buyer: [],
        id: productID,
      })
      console.log('Document written with ID: ', productID)
    } catch (error) {
      console.log('Write to firestore failed: ', error)
    } finally {
      setLoading(false)
      setIsOpen(false)
    }
  }

  const handleThumbnailChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setThumbnail(URL.createObjectURL(event.target.files[0]))
    } else {
      setThumbnail('')
    }
  }

  useEffect(() => {
    const name = nameRef.current
    const content = contentRef.current
    const thumbnail = thumbnailRef.current
    const description = descriptionRef.current
    const price = priceRef.current

    return () => {
      if (name) name.value = ''
      if (content) content.files = null
      if (thumbnail) thumbnail.files = null
      if (description) description.value = ''
      if (price) price.value = ''
    }
  }, [isOpen])

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
          <h3 className='font-bold text-lg select-none'>What are you selling?</h3>

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
              <input
                ref={contentRef}
                type='file'
                className='file-input file-input-bordered file-input-secondary w-full '
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
              <input
                ref={thumbnailRef}
                onChange={handleThumbnailChange}
                type='file'
                accept='.png,.jpg,.jpeg'
                className='file-input file-input-bordered file-input-secondary w-full'
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
            <button className='btn btn-ghost' disabled={loading} onClick={() => setIsOpen(false)}>
              Cancel
            </button>
            <button className='btn btn-primary' onClick={submit} disabled={loading}>
              {loading ? (
                <>
                  <span className='loading loading-spinner'></span>
                  Hang on
                </>
              ) : (
                'Publish and Continue'
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
