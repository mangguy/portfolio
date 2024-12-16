"use client"

import React, {useState, useEffect} from 'react'
import PostGalleryBlog from '@/components/post/PostGallery'

const GalleryForm = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true)
  
  
    useEffect(() => {
  
  
      const fetchPost = async () => {
        try {
          const response = await fetch(`/api/posts`);
          if (!response.ok) {
            throw new Error('Faild to fetch posts')
          }
  
          const data = await response.json();
          setPosts(data);
  
  
        } catch (error) {
          setError(error.message)
        }finally {
          setLoading(false)
        }
      }
  
  
      fetchPost();
    }, []);
  
  
  
  
    if (error) {
      return (
        <div className='text-red-500 flex justify-center m-auto mb-[30rem] items-center font-semibold'>
          Error: {error}
        </div>
      );
    }

    if (loading) {
      return (
        <div className="text-[20px] flex justify-center items-center h-[50vh] font-medium">
          Loading...
        </div>
      );
    }
  
    return (
      <>
      {/* Header */}
        <div className='min-h-screen'>
          <div className='flex flex-col space-y-2 gap-3 items-center justify-center sm:mb-[10rem] mb-[5rem] sm:px-0 px-[1rem]'>
            <p className='text-[30px] md:text-[50px] max-w-[950px]  font-bold text-center text-text-color-black-100 '>Life Is A Journey Of Learning The More We Explore The More We Grow</p>
            <p className='text-[15px] hidden md:block font-regular text-center md:max-w-[664px] tracking-wide'>This is my learning <label className='py-0 px-3 bg-text-color-green mx-1 font-bold  uppercase'>experience</label> from participating in competitions and gaining knowledge outside the classroom, which I use to grow and strengthen my skills.</p>
          </div>
        <div>
        <div className='max-w-[900px] m-auto border-b border-gray-100 pb-2 mb-8 sm:px-0 px-[2rem] '>
            <p className='text-[20px] font-semibold text-text-color-black-100 '>Experience Posts</p>
        </div>
  
  
            {posts.length > 0 ? (
              <div className="max-w-[900px] m-auto grid grid-cols-1 md:grid-cols-2 gap-10 mb-[10rem]">
                
                  {posts.map((post) => (
                    <PostGalleryBlog post={post} key={post._id} />
                  ))}
  
              </div>
            ) : (
              // If no posts, show 'No Posts' message in a center-aligned div
              <div className="min-h-screen flex justify-center items-center">
                <p className="text-[16px] font-medium text-red-500">Oops! It looks like there are no posts to display at the moment.</p>
              </div>
            )}
          </div>
  
        </div>
  
  
  
      </>
  
  
  
    )
}

export default GalleryForm
