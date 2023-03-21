import React from 'react'
import Image from 'next/image'
import Contact from './Contact'

const users = [
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
]

const RightSidebar = () => {
    
    const style = {
        wrapper: `w-[24rem] text-lg text-white`,
        title: `text-[#afb3b8] font-semibold`,
        adsContainer: ``,
        ad: `flex items-center my-3 mr-[1rem] p-2 rounded-lg`,
        adImageContainer: `h-full w-[50%] flex items-center mr-[0.5rem]`,
        adImage: `object-cover`,
        adLink: `text-[#b0b3b8] text-sm`,
        divider: `w-[95%] border-b border-[0.5px] border-[#3e4042] my-2`,
        contact: `flex items-center my-2`,
        contactImage: `rounded-full object-cover`,
        contactName: `ml-4 text-[1rem]`,
      }

  return (
    <div className={style.wrapper}>
        <div className={style.title}>Sponsored</div>
        <div className={style.adsContainer}>
            <div className={style.ad}>
                <div className={style.adImageContainer}>
                    <Image 
                    src={
                        'https://images.unsplash.com/photo-1616489798881-8e1b0e1b2e1c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
                    }
                    height={100}
                    width={100}
                    className = {style.adImage}
                    alt = 'ad logo'
                    />
                </div>
                <div>
                    <div>This is a nice ad picture.</div>
                    <div className={style.adLink}>https://www.adPicture.com</div>
                </div>
            </div>
            <div className={style.ad}>
                <div className={style.adImageContainer}>
                    <Image 
                    src = {
                        'https://images.unsplash.com/photo-1616489798881-8e1b0e1b2e1c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
                    }
                    height={100}
                    width={100}
                    className = {style.adImage}
                    alt = 'bad ad logo'
                    />
                </div>
                <div>
                    <div>Not so nice ad.</div>
                    <div className={style.adLink}>https://www.badAd.com</div>
                </div>
            </div>
            <div className={style.divider}/>
            <div className={style.title}>Contacts</div>
            <div className={style.contactsContainer}>
                    {users.map(user =>{
                        return <Contact key = {user.walletAddress} user = {user}/>
                    })}
            </div>
        </div>
    </div>
  )
}

export default RightSidebar