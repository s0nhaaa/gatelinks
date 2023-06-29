import WalletAdapter from '@/components/wallet-adapter'
import WithWallet from '@/components/with-wallet'

export default function Home() {
  return (
    <main className='bg-base-200 flex items-center h-screen flex-col '>
      <WalletAdapter>
        <WithWallet />
      </WalletAdapter>
    </main>
  )
}
