import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Sidebar from '../components/sidebar';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        <Component {...pageProps} />
      </main>
    </div>
  );
}
