import LaunchButton from '@/components/launch-button'

export default function Home() {
  return (
    <main className='bg-base-200 w-full h-screen relative flex flex-col items-center justify-center'>
      <h1 className='font-bold text-[200px]'>GATELINKS</h1>
      <h2 className='font-semibold text-[60px] text-[#CCC9D6] mb-20'>Monetize your digital works!</h2>
      <LaunchButton />
    </main>
  )
}
