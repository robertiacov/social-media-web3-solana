import {useState, useEffect} from 'react'
import SignUp from '../components/SignUp'
import Feed from '../components/Feed'

import { useWallet } from '@solana/wallet-adapter-react'

const style = {
  wrapper: `bg-[#18191a] min-h-screen duration-[0.5s]`,
  homeWrapper: `flex`,
  center: `flex-1`,
  main: `flex-1 flex justify-center`,
  signupContainer: `flex items-center justify-center w-screen h-[70vh]`,
}


export default function Home() {
  const [registered, setRegistered] = useState(true)
  const [name, setName] = useState('')
  const [url, setUrl] = useState('https://avatars.dicebear.com/api/adventurer/midnight.svg')
  const [users, setUsers] = useState('')

  const wallet = useWallet()

  return (
    <div className={style.wrapper}>
      {/* header */}

      {registered ? (
        <div className={style.homeWrapper}>
          {/* siderbar */}
          <div className={style.main}>
            <Feed 
              connected={wallet.connected}
              name = {name}
              url = {url}
            />
          </div>
          {/* RightSideBar */}
        </div>
      ) : (
        <div className={style.signupContainer}>
          <SignUp 
            setRegistered = {setRegistered}
            name = {name}
            setName = {setName}
            url = {url}
            setUrl = {setUrl}
          />
        </div>
      )}
    </div>
  )
}
