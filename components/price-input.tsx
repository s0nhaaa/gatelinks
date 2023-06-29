'use client'

import useNamePrice from '@/hooks/useNamePrice'

interface PriceInputProps {}

export default function PriceInput(props: PriceInputProps) {
  const [price, setPrice] = useNamePrice((s) => [s.price, s.setPrice])

  return (
    <>
      <span className='text-[#CCC9D6]'>Name a fair price (in USD):</span>
      <input
        value={price}
        onChange={(e) => setPrice(e.target.valueAsNumber)}
        type='number'
        placeholder='$0+'
        className='input input-bordered w-full'
      />
    </>
  )
}
