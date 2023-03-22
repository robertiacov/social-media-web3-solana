import Image from 'next/image'
import React from 'react'


const SignUp = ({setRegistered, name, setName, url, setUrl}) => {
    const style = {
        wrapper: `flex flex-col p-4 justify-center items-center h-full w-full bg-[#252526] w-min h-min rounded-2xl`,
        title: `text-[#afb3b8] font-semibold text-lg`,
        form: `flex flex-col items-center`,
        fieldContainer: `my-4 `,
        inputTitle: `text-[#afb3b8] font-semibold mb-2 ml-3`,
        inputContainer: `flex items-center w-[20rem] bg-[#3a3b3d] rounded-full`,
        inputField: `bg-transparent flex-1 m-2 outline-none text-white px-2`,
        randomUrl: `h-full bg-[#2d2d2d] hover:bg-[#252626] text-white px-2 py-1 mx-1 hover:px-3 rounded-full cursor-pointer duration-[0.2s] ease-in-out`,
        submitButton: `bg-[#3a3b3d] text-white font-semibold px-4 py-2 hover:px-6 rounded-full cursor-pointer duration-[0.2s] ease-in-out`,
      }

    const createUser = async event =>{
        setRegistered(true)

        const resp = await window.solana.connect()
        const walletAddress = resp.publicKey.toString()

        try {
            await fetch(`api/createUser`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userWalletAddress: walletAddress,
                    name: name,
                    profileImage: event.target.url.value,
                })
            })
        } catch (error) {
            console.error(error)
        }
    }

    const generateRandomProfileImageUrl = () =>
    setUrl(
        `https://avatars.dicebear.com/api/pixel-art-neutral/${Math.floor(
            Math.random() * 100,
        )}.svg`,
    )

  return (
    <div className={style.wrapper}>
        <div className={style.container}>
            <Image 
                src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg"
                height={40}
                width={40}
                alt='meta logo'
            />
        </div>
        <div className={style.title}>
            Please sign up to use SocialMedia</div>
            <form onSubmit={createUser} className={style.form}>
                <div className={style.fieldContainer}>
                    <div className={style.inputTitle}>Name</div>
                    <div className={style.inputContainer}>
                        <input 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className={style.inputField}
                        />
                    </div>
                </div>
                <div className={style.fieldContainer}>
                    <div className={style.inputTitle}>Profile Image URL</div>
                    <div className={style.inputContainer}>
                        <input 
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required
                        className={style.inputField}
                        />
                        <div 
                        className={style.randomUrl}
                        onClick={generateRandomProfileImageUrl}
                        >
                            Random
                        </div>
                    </div>
                </div>
                <button className={style.submitButton} type='submit'>
                    Sign Up
                </button>
            </form>
        
    </div>
  )
}

export default SignUp