import React, { useState, useEffect, useMemo } from "react";
import WS_RPC from "@vite/vitejs-ws";
import { ViteAPI } from "@vite/vitejs";
import { Transaction } from "@vite/vitejs/distSrc/viteAPI/type";

import { Loading } from "../core/Loading";
import { TransactionCard } from "../core/TransactionCard";

export const AppBody: React.FC<{ connection: any }> = ({ connection }) => {
  const { providerOptions, providerWsURLs, vbInstance } = connection;
  const { timeout, ...otherOptions } = providerOptions;

  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[] | []>([]);
  const rpc = useMemo(
    () => new WS_RPC(providerWsURLs.testnet, timeout, otherOptions),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const viteApi = useMemo(() => {
    return new ViteAPI(rpc, () => {
      console.log("client connected");
    });
  }, [rpc]);

  useEffect(() => {
    const { accounts } = vbInstance;

    const account = accounts[0];
    setIsLoading(true);
    viteApi
      .getTransactionList({ address: account, pageIndex: 0 })
      .then((data: Transaction[]) => {
        setTransactions(data);
      })
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (transactions.length === 0) {
    return (
      <div className="flex h-screen	items-center">
        <h5 className="text-3xl text-skin-primary">No transactions found</h5>
      </div>
    );
  }

  return (
    <div className="flex-col h-[calc(100vh_-_100px)] w-full overflow-y-auto">
      <h1 className="text-skin-primary text-3xl mb-6">Transactions</h1>
      {transactions.map((transaction) => (
        <TransactionCard key={transaction.hash} transaction={transaction} />
      ))}
    </div>
  );
};
