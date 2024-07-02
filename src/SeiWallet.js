import { SigningStargateClient } from '@cosmjs/stargate';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';

let client;
let address;

export const connectWallet = async (walletType) => {
  if (walletType === 'keplr') {
    await window.keplr.enable('sei-network');
    const offlineSigner = window.getOfflineSigner('sei-network');
    client = await SigningStargateClient.connectWithSigner('https://rpc.sei-network.io', offlineSigner);
  } else if (walletType === 'leap') {
    await window.leap.enable('sei-network');
    const offlineSigner = window.getOfflineSigner('sei-network');
    client = await SigningStargateClient.connectWithSigner('https://rpc.sei-network.io', offlineSigner);
  } else if (walletType === 'compass') {
    await window.compass.enable('sei-network');
    const offlineSigner = window.getOfflineSigner('sei-network');
    client = await SigningStargateClient.connectWithSigner('https://rpc.sei-network.io', offlineSigner);
  }
  const [account] = await client.getAccounts();
  address = account.address;
};

export const getWalletAddress = () => address;

export const checkSeiVisionsNFTs = async () => {
  // Logic to check if the wallet has SEI Visions NFTs
  // Replace with actual API call to check NFTs
  const nfts = await client.queryNfts({ owner: address });
  return nfts.some(nft => nft.classId === 'sei-visions');
};

export const transferNFTs = async (nftIds, recipient) => {
  const messages = nftIds.map(id => ({
    typeUrl: '/cosmos.nft.v1beta1.MsgTransferNFT',
    value: {
      sender: address,
      recipient,
      id,
      classId: 'generic-nft' // Update this if necessary
    },
  }));
  const fee = {
    amount: [{ denom: 'usei', amount: '2000' }],
    gas: '200000',
  };
  const result = await client.signAndBroadcast(address, messages, fee);
  if (result.code !== 0) {
    throw new Error(`Failed to transfer NFTs: ${result.rawLog}`);
  }
};
