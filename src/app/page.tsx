import { getSummerizedBeehives } from '@/services/beehives/queries';
import styles from '@/styles/page.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, CalendarBlank, Heartbeat, Plugs } from "@phosphor-icons/react/dist/ssr";
import HiveCard from '@/components/HiveCard';

export default async function Beehivespage() {
  const data = (await getSummerizedBeehives()).documents;

  return (
    <main className={styles.main}>
      <section className={styles.beehives}>
        <div className={styles.sectionTitle}>
          <h2>Beehives</h2>
          <Link href="#">View all</Link>
        </div>
        {data.map(doc =>
          <HiveCard
            key={doc._id}
            img="https://placehold.co/400x400/png"
            name={doc.name}
            lastInspection={doc.last_inspection ? new Date(doc.last_inspection.last_updated) : undefined}
            illness={(doc.last_inspection && doc.last_inspection.illness) ? true : false}
            location={doc.location.coordinates}
            sensor={doc.last_sensor_entry ? true : false}
            />
        )}
      </section>
    </main>
  );
}