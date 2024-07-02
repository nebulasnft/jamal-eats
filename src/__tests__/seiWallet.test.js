import { connectWallet, getWalletAddress, checkSeiVisionsNFTs, transferNFTs } from '../seiWallet';

jest.mock('@cosmjs/stargate', () => ({
  SigningStargateClient: {
    connectWithSigner: jest.fn(),
  },
}));

jest.mock('@cosmjs/proto-signing', () => ({
  DirectSecp256k1HdWallet: jest.fn(),
}));

describe('seiWallet', () => {
  let mockClient;
  
  beforeEach(() => {
    mockClient = {
      getAccounts: jest.fn().mockResolvedValue([{ address: 'sei1address' }]),
      queryNfts: jest.fn().mockResolvedValue([{ classId: 'sei-visions' }]),
      signAndBroadcast: jest.fn().mockResolvedValue({ code: 0 }),
    };
    require('@cosmjs/stargate').SigningStargateClient.connectWithSigner.mockResolvedValue(mockClient);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should connect to the wallet and retrieve the address', async () => {
    await connectWallet('keplr');
    const address = getWalletAddress();
    expect(address).toBe('sei1address');
    expect(mockClient.getAccounts).toHaveBeenCalledTimes(1);
  });

  it('should check if the wallet has Sei Visions NFTs', async () => {
    await connectWallet('keplr');
    const result = await checkSeiVisionsNFTs();
    expect(result).toBe(true);
    expect(mockClient.queryNfts).toHaveBeenCalledWith({ owner: 'sei1address' });
  });

  it('should transfer NFTs', async () => {
    await connectWallet('keplr');
    await expect(transferNFTs(['nft1'], 'sei1recipient')).resolves.not.toThrow();
    expect(mockClient.signAndBroadcast).toHaveBeenCalledTimes(1);
    expect(mockClient.signAndBroadcast).toHaveBeenCalledWith('sei1address', expect.any(Array), expect.any(Object));
  });

  it('should fail to transfer NFTs if the transaction fails', async () => {
    mockClient.signAndBroadcast.mockResolvedValue({ code: 1, rawLog: 'Error' });
    await connectWallet('keplr');
    await expect(transferNFTs(['nft1'], 'sei1recipient')).rejects.toThrow('Failed to transfer NFTs: Error');
  });
});
