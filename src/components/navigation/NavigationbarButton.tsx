import styles from '@/styles/BottomNavigationBar/NavigationbarButton.module.scss';
import Link from 'next/link';

import { Image } from "@phosphor-icons/react/dist/ssr";

const NavigationbarButton = ({ ...props }) => {
  console.log({...props});
  
  //   Set defaults for the needed props in case of empty passed values.
  const icon = props.icon ? props.icon : <Image weight="fill" alt='fallback icon'/>;
  const route = props.route ? props.route : '/';
  const labelText = props.children ? props.children : 'Label';

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