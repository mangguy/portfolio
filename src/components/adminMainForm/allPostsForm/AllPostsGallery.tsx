import React from 'react'
import Image from 'next/image';

interface Post{
    slug: string;
    thumbnail: string;
    title: string;
    desc: string;
    inspi: string;
    date: string;
    
}

const AllPostsGallery: React.FC<{ post: Post }> = ({ post })=> {
  return (
    <div className='flex gap-10 px-2 justify-between items-center'>
                {/* thumnail */}
                <div className='flex gap-10 space-y-2 items-start'>
                    <Image className='max-w-[200px] object-cover max-h-[150px] rounded-sm shadow-sm mr-6' src={post.thumbnail} width={300} height={280} alt={`Thumbnail Iamge for ${post.title}`} />
                    <div className='flex flex-col space-y-1'>
                        <p className='text-text-color-black-100 font-semibold text-[16px] uppercase'>{post.title}</p>
                        <p className='text-gray-800 font-regular text-[12px]'>{post.date}</p>
                    </div>
    
                </div>
    
                {/* button */}
                <div className='flex space-x-10 items-center'>
                    <button  className='text-green-500 font-[12px] '>Edit</button>
                    <button  className='text-red-500 font-[12px]'>Delete</button>
                </div>
            </div>
    
  )
}

export default AllPostsGallery
