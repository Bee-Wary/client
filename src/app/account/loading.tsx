import PageLoader from '@/components/shared/loader';

// Loading function that NextJS will automatically place while the page is loading.
const Loading= () => {

   return (
     <PageLoader loadingPageName="account" />
   );
}

export default Loading