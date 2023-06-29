import { getProduct } from '@/actions/get-product'
import { getUser } from '@/actions/get-user'
import DynamicIsland from '@/components/dynamic-island'
import ProductPage from '@/components/product-page'
import WalletAdapter from '@/components/wallet-adapter'

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const product = await getProduct(id)
  const user = product && (await getUser(product.owner))

  return (
    <div>
      <main className='bg-base-200 flex items-center flex-col'>
        {product && user && (
          <WalletAdapter>
            <ProductPage product={product} user={user} />
            <DynamicIsland />
          </WalletAdapter>
        )}
      </main>
    </div>
  )
}
