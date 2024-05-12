import { getAllBeehives } from '@/services/beehives/queries';
import styles from '@/styles/Beehives.module.scss';

// Arrow functions work best with hooks.
export default async function Beehivespage() {
  const data = await getAllBeehives();
  
  return (
    <>
        <h1 className={styles.title}>Beehives</h1>
        <h2>Welcome, User!</h2>
        <p className={styles.description}>Footer voor Bee-Wary</p>
        {data.documents.length}
    </>
  );
}