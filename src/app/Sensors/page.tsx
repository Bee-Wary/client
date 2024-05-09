import { FC, ReactNode } from 'react';

interface Props {
    children? : ReactNode;
}

// Page function:
const SensorsPage :FC<Props> = ( 
    { children }
    ) => {

    return (
        <>
        <p>SensorsPage</p>
        {children}
        </>
    );
}

export default SensorsPage;