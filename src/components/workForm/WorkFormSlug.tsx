'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

interface WorkFormSlugProps {
  slug: string;
}

interface Work {
  thumbnail: string;
  title: string;
  desc: string;
  image: string[]; 
  boolean?: boolean;
}

const WorkFormSlug: React.FC<WorkFormSlugProps> = ({ slug }) => {
  const [work, setWork] = useState<Work | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!slug) {
      setError('No slug provided');
      
      return;
    }

    const fetchWork = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/work/${slug}`, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch work details');
        }

        const data: Work = await response.json();

        if (!data) {
          throw new Error('No data received');
        }

        setWork(data);
        setError(null);
      } catch (error) {
        console.error('Error:', error);
        setError(error instanceof Error ? error.message : 'An unexpected error occurred');
        setWork(null);
      } finally {
        setLoading(false)
      }
    };

    fetchWork();
  }, [slug]);

  if (loading) {
    return (
      <div className="text-[20px] flex justify-center items-center h-[50vh] font-medium">
        Loading...
      </div>
    );
  }


  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!work) {
    return null;
  }



  return (
    <main>
      <div className='max-w-[1200px] m-auto border-b border-gray-100 pb-2 mb-8 flexs flex-col '>
        <label className='text-[20px] font-semibold text-text-color-black-100 flex justify-center sm:justify-start'>
          {work.title}
        </label>
        <label className='text-[12px] font-light justify-center sm:justify-start hidden sm:block'>{work.desc}</label>
      </div>

      <div className='max-w-[1200px] m-auto'>
        
          {/* Thumbnail */}
          <div className=''>
            <Image 
              src={work.thumbnail} 
              alt="Work Thumbnail" 
              width={1200}
              height={600} 
              className='w-full object-cover'
            />
          </div>

          {/* Additional Images */}
          {work?.image && work.image.slice(0, 5).map((image, index) => (
            <Image 
              key={index}
              src={image} 
              alt={`Image ${index + 1}`} 
              width={1200} 
              height={600} 
              className='w-full object-cover'
            />
          ))}
      </div>
    </main>
  );
}

export default WorkFormSlug;