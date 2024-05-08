import styles from '@/styles/BottomNavigationBar/NavigationbarButton.module.scss';
import Link from 'next/link';
import { ReactNode } from 'react';

import { Image } from "@phosphor-icons/react/dist/ssr";

const NavigationbarButton = (
  { children, labelText = "label", route = "/", icon = <Image weight="fill" alt='fallback icon'/>} : 
  { children? : ReactNode, labelText? : string, route? : string, icon? : ReactNode}
  ) => {

   return (
     <>
     <Link href={{pathname: route}} className={styles.outerBox}>
          <div className={styles.icon}>
            {/* Define a dynamic Icon component with sizing. */}
            {icon}
          </div>
          <p className={styles.content}>
              {labelText}
          </p>
     </Link>
     </>
   );
}

export default NavigationbarButton