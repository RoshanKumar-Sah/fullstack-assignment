
import { Exo_2, Open_Sans } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import DefaultBook from "@/assets/defaultBook1.jpg"



const exo_2 = Exo_2({ subsets: ['latin'] })
const open_sans = Open_Sans({ subsets: ['latin'] })

export default function BookCard({ book }) {

    
    return (

        <div className="w-full h-full pb-2  border-2 border-gray-400 shadow rounded-xl  hover:border-tertiary" key={book.id}>
           
                <div className="h-3/5 relative p-2">
                    <Image src={DefaultBook} height={200} width={200} alt="bookImage" className="w-full h-full object-fill rounded-xl" />
                    <div className={`absolute flex items-center gap-1 top-4 right-4 px-2 py-1 rounded-md text-white capitalize  ${book.status[0] == "available" ? "bg-green-500" : "bg-red-500"}`}><p>{book.status[0]}</p></div>
                </div>
           
            <div className="px-2 flex flex-col justify-around  h-2/5 ">
                <div>
                    <h3 className={` text-heading2 text-lg font-semibold ${exo_2.className}  line-clamp-2 capitalize`}>{book.title}</h3>
                </div>
                <div>
                    <ul>
                        <li className={`${open_sans.className} text-heading2 text-sm capitalize`}>By {book.author}</li>
                        <li className={`${open_sans.className} text-caption text-sm`}>ISBN {book.isbn}</li>
                    </ul>
                </div>
                <div className="flex justify-between">
                    <p className={`text-heading1 text-2xl font-bold {open_sans.className}`}>Rs.&nbsp;{book.price}</p>
                    {
                        book.status[0] == "available" ? <div className={`py-1 px-2 h-fit font-medium rounded-md bg-primary text-white border hover:border-primary   hover:bg-white hover:text-primary ${open_sans.className} cursor-pointer`}>Add&nbsp;to&nbsp;cart</div>
:                     <div className={`py-1 px-2 h-fit font-medium rounded-md bg-tertiary text-white border hover:border-tertiary   hover:bg-white hover:text-tertiary ${open_sans.className} cursor-pointer`}>Coming&nbsp;Soon!</div>

                    }
                </div>
            </div>

        </div>
    )
}