import '../styles/globals.css'
import { WalletBalanceProvider } from '../context/useWalletBalance'
import dynamic from 'next/dynamic'

function MyApp({ Component, pageProps }) {

  const WalletConnectionProvider = dynamic(
    () => import('../context/WalletConnectionProvider'),
    { ssr: false },
  )


  return (
      <WalletConnectionProvider>
          <WalletBalanceProvider>
                <Component {...pageProps} />
          </WalletBalanceProvider>
      </WalletConnectionProvider>
  )
}

export default MyApp
