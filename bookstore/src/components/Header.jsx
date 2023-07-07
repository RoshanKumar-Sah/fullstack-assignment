import { Exo_2 } from 'next/font/google'
import Link from 'next/link'
import {Sling as Hamburger} from 'hamburger-react'
import { useState } from 'react'
import Nav from './Nav'


const exo_2 = Exo_2({ subsets: ['latin'] })


export default function Header() {


  const [isOpen, setOpen] = useState(false)

  return (
    <header className='w-full fixed z-50 bg-white border-b border-black'>
    <div className='container py-4 flex  gap-4 items-center justify-between'>
      <h2 className={`text-3xl ${exo_2.className} font-bold text-primary`}><Link href={"/"}>B<span className='text-tertiary'>oo</span>kSt<span className='text-tertiary'>o</span>re</Link></h2>

      <div className='sm:hidden'>
        <Hamburger toggled={isOpen} color='#FF851B' toggle={setOpen} />
      </div>

      {isOpen && <div className="absolute py-4 top-0 left-0 w-1/2  h-screen bg-white border-r px-3 sm:hidden">
      <h2 className={`text-3xl ${exo_2.className} font-bold text-primary py-4`}><Link href={"/"}>B<span className='text-tertiary'>oo</span>kSt<span className='text-tertiary'>o</span>re</Link></h2>

        <Nav />
      </div>}

      <div className="hidden sm:flex  items-center justify-between w-2/4"><Nav /></div>
</div>
    </header>
  )
}