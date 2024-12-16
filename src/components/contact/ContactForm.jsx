"use client"

import React, { useState } from 'react'
import style from './contact.module.css'
import { useRouter } from 'next/navigation'

const ContactForm = () => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [submitStatus, setSubmitSatus] = useState({isLoading: false, success: false, error: ''});
    const [inputErrors, setInputErrors] = useState({ name: '', email: '', phone: '', message: '' });
  
    const router = useRouter();
  
    // Handle input changes
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
  
    }
  
    // Handle form submission 
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Reset error messages
      setSubmitSatus({ isLoading: true, success: false, error: '' });
      let errors = {};
  
      if (!formData.name) errors.name = 'Name required';
      if (!formData.email) errors.email = 'Email required';
      if (!formData.phone) errors.phone = 'Phone required';
      if (!formData.message) errors.message = 'Message required';
  
      if (Object.keys(errors).length > 0) {
        setInputErrors(errors); // Set the errors
        setSubmitSatus({ isLoading: false, success: false, error: '' }); // Reset status
        return; 
      }
  
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
  
        // แปลง response เป็น json
        const result = await response.json();
  
        if (response.ok) {
          setSubmitSatus({ isLoading: false, success: true, error: '' });
  
          setFormData({
            name: '',
            email: '',
            phone: '',
            message: ''
          });
        } else {
          setSubmitSatus({ isLoading: false, success: false, error: result.message || 'Something went wrong' })
        }
  
        
        router.refresh()
  
      } catch (error) {
        console.log(error);
        setSubmitSatus({ isLoading: false, success: false, error: 'Failed to send message' });
      }
    }
  
    return (
      <main className='min-h-screen'>
        <div className='flex flex-col space-y-5 justify-between px-6 items-center mb-[4rem]'>
            <p className='flex uppercase text-[40px] font-semibold  mb-10'>contact<span className='bg-text-color-green px-2 py-0 mx-2 text-white'>Me</span></p>
          <form onSubmit={handleSubmit}>
          
          <div className='flex flex-col space-y-5 '>
          {submitStatus.success && (<p className='text-[14px] text-text-color-green text-center items-center tracking-wide'>Message sent successfully!!</p>) }
          {submitStatus.error && (<p className='text-[14px] text-red-500 text-center items-end tracking-wide'>{submitStatus.error}</p>)}
            <div className='flex flex-col gap-1'>
              <p className='text-[12px] font-regular text-text-color-black'>Name</p>
              <input type='text' name='name' value={formData.name} onChange={handleChange}  className={`${style.input} text-[12px] ${inputErrors.name ? 'border-red-500' : 'border-gray-300'}`} ></input>
              {inputErrors.name && (<p className='text-[12px] text-red-600 mt-1'>{inputErrors.name}</p>)}
            </div>
            <div className='flex flex-col gap-1'>
              <p className='text-[12px] font-regular text-text-color-black'>Email</p>
              <input type='email' name='email' value={formData.email} onChange={handleChange}   className={`${style.input} text-[12px] ${inputErrors.email ? 'border-red-500' : 'border-gray-300'}`} ></input>
              {inputErrors.email && (<p className='text-[12px] text-red-600 mt-1'>{inputErrors.email}</p>)}
            </div>
            <div className='flex flex-col gap-1 '>
              <p className='text-[12px] font-regular text-text-color-black'>Phone</p>
              <input type='tel' name='phone' value={formData.phone} onChange={handleChange}   className={`${style.input} text-[12px] ${inputErrors.phone ? 'border-red-500' : 'border-gray-300'}`} ></input>
              {inputErrors.phone && (<p className='text-[12px] text-red-600 mt-1'>{inputErrors.phone}</p>)}
            </div>
            <div className='flex flex-col gap-1'>
              <p className='text-[12px] font-regular text-text-color-black'>Message</p>
              <textarea name='message' value={formData.message} onChange={handleChange}   className={`${style.message} text-[12px] w-full overflow-hidden ${inputErrors.message ? 'border-red-500' : 'border-gray-300'}`}></textarea>
              {inputErrors.message && (<p className='text-[12px] text-red-600 mt-1'>{inputErrors.message}</p>)}
            </div>
            
            
            <button type='submit' disabled={submitStatus.isLoading} className='px-4 py-3 bg-text-color-black text-text-color-white w-full uppercase shadow-lg text-[12px] '>{submitStatus.isLoading ? 'senting...' : 'send'}</button>
          </div>
        </form>
      </div>
      </main>
    
    )
}

export default ContactForm
