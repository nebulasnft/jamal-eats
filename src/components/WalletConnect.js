import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connectWallet, getWalletAddress } from '../seiWallet'; // Corrected path

const WalletConnect = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleConnect = async (walletType) => {
    setLoading(true);
    setError('');
    try {
      await connectWallet(walletType);
      const address = await getWalletAddress();
      if (address) {
        navigate('/verify');
      } else {
        setError('Failed to retrieve wallet address');
      }
    } catch (error) {
      setError(`Failed to connect wallet: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wallet-connect">
      <h1>Connect whatever wallet has your Sei Visions NFT in it</h1>
      <button onClick={() => handleConnect('keplr')}>Connect Keplr</button>
      <button onClick={() => handleConnect('leap')}>Connect Leap</button>
      <button onClick={() => handleConnect('compass')}>Connect Compass</button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default WalletConnect;
