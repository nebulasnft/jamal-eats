// /src/components/VerifyNFTs.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkSeiVisionsNFTs } from '../seiWallet';

const VerifyNFTs = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const verifyNFTs = async () => {
      try {
        const result = await checkSeiVisionsNFTs();
        if (result) {
          navigate('/home');
        } else {
          setError('No Sei Visions NFTs found in your wallet');
          setTimeout(() => navigate('/'), 3000);
        }
      } catch (error) {
        setError(`Failed to verify NFTs: ${error.message}`);
        setTimeout(() => navigate('/'), 3000);
      } finally {
        setLoading(false);
      }
    };
    verifyNFTs();
  }, [navigate]);

  return (
    <div className="verify-nfts">
      <h1>Verifying your NFTs...</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default VerifyNFTs;
