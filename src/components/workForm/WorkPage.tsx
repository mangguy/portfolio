"use client"

import React from 'react'
import Link from 'next/link'

interface Work {
    slug: string;
    thumbnail: string;
    title: string;
    desc: string;
}


const WorkPage: React.FC<{ work: Work }> = ({ work }) => {

    if (!work) {
        return <div>No Work data avilable</div>
    }

    return (
        <main>

            {/* Infomation */}
            <div className='scal-100 hover:scale-105 duration-75 px-6 sm:px-0'>
                <Link href={`work/${work.slug}`}>
                    <img src={work.thumbnail} alt={`Thumbnail for ${work.title}`} className='mb-5 w-full h-[250px] object-cover shadow-md' />
                    <p className='text-[14px] font-semibold text-text-color-black-100 uppercase leading-none mb-1'>{work.title}</p>
                    <p className='text-[12px] font-regular text-text-color-black-100 '>{work.desc} </p>
                </Link>

            </div>


        </main>

    )
}

export default WorkPage
