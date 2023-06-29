import { NextApiRequest, NextApiResponse } from 'next'
import { verifyWebhookSignature } from '@candypay/checkout-sdk'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const headers = req.headers
    const payload = req.body

    try {
      await verifyWebhookSignature({
        payload: JSON.stringify(payload),
        headers: headers as Record<string, string>,
        webhook_secret: process.env.CANDYPAY_WEBHOOK_SECRET!,
      })

      const { product_id, owner } = payload.metadata
      const buyer = payload.customer
      const amount = payload.payment_amount

      try {
        console.log(product_id, owner, buyer, amount)
      } catch (error) {
        console.log('write to bd failed', error)
      }

      res.status(200).json({
        payload,
      })
    } catch (err) {
      console.log(err)

      res.status(400).json({
        message: 'Invalid webhook signature',
      })
    }
  } else {
    console.log('Method not allowed')

    res.status(405).json({
      error: 'Method not allowed',
    })
  }
}
