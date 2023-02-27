import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/mobilenav'
import Main from '../components/main'
import Slider from '../components/slide'
import Contact from '../components/contact'
import Footer from '../components/footer'
import FAQs from '../components/FAQs'
import Mint from '../components/mint'
import Base from '../components/base'


export default function Home() {
  return (
    <div>
      <Head>
        <title>Demo DAPP</title>
        <meta name="Description" content="test" />
        <link rel="icon" href="/Logoicon.png" />
      </Head>
      <Base/>
    
      <div class="dark:hidden hidden lg:flex blob w-[800px] h-[800px] rounded-[999px] absolute top-0 right-0 -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200"></div>
    <div class="dark:hidden hidden lg:flex blob w-[1000px] h-[1000px] rounded-[999px] absolute bottom-0 left-0 -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-red-200 via-gray-100 to-blue-100"></div>
    <div class="dark:hidden hidden lg:flex blob w-[600px] h-[600px] rounded-[999px] absolute bottom-0 left-0 -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-slate-100 via-teal-100 to-blue-100"></div>
    <div class="dark:hidden hidden lg:flex blob w-[300px] h-[300px] rounded-[999px] absolute bottom-[-10px] left-0 -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-green-200 via-cyan-200 to-Fuchsia-300"></div>
    </div>
  )
}
