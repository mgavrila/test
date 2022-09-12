import React, { useEffect } from "react";
import QRCode from "react-qr-code";

import { Loading } from "./core/Loading";
import {
  getConnection,
  setConnection,
  updateConnection,
} from "../../features/connection/connectionSlice";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import { Router } from "../containers/Router";
import { ViteConnect } from "../../utils/viteConnect";
import ViteLogo from "../../assets/ViteLogo";
import { AppFooter } from "./footer/AppFooter";

export const AppContent: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  const connection = useAppSelector(getConnection);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (connection) {
      const { vbInstance } = connection;
      vbInstance.on("connect", () => {
        dispatch(updateConnection(vbInstance));
      });

      vbInstance.on("disconnect", async () => {
        vbInstance.stopBizHeartBeat();

        // Initialize new connection
        const newConnection = new ViteConnect();
        await newConnection.createSession();
        dispatch(setConnection(newConnection));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connection]);

  if (isLoading) {
    return <Loading />;
  }

  if (!connection) {
    return (
      <h1 className="flex items-center justify-center min-h-screen text-skin-primary text-3xl">
        No connections
      </h1>
    );
  }

  const { vbInstance } = connection;

  if (vbInstance.connected) {
    return <Router connection={connection} />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <a href="https://vite.org/" target="_blank" rel="noopener noreferrer">
        <ViteLogo className="h-20 text-skin-secondary mb-6" />
      </a>

      <h2 className="text-skin-primary text-2xl mb-6">Scan with VITE wallet to connect</h2>
      <div className={"p-3 bg-white"}>
        <QRCode value={vbInstance.uri} size={256} />
      </div>
      <p className="text-skin-primary mt-3">
        <span>Create new wallet </span>
        <a
          className="text-skin-secondary hover:text-skin-hover"
          href="https://x.vite.net/"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>
      </p>

      <AppFooter />
    </div>
  );
};
