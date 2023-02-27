import Head from 'next/head';
import { useState,useEffect } from "react"
import { initOnboard } from "../ulits/onboard"
import { config } from '../dapp.config'
import {
  getTotalMinted,
  getMaxSupply,
  isPausedState,
  isPublicSaleState,
  publicMint          } from '../ulits/interact'

//REMEMBER TO ADD A LOGO

export default function Mint(){
  const [maxSupply, setMaxSupply] = useState(0)
  const [totalMinted, setTotalMinted] = useState(0)
  const [maxMintAmount, setMaxMintAmount] = useState(0)
  const [paused, setPaused] = useState(false)
  const [isPublicSale, setIsPublicSale] = useState(false)
  

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
  return (
    <div id='mint'data-aos="fade">
    <div className='flex flex-col items-center lg:mx-16 mx-2'>
        <div className='lg:w-auto w-full h-full lg:px-16 lg:py-16 filter backdrop-blur-sm rounded-lg'>

      
    <img src='/web01.png' class="hidden md:flex blob w-[500px] h-[500px]  absolute top-[-50px] right-[-250px] -z-10 blur-md  bg-opacity-50 animate-pulse-slow overflow-x-hidden"/>
    <img src='/web02.png' class=" blob w-[500px] h-[500px] absolute bottom-[-70px] left-[-280px] -z-10 blur-md bg-opacity-60 animate-pulse-slow overflow-x-hidden"/>
    

        <div className=" bg-gray-300/60 filter rounded-md flex flex-col items-center
    bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border-2 border-gray-100  md:w-auto w-full shadow-lg shadow-black/60 relative">
        <div className="flex flex-col items-center md:w-auto w-full"> 
          <div className="flex flex-col items-center w-full py-4 mt-6 md:mt-0 md:px-16 px-4">
          
          <div className='pb-4  flex flex-col items-center'>

            <h1 className="font-Kanit uppercase font-semibold text-3xl md:text-5xl bg-gradient-to-r from-pink-500 via-red-600 to-red-800 bg-clip-text text-transparent tracking-wider text-center mt-5">
            {paused ? 'Will be Live soon' : 'Minting is Live'}
            </h1>

            <h3 className="text-sm tracking-widest">
                {walletAddress
                ? walletAddress.slice(0, 8) + '...' + walletAddress.slice(-4)
                : 'Not connected'} 
                
            </h3>
          </div>
          <div className='flex flex-col'>
            <p className="text-2xl font-medium font-Kanit mt-5 tracking-wide">
                  <span className="text-red-600">{totalMinted}{'  '} </span>/<span className="text-red-600">{'  '} {maxSupply}{'  '}</span>Minted
            </p>
          </div>
          
                  
            {/* Increment decrement buttons */}
            <div className="font-Kanit flex items-center justify-between w-full mt-5">
                  <button
                    className="w-12 h-8 md:w-14 md:h-10 flex items-center justify-center text-black hover:shadow-lg bg-gray-300 font-bold rounded-md"
                    onClick={decrementMintAmount}
                    >
                     <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 md:h-8 md:w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18 12H6"
                      />
                    </svg>
                  </button>
                  <p className="flex items-center justify-center flex-1 grow text-center font-bold text-yellow-900 text-3xl md:text-4xl">
                  {mintAmount}  
                  </p>
                  <button
                    className="w-12 h-8 md:w-14 md:h-10 flex items-center justify-center text-black hover:shadow-lg bg-gray-300 font-bold rounded-md"
                    onClick={incrementMintAmount} 
                    >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 md:h-8 md:w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </button> 
                </div> 

                <h1 className='text-xl font-medium font-Kanit mt-5 tracking-wide"'>Max mint amount per wallet: {config.maxMintAmount}</h1>

                <div className="border-t border-b py-4 mt-5 w-full font-semibold">
                  <div className="w-full text-xl font-Kanit flex items-center justify-between text-yellow-900">
                    <p>Total</p>

                    <div className="flex items-center space-x-3">
                    <p>
                         {Number.parseFloat((config.publicSalePrice)*mintAmount).toFixed(
                          2
                        )} {' '} 
                       
                         ETH
                      </p>{' '}
                      <span className="text-yellow-900">+ GAS</span>
                    </div>


                  </div>
                </div>

                
                    {/* mint button */}
                     {walletAddress ? (
                  <button
                    className={` ${
                      paused || isMinting 
                        ? 'bg-gray-900 cursor-not-allowed'
                        : 'bg-gradient-to-br from-gray-900 to-black shadow-lg border border-transparent hover:shadow-black/60'
                    } font-Kanit mt-5 mb-0 font-medium w-full px-6 py-3 rounded-md text-2xl text-white  mx-4 tracking-wide uppercase border-violet-50`}
                    disabled={paused || isMinting}
                    onClick={publicMintHandler}
                  >
                    {isMinting ? 'Busy...' : 'Mint Now'}
                  </button>
                ) : ( 
                  <button
                    className='bg-gradient-to-br from-gray-900 to-black shadow-lg border border-transparent hover:shadow-black/60
                     font-Kanit mt-5 mb-0 font-medium w-full px-6 py-3 rounded-md text-2xl text-white  mx-4 tracking-wide uppercase border-violet-50'
                    onClick={connectWalletHandler}
                     >
                    Connect wallet
                  </button> 
                  )} 

{/* social media icons paste correct links down below */}
<div className="flex w-full items-center justify-evenly mt-5 px-10">
  <a className="bg-white rounded-full mx-2 shadow-lg hove:shadow-black/60 hover:rotate-12" href='https://discord.com/invite/n'>
    <img src='discord.svg' className='h-8 w-8 m-1'/>
  </a>
  <a className="bg-white rounded-full mx-2 shadow-lg hove:shadow-black/60 hover:rotate-12" href='http://www.facebook.com/'>
    <img src='facebook.svg' className='h-8 w-8 m-1'/>
  </a>
  <a className="bg-white rounded-full mx-2 shadow-lg hove:shadow-black/60 hover:rotate-12" href='https://twitter.com/'>
    <img src='twitter.svg' className='h-8 w-8 m-1'/>
  </a>
  <a className="bg-white rounded-full mx-2 shadow-lg hove:shadow-black/60 hover:rotate-12" href='https://etherscan.io/'>
    <img src='etherscansvg.svg' className='h-8 w-8 m-1'/>
  </a>
</div>

            <div className="font-Kanit max-w-screen-sm">
              {status && (
              <div
                className={`border ${
                  status.success ? 'border-green-500 text-white' : 'border-red-600 text-white'
                } rounded-md text-start h-full px-4 py-4 w-full mx-auto mt-8 md:mt-5"`}
              >
                <p className="flex flex-col space-y-2 text-sm md:text-base break-words ...">
                  {status.message}
                </p>
              </div>
            )}
            </div> 


                </div>
        </div>
      </div>
        </div>
        
    </div>
    
    </div>
  )
}

