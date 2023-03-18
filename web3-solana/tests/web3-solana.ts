import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { Web3Solana } from '../target/types/web3_solana';

describe('web3-solana', () => {

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.Web3Solana as Program<Web3Solana>;

  it('Is initialized!', async () => {
    // Add your test here.
    const tx = await program.rpc.initialize({});
    console.log("Your transaction signature", tx);
  });
});
