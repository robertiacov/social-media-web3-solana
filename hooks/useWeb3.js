import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { SOLANA_HOST } from "../utils/const";
import { getProgramInstance } from "../utils/get-program";

const anchor = require("@project-serum/anchor");
const utf8 = anchor.utils.bytes.utf8;
const {BN, web3} = anchor;
const {SystemProgram} = web3;

const defaultAccounts = {
    tokenProgram: TOKEN_PROGRAM_ID,
    clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
    systemProgram: SystemProgram.programId,
}

const useWeb3 = (photoUrl, description, setDescription, setPhotoUrl, setNewPhotoShow) => {
    const wallet = useWallet();
    const connection = new anchor.web3.Connection(SOLANA_HOST);
    const program = getProgramInstance(connection, wallet);

    const likePost = async address => {
        console.log("post liked")

        const tx = await program.rpc.likePost({
            accounts: {
                post: new PublicKey(address),
                authority: wallet.publicKey,
                ...defaultAccounts,
            },
        })
        console.log(tx)
    }

    const newPhoto = async () => {
        const randomKey = anchor.web3.Keypair.generate().publicKey

        let [photo_pda] = await anchor.web3.PublicKey.findProgramAddress(
            [utf8.encode("photo"), randomKey.toBuffer()],
            program.programId,
        )

        const tx = await program.rpc.createPhoto(
            description,
            photoUrl,
            userDetail.userName,
            userDetail.userProfileImageUrl,
            {
                accounts: {
                    photo: photo_pda,
                    randomKey: randomKey,
                    authority: wallet.publicKey,
                    ...defaultAccounts,
                },
            }
        )
        console.log(tx)

        setDescription('')
        setPhotoUrl('')
        setNewPhotoShow(false)
    }

    return {likePost, newPhoto}

    
}

export default useWeb3