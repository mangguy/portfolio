"use client"

import Link from 'next/link'
import React from 'react'
import Image from 'next/image'



const PostGalleryBlog = ({ post }) => {



  return (
    <main>

      <div className='px-[2rem] sm:px-0 shadow-md hover:scale-105 scale-100 duration-75 transition-transform ease-in-out'>
        <Link href={`/gallery/${post.slug}`}>
          {post.thumbnail ? (
            <Image
              src={post.thumbnail}
              alt="experienceProfile"
              className='w-full h-[280px] object-cover mb-4 shadow-md '
              width={300}
              height={280}
            />
          ) : (
            <p>Image not available</p>
          )}

          <div className='p-2 mx-2'>
            <p className='text-[12px] font-medium flex flex-row items-start '>{post.date}</p>
            <p className='text-lg font-semibold items-start text-text-color-black-100 mb-3'>{post.title}</p>
            <p className='text-[12px] font-regulartracking-wide overflow-hidden line-clamp-3 text-text-color-black-100 max-w-[400px] mb-3'>{post.desc}</p>

          </div>

        </Link>

      </div>

    </main>

  )
}

export default PostGalleryBlog
