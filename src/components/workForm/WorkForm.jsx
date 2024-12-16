"use client"

import WorkPage from '@/components/workForm/WorkPage'
import React, { useEffect, useState } from 'react'

const WorkForm = () => {
    const [works, setWorks] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // fetch /api/work
        const fetchWorks = async () => {
            try {
                const response = await fetch(`/api/work`, {
                    method: 'GET',

                });

                if (!response.ok) {
                    throw new Error('fetch Data failed')
                }

                const data = await response.json();

                setWorks(data);

            } catch (err) {
                setError(err.message)
            }finally {
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
        <>
            {/* headder */}
            <div className='flex justify-center items-center m-auto md:w-[680px] text-center sm:mb-[8rem] sm:w-[460px]'>
                <p className='text-[60px] font-bold text-text-color-black-100 sm:block hidden '>Coding Isn’t Just Work It’s A Way Of <span className='text-text-color-green' >Life</span></p>
            </div>

            {/* เส้น */}
            <div className='max-w-[900px] m-auto border-b border-gray-100 pb-2 mb-8 md:px-0'>
                <p className='text-[20px] font-semibold text-text-color-black-100 flex justify-center sm:justify-start'>My Works</p>
            </div>


            <div className='min-h-screen '>
                <div className='max-w-[900px] grid m-auto grid-cols-1 md:grid-cols-2 gap-10 mb-[10rem]'>
                    {Array.isArray(works) && works.length > 0 ? (works.map((work) => (<WorkPage work={work} key={work._id} />))) : null}
                </div>
                
            </div>

        </>



    )
}

export default WorkForm
