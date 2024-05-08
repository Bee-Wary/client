import { ReactNode } from 'react';

// Children can be any node type (less type safe)
type Props = {
    id: number,
    // Optional properties:
    text?: string,
    // Children defenition:
    children?: ReactNode,
}

const SensorDetailPage = ( {
        id,
        text = 'default value SensorDetailPage',
        children
    } : Props ) => {

    return (
        <>
        {id}
        {text}
        {children}
        </>
    );
}

export default SensorDetailPage;