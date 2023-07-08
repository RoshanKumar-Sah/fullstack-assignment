import '@/styles/globals.css'

import React, { useEffect} from 'react'
import { QueryClient, QueryClientProvider, Hydrate } from '@tanstack/react-query'
import 'react-toastify/dist/ReactToastify.css';
import Header from '@/components/Header'
import axios from 'axios';
import { URL_Domain } from '@/const/apiDomain';
import { Provider, useDispatch } from 'react-redux';
import { setUser } from '@/redux/slice/userSlice';
import store from '@/redux/store';






function App({ Component, pageProps }) {
  const [queryClient] = React.useState(() => new QueryClient())
  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      // console.log(localStorage.getItem("access_token"));
      axios.get(`${URL_Domain}/user`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token")
        }
      }).then(res => {
        // console.log(res);
        dispatch(setUser(res.data))
      }).catch(err => {
        // console.log(err);
      })
    }
  })

  
  return <QueryClientProvider client={queryClient}>
    <Hydrate state={pageProps.dehydratedState}>
      <Header />
      <Component {...pageProps} />
    </Hydrate>
  </QueryClientProvider>
}


const WithReduxProvider = (App) => {
  function Wrapper(props) {

    return <Provider store={store}>
      <App {...props} />
    </Provider>

  }

  return Wrapper
}

export default WithReduxProvider(App)