import styles from '@/styles/Beehives.module.scss';
import { ColorSchemeToggle } from '@/components/shared/colorSchemeToggle';

// Arrow functions work best with hooks.
// Spread operator (...) "unpacks" all props form passed parameters.
const Beehivespage = ({...props}) => {
  
  return (
    <>
        <h1 className={styles.title}>Beehives</h1>
        <h2>Welcome, User!</h2>
        <p className={styles.description}>Footer voor Bee-Wary</p>

        <ColorSchemeToggle />

    </>
  );
}

export default Beehivespage;