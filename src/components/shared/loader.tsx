import styles from '@/styles/loader/loading.module.scss';

// General loader used in all page loading
const PageLoader = ({ ...props }) => {
    const loadingPageName = props.pageName ? props.pageName : 'page';

   return (
     <>
        <p className={styles.container}>Loading {loadingPageName}...</p>
     </>
   );
}

export default PageLoader