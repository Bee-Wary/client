import styles from '@/styles/BottomNavigationBar/BottomNavigationBar.module.scss';
import NavigationbarButton from './NavigationbarButton';

import { Archive } from "@phosphor-icons/react";

export default function BottomNavigationBar() {
  return (
    <>
      <footer className={styles.footer}>
          <NavigationbarButton >Hives</NavigationbarButton>
          <NavigationbarButton route="/inspections">Notes</NavigationbarButton>
          <NavigationbarButton route="/statistics">Stats</NavigationbarButton>
      </footer>
    </>
  );
}
