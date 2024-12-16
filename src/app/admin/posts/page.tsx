'use client';

import GalleryAdminForm from "@/components/adminMainForm/galleryAdminForm/GalleryAdminForm";
import React, { useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function AdminPostPage() {
 
  const {data: session, status} = useSession()
  const router = useRouter();


  useEffect(()=> {
    if(session && !session.user.isAdmin || status === 'unauthenticated') {
      return router.push('404')
    }

  }, [router, status, session])

  if(session && !session.user.isAdmin) {
    return null
  }

  return (
      <div className="min-h-screen">
         <GalleryAdminForm />
      </div>
     
  
  )

}
