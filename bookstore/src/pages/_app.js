import '@/styles/globals.css'

import React from 'react'
import { QueryClient, QueryClientProvider, Hydrate } from '@tanstack/react-query'
import 'react-toastify/dist/ReactToastify.css';
import Header from '@/components/Header'

export default function App({ Component, pageProps }) {
  const [queryClient] = React.useState(() => new QueryClient())
  return <QueryClientProvider client={queryClient}>
    <Hydrate state={pageProps.dehydratedState}>
    <Header />
      <Component {...pageProps} />
    </Hydrate>
  </QueryClientProvider>
}
