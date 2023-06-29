import { getProductsByWallet } from '@/actions/get-products-by-wallet'
import { getUser } from '@/actions/get-user'
import CoverPicture from '@/components/cover-picture'
import Products from '@/components/products'
import Profile from '@/components/profile'

export default async function Home({ params: { wallet } }: { params: { wallet: string } }) {
  const userData = getUser(wallet)
  const productsData = getProductsByWallet(wallet)

  const [user, products] = await Promise.all([userData, productsData])

  return (
    <main className='bg-base-200 flex items-center h-screen flex-col '>
      <div className='w-[900px] bg-base-100 min-h-screen overflow-auto no-scrollbar'>
        {user ? (
          <>
            <CoverPicture seed={user.wallet} />
            <Profile username={user.username} wallet={user.wallet} />
            <Products products={products} />
          </>
        ) : (
          <>
            <div className='flex w-full h-screen justify-center items-center'>
              <button className='btn btn-primary'>No User</button>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
