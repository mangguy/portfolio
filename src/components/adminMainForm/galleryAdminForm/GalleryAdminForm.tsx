'use client'
import React, { useState, useCallback } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { generateSlug } from '@/app/lib/utiis';
import { useDropzone } from 'react-dropzone';



export default function GalleryAdminForm() {

    const router = useRouter();
    const [submitStatus, setSubmitStatus] = useState({ success: false })
    const [files, setFiles] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        full_title: '',
        desc: '',
        inspi: '',
        slug: '',
        date: ''
    });


    //   ตั้งค่า dropzone ให้ maxfile -> 8
    const onDrop = useCallback((acceptedFiles: File[]) => {

        // ถ้า uploadFile > 8 ให้return
        if (files.length + acceptedFiles.length > 9) {
            return setError('Maximum 8 files allowed')
        }

        // เก็บ newfiles แบบ array แล้ว setFile เพื่่อส่งไปยัง server ผ่าน api route
        const newFiles = [...files, ...acceptedFiles];
        setFiles(newFiles);

        //
        const newPreviewUrls = newFiles.map(file => URL.createObjectURL(file));
        setPreviewUrls(newPreviewUrls);
    }, [files]);


    // ตั้งค่า type files upload
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: true,
        maxFiles: 8,
        accept: {
            'image/jpeg': ['.jpg', '.jpeg'],
            'image/png': ['.png'],
            'image/webp': ['.webp']
        },

    });

    //handleChangeInput ดึงค่าใน input
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
          ...prev,
          [name]: value,
          ...(name === 'title' && { slug: generateSlug(value) })
        }));
        // Clear any previous errors when user starts typing
        setError(null);
      };


    // handlesubmit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError(null);

        // Check file === 0 retun
        if (files.length === 0) {
            setError('Please upload at least one image')
            return
        }

        const uploadFormData = new FormData();
        files.forEach(file => {
            uploadFormData.append('files', file)
        })

        // เพิ่ม form data
        Object.entries(formData).forEach(([key, value]) => {
            uploadFormData.append(key, value);
        });


        // ส่งค่าไปยัง database โดยการ fetch api router
        try {
            setUploading(true);

            const response = await fetch(`/api/posts`, {
                method: 'POST',
                body: uploadFormData
            });

            // เช็คค่า response 
            console.log('Response status:', response.status);

            // แปลงค่าให้เป็ฯ json
            const responseData = await response.json();
            console.log('Response body:', responseData);

            if (!response.ok) {
                throw new Error(responseData.message || 'Upload failed')
                
            }


            // Reset ค่า From เมื่อ upload าำเร็จ
            setFiles([]);
            setPreviewUrls([]);
            setFormData({
                title: '',
                full_title: '',
                desc: '',
                inspi: '',
                slug: '',
                date: ''
            });

            setSubmitStatus({ success: true })

            // Re Input 
            router.refresh();


        } catch (error) {
            console.error('Full upload error:', error);

            // set stste user feedback
            setError(error instanceof Error ? error.message : 'An unexpected error occurred during upload');
        } finally {
            setUploading(false)
        }
    }


    // set ปุ่มลบ remove
    const removeFile = (index: number) => {
        const newFiles = files.filter((_, i) => i !== index);
        setFiles(newFiles);
        setPreviewUrls(newFiles.map(file => URL.createObjectURL(file)));
      };

    return (

        <div className="container mx-auto p-4">
            <p className='flex items-center uppercase text-[30px] font-semibold mb-10 justify-center px-6'>Gallery POST</p>


            <form onSubmit={handleSubmit} className="space-y-10 flex flex-col sm:items-center items-start max-w-[700px] m-auto">

                {/* Error Display */}
                    {error && (
                        <div className='sm:px-6 px-2 w-full flex justify-center relative '>
                            <div className='  bg-red-100 border border-red-400 text-red-700 rounded px-6 py-2' role="alert" >
                            <span className="block sm:inline text-[12px] ">{error}</span>
                        </div>
                        </div>
                    )}
  
                {/* Success */}
                {submitStatus.success && (<div className='sm:px-6 px-2 w-full flex justify-center relative '>
                            <div className='  bg-green-100 border border-green-400 text-green-700 rounded px-6 py-2' role="alert" >
                            <span className="block sm:inline text-[12px] ">Create Success!!</span>
                        </div>
                        </div>)}


                {/* Text Inputs */}
                <div className="flex flex-col space-y-5 justify-between sm:px-6 px-2 w-full ">
                    <div>

                        <label htmlFor="title" className="text-sm font-regular text-text-color-black block mb-2 "> Tittle </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="text-[12px] border border-gray-300 focus:border-black p-4 w-full h-10 outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="full_title" className="text-sm font-regular text-text-color-black block mb-2"> Full Tittle </label>
                        <input
                            type="text"
                            id="full_title"
                            name="full_title"
                            value={formData.full_title}
                            onChange={handleInputChange}
                            className="text-[12px] border border-gray-300 focus:border-black p-4 w-full h-10 outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="date" className="text-sm font-regular text-text-color-black block mb-2"> Location Date </label>
                        <input
                            type="text"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            className="text-[12px] border border-gray-300 focus:border-black p-4 w-full h-10 outline-none"
                            required
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label htmlFor="desc" className="text-sm font-regular text-text-color-black block mb-2"> Description </label>
                        <textarea
                            id="desc"
                            name="desc"
                            value={formData.desc}
                            onChange={handleInputChange}
                            className="p-4 mt-1 block w-full text-[12px] overflow-auto resize-y border  border-gray-300  outline-none focus:border-black "
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="inspi" className="text-sm font-regular text-text-color-black block mb-2">Inspiration</label>
                        <input
                            type="text"
                            name="inspi"
                            value={formData.inspi}
                            onChange={handleInputChange}
                            className="text-[12px] border border-gray-300 focus:border-black p-4  h-10 w-full outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="slug" className="text-sm first-line:font-regular text-text-color-black block mb-2"> Slug </label>
                        <input
                            type="text"
                            name="slug"
                            value={formData.slug}
                            onChange={handleInputChange}
                            className="text-[12px] border border-gray-300 focus:border-black p-4 w-full h-10 outline-none"
                            required

                        />
                    </div>

                    {/* Image Previews */}
                    <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">

                        {previewUrls.map((url, index) => (
                            <div key={url} className="relative h-[200px] w-full drop-shadow-lg ">
                                <Image
                                    src={url}
                                    alt={`Preview ${index + 1}`}
                                    width={150}
                                    height={150}
                                    className="object-cover w-full h-full"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeFile(index)}
                                    className="absolute top-2 right-2 bg-black text-white px-2 py-1 text-[12px] font-medium"
                                >
                                    X
                                </button>
                            </div>
                        ))}

                        {/* Dropzone for file upload */}
                        <div
                            {...getRootProps()}
                            className={`flex items-center border-2 w-full h-[200px] border-dashed p-6 text-center cursor-pointer ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                                }`}
                        >
                            <input {...getInputProps()} />
                            <p>
                                {isDragActive
                                    ? 'Drop files here'
                                    : 'Drag & drop images (max 6 files)'}
                            </p>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className='flex items-center justify-center w-full mt-[2rem]'>
                        <button type="submit" disabled={uploading} className="px-4 py-3 bg-text-color-black text-text-color-white w-full uppercase shadow-lg text-[12px]"> {uploading ? 'Uploadimg...' : 'Create Post'} </button>
                    </div>
                </div>
            </form>
        </div>
    )
}


