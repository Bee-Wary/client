import { ReactNode } from "react";

const AccountPage = (
  { children } :
  { children? : ReactNode }
  ) => {

   return (
     <>
      {children}
     </>
   );
}

export default AccountPage;