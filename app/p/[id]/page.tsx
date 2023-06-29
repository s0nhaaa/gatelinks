import { getProduct } from '@/actions/get-product'
import { getUser } from '@/actions/get-user'
import PayButton from '@/components/pay-button'
import PriceInput from '@/components/price-input'
import WalletAdapter from '@/components/wallet-adapter'
import Image from 'next/image'
import Link from 'next/link'

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const product = await getProduct(id)
  const user = product && (await getUser(product.owner))

  return (
    <div>
      <main className='bg-base-200 flex items-center flex-col'>
        {product && user && (
          <WalletAdapter>
            <div className='w-[900px] bg-base-100 min-h-screen overflow-hidden'>
              <div className='w-full px-10 flex justify-between items-center pt-10'>
                <div className='flex gap-3'>
                  <button className='px-2 flex w-fit btn btn-primary btn-sm btn-active no-animation text-[16px] normal-case'>
                    ${product.price}
                  </button>
                  <h1 className='font-semibold text-2xl'>{product.name}</h1>
                </div>
              </div>

              <div className='w-full px-10 py-6'>
                <figure className='aspect-[1/1] rounded-xl overflow-hidden'>
                  <Image
                    className='w-full h-full object-cover'
                    src={product.thumbnail}
                    alt={product.name}
                    width={1000}
                    height={1000}
                  />
                </figure>
              </div>

              <div className='w-full px-10 mb-20'>
                <div className='w-full px-7 py-5 bg-base-200 rounded-xl grid grid-cols-10 gap-5'>
                  <div className='col-span-6 flex flex-col gap-3'>
                    <div>
                      <span className='text-xl font-semibold'>{product.name}</span>
                    </div>
                    <div>
                      <span className='text-[#716E88]'>
                        By{' '}
                        <Link href={`/u/${product.owner}`} className='text-primary font-semibold hover:underline'>
                          {user.username}
                        </Link>
                      </span>
                    </div>
                    <div>
                      <span className='text-lg text-[#CCC9D6]'>{product.description}</span>
                    </div>
                  </div>
                  <div className='col-span-4 flex'>
                    <div className='flex flex-col gap-2 w-full'>
                      {parseFloat(product.price) === 0.0 && <PriceInput />}
                      <PayButton
                        isFree={parseFloat(product.price) === 0.0}
                        content={parseFloat(product.price) === 0.0 ? 'Pay' : `Pay $${product.price}`}
                        name={product.name}
                        image={product.thumbnail}
                        price={parseFloat(product.price)}
                        ownerUsername={user.username}
                        ownerWallet={user.wallet}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </WalletAdapter>
        )}
      </main>
    </div>
  )
}
