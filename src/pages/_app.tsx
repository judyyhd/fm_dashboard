import type { AppProps } from 'next/app'
import { DashboardProvider } from '../contexts/DashboardContext'
import '../index.css' // If you have global styles

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DashboardProvider>
      <Component {...pageProps} />
    </DashboardProvider>
  )
}
