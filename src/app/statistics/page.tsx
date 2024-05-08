// import styles from '@/styles/Statistics.module.scss';
import { ReactNode } from 'react';

const Statisticspage = (
    { children } : 
    { children? : ReactNode }
    ) => {

    return (
    <>
      <p>Statisticspage</p>
      {children}
    </>
    );
}

export default Statisticspage;