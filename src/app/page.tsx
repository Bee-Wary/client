import styles from '@/styles/Beehives.module.scss';

// Arrow functions work best with hooks.
const Beehivespage = () => {
  
  return (
    <>
        {/* Define both a style from module and use tailwind classes. */}
        <h1 className={`${styles.title} m-3 text-3xl`}>Beehives</h1>
        {/* Use tailwind classes alone. */}
        <h2 className='text-dusty-green font-bold'>Welcome, User!</h2>
        {/* Use only next.module scss. */}
        <p className={styles.description}>Bee-Wary</p>
    </>
  );
}

export default Beehivespage;