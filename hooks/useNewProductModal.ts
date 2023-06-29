import { create } from 'zustand'

type NewProductModalState = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const useNewProductModal = create<NewProductModalState>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
}))

export default useNewProductModal
