import React from 'react'
import GalleryForm from '../../components/post/GalleryForm'


export const metadata = {
  title: 'Gallery - Full Stack',
  description: 'Explore the world of full-stack development with powerful tools, resources, and projects for web and app development.'
}

const GalleryPage = () => {

  return (

    <div className='min-h-screen'> 
      <GalleryForm /> 
    </div>


  )

}

export default GalleryPage
