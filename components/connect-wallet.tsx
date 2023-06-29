import { formatWallet } from '@/helpers/format-wallet'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'

export default function ConnectWallet() {
  const { publicKey } = useWallet()
  const { setVisible } = useWalletModal()

  const connect = () => {
    if (!publicKey) return

    setVisible(true)
  }

  return (
    <>
      {publicKey ? (
        <button className='btn btn-primary normal-case' onClick={connect}>
          {formatWallet(publicKey.toString())}{' '}
        </button>
      ) : (
        <button className='btn btn-primary'>Connect</button>
      )}
    </>
  )
}
