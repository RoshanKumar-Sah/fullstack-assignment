import { logout } from '@/redux/slice/userSlice'
import { Exo_2 } from 'next/font/google'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'


const exo_2 = Exo_2({ subsets: ['latin'] })



export default function Nav() {

  const dispatch = useDispatch()

  let user = useSelector((redux_store) => {
    return redux_store.user.value
  })


  return (

    <nav className='sm:w-full'>
      <ul className={`flex flex-col sm:flex-row  items-start sm:items-center py-4 mt-12 sm:mt-0 gap-8 uppercase ${exo_2.className} font-medium`}>
        <li className='hover:text-primary'>
          <Link href={"/"}>Home</Link>
        </li>

        {
          user ? <><li className='hover:text-primary'>
            <Link href={"/orders"}>Orders</Link>
          </li>
            <li className='hover:text-primary'>
              <Link href={"/cart"}>Cart</Link>
            </li>
            <li className='capitalize'>
              {user.name}
            </li>
            <li className='hover:text-primary cursor-pointer' onClick={() => {
              dispatch(logout())
            }}>
              Logout
            </li></>
            : <>
              <li className={`bg-primary text-white border border-primary hover:bg-white hover:text-primary rounded-sm px-4 py-1 ${exo_2.className}`}>
                <Link href={"/login"}>Login</Link>
              </li>
              <li className={`bg-white text-primary border border-primary hover:bg-primary hover:text-white rounded-sm px-4 py-1 ${exo_2.className}`}>
                <Link href={"/signup"}>Signup</Link>
              </li>
            </>
        }


      </ul>


    </nav>

  )
}