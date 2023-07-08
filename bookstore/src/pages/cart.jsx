import { URL_Domain } from "@/const/apiDomain"
import axios from "axios"
import Image from "next/image"
import { useEffect, useState } from "react"
import DefaultBook from "@/assets/defaultBook1.jpg"
import { Exo_2, Open_Sans } from 'next/font/google'
import { AiFillDelete, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"
import { useRouter } from "next/router"


const exo_2 = Exo_2({ subsets: ['latin'] })
const open_sans = Open_Sans({ subsets: ['latin'] })


export default function Cart() {

    const [cartItems, setCartItems] = useState([])

    const [qUpdate, setQUpdate] = useState(false)
    const [shippingDetails, setShippingDetails] = useState("")
    const [cardName, setCardName] = useState("")
    const [cardNumber, setCardNumber] = useState("")
    const [expDate, setExpDate] = useState("")
    const [cvc, setCvc] = useState("")
    const [errors, setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (localStorage.getItem("access_token")) {
            axios.get(`${URL_Domain}/cart`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("access_token")
                }
            }).then(res => {
                console.log(res);
                setCartItems(res.data)
            }).catch(err => {
                console.log(err);
            })
        }
    }, [qUpdate])

    function handleQ(id, state) {
        // console.log(id);
        setQUpdate(false)
        if (localStorage.getItem("access_token")) {
            let cartDetails = cartItems.find((item) => item._id == id)
            //   console.log(--cartDetails.quantity);
            let quantity = cartDetails.quantity
            if (state == "negative") {
                --quantity
            }

            if (state == "positive") {
                ++quantity
            }

            if (quantity) {
                axios.put(`${URL_Domain}/cart/${id}`, {
                    "quantity": quantity
                }, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("access_token")
                    }
                }).then(res => {
                    console.log(res);
                    setQUpdate(true)


                }).catch(err => {
                    setQUpdate(false)
                })
            }
        }

    }



    function handleDelete(id) {





        if (localStorage.getItem("access_token")) {
            setQUpdate(false)
            axios.delete(`${URL_Domain}/cart/${id}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("access_token")
                }
            }).then(res => {
                console.log(res);
                if (res.status == 204) {
                    setQUpdate(true)
                }
            }).catch(err => {
                console.log(err);
                setQUpdate(false)
            })
        }
    }





    function handleSubmit(event) {
        event.preventDefault()
        let validation = true
        let temp = {}
        if (!shippingDetails) {
            temp.shippingDetails = "required"
            validation = false
        }
        if (!cardName) {
            temp.cardName = "required"
            validation = false
        }
        if (!cardNumber) {
            temp.cardNumber = "required"
            validation = false
        }
        if (!expDate) {
            temp.expDate = "required"
            validation = false
        }
        if (!cvc) {
            temp.cvc = "required"
            validation = false
        }

        setErrors(temp)

        let ids = []
        cartItems.forEach(cartItem => {
            ids.push(cartItem._id)
        })

        if (validation) {

            if (cartItems) {
                setSubmitting(true)
                axios.post(`${URL_Domain}/order`, {
                    "cart": cartItems,
                    "shippingDetails": shippingDetails
                }, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("access_token")
                    }
                }).then(res => {

                    if (res) {
                        ids.forEach(async (id) => {
                            await axios.delete(`${URL_Domain}/cart/${id}`, {
                                headers: {
                                    Authorization: "Bearer " + localStorage.getItem("access_token")
                                }
                            })

                        })
                    }

                    setSubmitting(false)
                    router.push("/orders")
                }).catch(err => {
                    // console.log(err);
                    setSubmitting(false)
                })
            }
        }
    }


    return (<main className="container pb-32 pt-32">
<h1 className={`text-2xl font-bold text-heading1 py-8 ${exo_2.className}`}>Cart Items</h1>
        <div className="flex flex-col gap-8">
            {
                cartItems?.map(item => {
                    return <div className="w-full flex gap-8 border rounded-md p-2 shadow-md relative" key={item._id}>
                        <div className="w-1/4"><Image src={DefaultBook} width={200} height={200} alt="defaultBookImage" className="object-cover w-full border rounded-md" /></div>
                        <div className="p-1">
                            <ul className={`${open_sans.className}`}>
                                <li className={`text-heading2 text-lg font-semibold ${exo_2.className}  line-clamp-2 capitalize`}>{item.bookTitle}</li>
                                <li className={`capitalize ${item.bookStatus[0] == "available" ? "bg-green-500" : "bg-red-500"} w-fit px-2 py-1 text-white border rounded-md text-sm`} >{item.bookStatus}</li>
                                <li className={`text-heading1 text-lg font-semibold`}>Quantity: <AiOutlineMinus className="inline-block bg-primary text-white border rounded-full"
                                    onClick={(e) => {


                                        handleQ(item._id, "negative")
                                    }} /> {item.quantity} <AiOutlinePlus className="inline-block bg-primary text-white border rounded-full"
                                        onClick={(e) => {

                                            handleQ(item._id, "positive")
                                        }} /></li>
                                <li className={`text-heading1 text-lg font-bold`}>Rs. {item.bookPrice * item.quantity}</li>
                            </ul>
                        </div>
                        <div className="absolute right-4 top-4 text-red-500 text-xl w-fit" onClick={(e) => {
                            handleDelete(item._id)
                        }}><AiFillDelete /></div>
                    </div>
                })
            }
        </div>

        <div className="py-8">
            <form onSubmit={handleSubmit}>
                <label className="block after:content-['*'] after:ml-0.5 after:text-red-500">Shipping Details</label>
                <textarea placeholder="Shipping Details" onChange={(event) => {
                    setShippingDetails(event.target.value)
                    if (event.target.value) {
                        setErrors({ ...errors, shippingDetails: "" })
                    }
                    else {
                        setErrors({ ...errors, shippingDetails: "required" })
                    }
                }} name="shipping_details" className="border px-2 py-1 w-full" />
                {errors.shippingDetails && <small className="text-red-500">{errors.shippingDetails}</small>}

                <h2 className="block after:content-['*'] after:ml-0.5 after:text-red-500">Payment Details</h2>
                <div className="flex flex-col md:flex-row gap-4">
                    <div>
                        <input placeholder="Name On Card" name="cardName" className="border px-2 py-1" onChange={(event) => {
                            setCardName(event.target.value)
                            if (event.target.value) {
                                setErrors({ ...errors, cardName: "" })
                            }
                            else {
                                setErrors({ ...errors, cardName: "required" })
                            }
                        }} />
                        {errors.cardName && <small className="text-red-500">{errors.cardName}</small>}
                    </div>
                    <div>
                        <input placeholder="Card Number" name="cardNumber" className="border px-2 py-1" onChange={(event) => {
                            setCardNumber(event.target.value)
                            if (event.target.value) {
                                setErrors({ ...errors, cardNumber: "" })
                            }
                            else {
                                setErrors({ ...errors, cardNumber: "required" })
                            }
                        }} />
                        {errors.cardNumber && <small className="text-red-500">{errors.cardNumber}</small>}
                    </div>
                    <div>
                        <input placeholder="YY/MM" name="expDate" className="border px-2 py-1" onChange={(event) => {
                            setExpDate(event.target.value)
                            if (event.target.value) {
                                setErrors({ ...errors, expDate: "" })
                            }
                            else {
                                setErrors({ ...errors, expDate: "required" })
                            }
                        }} />
                        {errors.expDate && <small className="text-red-500">{errors.expDate}</small>}
                    </div>
                    <div>
                        <input placeholder="CVC" name="cvc" className="border px-2 py-1" onChange={(event) => {
                            setCvc(event.target.value)
                            if (event.target.value) {
                                setErrors({ ...errors, cvc: "" })
                            }
                            else {
                                setErrors({ ...errors, cvc: "required" })
                            }
                        }} />
                        {errors.cvc && <small className="text-red-500">{errors.cvc}</small>}
                    </div>
                </div>

                <button type="submit" disabled={submitting} className="mt-8 py-1 px-4 border disabled:bg-green-300 bg-green-500 rounded-md text-white">Place Order</button>

            </form>
        </div>

    </main>

    )
}

