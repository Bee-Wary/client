import styles from '@/styles/Beehives.module.scss';

// Arrow functions work best with hooks.
// Spread operator (...) "unpacks" all props form a passed object parameter.
const Beehivespage = ({...props}) => {
  
  return (
    <>
        <h1 className={styles.title}>Beehives</h1>
        <h2>Welcome, User!</h2>
        <p className={styles.description}>Footer voor Bee-Wary</p>
    </>
  );
}

export default Beehivespage;