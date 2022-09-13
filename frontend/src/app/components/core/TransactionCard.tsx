import React from "react";

import { Transaction } from "@vite/vitejs/distSrc/viteAPI/type";

enum BlockType {
  "CreateContractRequest" = 1,
  "TransferRequest",
  "ReIssueRequest",
  "Response",
  "ResponseFail",
  "RefundByContractRequest",
  "GenesisResponse",
}

const TRANSFER_COLOR: Record<BlockType, string> = {
  [BlockType.Response]: "text-green-600",
  [BlockType.TransferRequest]: "text-red-600",
  [BlockType.CreateContractRequest]: "text-skin-primary",
  [BlockType.GenesisResponse]: "text-skin-primary",
  [BlockType.ReIssueRequest]: "text-skin-primary",
  [BlockType.RefundByContractRequest]: "text-skin-primary",
  [BlockType.ResponseFail]: "text-skin-primary",
};

export const TransactionCard: React.FC<{ transaction: Transaction }> = ({
  transaction,
}) => {
  const {
    blockType,
    toAddress,
    fromAddress,
    hash,
    amount = "",
    tokenInfo: { decimals = "" } = {},
  } = transaction;

  const intAmount = parseInt(amount);
  const formattedAmount =
    intAmount > 0 ? intAmount / 10 ** parseInt(decimals) : 0;
  const colorText = TRANSFER_COLOR[blockType];

  return (
    <div className="flex w-full justify-center p-2">
      <div className="flex-row p-6 rounded-lg shadow-lg bg-skin-foreground w-2/3">
        <h5 className="text-skin-primary text-xl leading-tight font-medium mb-2 truncate">
          Transaction: {hash}
        </h5>
        <p className="text-skin-primary text-base mb-2 truncate">
          <span className="font-bold">From: </span>
          {fromAddress}
        </p>
        <p className="text-skin-primary text-base mb-2 truncate">
          <span className="font-bold">To: </span>
          {toAddress}
        </p>
        <p className="text-skin-primary text-base mb-2 truncate">
          <span className="font-bold">Amount: </span>
          <span className={colorText}>{formattedAmount}</span>
        </p>
        <p className="text-skin-primary text-base mb-2 truncate">
          <span className="font-bold">Type: </span>
          {BlockType[blockType]}
        </p>
      </div>
    </div>
  );
};
