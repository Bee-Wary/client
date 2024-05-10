// import styles from '@/styles/InspectionDetail.module.scss';
'use client'

import { useParams } from 'next/navigation'

const InspectionDetailPage = () => {
   const { id } = useParams<{ id : string }>();

   return (
     <>
        <p>InspectionDetailPage {id}</p>
     </>
   );
}

export default InspectionDetailPage;