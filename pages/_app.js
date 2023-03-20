import '../styles/globals.css'
import { WalletBalanceProvider } from '../context/useWalletBalance'

function MyApp({ Component, pageProps }) {
  return (
    <WalletBalanceProvider>
          <Component {...pageProps} />
    </WalletBalanceProvider>
  )
}

export default MyApp
