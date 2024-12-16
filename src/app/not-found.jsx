"use client";

import React from 'react'
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="text-center bg-white p-8 rounded-xl max-w-md w-full">
        <h1 className="text-6xl font-bold text-black mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link   href="/"  className="inline-block text-white bg-black py-3 px-5 duration-200 ease-in-out transition-transform hover:scale-110 "> Return to Home </Link>
      </div>
    </div>
  )
}

export default NotFound;