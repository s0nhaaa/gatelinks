import { formatWallet } from '@/helpers/format-wallet'
import useNewProductModal from '@/hooks/useNewProductModal'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { AnimatePresence } from 'framer-motion'
import { LogOut, Plus, Wallet } from 'lucide-react'

interface DynamicIslandProps {}

export default function DynamicIsland(props: DynamicIslandProps) {
  const { setVisible } = useWalletModal()
  const { publicKey, disconnect } = useWallet()
  const setIsOpen = useNewProductModal((s) => s.setIsOpen)

  const connectWallet = () => !publicKey && setVisible(true)

  const newProduct = () => setIsOpen(true)

  return (
    <div className='fixed bottom-5 left-1/2 -translate-x-1/2 p-2 rounded-full bg-secondary'>
      <div className='flex items-center gap-1 w-fit'>
        {publicKey ? (
          <button className='normal-case btn rounded-full' onClick={connectWallet}>
            <Wallet size={18} /> {formatWallet(publicKey.toString())}
          </button>
        ) : (
          <button className='btn rounded-full' onClick={connectWallet}>
            Connect Wallet
          </button>
        )}

        <AnimatePresence mode='wait'>
          {publicKey && (
            <>
              <button className='btn btn-neutral rounded-full' onClick={newProduct}>
                <Plus size={18} /> New product
              </button>
              <div className='tooltip' data-tip='Disconnect'>
                <button className='btn btn-neutral rounded-full btn-square' onClick={disconnect}>
                  <LogOut size={18} />
                </button>
              </div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
