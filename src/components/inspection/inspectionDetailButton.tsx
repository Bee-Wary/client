// import styles from '@/styles/InspectionDetailButton.module.scss';
import React from "react";

const InspectionDetailButton = (
   { children, inspectionTitle = "no title", inspectionID } : 
   { children? : React.ReactNode, inspectionTitle : string, inspectionID : string}
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