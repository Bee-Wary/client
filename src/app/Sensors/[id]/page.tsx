import { ReactNode } from 'react';
import { useRouter } from 'next/router';

type Props = {
    children?: ReactNode,
}

const SensorDetailPage = ( {
        children
    } : Props ) => {
    const router = useRouter();
    const { id } = router.query; // get id from the route


    return (
        <>
        {id}
        {children}
        </>
    );
}

export default SensorDetailPage;