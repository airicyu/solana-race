import { useContext } from "react";
import { Web3Context } from "../context/Web3Context";

export const WalletInfo = () => {
  const web3Context = useContext(Web3Context);
  return <>Test Wallet: {web3Context.wallet?.publicKey?.toString()}</>;
};
