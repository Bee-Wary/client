import styles from '@/styles/BottomNavigationBar/BottomNavigationBar.module.scss';
import NavigationbarButton from './NavigationbarButton';

import { IconContext, Archive  } from "@phosphor-icons/react";

export default function BottomNavigationBar() {
  return (
    <>
      <div className={styles.navigationBar}>
        {/* IconContext tag encapsulation styles all icons within it and all its children. */}
        <IconContext.Provider
          value={{
            size: 40,
            weight: "fill",
            mirrored: false,
          }}
        >
          <NavigationbarButton >Hives</NavigationbarButton>
          <NavigationbarButton route="/inspections">Notes</NavigationbarButton>
          <NavigationbarButton route="/statistics">Stats</NavigationbarButton>
        </IconContext.Provider>
      </div>
    </>
  );
}
