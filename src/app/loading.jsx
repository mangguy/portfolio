

import React from 'react'

const loading = () => {
  return (
    <div className="h-screen flex items-center justify-center text-center">
      <div className="loader relative inline-block w-8 h-8 border-4 border-white animate-[loader_2s_infinite_ease]">
        <div className="loader-inner inline-block w-full bg-white animate-[loader-inner_2s_infinite_ease-in]"></div>
      </div>

    </div>
    
  )
}

export default loading
