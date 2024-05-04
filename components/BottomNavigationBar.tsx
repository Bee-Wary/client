import styles from '@/styles/BottomNavigationBar/BottomNavigationBar.module.scss';

export default function BottomNavigationBar() {
  return (
    <>
      <footer className={styles.footer}>
        <ul>
          <li>hives</li>
          <li>new</li>
          <li>Stats</li>
        </ul>
      </footer>
    </>
  );
}
