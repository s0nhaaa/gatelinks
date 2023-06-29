import { firestore } from '@/libs/firebase'
import { User } from '@/types/user'
import { doc, getDoc } from 'firebase/firestore'

export const getUser = async (wallet: string) => {
  const docSnap = await getDoc(doc(firestore, 'users', wallet))

  return docSnap.exists() ? (docSnap.data() as User) : null
}
