import { Keypair } from "@solana/web3.js";

/**
 * load file wallet addresses
 * @returns
 */
export function loadWalletAddresses(n: number) {
  const addresses: string[] = [];
  for (let i = 0; i < n; i++) {
    let keypair = Keypair.generate();
    addresses.push(keypair.publicKey.toString());
  }
  return addresses;
}
