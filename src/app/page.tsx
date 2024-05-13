import { getSummerizedBeehives } from '@/services/beehives/queries';
import styles from '@/styles/page.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, CalendarBlank } from "@phosphor-icons/react/dist/ssr";

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
          <article key={doc._id}>
            <Image src="https://placehold.co/400x400/png" width={400} height={400} alt={`Image of ${doc.name}`}/>
            <h3>{doc.name}</h3>
            {doc.last_inspection && <p><CalendarBlank weight='fill'/>{new Date(doc.last_inspection.last_updated).toLocaleDateString()} {new Date(doc.last_inspection.last_updated).toLocaleTimeString()}</p>}
            <p><MapPin weight='fill'/>Location: {doc.location.coordinates.map(c => <span key={c}>{c} </span>)}</p>
          </article>
        )}
      </section>
    </main>
  );
}