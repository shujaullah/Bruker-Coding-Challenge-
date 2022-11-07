import '../styles/globals.css'
import Form from './components/Form'
import Head from "next/head";


export default function App({ Component, pageProps}) {

  return (
    <div className='w-100'> 
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
          crossOrigin="anonymous"
        />
      </Head>
      <div className='w-100 mt-3 d-flex justify-content-center'><Form/></div>
      {/* <Component {...pageProps} /> */}
    </div>
   )
}
