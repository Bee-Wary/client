import Header from '@/components/shared/header';
import { getSummerizedBeehives } from '@/services/beehives/queries';
import styles from '@/styles/Beehives.module.scss';

export default async function Beehivespage() {
  const data = (await getSummerizedBeehives()).documents;

  return (
    <>
      <Header/>
        {/* Define both a style from module and use tailwind classes. */}
        <h1 className={`${styles.title} m-3 text-3xl`}>Beehives</h1>
        {/* Use tailwind classes alone. */}
        <h2 className='text-dusty-green font-bold'>Welcome, User!</h2>
        {/* Use only next.module scss. */}
        <p className={styles.description}>Bee-Wary</p>
        {data.map(doc => 
          <p key={doc._id}>
            {doc.name}
          </p>
        )}
    </>
  );
}