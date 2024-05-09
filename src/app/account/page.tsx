import { ReactNode } from "react";

const AccountPage = (
  { children } :
  { children? : ReactNode | undefined }
  ) => {

   return (
     <>
      {children}
     </>
   );
}

export default AccountPage;