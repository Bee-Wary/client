import styles from '@/styles/BottomNavigationBar/BottomNavigationBar.module.scss';
import NavigationbarButton from './NavigationbarButton';

// NextJs server side rendered omponents cannot inherit styles from an ancestor (like IconContext) and must import from .../dist/ssr.
// https://github.com/phosphor-icons/react/blob/master/README.md#react-server-components-and-ssr 
import { Archive, FilePlus, Files  } from "@phosphor-icons/react/dist/ssr";

 const BottomNavigationBar = () => {
  return (
    <>
      <div className={styles.navigationBar}>
          <NavigationbarButton icon={<Archive weight="fill"/>} >Hives</NavigationbarButton>
          <NavigationbarButton icon={<FilePlus weight="fill"/>} route="/statistics">Add note</NavigationbarButton>
          <NavigationbarButton icon={<Files  weight="fill"/>} route="/inspections">Notes</NavigationbarButton>
      </div>
    </>
  );
}

export default BottomNavigationBar;