import { firestore } from '@/libs/firebase'
import { Product } from '@/types/product'
import { collection, getDocs, query, where } from 'firebase/firestore'

export const getProductsByWallet = async (wallet: string) => {
  const q = query(collection(firestore, 'products'), where('owner', '==', wallet))

  const querySnapshot = await getDocs(q)
  const products: Product[] = []

  querySnapshot.forEach((doc) => {
    products.push(doc.data() as Product)
  })

  return products
}
