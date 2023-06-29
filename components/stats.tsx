import { formatNumber } from '@/helpers/format-number'
import { CircleDollarSign, User2 } from 'lucide-react'

interface StatsProps {
  customers: string[]
  totalRevenue: number
}

export default function Stats(props: StatsProps) {
  return (
    <div className='flex w-full items-center mt-5 flex-col select-none'>
      <div className='stats shadow bg-base-200'>
        <div className='stat'>
          <div className='stat-figure text-primary'>
            <CircleDollarSign />
          </div>
          <div className='stat-title'>Total Revenue</div>
          <div className='stat-value text-primary'>{formatNumber(props.totalRevenue)}</div>
          <div className='stat-desc'>
            <span className='text-success'>↗︎</span> {props.totalRevenue.toFixed(3)} (100%)
          </div>
        </div>

        <div className='stat'>
          <div className='stat-figure text-secondary'>
            <User2 />
          </div>
          <div className='stat-title'>Customers</div>
          <div className='stat-value text-secondary'>{formatNumber(props.customers.length)}</div>
          <div className='stat-desc'>
            <span className='text-success'>↗︎</span> {props.customers.length} (100%)
          </div>
        </div>

        <div className='stat'>
          <div className='stat-figure text-accent'>
            <CircleDollarSign />
          </div>
          <div className='stat-title'>MMR</div>
          <div className='stat-value text-accent'>{formatNumber(props.totalRevenue)}</div>
          <div className='stat-desc'>
            <span className='text-success'>100%</span> than last month
          </div>
        </div>
      </div>
    </div>
  )
}
