import Image from 'next/image'

import Header from '@/components/Header'
import { URL_Domain } from '@/const/apiDomain';
import { dehydrate, QueryClient } from '@tanstack/react-query'
import Catalogue from '@/components/Catalogue';
import { useEffect, useState } from 'react';
import { Open_Sans } from 'next/font/google';
import axios from 'axios';



const open_sans = Open_Sans({ subsets: ['latin'] })
export default function Home(props) {

  // console.log(props.dehydratedState.queries[0]?.state.data);


  
const[books, setBooks] = useState()

useEffect(()=>{
  setBooks(props.dehydratedState.queries[0]?.state.data) 
},[])

function handleSubmit(event) {
  event.preventDefault()

  
  let searchTerm = event.target.value.toLowerCase()

 
      axios.get(`${URL_Domain}/book?search_term=${searchTerm}`)
      .then(res => {
          console.log(res.data)
          setBooks(res.data)
      }).catch(err =>{
          console.log(err);
      })
  
}


  return (
    <main className='container'>
     <form className="flex w-full pt-32 gap-4 sm:justify-end" >
                    <input type="text" placeholder="Search Here" onChange={handleSubmit} name="search" className={`w-full sm:w-fit p-1 border-2 outline-none border-primary rounded-md px-4 ${open_sans.className}`} />
                </form>
      <Catalogue books={books} />
    </main>
  )
}


export async function getServerSideProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['books'],
    queryFn: () =>
      fetch(`${URL_Domain}/book`).then(
        (res) => res.json(),
      ),
  })
  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}