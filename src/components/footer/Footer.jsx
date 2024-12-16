import React from 'react'

const Footer = () => {
  return (
    <div className='sm:block hidden'>
      <hr className="my-3  border-gray-100 sm:mx-auto " />
      <div className="sm:flex sm:items-center sm:justify-between mb-6">
          <span className="text-xs  sm:text-center text-text-color-black-100">Copyright © 2024 by Mangguy. All Rights Reserved.</span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            <p className='text-xs text-text-color-black-100'>made by nextjs 15</p>
          </div>
      </div>
    </div>
    
    
  )
}

export default Footer
