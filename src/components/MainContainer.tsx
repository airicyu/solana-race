import { Button } from "antd";
import { TransactionIllustration } from "./TransactionsIllustration";
import { WalletInfo } from "./WalletInfo";
import { useCallback, useContext, useState } from "react";
import { loadWalletAddresses } from "../services/loadWallets";
import { Web3Context } from "../context/Web3Context";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";

const receipiants = loadWalletAddresses(200);

export const MainContainer = (props: any) => {
  const web3Context = useContext(Web3Context);

  const [transactions, setTransactions] = useState<any[]>([]);

  const sendTransaction = useCallback(() => {
    (async () => {
      if (!web3Context.wallet) {
        return;
      }
      const trxStart = Date.now();
      const conn = web3Context.conn;
      const wallet = web3Context.wallet;
      console.log(wallet.publicKey.toString());
      const ixs = [
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: new PublicKey(
            receipiants[Math.round(Math.random() * 10000) % 200]
          ),
          lamports: LAMPORTS_PER_SOL * 0.001,
        }),
      ];
      let latestBlockHash = await conn.getLatestBlockhash();
      const trxMessage = new TransactionMessage({
        payerKey: wallet.publicKey,
        recentBlockhash: latestBlockHash.blockhash,
        instructions: ixs,
      }).compileToV0Message();
      const trx = new VersionedTransaction(trxMessage);
      trx.sign([wallet]);
      const hash = await conn.sendTransaction(trx);

      setTransactions([
        ...transactions,
        {
          trx,
          hash,
          trxStart,
        },
      ]);
    })();
  }, [transactions, web3Context.conn, web3Context.wallet]);
  return (
    <>
      <div>Solana</div>
      <WalletInfo></WalletInfo>
      <Button onClick={sendTransaction}>Send</Button>
      <TransactionIllustration
        transactions={transactions}
      ></TransactionIllustration>
    </>
  );
};
