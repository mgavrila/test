export type TokenInfo = {
  tokenName: string;
  tokenSymbol: string;
  totalSupply: string;
  decimals: number;
  owner: string;
  tokenId: string;
  maxSupply: string;
  ownerBurnOnly: false;
  isReIssuable: false;
  index: number;
  isOwnerBurnOnly: false;
};

export type ViteBalanceInfo = {
  balance: {
    address: string;
    blockCount: string;
    balanceInfoMap: {
      [tokenId: string]: {
        tokenInfo: TokenInfo;
        balance: string;
      };
    };
  };
  unreceived: {
    address: string;
    blockCount: string;
  };
};
