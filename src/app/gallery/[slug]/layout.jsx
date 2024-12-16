'use client'

import React, { useState, useEffect } from 'react';

const LayoutGallery = ({ children }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const images = [
    { src: "/image/techsauce-2.jpg", alt: "techsauce global summit 2024" },
    { src: "/image/global-1.webp", alt: "techsauce global summit 2024" },
    { src: "/image/global-2.jpg", alt: "Gallery image 3" },
    { src: "/image/global-3.jpg", alt: "Gallery image 4" },
    { src: "/image/global-4.jpg", alt: "Gallery image 5" },
    { src: "/image/global-5.jpg", alt: "Gallery image 6" },
  ];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="relative w-full mb-[4rem] sm:px-0 px-[2rem]" id="gallery">
        <div className="relative overflow-hidden h-56 md:h-[500px]">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${activeSlide * 100}%)`,
            }}
          >
            {images.map((image, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Optional: Navigation Buttons */}
        <button
          type="button"
          className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={() => setActiveSlide((prev) => (prev - 1 + images.length) % images.length)}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full group-hover:bg-white/50">
            <svg
              className="w-4 h-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>

        <button
          type="button"
          className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={nextSlide}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full group-hover:bg-white/50">
            <svg
              className="w-4 h-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>

      {children}
    </>
  );
};

export default LayoutGallery;