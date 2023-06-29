import { CandyPay } from '@candypay/checkout-sdk'

export const candypay = new CandyPay({
  api_keys: {
    private_api_key: process.env.CANDYPAY_PRIVATE_API_KEY as string,
    public_api_key: process.env.CANDYPAY_PUBLIC_API_KEY as string,
  },
  network: 'devnet',
  config: {
    collect_shipping_address: false,
  },
})
