import Head from 'next/head';
import styles from '@/styles/Home.module.scss';

export default function HomePage() {
  return (
    <>
        <h1 className={styles.title}>Homepage</h1>
        <h2>Welcome, User!</h2>
        <p className={styles.description}>Footer voor Bee-Wary</p>
    </>
  );
}