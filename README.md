# NFT Bulk Transfer App

A web application system that allows users to bulk transfer NFTs on the SEI Network. Users can connect their SEI network wallet (Compass, Leap, & Keplr) and transfer NFTs.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact Information](#contact-information)

## Features

- Connect SEI Network wallets (Compass, Leap, Keplr).
- Verify ownership of Sei Visions NFTs.
- Bulk transfer NFTs to specified addresses.
- User-friendly, retro Gameboy-style UI.
- Comprehensive error handling and user feedback mechanisms.

## Installation

To install and run this project locally:

1. **Clone the repository:**

    ```sh
    git clone https://github.com/nebulasnft/nft-bulk-transfer.git
    cd nft-bulk-transfer
    ```

2. **Install dependencies:**

    ```sh
    npm install
    ```

3. **Run the application:**

    ```sh
    npm start
    ```

4. **Run the tests:**

    ```sh
    npm test
    ```

## Usage

### Connect Wallet

1. Select the wallet you want to connect (Compass, Leap, Keplr).
2. Follow the prompts to connect your wallet.

### Verify NFTs

1. The application will verify if you own Sei Visions NFTs.
2. If verification is successful, you will be redirected to the home page.

### Transfer NFTs

1. Go to the Multi-Transfer page.
2. Enter the NFT IDs (comma separated) and the recipient's wallet address.
3. Click the "Transfer NFTs" button to complete the transfer.

## Folder Structure

```plaintext
my-nft-transfer-app/
├── public/
│   ├── index.html
├── src/
│   ├── __tests__/
│   │   └── seiWallet.test.js
│   ├── components/
│   │   ├── WalletConnect.js
│   │   ├── VerifyNFTs.js
│   │   ├── Home.js
│   │   └── MultiTransfer.js
│   ├── App.css
│   ├── App.js
│   ├── index.js
│   ├── seiWallet.js
├── package.json
└── README.md
