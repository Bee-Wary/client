// import styles from '@/styles/AdvicePage.module.scss';
import { ReactNode } from 'react';


const AdvicePage = (
  { children } : 
  { children? : ReactNode}
  ) => {

    return (
    <>
      <p>AdvicePage</p>
      {children}
    </>
    );
}

export default AdvicePage;