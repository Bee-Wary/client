import { Heartbeat, Plugs, CalendarBlank, MapPin } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import styles from "@/styles/HiveCard/HiveCard.module.scss";

interface props {
    img: string;
    name: string;
    illness?: boolean;
    sensor?: boolean;
    location: [number, number];
    lastInspection?: Date;
}

export default function HiveCard({ img, name, illness, sensor, location, lastInspection }: props) {
    return (
        <article className={styles.hive}>
            <Image src={img} width={400} height={400} alt={`Image of ${name}`} />
            <div className={styles.hiveInfo}>
                <div className={styles.hiveHeader}>
                    <h3>{name}</h3>
                    {(lastInspection) && <b className={(illness ? styles.badIndicator : styles.positiveIndicator)}><Heartbeat weight='fill' /></b>}
                    {sensor && <b className={styles.positiveIndicator}><Plugs weight='fill' /></b>}
                </div>
                {lastInspection && <p><CalendarBlank weight='fill' /> <span className={styles.label}>Last checkup:</span> {lastInspection.toLocaleDateString()} | {lastInspection.toLocaleTimeString()}</p>}
                <p><MapPin weight='fill' /><span className={styles.label}>Location:</span> {location.map(c => <span key={c}>{c} </span>)}</p>
            </div>
        </article>)
}