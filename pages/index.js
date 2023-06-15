import {useState, useEffect} from 'react'
import SignUp from '../components/SignUp'
import Feed from '../components/Feed'

import { useWallet } from '@solana/wallet-adapter-react'
import Header from '../components/Header'
import LeftSidebar from '../components/LeftSidebar'
import RightSidebar from '../components/RightSidebar'

const style = {
  wrapper: `bg-[#18191a] min-h-screen duration-[0.5s]`,
  homeWrapper: `flex`,
  center: `flex-1`,
  main: `flex-1 flex justify-center`,
  signupContainer: `flex items-center justify-center w-screen h-[70vh]`,
}


export default function Home() {
  const [registered, setRegistered] = useState(false)
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [users, setUsers] = useState([
    {
        walletAddress: "6wbsQTAqTmwuA2xVcqGBRr921uobk9MqMYQjB9iQVJpp",
        profileImage: 'https://avatars.dicebear.com/api/adventurer/midnight.svg',
        name: "Robert"
    },
    {
        walletAddress: "6wbsQTAqTmwuA2xVcqGBRr921uobk9MqMYQjB9iQVJpp",
        profileImage: 'https://avatars.dicebear.com/api/adventurer/midnight.svg',
        name: "Vlad"
    },
    {
        walletAddress: "6wbsQTAqTmwuA2xVcqGBRr921uobk9MqMYQjB9iQVJpp",
        profileImage: 'https://avatars.dicebear.com/api/adventurer/midnight.svg',
        name: "Iacov"
    }
  ])

  const wallet = useWallet()

  useEffect(() => {
    ;(async () => {
      await requestUsersData()
    })()
  }, [])

  //   useEffect(() => {
  //   if (wallet.connected) {
  //     checkAccount()
  //   }
  // }, [wallet.connected])

  // const checkAccount = async () => {
  //   let [user_pda] = await anchor.web3.PublicKey.findProgramAddress(
  //     [utf8.encode('user'), wallet.publicKey.toBuffer()],
  //     program.programId,
  //   )

  //   try {
  //     const userInfo = await program.account.userAccount.fetch(user_pda)
  //     console.log(userInfo)
  //     setUserDetail(userInfo)
  //     setRegistered(true)
  //   } catch (e) {
  //     setRegistered(false)
  //   }
  // }

  const requestUsersData = async activeAccount => {
    try {
      const response = await fetch(`api/fetchUsers`)
      const data = await response.json()

      setUsers(data.data)
      console.log('users:', data.data)

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={style.wrapper}>
      <Header name={name} url={url}/>

      {registered ? (
        <div className={style.homeWrapper}>
          <LeftSidebar  name={name} url={url}/>
          <div className={style.main}>
            <Feed 
              connected={wallet.connected}
              name = {name}
              url = {url}
            />
          </div>
          <RightSidebar 
          getUsers = {requestUsersData}
          users = {users}
          />
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
