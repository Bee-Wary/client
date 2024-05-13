import { getSummerizedBeehives } from '@/services/beehives/queries';
import styles from '@/styles/page.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, CalendarBlank, Heartbeat, Plugs } from "@phosphor-icons/react/dist/ssr";
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
          <article key={doc._id} className={styles.hive}>
            <Image src="https://placehold.co/400x400/png" width={400} height={400} alt={`Image of ${doc.name}`} />
            <div className={styles.hiveInfo}>
              <div className={styles.hiveHeader}>
                <h3>{doc.name}</h3>
                {doc.last_inspection && <b className={(doc.last_inspection.illness ? styles.badIndicator : styles.positiveIndicator)}><Heartbeat weight='fill' /></b>}
                {doc.last_sensor_entry && <b className={styles.positiveIndicator}><Plugs weight='fill' /></b>}
              </div>
              {doc.last_inspection && <p><CalendarBlank weight='fill' /> <span className={styles.label}>Last checkup:</span> {new Date(doc.last_inspection.last_updated).toLocaleDateString()} | {new Date(doc.last_inspection.last_updated).toLocaleTimeString()}</p>}
              <p><MapPin weight='fill' /><span className={styles.label}>Location:</span> {doc.location.coordinates.map(c => <span key={c}>{c} </span>)}</p>
            </div>
          </article>
        )}
      </section>
    </main>
  );
}