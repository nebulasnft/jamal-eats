import React, { useState } from 'react';
import { transferNFTs, checkSeiVisionsNFTs } from '../seiWallet';
import { useNavigate } from 'react-router-dom';

const MultiTransfer = () => {
  const [nftIds, setNftIds] = useState('');
  const [recipient, setRecipient] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleTransfer = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const hasSeiVisionsNFT = await checkSeiVisionsNFTs();
      if (!hasSeiVisionsNFT) {
        setError('You must hold a Sei Visions NFT to perform transfers.');
        setTimeout(() => navigate('/'), 3000);
        return;
      }
      const idsArray = nftIds.split(',').map(id => id.trim());
      await transferNFTs(idsArray, recipient);
      setSuccess('NFTs transferred successfully!');
    } catch (error) {
      setError(`Failed to transfer NFTs: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="multi-transfer">
      <h1>Multi-Transfer SEI Network NFTs</h1>
      <div>
        <label>NFT IDs (comma separated):</label>
        <input type="text" value={nftIds} onChange={(e) => setNftIds(e.target.value)} />
      </div>
      <div>
        <label>This is where you put in the wallet address that's receiving the nfts:</label>
        <input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
      </div>
      <button onClick={handleTransfer} disabled={loading}>Transfer NFTs</button>
      {loading && <p>Transferring NFTs...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default MultiTransfer;
