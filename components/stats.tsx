import { CircleDollarSign, User2 } from 'lucide-react'

export default function Stats() {
  return (
    <div className='flex w-full items-center mt-5 flex-col select-none'>
      <div className='stats shadow bg-base-200'>
        <div className='stat'>
          <div className='stat-figure text-primary'>
            <CircleDollarSign />
          </div>
          <div className='stat-title'>Total Revenue</div>
          <div className='stat-value text-primary'>25.6K</div>
          <div className='stat-desc'>
            <span className='text-success'>↗︎</span> 400 (22%)
          </div>
        </div>

        <div className='stat'>
          <div className='stat-figure text-secondary'>
            <User2 />
          </div>
          <div className='stat-title'>Customers</div>
          <div className='stat-value text-secondary'>2.6M</div>
          <div className='stat-desc'>
            <span className='text-error'>↘︎</span> 90 (14%)
          </div>
        </div>

        <div className='stat'>
          <div className='stat-figure text-accent'>
            <CircleDollarSign />
          </div>
          <div className='stat-title'>MMR</div>
          <div className='stat-value text-accent'>2.6M</div>
          <div className='stat-desc'>
            <span className='text-success'>21%</span> than last month
          </div>
        </div>
      </div>
    </div>
  )
}
