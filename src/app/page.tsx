import { getSummerizedBeehives } from '@/services/beehives/queries';
import styles from '@/styles/page.module.scss';
import Link from 'next/link';
import HiveCard from '@/components/HiveCard';
import { getSummerizedInspections } from '@/services/inspections/queries';
import { CaretRight } from '@phosphor-icons/react/dist/ssr';

export default async function Beehivespage() {
  const beehives = (await getSummerizedBeehives()).documents;
  const inspections = (await getSummerizedInspections()).documents;

  return (
    <main className={styles.main}>
      <section className={styles.itemList}>
        <div className={styles.sectionTitle}>
          <h2>Beehives</h2>
          <Link href="#">View all</Link>
        </div>
        {beehives.map(doc =>
        <Link key={doc._id} href={{
          pathname: `beehives/${doc._id}`,
        }}>
          <HiveCard
            img="https://placehold.co/400x400/png"
            name={doc.name}
            lastInspection={doc.last_inspection ? new Date(doc.last_inspection.last_updated) : undefined}
            illness={(doc.last_inspection && doc.last_inspection.illness) ? true : false}
            location={doc.location.coordinates}
            sensor={doc.last_sensor_entry ? true : false}
            />
        </Link>
        )}
      </section>
      <section className={styles.itemList}>
        <div className={styles.sectionTitle}>
          <h2>Recent Notes</h2>
          <Link href="#">View all</Link>
        </div>
        <div className={styles.noteList}>
          <div>
            <span>Name</span>
            <span>Datum</span>
            <span>Status</span>
            <CaretRight weight='regular' />
          </div>
          {inspections.map(doc => 
            <a href={`inspections/${doc._id}`} key={doc._id}>
              <span>{doc.title}</span>
              <span>{new Date(doc.last_updated).toLocaleDateString()}</span>
              <span>{doc.draft ? "Draft" : "Finished"}</span>
              <CaretRight weight='regular' />
            </a>)}
        </div>
      </section>
    </main>
  );
}