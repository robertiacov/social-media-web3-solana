import React from 'react'
import Image from 'next/image'
import Contact from './Contact'

const RightSidebar = () => {
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
            
        </div>
    </div>
  )
}

export default RightSidebar