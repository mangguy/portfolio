'use client'
import React, { useEffect, useState } from 'react'
import AllPostsGallery from '@/components/adminMainForm/allPostsForm/AllPostsGallery'
import AllPostsWork from '@/components/adminMainForm/allPostsForm/AllPostsWork'

interface Post{
  _id: string;
  slug: string;
  thumbnail: string;
  title: string;
  desc: string;
  inspi: string;
  date: string;
  createdAt: string;
  
}

interface Work {
  _id: string;
  slug: string;
  thumbnail: string;
  title: string;
  desc: string;
  date: string;
  createdAt: string;
  
}

const AllPostsForm = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [works, setWorks] = useState<Work[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    // fetch /api/work
    const fetchWorks = async () => {
      try {
        const [worksResponse, postsResponse] = await Promise.all([
          fetch('/api/work'),
          fetch('/api/posts'),
        ]);

        if (!worksResponse.ok || !postsResponse.ok) {
          throw new Error('fetch Data failed')
        }

        const worksData = await worksResponse.json();
        const postsData = await postsResponse.json();

        // เรียงใหม่สุดมาก่อน 
        const sortedWorks = worksData.sort((a: Work, b: Work) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
  
        const sortedPosts = postsData.sort((a: Post, b: Post) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });

        setWorks(sortedWorks);
        setPosts(sortedPosts);

      } catch (error) {
        console.log(error)
        setError(`Fetch data Error: ${error}`)
      } finally {
        setLoading(false)
      }

    }

    fetchWorks();
  }, [])




  if (error) return <div className='text-[18px] text-red-500'>Error: {error}</div>

  if (loading) {
    return (
      <div className="text-[20px] flex justify-center items-center h-[100vh] font-medium">
        Loading...
      </div>
    );
  }


  return (

    <div className='container mx-auto p-6'>
      <p className='flex items-center uppercase text-[30px] font-semibold mb-[3rem] justify-center px-6'>All Posts</p>

      {/* Work */}
      <div className='mb-[2rem]'>
        <div className='max-w-[1200px] m-auto border-b border-gray-100 pb-2 mb-8 md:px-0'>
          <p className='text-[20px] font-semibold text-text-color-black-100 flex justify-center sm:justify-start'>Works</p>
        </div>
        {/* Map work */}
        <div className='max-w-[1200px] grid m-auto grid-cols-1 gap-10 mb-[10rem] space-y-5'>
          {Array.isArray(works) && works.length > 0 ? (works.map((work) => (<AllPostsWork work={work} key={work._id} />))) : null}
        </div>

      </div>



      {/* Gallery */}
      <div className='max-w-[1200px] m-auto border-b border-gray-100 pb-2 mb-8 md:px-0'>
        <p className='text-[20px] font-semibold text-text-color-black-100 flex justify-center sm:justify-start'>Gallery</p>
      </div>

      {/* Map Gallery */}
      {posts.length > 0 ? (
        <div className="max-w-[1200px] m-auto grid grid-cols-1 gap-10 mb-[10rem]">

          {posts.map((post) => (
            <AllPostsGallery post={post} key={post._id} />
          ))}

        </div>
      ) : (
        // If no posts, show 'No Posts' message in a center-aligned div
        <div className="min-h-screen flex justify-center items-center">
          <p className="text-[16px] font-medium text-red-500">Oops! It looks like there are no posts to display at the moment.</p>
        </div>
      )}
    </div >
  )
}

export default AllPostsForm
