
import React from 'react'
import NavLink from './navlink/navLink'
import style from './links.module.css'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

const links = [
    {
        title: 'Home',
        path: '/'
    },
    {
        title: 'Works',
        path: '/work'
    },
    {
        title: 'Gallery',
        path: '/gallery'
    },
    {
        title: 'About',
        path: '/about'
    },
];


const Links =  () => {
    const { data: session } = useSession();
    console.log(session);
    
    const isAdmin = session?.user?.isAdmin
    
  
    

    return (
        <>
            <div className='font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 text-base'>
                {links.map(link => ( <NavLink item={link} key={link.title}/> ))}
                {session ? (<>{isAdmin && <NavLink item={{title: 'Admin', path: '/admin'}} />} 
                    <button  onClick={() => signOut({ redirect: true, callbackUrl: '/login'})} className={`flex items-start text-base ${style.login}`}>Logout</button> </>): 
                    (<Link href="/login"></Link>) 
                }
            </div>
        </>
       
    )
}

export default Links



