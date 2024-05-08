// import styles from '@/styles/InspectionDetailButton.module.scss';
import { ReactNode } from "react";

const InspectionDetailButton = (
   { children, inspectionTitle = "no title", inspectionID } : 
   { children? : ReactNode, inspectionTitle : string, inspectionID : string}
   ) => {
   return (
     <>
        {inspectionTitle} 
        {inspectionID}
        {children}
     </>
   );
}

export default InspectionDetailButton;