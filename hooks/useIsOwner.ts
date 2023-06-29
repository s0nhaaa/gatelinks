import { create } from 'zustand'

type IsAuthorState = {
  isAuthor: boolean
  setIsAuthor: (isAuthor: boolean) => void
}

const useIsAuthor = create<IsAuthorState>((set) => ({
  isAuthor: false,
  setIsAuthor: (isAuthor: boolean) => set({ isAuthor }),
}))

export default useIsAuthor
