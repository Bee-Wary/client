import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.scss';
import { Button } from '@mantine/core';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <>
        <Head>
          <title>Bee-Wary | Home</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={`${styles.main} ${inter.className}`}>
          <h1 className={styles.title}>Homepage</h1>
          <h2>Welcome, {user.name}!</h2>
          <Button>
            <Link href="/api/auth/logout">Logout</Link>
          </Button>
          <p className={styles.description}>Footer voor Bee-Wary</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Bee-Wary</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`${styles.main} ${inter.className}`}>
        <h1 className={styles.title}>Welcome to Bee-Wary</h1>
        <Link href="/api/auth/login">
          <Button>Login/Sign Up</Button>
        </Link>
        <p className={styles.description}>Footer voor Bee-Wary</p>
      </main>
    </>
  );
}
