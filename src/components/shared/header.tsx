import { Bell, DotsThree} from "@phosphor-icons/react/dist/ssr"
import styles from '@/styles/header.module.scss';

export default function Header() {
    return (
    <header className={styles.header}>
        <h1>Welcome user</h1>
        <Bell weight="fill"/>
        <DotsThree weight="regular"/>
    </header>)
}