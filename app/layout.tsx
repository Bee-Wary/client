import '@mantine/core/styles.css';
import React from 'react';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google';
import { createTheme, MantineProvider } from '@mantine/core';

import BottomNavigationBar from "../components/BottomNavigationBar";

const inter = Inter({ subsets: ['latin'] });

const theme = createTheme({
  fontFamily: 'Archivo Black',
  colors: {
    DustyOrange: ['#F18624', '#F18624', '#F18624', '#F18624', '#F18624', '#F18624', '#F18624', '#F18624', '#F18624', '#F18624'],
  },
  primaryColor: 'DustyOrange',
});
 
export const metadata: Metadata = {
    title: 'Bee-Wary',
    description: 'Data and insights of your beehives in hand.',
    applicationName: 'Bee-Wary',
    authors: [{ name: 'Robbrechts Bo'},{ name: 'Grevendonk Tim'},{ name: 'Zion van der Wee'}],
    keywords: ['Bee-Wary', 'Bee', 'Wary', 'Beehive', 'Data', 'Insights', ''],
    themeColor: 'dark',
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
}

export default function RootLayout({ 
    children,
 }: { 
    children: React.ReactNode
 }) {
  return (
    <html lang="en">
        <body className={`${inter.className}`}>
            <MantineProvider theme={theme}>
                {children}
                <BottomNavigationBar />
            </MantineProvider>
        </body>
    </html>
  );
}