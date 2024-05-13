// import styles from '@/styles/InspectionDetailButton.module.scss';
import { ReactNode } from "react";
import { Button } from "@nextui-org/react";

const InspectionDetailButton = (
   { children, inspectionTitle = "no title", inspectionID } : 
   { children? : ReactNode, inspectionTitle : string, inspectionID : string}
   ) => {
   return (
     <>
      <Button color="secondary" radius="sm" size="lg" className='m-5'>
        {inspectionTitle} {inspectionID}
        {children}
      </Button>
     </>
   );
}

export default InspectionDetailButton;