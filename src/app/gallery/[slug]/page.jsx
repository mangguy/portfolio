
import { use } from 'react'
import MainInfo from '../../../components/post/MainInfo' // ปรับ path ตามโครงสร้างโปรเจคของคุณ

export async function generateMetadata({params}) {
  return {
    title: `${params.slug} - Full Stack`
  }
}  
 
export default function PostPage({ params }) {
  const slug = use(params).slug;

  return(
    <div className='min-h-screen'>
    <MainInfo slug={slug} />
  </div>
  )
  

}
