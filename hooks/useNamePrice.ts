import { create } from 'zustand'

type NamePriceState = {
  price: number
  setPrice: (price: number) => void
}

const useNamePrice = create<NamePriceState>((set) => ({
  price: 0,
  setPrice: (price: number) => set({ price }),
}))

export default useNamePrice
