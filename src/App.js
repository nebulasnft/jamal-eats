import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WalletConnect from './components/WalletConnect';
import VerifyNFTs from './components/VerifyNFTs';
import Home from './components/Home';
import MultiTransfer from './components/MultiTransfer';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<WalletConnect />} />
          <Route path="/verify" element={<VerifyNFTs />} />
          <Route path="/home" element={<Home />} />
          <Route path="/multi-transfer" element={<MultiTransfer />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
