import { Exo_2 } from 'next/font/google'
import BookCard from "./BookCard";


const exo_2 = Exo_2({ subsets: ['latin'] })



export default function Catalogue({ books }) {
    // console.log(books);

    return (
        <section className="pb-32 pt-16">
          
                <h1 className={`text-2xl font-bold text-heading1 py-8 ${exo_2.className}`}>Book Catalogue</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {
                        books?.map(book => {
                            return <BookCard book={book} key={book._id} />
                        })


                    }
                </div>

          
        </section>
    )
}