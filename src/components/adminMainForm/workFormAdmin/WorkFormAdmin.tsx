'use client';
import React, { useState, useCallback } from "react";
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { generateSlug } from '@/app/lib/utiis';

export default function WorkFormAdmin() {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    link: '',
    slug: ''
  });

  const [submitStatus, setSubmitStatus] = useState({success: false})

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (files.length + acceptedFiles.length > 6) {
      alert('Maximum 6 files allowed');
      return;
    }

    const newFiles = [...files, ...acceptedFiles];
    setFiles(newFiles);

    const newPreviewUrls = newFiles.map(file => URL.createObjectURL(file));
    setPreviewUrls(newPreviewUrls);
  }, [files]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp']
    },
    multiple: true,
    maxFiles: 6
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset previous errors
    setError(null);
    
    if (files.length === 0) {
      setError('Please upload at least one image');
      return;
    }

    const uploadFormData = new FormData();
    files.forEach(file => {
      uploadFormData.append('files', file);
    });

    // Add form data
    Object.entries(formData).forEach(([key, value]) => {
      uploadFormData.append(key, value);
    });

    try {
      setUploading(true);
      const response = await fetch('/api/work', {
        method: 'POST',
        body: uploadFormData
      });

      // Log full response for debugging
      console.log('Response status:', response.status);
      
      // Try to parse response body
      const responseData = await response.json();
      console.log('Response body:', responseData);

      if (!response.ok) {

        
        // Throw error with more detailed message
        throw new Error(responseData.message || 'Upload failed');
      }

      // Reset form and files
      setFiles([]);
      setPreviewUrls([]);
      setFormData({
        title: '',
        desc: '',
        link: '',
        slug: ''
      });
      setSubmitStatus({success: true});
    
      
      // Redirect to work detail page
      // router.push(`/works/${responseData.work.slug}`);
      router.refresh();

    } catch (error) {
      // More detailed error handling
      console.error('Full upload error:', error);
      
      // Set error state for user feedback
      setError(
        error instanceof Error 
          ? error.message 
          : 'An unexpected error occurred during upload'
      );
    } finally {
      setUploading(false);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    setPreviewUrls(newFiles.map(file => URL.createObjectURL(file)));
  };

  return (
    <main className="min-h-screen">
      <div className="flex flex-col space-y-5 justify-between px-6 items-center mb-[4rem]">
        <p className="flex uppercase text-[35px] font-semibold mb-10">
          Create Work
        </p>
        
        {/* Error Display */}
        {error && (
          <div className="w-full max-w-[1000px] bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Success */}
        {submitStatus.success && (<p className='text-[14px] text-text-color-green text-center items-center tracking-wide'>Create Success!!</p>)}
        <form onSubmit={handleSubmit} className="w-full max-w-[700px]">
          <div className="flex flex-col space-y-5">
            {/* Dropzone for file upload */}
            <div 
              {...getRootProps()} 
              className={`border-2 border-dashed p-6 text-center cursor-pointer ${
                isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
            >
              <input {...getInputProps()} />
              <p>
                {isDragActive 
                  ? 'Drop files here' 
                  : 'Drag & drop images, or click to select (max 6 files)'}
              </p>
            </div>

            {/* Image Previews */}
            <div className="grid grid-cols-3 gap-4 mt-4">
              {previewUrls.map((url, index) => (
                <div key={url} className="relative">
                  <Image 
                    src={url} 
                    alt={`Preview ${index + 1}`} 
                    width={150} 
                    height={150} 
                    className="object-cover rounded"
                  />
                  <button 
                    type="button"
                    onClick={() => removeFile(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>

            {/* Form Inputs */}
            <div className="flex flex-col gap-1 max-w-[1000px]">
              <p className="text-[12px] font-regular text-text-color-black">Title</p>
              <input 
                className="text-[12px] border border-gray-300 focus:border-black outline-none p-3 w-full h-[42px]" 
                type="text" 
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required 
              />
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-[12px] font-regular text-text-color-black">Description</p>
              <textarea 
                className="text-[12px] border border-gray-300 focus:border-black outline-none p-3 w-full min-h-[100px]" 
                name="desc"
                value={formData.desc}
                onChange={handleInputChange}
                required 
              />
            </div>
              
            <div className="flex flex-col gap-1">
              <p className="text-[12px] font-regular text-text-color-black">Links</p>
              <input 
                className="text-[12px] border border-gray-300 focus:border-black outline-none p-3 w-full h-[42px]" 
                type="text" 
                name="link"
                value={formData.link}
                onChange={handleInputChange}
                required 
              />
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-[12px] font-regular text-text-color-black">Slug</p>
              <input 
                className="text-[12px] border border-gray-300 focus:border-black outline-none p-3 w-full h-[42px]" 
                type="text" 
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                required 
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={uploading}
              className="w-full bg-black text-white  rounded mt-4 hover:bg-gray-950 disabled:opacity-50 p-4"
            >
              {uploading ? 'Uploading...' : 'Create Work'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}