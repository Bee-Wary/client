import styles from '@/styles/BottomNavigationBar/NavigationbarButton.module.scss';
import Link from 'next/link';
import { ReactNode } from 'react';

import { Image } from "@phosphor-icons/react/dist/ssr";

const NavigationbarButton = (
  { children, route = "/", icon = <Image weight="fill" alt='fallback icon'/>} : 
  { children? : ReactNode, route? : string, icon? : ReactNode}
  ) => {

   return (
     <>
     <Link href={{pathname: route}} className={styles.outerBox}>
          <div className={styles.icon}>
            {/* Define a dynamic Icon component with sizing. */}
            {icon}
          </div>
          <p className={styles.content}>
              {children}
          </p>
     </Link>
     </>
   );
}

export default NavigationbarButton