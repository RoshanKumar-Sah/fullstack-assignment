import { URL_Domain } from "@/const/apiDomain"
import axios from "axios"
import { useEffect, useState } from "react"
import { Exo_2, Open_Sans } from 'next/font/google'
import Image from "next/image"
import DefaultBook from "@/assets/defaultBook1.jpg"

const exo_2 = Exo_2({ subsets: ['latin'] })
const open_sans = Open_Sans({ subsets: ['latin'] })

export default function Orders() {

    const [orders, setOrders] = useState([])

    useEffect(() => {
        if (localStorage.getItem("access_token")) {
            axios.get(`${URL_Domain}/order`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("access_token")
                }
            }).then(res => {
                // console.log(res.data);
                setOrders(res.data)
            }).catch(err => {
                // console.log(err);
            })
        }
    }, [])
    
    return (
        <main className="container pb-32 pt-32">

            <h1 className={`text-2xl font-bold text-heading1 py-8 ${exo_2.className}`}>Orders</h1>
            <div className="flex flex-col-reverse gap-8 border rounded-md p-2 shadow-md">

                {
                    orders.map(order => {
                        const date = new Date(order.createdAt)
                        const options = { day: "2-digit", month: "long", year: "numeric" };
                        const orderedDate = date.toLocaleDateString("en-US", options);
                        return <div className="" key={order._id}>
                            <ul>
                                <li>
                                    Shipping Details: {order.shippingDetails}
                                </li>
                                <li>
                                    Ordered on: {orderedDate}
                                </li>
                            </ul>
                            <div className="flex flex-col gap-4 mt-4 border-t border-b py-2">
                                {
                                    order.cart.map((cartItem) => {
                                        return <div className="flex gap-4">
                                            <Image src={DefaultBook} height={200} width={200} className="object-cover w-1/4 border rounded-md" />
                                            <div>
                                                <ul className={`${open_sans.className}`}>
                                                    <li className={`text-heading2 text-lg font-semibold ${exo_2.className}  line-clamp-2 capitalize`}>{cartItem.bookTitle}</li>
                                                    <li className={`text-heading1 text-lg font-semibold`}>Quantity: {cartItem.quantity}</li>
                                                    <li className={`text-heading1 text-lg font-bold`}>Price: {cartItem.bookPrice * cartItem.quantity}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>

                        </div>

                    })
                }
            </div>

        </main>
    )
}


