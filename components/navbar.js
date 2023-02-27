import Darkmodebutton from './darkmode';
import Image from 'next/image';
import {Link} from 'react-scroll/modules';
import React, { useState, useEffect } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

export default function Navbar (){

  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };
  
    return (
            <div>
            <div className="flex md:justify-between items-center justify-between font-Archivo px-2 xl:px-16 bg-transparent filter backdrop-blur-lg fixed z-[100] top-[10px]">
                <div>
                    Logo 
                </div>
                <div className='hidden md:flex'>
                    <ul className='flex font-medium'>
                        <li className="cursor-pointer mx-4 underline-none hover:underline-offset-1 hover:tracking-widest hover:textgray-700">
                            <Link className="cursor-pointer" activeClass ="active" to='home' spy={true} smooth={true} duration={500}>Home</Link>
                        </li>
                        <li className="cursor-pointer mx-4 underline-none hover:underline-offset-1 hover:tracking-widest hover:textgray-700">
                        <Link className="cursor-pointer" activeClass ="active" to='mint' spy={true} smooth={true} duration={500}>Mint</Link>
                        </li>
                        <li className="cursor-pointer mx-4 underline-none hover:underline-offset-1 hover:tracking-widest hover:textgray-700">
                        <Link className="cursor-pointer" activeClass ="active" to='contact' spy={true} smooth={true} duration={500}>Contact us</Link>
                        </li>
                        <li className="cursor-pointer mx-4 underline-none hover:underline-offset-1 hover:tracking-widest hover:textgray-700">
                        <Link className="cursor-pointer" activeClass ="active" to='faqs' spy={true} smooth={true} duration={500}>FAQs</Link>
                        </li>
                    </ul>
                    <div className='flex items-center justify-between'>
                    <div className='mx-6'>
                        <Darkmodebutton/>
                    </div>
                    <button type="button" class="text-white dark:text-black font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 rounded-sm text-sm px-5 py-2.5 text-center">Connect Wallet</button>
                </div>
                </div>
                
               

           <div onClick={handleNav}
          className=' md:hidden rounded-md p-2 bg-white mx-2 cursor-pointer' >
            <AiOutlineMenu size={18} />
          </div>

          </div>
          

      {/* Mobile Menu */}
      {/* Overlay */}
      <div className={
         nav? 'z-[120] md:hidden fixed left-0 top-0 w-full h-screen bg-gray-400/10 backdrop-filter backdrop-blur-sm' : ""
        }>
        
        {/* Side Drawer Menu */}
      <div className ={
        nav? "fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-black p-10 ease-in duration-500 border-r-2"
      :'fixed left-[-100%] top-0 p-10 ease-in duration-500 h-screen'
      }>
      <div className='flex w-full items-center justify-between'>
      <Link className="cursor-pointer" acticeClass ="active" to='home' spy={true} smooth={true} duration={500}>
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
              <p className='uppercase text-[18px] text-white font-Righteous text-center'>
              SKLL
              </p>
            </div>
            <div  className='py-4 flex flex-col '>
        <ul className='uppercase text-gray-200 font-Righteous text-center'>
            <li  className='py-4 text-sm hover:text-white'>
            <Link onClick={() => setNav(false)}  className="cursor-pointer" acticeClass ="active" to='about' spy={true} smooth={true} offset={-70} duration={500}>About</Link>
            </li>
            <li  className='py-4 text-sm hover:text-white'>
              <a onClick={() => setNav(false)} className="cursor-pointer" href='/mint'>Mint</a>
            </li>
            <li  className='py-4 text-sm hover:text-white'>
            <Link onClick={() => setNav(false)} className="cursor-pointer" acticeClass ="active" to='roadmap' spy={true} smooth={true} offset={-70} duration={500}>Roadmap</Link>
            </li>
            <li  className='py-4 text-sm hover:text-white'>
            <Link onClick={() => setNav(false)} className="cursor-pointer" acticeClass ="active" to='team' spy={true} smooth={true} offset={-100} duration={500}>Team</Link>
            </li>
            
          </ul>

        </div>
        </div>
        

      </div>
  
            </div>

            
    
        
    ) 
}