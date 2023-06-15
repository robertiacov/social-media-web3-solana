import '../styles/globals.css'
import { WalletBalanceProvider } from '../context/useWalletBalance'
import dynamic from 'next/dynamic'
import GoogleAnalytics from '../components/GoogleAnalystics'
import CookieBanner from '../components/CookieBanner'

function MyApp({ Component, pageProps }) {

  const WalletConnectionProvider = dynamic(
    () => import('../context/WalletConnectionProvider'),
    { ssr: false },
  )


  return (
      <WalletConnectionProvider>
          <WalletBalanceProvider>
                <GoogleAnalytics GA_MEASUREMENT_ID='G-0GJZTYSMDQ'/>
                <Component {...pageProps} />
                <CookieBanner />
          </WalletBalanceProvider>
      </WalletConnectionProvider>
  )
}

export default MyApp
