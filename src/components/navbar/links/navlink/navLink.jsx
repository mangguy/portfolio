"use client"


import React from 'react'
import Link from 'next/link'
import style from './navLink.module.css'
import { usePathname } from 'next/navigation'


const NavLink = ({item}) => {

const pathName = usePathname()
  return (

    <Link href={item.path} className={`${style.container} ${pathName === item.path && style.active }`}>{item.title}</Link>
  )
}

export default NavLink
