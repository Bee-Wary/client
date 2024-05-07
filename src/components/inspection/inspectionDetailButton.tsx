// import styles from '@/styles/InspectionDetailButton.module.scss';

import { ReactNode } from "react";

const InspectionDetailButton = ({ ...props }) => {
   return (
     <>
        {props.inspectionTitle} 
        {props.inspectionID}
        {props.children}
     </>
   );
}

export default InspectionDetailButton;