import { Exo_2, Open_Sans } from 'next/font/google'
import Link from 'next/link'
import { useState } from 'react'


const exo_2 = Exo_2({ subsets: ['latin'] })
const open_sans = Open_Sans({ subsets: ['latin'] })


export default function Signup(){

const[name, setName] = useState("")
const[email, setEmail] = useState("")
const[password, setPassword] = useState("")

const[errors, setErrors] = useState({})


    return(
        <main className="container pt-48">
<form className="flex flex-col gap-4 items-center w-full">
    <div className='w-full md:w-1/3'>
    <label htmlFor='name' className="block">Name</label>
    <input type="text" name='name' onChange={(event)=>{
        setName(event.target.value)
    }} className="border py-1 px-4 rounded-md mt-1 w-full outline-none"/>
    </div>

    <div className='w-full md:w-1/3'>
    <label htmlFor='email' className="block">Email</label>
    <input type="email" name='email' onChange={(event)=>{
        setEmail(event.target.value)
    }} className="border py-1 px-4 rounded-md mt-1 w-full outline-none" />
    </div>

    <div className='w-full md:w-1/3'>
    <label htmlFor='password' className="block">Password</label>
    <input type="password" name='password' onChange={(event)=>{
        setPassword(event.target.value)
    }} className="border py-1 px-4 rounded-md mt-1 w-full outline-none" />
    </div>

    <div className='w-full md:w-1/3'>
        <button  className={` w-full bg-primary text-white border border-primary hover:bg-white hover:text-primary rounded-md px-8 py-1 ${exo_2.className} w-full`}>Signup</button>
    </div>

    <p className= {`text-heading1 ${open_sans.className}`}>Already have an account? <Link href={"/login"}>Login</Link></p>
</form>
        </main>
    )
}