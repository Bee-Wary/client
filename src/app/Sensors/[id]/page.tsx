'use client'

 import { useParams } from 'next/navigation'

const SensorDetailPage = () => {
    const { id } = useParams<{ id : string }>();

    return (
        <>
        sensor {id}
        </>
    );
}

export default SensorDetailPage;