import { create } from 'zustand'

type EditProfileState = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void

  wallet: string
  setWallet: (wallet: string) => void

  currentUsername: string
  setCurrentUsername: (currentUsername: string) => void
}

const useEditProfile = create<EditProfileState>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen: boolean) => set({ isOpen }),

  wallet: '',
  setWallet: (wallet: string) => set({ wallet }),

  currentUsername: '',
  setCurrentUsername: (currentUsername: string) => set({ currentUsername }),
}))

export default useEditProfile
