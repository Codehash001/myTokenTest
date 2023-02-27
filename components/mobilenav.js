import Image from 'next/image';
import {Link} from 'react-scroll/modules';
import React, { useState, useEffect } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import Darkmodebutton from './darkmode';
import { initOnboard } from "../ulits/onboard";
import {
  getTotalMinted,
  getMaxSupply,
  isPausedState,
  isPublicSaleState,
  publicMint          } from '../ulits/interact';
  import { config } from '../dapp.config';


function Navbar () {

  const [nav, setNav] = useState(false);
  const [maxSupply, setMaxSupply] = useState(0)
  const [totalMinted, setTotalMinted] = useState(0)
  const [maxMintAmount, setMaxMintAmount] = useState(0)
  const [paused, setPaused] = useState(false)
  const [isPublicSale, setIsPublicSale] = useState(false)
  const [isConnected , setisConnected] = useState(false)
  

  const [status, setStatus] = useState(null)
  const [mintAmount, setMintAmount] = useState(1)
  const [isMinting, setIsMinting] = useState(false)
  const [onboard, setOnboard] = useState(null)
  const [walletAddress, setWalletAddress] = useState('')

  useEffect(() => {
    const init = async () => {
      setMaxSupply(await getMaxSupply())
      setTotalMinted(await getTotalMinted())

      setPaused(await isPausedState())
      const isPublicSale = await isPublicSaleState()
      setIsPublicSale(isPublicSale)

      setMaxMintAmount(
        isPublicSale ? config.maxMintAmount : '0'
      )
      
      
    }

    init()
  }, [])
  
  useEffect( () => {
    const onboardData = initOnboard( {
      address: (address) => setWalletAddress(address ? address : ''),
      wallet: (wallet) => {
        if (wallet.provider) {
          window.localStorage.setItem('selectedWallet', wallet.name)
        } else {
          window.localStorage.removeItem('selectedWallet') }}
    }
    )
  setOnboard(onboardData)
  }, [])

  const previouslySelectedWallet = typeof window !== 'undefined' &&
  window.localStorage.getItem('selectedWallet')

useEffect(() => {
  if (previouslySelectedWallet !== null && onboard) {
    onboard.walletSelect(previouslySelectedWallet)
    
  }
}, [onboard, previouslySelectedWallet])

  const connectWalletHandler = async () => {
    const walletSelected = await onboard.walletSelect()
    setisConnected(true)
    if (walletSelected) {
      await onboard.walletCheck()
      window.location.reload(false)
      
    }
    
  }
  const incrementMintAmount = () => {
    if (mintAmount < maxMintAmount) {
      setMintAmount(mintAmount + 1)
    }
  }

  const decrementMintAmount = () => {
    if (mintAmount > 1) {
      setMintAmount(mintAmount - 1)
    }
  }


  const publicMintHandler = async () => {
    setIsMinting(true)

    const { success, status } = await publicMint(mintAmount)

    setStatus({
      success,
      message: status
    })

    setIsMinting(false)
  }

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div>
    <div className='fixed z-[100] top-0 flex items-center justify-between w-full h-20 px-2 lg:px-8 bg-transparent filter backdrop-blur-md'>
          <Link className="cursor-pointer" activeClass ="active" to='home' spy={true} smooth={true} duration={500}>
          <a>
            {/* <Image
              src="/Logo.png"
              alt='/'
              width='80'
              height='80'
              className='cursor-pointer '
            /> */}
            LOGO
          </a>
        </Link>
        <div>
          <ul className='hidden md:flex font-Archivo front-medium items-center justify-betweeen '>
            <li className='mx-3 text-[18px] hover:tracking-wide hover:underline hover:underline-offset-8 font-medium'>
            <Link className="cursor-pointer" activeClass ="active" to='home' spy={true} smooth={true} offset={-70} duration={500}>Home</Link>
            </li>
            <li className='mx-3 text-[18px]  hover:tracking-wide hover:underline hover:underline-offset-8 font-medium'>
            <Link className="cursor-pointer" activeClass ="active" to='mint' spy={true} smooth={true} offset={-70} duration={500}>Mint</Link>
            </li>
            <li className='mx-3 text-[18px]  hover:tracking-wide hover:underline hover:underline-offset-8 font-medium'>
              <Link className="cursor-pointer" activeClass ="active" to='contact' spy={true} smooth={true} offset={-70} duration={500}>Contact Us</Link>
            </li>
            <li className='mx-3 text-[18px]  hover:tracking-wide hover:underline hover:underline-offset-8 font-medium'>
              <Link className="cursor-pointer" activeClass ="active" to='faqs' spy={true} smooth={true} offset={50} duration={500}>FAQs</Link>
            </li>
            {/* dark mode button and wallet button */}
          <div className='flex items-center justify-between mx-4'>
              <div className='mx-6'>
                 <Darkmodebutton/>
              </div>
             
              {isConnected ? (
                  <button
                    className='text-white dark:text-black font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 rounded-sm text-sm px-5 py-2.5 text-center'
                     >
                    Connected
                  </button>
                ) : ( 
                  <button
                    className='text-white dark:text-black font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 rounded-sm text-sm px-5 py-2.5 text-center'
                    onClick={connectWalletHandler}
                     >
                    Connect wallet
                  </button> 
                  )} 
            

          </div>
          </ul>
          </div>
          
          <div onClick={handleNav}
          className=' md:hidden rounded-md p-2 bg-white dark:bg-gray-700 mr-2 cursor-pointer' >
            <AiOutlineMenu size={18} />
          </div>

        
      
          </div>

      {/* Mobile Menu */}
      {/* Overlay */}
      <div className={
         nav? 'z-[120] md:hidden fixed left-0 top-0 w-full h-screen dark:bg-gray-400/10 bg:gray-100/10 backdrop-filter backdrop-blur-sm' : ""
        }>
        
        {/* Side Drawer Menu */}
      <div className ={
        nav? "fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-black p-10 ease-in duration-500 border-r-2"
      :'fixed left-[-100%] top-0 p-10 ease-in duration-500 h-screen'
      }>
      <div className='flex w-full items-center justify-between'>
      <Link className="cursor-pointer" activeClass ="active" to='home' spy={true} smooth={true} duration={500}>
                <a>
                  <Image
                    src="/Logoicon.png"
                    width='45'
                    height='45'
                    alt='/'
                    className="rounded-md"
                  />
                </a>
              </Link>
              <div onClick={handleNav}
              className='rounded-full bg-gray-400 hover:shadow-lg hover:shadow-gray-600 p-3 cursor-pointer '>
              <AiOutlineClose size={18} />
             </div>
          </div>
          <div className='border-b py-4 flex flex-col mt-4'>
              <p className='uppercase text-[18px] text-white font-Archivo text-center'>
              Skulls Klubs Limit Less
              </p>
            </div>
            <div  className='py-4 flex flex-col '>
        <ul className='font-Archivo text-center'>
            <li  className='py-4 text-sm text-white'>
            <Link onClick={() => setNav(false)}  className="cursor-pointer" activeClass ="active" to='home' spy={true} smooth={true} offset={-70} duration={500}>Home</Link>
            </li>
            <li  className='py-4 text-sm text-white'>
            <Link onClick={() => setNav(false)}  className="cursor-pointer" activeClass ="active" to='mint' spy={true} smooth={true} offset={-70} duration={500}>Mint</Link>
            </li>
            <li  className='py-4 text-sm text-white'>
            <Link onClick={() => setNav(false)} className="cursor-pointer" activeClass ="active" to='contact' spy={true} smooth={true} offset={-70} duration={500}>Contact Us</Link>
            </li>
            <li  className='py-4 text-sm text-white'>
            <Link onClick={() => setNav(false)} className="cursor-pointer" activeClass ="active" to='faqs' spy={true} smooth={true} offset={-100} duration={500}>FAQs</Link>
            </li>
            
          </ul>

        </div>

        <div className='flex flex-col items-center justify-between'>
                    <div className='mx-6'>
                        <Darkmodebutton/>
                    </div>
                    <button type="button" class="text-white dark:text-black font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 rounded-sm text-sm px-5 py-2.5 text-center"
             onClick={connectWalletHandler}>{walletAddress?'Connected' :'Connect Wallet'}</button>
        </div>
        </div>
        

      </div>
    </div>
  )
}

export default Navbar
