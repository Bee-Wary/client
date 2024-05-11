import { ReactNode } from 'react';
import { Archivo } from 'next/font/google';
import type { Metadata, Viewport } from 'next'

import BottomNavigationBar from "@/components/navigation/BottomNavigationBar";

// Set defenition for the font used in the project (and cascades to all children). 
const archivo = Archivo({ subsets: ['latin'] });
 
// Metadata for all pages.
export const metadata: Metadata = {
  title: 'Bee-Wary',
  description: 'Data and insights of your beehives in hand.',
  applicationName: 'Bee-Wary',
  authors: [{ name: 'Robbrechts Bo'},{ name: 'Grevendonk Tim'},{ name: 'Zion van der Wee'}],
  keywords: ['Bee-Wary', 'Bee', 'Wary', 'Beehive', 'Data', 'Insights', 'lab3', 'lab 3', 'project', 'Thomas More', 'Thomas More Mechelen', 'design', 'Experience design', ''],
}

// Viewport settings for all pages.
export const viewport: Viewport = {
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

// Layout that wraps all pages under it (hierachialy), becomes overwritten if a folder has anoter layout.tsx file.
const RootLayout = (
    // page parameters.
    {children,}: 
    // Parameters types.
    {children?: ReactNode}
    ) => {
      return (
        <html lang="en" className='dark'>
          <body className={`${archivo.className}`}>
              {/* Providers include UI component library provider. */}
                {/* Children is the current route active page.tsx.  */}
                {children}
                <BottomNavigationBar />
            </body>
        </html>
      );
  }

  export default RootLayout;