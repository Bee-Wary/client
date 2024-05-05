"use client";

import styles from '@/styles/BottomNavigationBar/NavigationbarButton.module.scss';
import Link from 'next/link';

// TODO: Move the icon to the parent to pass as props.
import { Archive } from "@phosphor-icons/react";

const NavigationbarButton =({ ...props }) => {
  console.log('[Debug NavigationbarButton] rendered:', { props })
  
//   Set defaults for the needed props in case of empty passed values.
  const icon = props.icon; 
  const route = props.route ? props.route : '/';

   return (
     <>
     <Link href={route} className={styles.outerBox}>
         <div className={styles.iconAndTextBox}>
            {/* {props.icon} */}
            <div className={styles.icon}>
              <Archive weight="fill" className={styles.icon}/>
            </div>
            <p className={styles.content}>
                {props.children}
            </p>
         </div>
     </Link>
     </>
   );
}

export default NavigationbarButton