import React, {useState, useEffect} from 'react'
import toast, {Toaster} from "react-hot-toast"
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { useWallet } from '@solana/wallet-adapter-react'

import { SOLANA_HOST } from "../utils/const"
import {getProgramInstance} from '../utils/get-program'
import CreatePost from './CreatePost'
import Post from './Post'

const anchor = require('@project-serum/anchor')
const {BN, web3} = anchor
const utf8 = anchor.utils.bytes.utf8
const {SystemProgram}  = web3

const defaultAccounts = {
  tokenProgram: TOKEN_PROGRAM_ID,
  clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
  systemProgram: SystemProgram
}

const Feed = ({ connected, name, url }) => {

  const style = {
    wrapper: `flex-1 max-w-2xl mx-4`,
  }

  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState([])

  const getAllPosts = async () => {
    try {
      const postData = await program.account.postAccount.all()

      postData.sort(
        (a, b) => b.account.postTime.toNumber() - a.account.postTime.toNumber()
      )

      setPosts(postData)
    } catch (error) {
      console.error(error)
    }
  }

  const savePost = async text => {
    let [stateSigner] = await anchor.web3.PublicKey.findProgramAddressSync(
      [utf8.encode('state')],
      program.programId
    )

    let stateInfo

    try {
      stateInfo = await program.account.stateAccount.fetch(stateSigner)
    } catch (error) {
      await program.rpc.createState({
        accounts: {
          state: stateSigner,
          authority: wallet.publicKey,
          ...defaultAccounts,
        }
      })
      return
    }

    let [postSigner] = await anchor.web3.PublicKey.findProgramAddressSync(
      [utf8.encode('post'), stateInfo.postCount.toArrayLike(Buffer, 'be', 8)],
      program.programId,
    )

    try {
      await program.account.postAccount.fetch(postSigner)
    } catch (error) {
      await program.rpc.createPost(text, name, url, {
        accounts: {
          state: stateSigner,
          post: postSigner,
          authority: wallet.publicKey,
          ...defaultAccounts,
        }
      })

      setPosts(await program.account.postAccount.all())
    }
  }

  return (
    <div className={style.wrapper}>
      <Toaster position='bottom-left' reverseOrder = {false}/>
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <CreatePost 
            savePost = {savePost}
            getAllPosts = {getAllPosts}
            name = {name}
            url = {url}
            />

            {posts.map(post => {
              <Post 
              post = {post.account}
              viewDetail = {getCommentsOnPost}
              createComment = {saveComment}
              key = {post.account.index}
              name = {name}
              url = {url}
              />
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Feed