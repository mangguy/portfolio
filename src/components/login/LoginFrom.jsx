'use client'

import React, { useState }  from 'react'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation'




const LoginFrom = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({username: '', password: '', general: ''}) //state สำหรับ Error
  const [loading, setLoading] = useState(false);
  const router = useRouter();



  // สร้างลิสต์ validateInputs ไว้เรียกใช้
  const validateInputs = () => {
    const newErrors = { username: '', password: '', general: '' };
    if (!username) newErrors.username = 'Username is required.';
    if (!password) newErrors.password = 'Password is required.';
    if (!username && !password) newErrors.general = 'Invalid username or password.';
    return newErrors;
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    // เคลียร์ error ก่อนเริ่มการตรวจสอบใหม่
    setErrors({username: '', password: '', general: ''}); 
    setLoading(true);    
    
     // ตรวจสอบความถูกต้องของ Input
     const validationErrors = validateInputs();
     if (validationErrors.username || validationErrors.password) {
       setErrors(validationErrors);
       setLoading(false);
       return;
     }

    try {
      // รับค่าจาก input ส่งไปยัง api
      const res = await signIn('credentials', {
        username,
        password,
        redirect: false, //คือ login success จะไปยังpage นึง false = กำหนดเอง

      });

      // กรอกข้อมูลไม่ถูกต้อง
      if (res?.error) {
        console.error('Invalid username or password.');
        setErrors({ ...errors, general: 'Invalid username or password.' });
        return ;
      }

      
      router.push('/admin');
      router.refresh();

    } catch (error) {
      console.log(error);
      setErrors({ ...errors, general: 'An unexpected error occurred.' });
    }finally {
      setLoading(false);
    }
  }

  
  return (
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col space-y-5 justify-between px-6 items-center mb-[17rem]'>
        <p className='flex uppercase text-[40px] font-semibold  mb-10'>login</p>
        <div className='flex flex-col space-y-5 '>
          <div className='flex flex-col gap-1'>
            <p className='text-[12px] font-regular text-text-color-black'>Name</p>
            <input type='text' onChange={(e) => setUsername(e.target.value)}  className={`text-[12px] border ${ errors.username ? 'border-red-500' : 'border-gray-300'} focus:border-black p-4 w-[350px] h-[42px] outline-none`}></input>
            {errors.general ? null : (<div className="text-[12px] text-red-600 mt-1">{errors.username}</div>) }
          </div>
          
          <div className='flex flex-col gap-1'>
            <p className='text-[12px] font-regular text-text-color-black'>Password</p>
            <input type='password' onChange={(e)=> setPassword(e.target.value)}  className={`text-[12px] border ${ errors.password ? 'border-red-500' : 'border-gray-300'} focus:border-black p-4 w-[350px] h-[42px] outline-none`}></input>
            {errors.general ? (<div className="text-[12px] text-red-600 mt-0">{errors.general}</div>) : (<div className="text-[12px] text-red-600 mt-1">{errors.password}</div>) }
          </div>
          {/* General Error */}
          
          

          <button type='submit' disabled={loading} className='px-4 py-3 bg-text-color-black text-text-color-white w-full uppercase shadow-lg text-[12px] '>{loading ? 'Submitting...' : 'Submit'}</button>
        </div>

      </div>
    </form>

  )
}

export default LoginFrom;
