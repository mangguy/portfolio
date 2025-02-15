"use client"

import React from 'react'
import Image from 'next/image'


const AboutForm = () => {

    return (
        <>
            {/* Title Head */}
            <div className='flex flex-col items-center space-y-1 mb-[5rem] '>
                <span className='text-[20px] font-semibold text-center bg-text-color-green py-0 px-4 text-text-color-black-100 uppercase'>Full-Stack Developer</span>
                <span className='text-[60px]  font-bold text-center mb-4 uppercase text-text-color-black-100'>Guy Satayu</span>
            </div>


            <div className='flex flex-col justify-center items-center  mb-[8rem]'>

                {/* Pprofile Image */}
                <Image src="/profile/Profile.jpeg" width={300} height={280} alt="dsdsd" className=' w-[147px] h-[150px] object-cover rounded-full mb-[2rem]' />


                <div className='flex gap-3 space-x-4 items-center justify-center  mb-5'>

                    {/* Facebook */}
                    <a href="https://www.facebook.com/mangguy.dev" target='_black' aria-label='My Facebook' >
                        <svg className='w-7 h-6' width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_22_962)">
                                <path d="M15.3535 0.083313C6.87408 0.083313 0 6.64055 0 14.7291C0 21.5975 4.95735 27.3609 11.6447 28.9438V19.2049H8.47884V14.7291H11.6447V12.8006C11.6447 7.81573 14.0098 5.5052 19.1403 5.5052C20.1131 5.5052 21.7916 5.6874 22.4782 5.869V9.9259C22.1158 9.88958 21.4864 9.87142 20.7045 9.87142C18.1872 9.87142 17.2144 10.7812 17.2144 13.1462V14.7291H22.2295L21.3678 19.2049H17.2144V29.2678C24.8168 28.392 30.7077 22.2173 30.7077 14.7291C30.7071 6.64055 23.833 0.083313 15.3535 0.083313Z" fill="black" />
                            </g>
                            <defs>
                                <clipPath id="clip0_22_962">
                                    <rect width="30.7071" height="29.2917" fill="white" transform="translate(0 0.083313)" />
                                </clipPath>
                            </defs>
                        </svg>

                    </a>


                    {/* Line */}
                    <a href="https://line.me/ti/p/dYx8-aeFqS" target='_blank' aria-label='Line'>
                        <svg className='w-6 h-8' viewBox="0 0 35 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_22_964)">
                                <path fillRule="evenodd" clipRule="evenodd" d="M34.1215 14.9927C34.1215 7.49296 26.5601 1.41321 17.2326 1.41321C7.90504 1.41321 0.343506 7.49296 0.34375 14.9927C0.34375 21.6777 6.35157 27.2342 14.2628 28.3627L14.2664 28.3632C14.4522 28.3897 14.6396 28.4129 14.8275 28.4346C16.5091 28.7863 16.231 30.2377 15.9992 31.4471C15.8597 32.175 15.7371 32.8151 16.0684 33.0751C17.0831 33.8713 24.7705 28.7106 29.4409 24.376C30.1168 23.8076 30.7316 23.1919 31.2776 22.536L31.2874 22.5253C31.4177 22.3811 31.521 22.2507 31.6001 22.1326C33.1983 20.0582 34.1215 17.6123 34.1215 14.9927ZM10.8403 19.3234H7.4341C6.94959 19.3234 6.5533 18.9254 6.5533 18.4388V11.8791C6.5533 11.3926 6.94959 10.9947 7.4341 10.9947H7.50759C7.9921 10.9947 8.38839 11.3926 8.38839 11.8791V17.4807H10.8403C11.3248 17.4807 11.7211 17.8786 11.7211 18.3651V18.4389C11.7211 18.9254 11.3248 19.3234 10.8403 19.3234ZM28.5409 15.138V15.2117C28.5409 15.6981 28.1445 16.0962 27.6599 16.0959H25.2081V17.4963H27.6599C28.1445 17.4963 28.5409 17.8943 28.5409 18.3808V18.4546C28.5409 18.9411 28.1445 19.3391 27.6599 19.3391H24.2537C23.7692 19.3391 23.3729 18.9411 23.3729 18.4546V11.8949C23.3729 11.4084 23.7692 11.0105 24.2537 11.0105H27.6599C28.1445 11.0105 28.5409 11.4084 28.5409 11.8949V11.9687C28.5409 12.4552 28.1445 12.8531 27.6599 12.8531H25.2081V14.2535H27.6599C28.1445 14.2535 28.5409 14.6514 28.5409 15.138ZM21.9903 19.0598C21.938 19.1237 21.8638 19.1781 21.7757 19.2202C21.6491 19.288 21.5077 19.3235 21.3642 19.3234H21.2907C21.1726 19.3234 21.0598 19.2997 20.9565 19.2569C20.8223 19.2063 20.7017 19.1236 20.6136 19.003C20.5904 18.9748 20.5687 18.945 20.5489 18.9141L17.3423 14.5164V18.439C17.3423 18.9255 16.946 19.3236 16.4615 19.3236H16.388C15.9034 19.3236 15.5071 18.9255 15.5071 18.439V11.8794C15.5071 11.3929 15.9035 10.9949 16.388 10.9949H16.4615C16.7878 10.9949 17.0742 11.1755 17.2263 11.4422L20.41 15.7299V11.8794C20.41 11.3929 20.8063 10.9949 21.2908 10.9949H21.3643C21.8489 10.9949 22.2452 11.3929 22.2452 11.8794V18.439C22.2451 18.6714 22.1533 18.8947 21.9903 19.0598ZM13.3864 19.3234H13.3129C12.8284 19.3234 12.4319 18.9254 12.4319 18.4389V11.8792C12.4319 11.3927 12.8284 10.9948 13.3129 10.9948H13.3864C13.8709 10.9948 14.2672 11.3927 14.2672 11.8792V18.4389C14.2672 18.9254 13.8709 19.3234 13.3864 19.3234Z" fill="black" />
                            </g>
                            <defs>
                                <clipPath id="clip0_22_964">
                                    <rect width="33.7778" height="33.9167" fill="white" transform="translate(0.34375)" />
                                </clipPath>
                            </defs>
                        </svg>
                    </a>

                    {/* Gmail */}
                    <a href='/contact' target='_blank' aria-label='SendMe'>
                        <svg className='w-7 h-6' viewBox="0 0 33 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_22_963)">
                                <path d="M8.08564 31.5744H2.95616C1.7434 31.5744 0.757812 30.4945 0.757812 29.1568V8.60728C0.757812 5.6175 3.85748 3.91308 6.03385 5.70614L16.879 14.6511L27.7242 5.70614C29.8969 3.91308 33.0002 5.6175 33.0002 8.60728V29.1568C33.0002 30.4905 32.0183 31.5744 30.8019 31.5744H25.6724V17.8746L16.879 25.1274L8.08565 17.8746L8.08564 31.5744Z" fill="black" />
                            </g>
                            <defs>
                                <clipPath id="clip0_22_963">
                                    <rect width="32.2424" height="35.4583" fill="white" transform="translate(0.757812 0.541687)" />
                                </clipPath>
                            </defs>
                        </svg>
                    </a>
                </div>

                <span className='text-[12px] font-light max-w-[200px] text-center  tracking-wide '>In life, as in coding, persistence is the only way to progress</span>
            </div>


            {/*  */}
            <div className='max-w-[900px] m-auto border-b border-grey-100 pb-2 mb-4  md:px-0 '>
                <span className='text-[20px] font-semibold uppercase '>Profile </span>
            </div>
            <div className='max-w-[900px] m-auto mb-[5rem] px-6 md:px-0 '>
                <span className=' text-[18px] md:text-[12px] font-light tracking-tight md:tracking-normal leading-relaxed mb-[8rem] '>Hello, Users! My name is Satayu, but you can also call me Guy. I have experience in team collaboration, a strong passion for programming, and an eagerness for continuous learning. I constantly seek out opportunities to grow and am dedicated to delivering quality work. With a creative mindset and a love for design, my future goal is to create a platform that focuses on providing an exceptional user experience and carefully crafted interfaces.</span>
            </div>

            <div className='max-w-[900px] m-auto border-b border-grey-100 pb-2 mb-10'>
                <span className='text-[20px] font-semibold uppercase'>Skill</span>
            </div>
            <div className='max-w-[900px] m-auto mb-[5rem] px-4 md:px-0 space-y-4 '>
                <div className='flex flex-col md:grid md:grid-cols-12 gap-2 md:gap-4'>
                    <div className='md:col-span-2 '>
                        <span className='text-[18px] md:text-[12px] font-bold text-text-color-black-100'>Languages</span>
                    </div>
                    <div className='md:col-span-4'>
                        <span className='text-[16px] md:text-[12px] leading-relaxed '>Python, JavaScript, PHP</span>
                    </div>

                </div>
                <div className='flex flex-col md:grid md:grid-cols-12 gap-2 md:gap-4'>
                    <div className='md:col-span-2 '>
                        <span className='text-[18px] md:text-[12px] font-bold text-text-color-black-100'>Frameworks</span>
                    </div>
                    <div className='md:col-span-4'>
                        <span className='text-[16px] md:text-[12px] leading-relaxed'>React, Node.js, Nuxt.js, Vue.js, Next.js, Lalravel </span>
                    </div>

                </div>
                <div className='flex flex-col md:grid md:grid-cols-12 gap-2 md:gap-4'>
                    <div className='md:col-span-2 '>
                        <span className='text-[18px] md:text-[12px] font-bold text-text-color-black-100'>Tools</span>
                    </div>
                    <div className='md:col-span-4'>
                        <span className='text-[16px] md:text-[12px] leading-relaxed'>Git, GitHub, Vercel, Dooker, Visual Studio Code, Neon.tect, FIgma</span>
                    </div>

                </div>
                <div className='flex flex-col md:grid md:grid-cols-12 gap-2 md:gap-4'>
                    <div className='md:col-span-2 '>
                        <span className='text-[18px] md:text-[12px] font-bold text-text-color-black-100'>Databases</span>
                    </div>
                    <div className='md:col-span-4'>
                        <span className='text-[16px] md:text-[12px] leading-relaxed'>MySQL, MongoDB, PostgreSQL, Oracle, SQL Server</span>
                    </div>

                </div>
                <div className='flex flex-col md:grid md:grid-cols-12 gap-2 md:gap-4'>
                    <div className='md:col-span-2 '>
                        <span className='text-[18px] md:text-[12px] font-bold text-text-color-black-100'>Soft Skills</span>
                    </div>
                    <div className='md:col-span-4'>
                        <span className='text-[16px] md:text-[12px] leading-relaxed'>Strong communication skills and the ability to work effectively in a team.</span>
                    </div>

                </div>

            </div>

            {/* Trusted by */}
            <div className='max-w-[900px] m-auto border-b border-grey-100 pb-2 mb-10'>
                <span className='text-[18px] font-semibold uppercase'>Trusted by</span>
            </div>

            
            <div className='max-w-[900px] m-auto space-y-4 mb-[10rem]'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-10 mb-10 px-6 md:px-0'>
                    <div className='flex items-start gap-4'>
                        <div className='flex-shrink-0'>
                            <img src="/wordpress.jpg" alt="iconh" className='rounded-md w-[65px] h-[65px] rounded-md object-cover' />
                        </div>
                        <div className='flex flex-col space-y-2'>
                            <div className='space-y-0.2 flex flex-col'>
                                <span className='text-[18px] md:text-[12px] font-semibold md:tracking-wide'>Full stack Develope</span>
                                <span className='text-[12px] md: font-regular'>iconh.co.th</span>
                            </div>
                            <div className='flex items-center gap-1'>
                                <span className='text-[11px] font-regular'>1year</span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>






        </>

    )
}

export default AboutForm
