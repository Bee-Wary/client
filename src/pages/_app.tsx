import '@/styles/globals.scss';
import '@mantine/core/styles.css';
import type { AppProps } from 'next/app';
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  fontFamily: 'Archivo Black',
  colors: {
    DustyOrange: ['#F18624', '#F18624', '#F18624', '#F18624', '#F18624', '#F18624', '#F18624', '#F18624', '#F18624', '#F18624'],
  },
  primaryColor: 'DustyOrange',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Component {...pageProps} />
    </MantineProvider>
  );
}
