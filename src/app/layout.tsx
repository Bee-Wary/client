import '@mantine/core/styles.css';
import React from 'react';
import type { Metadata, Viewport } from 'next'
import { Archivo } from 'next/font/google';
import { MantineProvider } from '@mantine/core';

import BottomNavigationBar from "@/components/navigation/BottomNavigationBar";

const archivo = Archivo({ subsets: ['latin'] });
 
export const metadata: Metadata = {
  title: 'Bee-Wary',
  description: 'Data and insights of your beehives in hand.',
  applicationName: 'Bee-Wary',
  authors: [{ name: 'Robbrechts Bo'},{ name: 'Grevendonk Tim'},{ name: 'Zion van der Wee'}],
  keywords: ['Bee-Wary', 'Bee', 'Wary', 'Beehive', 'Data', 'Insights', 'lab3', 'lab 3', 'project', 'Thomas More', 'Thomas More Mechelen', 'design', 'Experience design', ''],
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout(
  // page parameters.
  {children,}: 
  // Parameters types.
  {children: React.ReactNode}) {
    return (
      <html lang="en">
          <body className={`${archivo.className}`}>
              <MantineProvider>
                  {children}
                  <BottomNavigationBar />
              </MantineProvider>
          </body>
      </html>
    );
}