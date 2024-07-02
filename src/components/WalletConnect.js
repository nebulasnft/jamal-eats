import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connectWallet, getWalletAddress } from '../seiWallet';

const WalletConnect = () => {
  const [connected, setConnected] = useState(false);
  const navigate = useNavigate();

  const handleConnect = async (walletType) => {
    try {
      await connectWallet(walletType);
      const address = await getWalletAddress();
      if (address) {
        setConnected(true);
        navigate('/verify');
      }
    } catch (error) {
      console.error("Failed to connect wallet", error);
    }
  };

  return (
    <div className="wallet-connect">
      <h1>Connect whatever wallet has your Sei Visions NFT in it</h1>
      <button onClick={() => handleConnect('keplr')}>Connect Keplr</button>
      <button onClick={() => handleConnect('leap')}>Connect Leap</button>
      <button onClick={() => handleConnect('compass')}>Connect Compass</button>
    </div>
  );
};

export default WalletConnect;
