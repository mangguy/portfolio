import React from 'react'

const layoutInfo = ({children}) => {
  return (
    <div>
        {/* headder */}
        <div className='flex justify-center items-center m-auto md:w-[680px] text-center sm:mb-[8rem] sm:w-[460px]'>
                <p className='text-[60px] font-bold text-text-color-black-100 sm:block hidden '>Coding Isn’t Just Work It’s A Way Of <span className='text-text-color-green' >Life</span></p>
            </div>
        {children}
    </div>
  )
}

export default layoutInfo
