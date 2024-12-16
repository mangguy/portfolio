import React, { useState } from 'react'
import Image from 'next/image'

interface Work {
    _id: string;
    slug: string;
    thumbnail: string;
    title: string;
    desc: string;
}

const AllPostsWork: React.FC<{ work: Work }> = ({ work }) => {
    const [error, setError] = useState<string | null>(null);
    const [deleteSuccess, setDeleteSuccess] = useState<string | null>(null);

    // function สำหรับ update
    const handleUpdateWork = async () => {

        try {

            const response = await fetch(`api/work/${work.slug}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response) {
                throw new Error('fetch PUT work error')
            }

            alert('Work updated successfully!');



        } catch (error) {
            setError(`handle delete falied: ${error}`)
        }
    }


    const handleDeleteWork = async () => {

        // function สำหรับ delete 
        const confirmDelete = confirm(`Are You Sure For Delete ${work.slug}`)
        if (!confirmDelete) return;


        try {
            // fetchData 
            const response = await fetch(`api/work/${work.slug}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                setError(`Fetch api Failed`)
            }

            setDeleteSuccess('Delete Success!!')


        } catch (error) {
            setError(`${error}`)
        }

    }



    if (error) return <div className='text-[18px] text-red-500'>Error: {error}</div>

    if (deleteSuccess)
        return <div className='text-[14px] text-text-color-green text-center items-center tracking-wide'>Delete Success!!</div>


    return (
        <div className='flex gap-10 px-2 justify-between items-center'>
            {/* thumnail */}
            <div className='flex gap-10 space-y-2 items-start'>
                <Image className='max-w-[200px] object-cover max-h-[150px] rounded-sm shadow-sm mr-6' src={work.thumbnail} width={300} height={280} alt={`Thumbnail Iamge for ${work.title}`} />
                <div className='flex flex-col space-y-1'>
                    <p className='text-text-color-black-100 font-semibold text-[16px] uppercase'>{work.title}</p>
                    <p className='text-gray-800 font-regular text-[12px]'>{work.desc}</p>
                </div>

            </div>

            {/* button */}
            <div className='flex space-x-10 items-center'>
                <button onClick={handleUpdateWork} className='text-green-500 font-[12px] '>Edit</button>
                <button onClick={handleDeleteWork} className='text-red-500 font-[12px]'>Delete</button>
            </div>
        </div>

    )
}

export default AllPostsWork
