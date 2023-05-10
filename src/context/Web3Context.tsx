import * as web3 from "@solana/web3.js";
import { Connection, Keypair } from "@solana/web3.js";
import { createContext, useEffect, useState } from "react";
import bs58 from "bs58";

declare type Web3ContextType = {
  conn: Connection;
  wallet?: Keypair;
};

const connection: web3.Connection = new web3.Connection(
  "https://api.devnet.solana.com",
  "confirmed"
);

const web3ContextDefault = {
  conn: connection,
  wallet: undefined,
};

const Web3ContextProvider = ({ children }: any) => {
  const [wallet, setWallet] = useState<Keypair | undefined>(undefined);
  useEffect(() => {
    const solanaWalletSecret = localStorage.getItem("solanaWalletSecret");
    if (solanaWalletSecret) {
      const secretKey = bs58.decode(solanaWalletSecret);
      const _wallet = Keypair.fromSecretKey(secretKey);
      if (_wallet.secretKey.toString() !== wallet?.secretKey.toString()) {
        setWallet(_wallet);
        connection.getBalance(_wallet.publicKey).then((balance) => {
          console.log(`wallet balance: ${balance}`);
          if (balance !== undefined && balance < 1 * web3.LAMPORTS_PER_SOL) {
            // connection.requestAirdrop(
            //   _wallet.publicKey,
            //   2 * web3.LAMPORTS_PER_SOL
            // );
          }
        });
      }
    } else {
      const _wallet = new Keypair();
      setWallet(wallet);
      localStorage.setItem(
        "solanaWalletSecret",
        bs58.encode(_wallet.secretKey)
      );
      connection.requestAirdrop(_wallet.publicKey, 2 * web3.LAMPORTS_PER_SOL);
    }
  }, [wallet]);
  return (
    <Web3Context.Provider
      value={{
        conn: connection,
        wallet,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

const Web3Context = createContext<Web3ContextType>(web3ContextDefault);

export { Web3Context, Web3ContextProvider };
