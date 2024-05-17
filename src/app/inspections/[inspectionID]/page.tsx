// import styles from '@/styles/InspectionDetail.module.scss';
'use client'

import { useParams } from 'next/navigation'

const InspectionDetailPage = () => {
   const { inspectionID } = useParams<{ inspectionID : string }>();

   return (
     <>
        <p>InspectionDetailPage {inspectionID}</p>
     </>
   );
}

export default InspectionDetailPage;