import { URL_Domain } from '@/const/apiDomain'
import axios from 'axios'
import { Exo_2, Open_Sans } from 'next/font/google'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { TailSpin } from 'react-loader-spinner';

const exo_2 = Exo_2({ subsets: ['latin'] })
const open_sans = Open_Sans({ subsets: ['latin'] })

export default function Login() {

    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    let [submitting, setSubmitting] = useState(false)
    const [errors, setErrors] = useState({})

    function handleSubmit(event) {
        event.preventDefault()
        let temp = {}


        let validation = true

        if (!email) {
            temp.email = "Email field is required"
            validation = false
        }

        if (!password) {
            temp.password = "Password field is required"
            validation = false
        }

        setErrors(temp)


        if (validation) {
            setSubmitting(true)
            axios.post(`${URL_Domain}/login`, {
                "email": email,
                "password": password,

            }).then(res => {
                // console.log(res);
                localStorage.setItem("access_token", res.data.access_token)
                setSubmitting(false)
                router.push("/")

            }).catch(err => {
                setSubmitting(false)
                let arr = err.response.data.errors

                let temp = {}
                // console.log(temp);
                if (err.response.data.errors && err.response.data.errors.length) {
                    err.response.data.errors.forEach(el => {
                        temp[el.params] = el.msg


                        toast.error(el.msg, {
                            position: toast.POSITION.TOP_RIGHT
                        });

                    })


                    setErrors(temp)


                }

                // console.log(err);
                if (err.response.data.msg) {
                    toast.error(err.response.data.msg, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }
            })
        }

    }

    return (
        <main className="container pt-48">
            <form className="flex flex-col gap-4 items-center w-full" onSubmit={handleSubmit}>
                <div className='w-full md:w-1/3'>
                    <label htmlFor='email' className="block after:content-['*'] after:ml-0.5 after:text-red-500">Email</label>
                    <input type="email" name='email' onChange={(event) => {
                        setEmail(event.target.value)
                        if (event.target.value) {
                            setErrors({ ...errors, email: "" })
                        } else {
                            setErrors({ ...errors, email: "Email field is required" })
                        }
                    }} className="border py-1 px-4 rounded-md mt-1 w-full outline-none" />
                    {errors.email && <small className="text-red-500">{errors.email}</small>}
                </div>

                <div className='w-full md:w-1/3'>
                    <label htmlFor='password' className="block after:content-['*'] after:ml-0.5 after:text-red-500">Password</label>
                    <input type="password" name='password' onChange={(event) => {
                        setPassword(event.target.value)
                        if (event.target.value) {
                            setErrors({ ...errors, password: "" })
                        } else {
                            setErrors({ ...errors, password: "Password field is required" })
                        }
                    }} className="border py-1 px-4 rounded-md mt-1 w-full outline-none" />
                    {errors.password && <small className="text-red-500">{errors.password}</small>}
                </div>

                <div className='w-full md:w-1/3'>
                    <button type='submit' disabled={submitting} className={`disabled:bg-primary/70 w-full bg-primary text-white border border-primary hover:bg-white hover:text-primary rounded-md px-8 py-1 ${exo_2.className} w-full flex justify-center gap-4`}>Login
                        {submitting && <TailSpin
                            height="20"
                            width="20"
                            color="#ffffff"
                            ariaLabel="tail-spin-loading"
                            radius="1"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                        />}</button>
                </div>

                <p className={`text-heading1 ${open_sans.className}`}>Don't have an account? <Link href={"/signup"}>Signup</Link></p>
            </form>
            <ToastContainer />
        </main>
    )
}