import { ReactNode } from 'react';

const ColonyDetailPage = (
    { children } :
    { children? : ReactNode }
    ) => {

    return (
        <>
        <p>ColonyDetailPage</p>
        {children}
        </>
    );
}

export default ColonyDetailPage