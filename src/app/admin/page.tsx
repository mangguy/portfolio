'use client'


import AdminForm from '@/components/adminMainForm/AdminForm'
import { useSession } from 'next-auth/react';
import { useEffect} from 'react';
import { useRouter } from 'next/navigation';

const AdminPage = () => {

  const { data: session, status} = useSession();

  const router = useRouter();

  useEffect(()=> {
    // ถ้าไม่ได้ login หรือไม่ใช่ admin ให้ redirect ไปหน้า 404
    if((session && !session.user.isAdmin) || status === 'unauthenticated') {
      return router.push('not-found');
    }
  }, [status, session, router]);


  if((!session || !session.user.isAdmin) ) {
    return null;
  }

  return (
    <div className='min-h-screen'>
      <AdminForm />
    </div>
  )
}

export default AdminPage
