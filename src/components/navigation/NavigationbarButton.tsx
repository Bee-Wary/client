import styles from '@/styles/BottomNavigationBar/NavigationbarButton.module.scss';
import Link from 'next/link';

import { Image } from "@phosphor-icons/react/dist/ssr";

const NavigationbarButton = (
  { children, labelText = "label", route = "/", icon = <Image weight="fill" alt='fallback icon'/>} : 
  { children? : React.ReactNode, labelText? : string, route? : string, icon? : React.ReactNode}
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