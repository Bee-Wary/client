import styles from '@/styles/loader/loading.module.scss';
import { ReactNode } from "react";

// General loader used in all page loading
const PageLoader = (
   { loadingPageName = "page", children } :
   { loadingPageName? : string, children? : ReactNode }
   ) => {

   return (
     <>
        <p className={styles.container}>Loading {loadingPageName}...</p>
     </>
   );
}

export default PageLoader