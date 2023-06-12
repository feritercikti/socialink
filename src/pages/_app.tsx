import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './../styles/override.css';
import { ThemeProvider } from './../ThemeContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
