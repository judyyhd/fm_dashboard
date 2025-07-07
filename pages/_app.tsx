import type { AppProps } from 'next/app';
import { DashboardProvider } from '@/contexts/DashboardContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DashboardProvider>
      <Component {...pageProps} />
    </DashboardProvider>
  );
}

export default MyApp;
