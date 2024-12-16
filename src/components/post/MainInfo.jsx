'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

const MainInfo = ({ slug }) => {  // รับ slug โดยตรงแทน params
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true) //เริ่มด้วยการโหลด

  
  useEffect(() => {
    async function fetchPost() {
      if (!slug) {
        setError('Slug is required');
        setLoading(false)
        return;
      }

      try {
        const response = await fetch(`/api/posts/${slug}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch post');
        }

        const data = await response.json();
        if (!data) {
          throw new Error('No data received');
        }

        setPost(data);
        
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false)
      }
    }

    fetchPost();
  }, [slug]);

  const [isLiked, setIsLiked] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedLikeState = localStorage.getItem(`isLiked-${slug}`);
      return savedLikeState === 'true';
    }
    return false;
  });

  const [likeCount, setLikeCount] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedLikeCount = localStorage.getItem(`likeCount-${slug}`);
      return savedLikeCount ? parseInt(savedLikeCount, 10) : 0;
    }
    return 0;
  });

  const handleLikeClick = () => {
    const newLikeState = !isLiked;
    setIsLiked(newLikeState);

    const newLikeCount = newLikeState ? likeCount + 1 : likeCount - 1;
    setLikeCount(newLikeCount);

    if (typeof window !== 'undefined') {
      localStorage.setItem(`isLiked-${slug}`, newLikeState.toString());
      localStorage.setItem(`likeCount-${slug}`, newLikeCount.toString());
    }
  };

  if (loading) {
    return (
      <div className="text-[20px] flex justify-center items-center h-[50vh] font-medium">
        Loading...
      </div>
    );
  }


  if (error) {
    return (
      <div className='text-red-500 flex justify-center m-auto mb-[30rem] items-center font-semibold'>
        Error: {error}
      </div>
    );
  }

  if (!post) {
    return (
      <div className='text-[20px] flex justify-center m-auto mb-[30rem] items-center font-semibold'>
        Post not found
      </div>
    );
  }

  return (
    <>
    
    {/* Header */}
    <div className='flex justify-between md:gap-4  gap-[1rem] items-center mb-[2rem] px-6 md:px-6 xl:px-0'>
      <label className=' text-[15px] w-[380px] md:text-[20px] lg:text-[30px] font-semibold md:w-full '>
        {post.full_title}
      </label>
      <div className='flex gap-0.2 px-10'>
        <button  onClick={handleLikeClick} className="flex-shrink-0 transition-colors duration-200 ease-in-out" aria-label={isLiked ? 'Unlike' : 'Like'} >
          <svg width="25" height="22"  viewBox="0 0 25 22" fill={isLiked ? "black" : "none"}  xmlns="http://www.w3.org/2000/svg" >
            <path 
              fillRule="evenodd" 
              clipRule="evenodd" 
              d="M21.876 7.79177C21.876 13.5158 12.5014 18.3334 12.5014 18.3334C12.5014 18.3334 3.12598 13.4446 3.12598 7.80337C3.12598 5.50011 5.20931 3.66677 7.81348 3.66677C10.4176 3.66677 12.501 6.41677 12.501 6.41677C12.501 6.41677 14.5843 3.66677 17.1885 3.66677C19.7926 3.66677 21.876 5.50011 21.876 7.79177Z" 
              stroke="black" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          </svg>
        </button>
        {likeCount > 0 && ( <label className='ml-2 text-[16px] font-regular'>{likeCount}</label>)}
      </div>

    </div>


    {/* Date Location */}
    <div className='flex space-x-2 md:gap-4 items-center mb-[2rem] md:mb-[5rem] px-6 md:px-6 xl:px-0'>
      <label>
        <img src={post.image[0]} alt="Logo" className=' h-[30px] w-[30px] md:w-[40px] md:h-[40px] rounded-full shadow-md '/>
      </label>   
      <label className='text-[12px] lg:text-[16px] font-regular '>{post.date}</label>
    </div>


    {/* image   */}
    <div className='grid md:grid-cols-4 gap-x-10 md:px-6 xl:px-0 px-6 '>
      <div className='col-span-2 gap-10'>
        <div className='md:gap-4 grid gap-2 '>
          <div>
            <Image src={post.image[1]} width={300} height={280} alt={`Image For ${post.title}`} className=' w-full h-[300px] lg:h-[400px] object-cover'/>
          </div>

          <div className='grid grid-cols-3 gap-4 mb-[2rem] md:px-auto'>
            <div>
              <Image src={post.image[2]} width={300} height={280} alt="Techsauce" className='w-full md:h-[150px] xl:h-[200px] object-cover h-[100px]'/>
            </div>
            <div>
              <Image src={post.image[3]} width={300} height={280} alt="Techsauce" className=' w-full md:h-[150px] xl:h-[200px] object-cover h-[100px] '/>
            </div>
            <div>
              <Image src={post.image[4]} width={300} height={280} alt="Techsauce" className=' w-full md:h-[150px] xl:h-[200px] object-cover h-[100px]'/>
            </div>
          </div>
        </div>
      </div>

      
      {/* Infomation */}
      <div className='col-span-2 flex flex-col md:px-6'>
        <div className='border-b border-gray-100 pb-4 mb-8 items-start'>
          <p className='lg:text-[24px] text-[14px] mt-4 md:mt-0 font-semibold md:text-[18px] uppercase leading-relaxed'>{post.title}</p>
          {/* <label className='text-sm  font-regular  md:px-1 hidden md:block tracking-normal leading-relaxed '>{post.inspi}</label> */}
        </div>
        <label className='text-[12px] lg:text-[16px] font-light mb-[3rem]  tracking-normal leading-loose '>{post.desc}</label>
      </div>

    </div>
  </>
  )
}

export default MainInfo

