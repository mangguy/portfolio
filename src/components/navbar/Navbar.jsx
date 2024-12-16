"use client"
import React, { useState } from 'react'
import Links from './links/Links'
import Link from 'next/link'
import { useSession  } from 'next-auth/react'





const Navbar =  () => {

  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen(!isOpen)
  }




  const handleLinkClick = () => {
    setIsOpen(false)
  }


  const { data: session } = useSession();


  return (
    <nav className="bg-white py-10 mb-3 md:mb-20">
      <div className='flex flex-wrap items-center justify-between mx-auto'>
        {session ? 
        (<><div className='font-bold sm:text-[24px] lg:block text-[18px] sm:px-0 px-4 hidden'> <Link href="/" >Mangguy</Link></div></>)
        : 
        (<><div className='font-bold sm:text-[24px] sm:block text-[18px] sm:px-0 px-4'> <Link href="/" >Mangguy</Link></div></>)}

        {/* ปุ่มเปิดเมนู */}
        <div className='col-span-6 flex justify-end md:hidden' >
          <div className='flex flex-col items-end space-y-1 sm:px-0 px-4' onClick={handleToggle}>
            <div className='w-6 h-[4px] bg-black'></div>
            <div className='w-4 h-[4px] bg-black'></div>
            <div className='w-6 h-[4px] bg-black'></div>
  
          </div>
          {/* หน้าต่าง */}
          {isOpen && (
            <div className='fixed inset-0 z-50 bg-white'>
              <nav id='navbar-default' className='flex flex-col justify-between w-full h-full px-6 py-20'>
                <div className='absolute top-10 right-6 cursor-pointer' onClick={handleToggle}>
                  <span className='text-[15px] text-black tracking-widerr uppercase font-bold'>Close</span>
                </div>
                <div className='flex flex-col items-center justify-center h-full space-y-10'>
                  <ul className='flex flex-col items-center justify-center space-y-10'>
                    <li><Link href="/" onClick={handleLinkClick} title='Home' className='text-[20px] text-black font-bold tracking-wider uppercase'>Home</Link></li>
                    <li><Link href="/work" onClick={handleLinkClick} title='Work' className='text-[20px] text-black font-bold tracking-wider uppercase'>work</Link></li>
                    <li><Link href="/gallery" onClick={handleLinkClick} title='Gallery' className='text-[20px] text-black font-bold tracking-wider uppercase'>Gallery</Link></li>
                    <li><Link href="/about" onClick={handleLinkClick} title='About' className='text-[20px] text-black font-bold tracking-wider uppercase'>About</Link></li>
                  </ul>
                  <button  className='text-white text-[20px] font-bold py-3 px-5 bg-black uppercase'>
                    <Link href="/contact" onClick={handleLinkClick}>contact</Link>
                  </button>
                </div>
              </nav>
            </div>
          )}
        

          
        </div>

        <div className='hidden w-full md:block md:w-auto'>
          <Links />
        </div>
      </div>
        
    </nav>
  )
}

export default Navbar




