import { firestore } from '@/libs/firebase'
import { Product } from '@/types/product'
import { doc, getDoc } from 'firebase/firestore'

export const getProduct = async (id: string) => {
  const docSnap = await getDoc(doc(firestore, 'products', id))

  return docSnap.exists() ? (docSnap.data() as Product) : null
}
