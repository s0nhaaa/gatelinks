import { firestore } from '@/libs/firebase'
import { Product } from '@/types/product'
import { doc, getDoc } from 'firebase/firestore'

export const checkIsBought = async (id: string, wallet: string) => {
  const docSnap = await getDoc(doc(firestore, 'products', id))

  return docSnap.exists() ? (docSnap.data() as Product).buyer.includes(wallet) : false
}
