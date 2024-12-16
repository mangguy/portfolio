"use client"
import WorkFormAdmin from '@/components/adminMainForm/workFormAdmin/WorkFormAdmin';
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const AdminWorkPage = () => {

    const { data: session, status} = useSession();
    const router = useRouter();

    useEffect(() => {

        //  ถ้าไม่ได้ login มา หรือ  session ยังไม่เปลี่ยน 
        if( (session && !session.user.isAdmin) || status ==='unauthenticated' ) {
            return router.push('not-found')
        }  
    }, [status, session, router])

    if (!session || !session.user.isAdmin) {
        return null;
      }
    
      
  return (
    <div>
      <WorkFormAdmin />
    </div>
  )
}

export default AdminWorkPage;
