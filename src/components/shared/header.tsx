import { Bell, DotsThree } from '@phosphor-icons/react/dist/ssr';
import styles from '@/styles/header/header.module.scss';

interface Props {
  text: string;
}

export default function Header({ text }: Props) {
  return (
    <header className={styles.header}>
      <h1>{text}</h1>
      <Bell weight="fill" />
      <DotsThree weight="regular" />
    </header>
  );
}
