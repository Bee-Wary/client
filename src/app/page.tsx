import styles from '@/styles/page.module.scss';
import Link from 'next/link';
import HiveCard from '@/components/HiveCard';
import { getSummerizedBeehives } from '@/services/server/beehives/queries';
import { getAllSummerizedInspections } from '@/services/server/inspections/queries';
import { CaretRight, PlusCircle } from '@phosphor-icons/react/dist/ssr';
import { Button } from "@nextui-org/react";
import inputStyles from '@/styles/inputs/inputs.module.scss'
import HeaderButton from '@/components/HeaderButton';

export default async function Beehivespage() {
  const beehives = (await getSummerizedBeehives()).documents;
  const inspections = (await getAllSummerizedInspections()).documents;

  return (
    <main className={styles.main}>
      <section className={inputStyles.searchAndCrud}>
        <div className={inputStyles.searchField}>
          {/* Keep field for default flex spacing. */}
        </div>
        <HeaderButton 
          href="/beehives/create" 
          icon={<PlusCircle weight='fill' size={64}/>}>
            Create <br/> note
        </HeaderButton>
      </section>
      <section className={styles.itemList}>
        <div className={styles.sectionTitle}>
          <h2>Beehives</h2>
          <Link href="/beehives">View all</Link>
        </div>
        {beehives.map(doc =>
          <HiveCard
            key={doc._id}
            href={`beehives/manage/${doc._id}`}
            img="https://placehold.co/400x400/png"
            name={doc.name}
            lastInspection={doc.last_inspection ? new Date(doc.last_inspection.last_updated) : undefined}
            illness={(doc.last_inspection && doc.last_inspection.illness) ? true : false}
            location={doc.location.coordinates}
            sensor={doc.last_sensor_entry ? true : false}
            />
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
            <a href={`inspections/manage/${doc._id}`} key={doc._id}>
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