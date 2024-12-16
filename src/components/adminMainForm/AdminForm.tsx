'use client'

import Link from 'next/link';
import React from 'react'


const AdminForm = () => {
 
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2  gap-4 items-center mb-[30rem] px-4 md:px-6 lg:px-12 mx-10 sm:mx-auto '>
      <Link href="/admin/allPosts" className='px-4 py-7 flex justify-center  border border-text-color-black-100 cursor-pointer hover:bg-black hover:text-white duration-100 transition-colors' >
        <p  className=' font-semibold sm:text-[20px] text-[28px]'>All Posts</p>
      </Link>

      <Link href="/admin/posts" className='px-4 py-7 flex gap-3 items-center justify-center border border-text-color-black-100 cursor-pointer hover:bg-black hover:text-white duration-100 transition-colors'>
        <p  className='sm:text-[20px] text-[28px] font-semibold'>Create New Post</p>
        <div className='text-[28px] sm:text-[20px] font-semibold'>+</div>
      </Link>

      <Link href="/admin/work" className='px-4 py-7 flex gap-3 items-center justify-center border border-text-color-black-100 cursor-pointer hover:bg-black hover:text-white duration-100 transition-colors'>
        <p  className='sm:text-[20px] text-[28px] font-semibold'>Create New Work</p>
        <div className='text-[28px] sm:text-[20px] font-semibold'>+</div>
      </Link>
    </div>
  ) 

}

export default AdminForm;
