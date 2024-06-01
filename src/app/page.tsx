import styles from '@/styles/page.module.scss';
import Link from 'next/link';
import HiveCard from '@/components/HiveCard';
import { getSummerizedBeehives } from '@/services/server/beehives/queries';
import { getAllSummerizedInspections } from '@/services/server/inspections/queries';
import { CaretRight, PlusCircle } from '@phosphor-icons/react/dist/ssr';
import { Button } from "@nextui-org/react";
import inputStyles from '@/styles/inputs/inputs.module.scss'

export default async function Beehivespage() {
  const beehives = (await getSummerizedBeehives()).documents;
  const inspections = (await getAllSummerizedInspections()).documents;

  return (
    <main className={styles.main}>
      <section className={inputStyles.searchAndCrud}>
        <div className={inputStyles.searchField}>
          {/* Keep field for default flex spacing. */}
        </div>
        <Link
          key={"addbeehive"} href={{
            pathname: `/beehives/create`,
          }}>
          <Button
            className={`${inputStyles.actionButton} p-3`}
            size="lg"
            endContent={<PlusCircle weight='fill' size={64} />}
          >
            Add<br />
            Beehive
          </Button>
        </Link>
      </section>
      <section className={styles.itemList}>
        <div className={styles.sectionTitle}>
          <h2>Beehives</h2>
          <Link href="#">View all</Link>
        </div>
        {beehives.map(doc =>
          <Link key={doc._id} href={{
            pathname: `beehives/manage/${doc._id}`,
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