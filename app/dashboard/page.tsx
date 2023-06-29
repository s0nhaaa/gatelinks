import WalletAdapter from '@/components/wallet-adapter'
import DashboardPage from '@/components/dashboard-page'

export default function Home() {
  return (
    <main className='bg-base-200 flex items-center h-screen flex-col '>
      <WalletAdapter>
        <DashboardPage />
      </WalletAdapter>
    </main>
  )
}
