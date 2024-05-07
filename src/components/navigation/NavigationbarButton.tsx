"use client";

import styles from '@/styles/BottomNavigationBar/NavigationbarButton.module.scss';
import Link from 'next/link';

// TODO: Move the icon to the parent to pass as props.
import { Image, Archive } from "@phosphor-icons/react";


const NavigationbarButton = ({ ...props }) => {
  //   Set defaults for the needed props in case of empty passed values.
  const route = props.route ? props.route : '/';
  const labelText = props.children ? props.children : 'Label';

   return (
     <>
     <Link href={{pathname: route}} className={styles.outerBox}>
          <div className={styles.icon}>
            <Archive weight="fill" size={40}/>
            {/* <Image /> */}
          </div>
          <p className={styles.content}>
              {labelText}
          </p>
     </Link>
     </>
   );
}

export default NavigationbarButton