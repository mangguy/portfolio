import WorkFormSlug from '../../../components/workForm/WorkFormSlug';
import { notFound } from 'next/navigation';

export async function generateMetadata({params}) {
  return {
    title: `${params.slug} - Full Stack`
  }
}  
 



export default function WorkInfo({ params }) {
  if (!params.slug) {
    notFound();
  }

  return (
      <div className='min-h-screen px-6 sm:px-o'>
        <WorkFormSlug slug={params.slug} />
      </div>

  );
}