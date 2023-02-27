import data from './data.json';
import {Link} from 'react-scroll/modules';
export default function Home(){

    return (
        <div className="mt-[100px]" id='home'data-aos="fade">
        <div className="flex md:flex-row flex-col items-center lg:mx-16 md:mx-8 mx-2 justify-between">
            <div className="lg:mx-8 md:mx-4 mx-2 flex flex-col md:items-start items-center">
                <h1 className="text-gray-400 text-2xl md:mb-[-5px] md:2">Welcome To</h1>
                <ul className="font-Archivo flex md:flex-row flex-col md:items-start items-center ">
                    <li className="mx-4 text-start flex items-end">
                        <h1 className="md:text-8xl text-6xl uppercase font-bold bg-gradient-to-r from-rose-600 via-red-700 to-red-600 bg-clip-text text-transparent">S</h1>
                        <h1 className="md:text-5xl text-4xl font-medium">kull</h1>
                    </li>
                    <li className="mx-4 text-start flex items-end">
                        <h1 className="md:text-8xl text-6xl uppercase font-bold bg-gradient-to-r from-rose-600 via-red-700 to-red-600  bg-clip-text text-transparent">K</h1>
                        <h1 className="md:text-5xl text-4xl font-medium">lub</h1>
                    </li>
                    <li className="mx-4 text-start flex items-end">
                        <h1 className="md:text-8xl text-6xl uppercase font-bold bg-gradient-to-r from-rose-600 via-red-700 to-red-600  bg-clip-text text-transparent">L</h1>
                        <h1 className="md:text-5xl text-4xl font-medium">imit<span className='bg-gradient-to-r from-rose-600 via-red-700 to-red-600 bg-clip-text text-transparent'>l</span>ess</h1>
                    </li>
                </ul>
                <p className="font-Archivo mt-4 md:text-md text-justify">
                SKLL is uniquely generated characters that are designed to represent the ownership of digital assets on the Ethereum blockchain.
                SKLL tokens provide a secure, transparent, and immutable way to own, trade, and manage digital assets. With its cutting-edge technology, SKLL enables users to store and track their digital assets with greater security and efficiency. SKLL also makes it easier to manage and trade digital assets, giving users more control over their digital property.
                </p>
                <div className="w-full h-auto flex flex-col md:items-start items-center mt-8">
                <Link className="cursor-pointer" activeClass ="active" to='mint' spy={true} smooth={true} offset={-70} duration={500}>
                    <button type="button" class="flex text-white dark:text-black bg-gradient-to-r from-rose-600 via-red-700 to-red-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-semibold tracking-widest rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                    Get your SKLL now
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                    </button>
                </Link>
                </div>
            </div>
            <div className="lg:mx-8 md:mx-4 mx-2 md:mt-0 mt-2">
                <img src="/bg-gif.gif"
                className='md:w-[1000px] md:h-[350px] w-[400px] h-[500px]'/>
            </div>
        </div>
        </div>
    )
}
