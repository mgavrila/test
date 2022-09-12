import React, { useMemo } from "react";
import WS_RPC from "@vite/vitejs-ws";
import { accountBlock, ViteAPI } from "@vite/vitejs";
import { getConnection } from "../../features/connection/connectionSlice";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import { AppHeader } from "../components/header/AppHeader";
import { AppFooter } from "../components/footer/AppFooter";
import { AppBody } from "../components/body/AppBody";

export const Router: React.FC<{ connection: any }> = ({ connection }) => {
  const { providerOptions, providerWsURLs, vbInstance } = connection;
  const { timeout, ...otherOptions } = providerOptions;

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

  return (
    <div className="flex flex-col items-center h-full">
      <AppHeader vbInstance={vbInstance} />
      {/* <AppBody /> */}
      <AppFooter />
    </div>
  );
};
