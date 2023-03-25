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

const useWeb3 = () => {
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
    return {likePost}
}

export default useWeb3