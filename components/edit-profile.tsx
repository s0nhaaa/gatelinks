'use client'

import useEditProfile from '@/hooks/useEditProfile'
import { firestore } from '@/libs/firebase'
import { doc, updateDoc } from 'firebase/firestore'
import { useRef, useState } from 'react'

export default function EditProfile() {
  const [isOpen, wallet, currentUsername, setIsOpen] = useEditProfile((s) => [
    s.isOpen,
    s.wallet,
    s.currentUsername,
    s.setIsOpen,
  ])
  const nameRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    if (!nameRef.current || !wallet) return

    setLoading(true)

    try {
      await updateDoc(doc(firestore, 'users', wallet), {
        username: nameRef.current.value,
      })
      console.log('Document written with ID: ', wallet)
    } catch (error) {
      console.log('Write to firestore failed: ', error)
    } finally {
      setLoading(false)
      setIsOpen(false)
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
          <h3 className='font-bold text-lg select-none'>Edit profile?</h3>

          <div className='form-control w-full'>
            <label className='label'>
              <span className='label-text'>Name</span>
            </label>
            <input
              ref={nameRef}
              defaultValue={currentUsername}
              type='text'
              placeholder='Your username'
              className='input input-bordered w-full '
            />
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
                'Save'
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
