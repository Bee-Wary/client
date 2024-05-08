'use client'
 
import { ReactNode } from 'react';
import { useParams } from 'next/navigation'

type Props = {
    children?: ReactNode,
}

const SensorDetailPage = ( {
        children
    } : Props ) => {
    const { id } = useParams<{ id : string }>();

    return (
        <>
        {id}
        {children}
        </>
    );
}

export default SensorDetailPage;