import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './../styles/override.css';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from './../ThemeContext';
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SessionProvider>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}
