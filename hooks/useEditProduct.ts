import { Product } from '@/types/product'
import { create } from 'zustand'

type EditProductState = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void

  currentProduct: Product | undefined
  setCurrentProduct: (currentProduct: Product) => void

  isDone: boolean
  setIsDone: (isDone: boolean) => void
}

const useEditProduct = create<EditProductState>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen: boolean) => set({ isOpen }),

  currentProduct: undefined,
  setCurrentProduct: (currentProduct: Product) => set({ currentProduct }),

  isDone: false,
  setIsDone: (isDone: boolean) => set({ isDone }),
}))

export default useEditProduct
