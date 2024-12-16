import React from 'react'
import HelloForm from '@/components/hello/HelloForm'

export const metadata = {
  title: "Home - Full stack",
  description: "Explore the world of full-stack development with powerful tools, resources, and projects for web and app development.",
};

const HelloPage = () => {
  return (
    <div className='min-h-screen'>
      <HelloForm />
    </div>
  )
}

export default HelloPage
