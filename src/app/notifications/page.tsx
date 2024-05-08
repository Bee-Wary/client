import { ReactNode } from 'react';

const NotificationPage = (
    { children } :
    { children? : ReactNode }
    ) => {

    return (
        <>
        <p>NotificationPage</p>
        {children}
        </>
    );
}

export default NotificationPage