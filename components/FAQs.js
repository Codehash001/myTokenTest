import { useState, Fragment } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
 
export default function FAQs() {
  const [open, setOpen] = useState(0);
 
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
 
  const customAnimation = {
    mount: { scale: 1 },
    unmount: { scale: 0.9 },
  };
 
  return (
    <div id='faqs'className='md:mx-16 mx-2 p-6 my-[44px] rounded-lg'data-aos="fade-up">
      <h1 className='md:text-[40px] text-[30px] bg-gradient-to-r from-rose-600 via-red-700 to-red-600 bg-clip-text text-transparent font-Archivo text-center uppercase font-semibold tracking-wide mb-8'> Frequently Asked Questions</h1>
      <Accordion open={open === 1} animate={customAnimation}>
        <AccordionHeader onClick={() => handleOpen(1)} className='text-black dark:text-white font-Archivo  text-[21px]'>
          How do I get SKLL nfts?
        </AccordionHeader>
        <AccordionBody className='text-justify dark:text-gray-300 text-gray-700 font-Archivo  text-[20px]'>
         Go to minting section and connect your wallet. Then choose the number that you need to mint and confirm the transaction.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2} animate={customAnimation} className='text-black dark:text-white font-Archivo  text-[22px]'>
        <AccordionHeader onClick={() => handleOpen(2)}>
          What is the minting price?
        </AccordionHeader>
        <AccordionBody className='text-justify dark:text-gray-300 text-gray-700 font-Archivo text-[20px]'>
        0.6 Eth per nft
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3} animate={customAnimation} className='text-black dark:text-white font-Archivo  text-[22px]'>
        <AccordionHeader onClick={() => handleOpen(3)}>
          How much is the opensea Royalty fee?
        </AccordionHeader>
        <AccordionBody className='text-justify dark:text-gray-300 text-gray-700 font-Archivo  text-[20px]'>
          5%
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 4} animate={customAnimation} className='ttext-black dark:text-whitefont-Archivo text-[21px]'>
        <AccordionHeader onClick={() => handleOpen(4)}>
          What is the total supply of SKLL NFts?
        </AccordionHeader>
        <AccordionBody className='text-justify dark:text-gray-300 text-gray-700 font-Archivo text-[20px]'>
        910 NFTs
        </AccordionBody>
      </Accordion>
    </div>
  );
}
