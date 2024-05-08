import { ReactNode } from 'react';

const ColoniesPage = (
    { children } :
    { children? : ReactNode }
    ) => {

    return (
        <>
        <p>ColoniesPage</p>
        {children}
        </>
    );
}

export default ColoniesPage