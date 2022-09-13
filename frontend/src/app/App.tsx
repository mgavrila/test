import React, { useEffect, useState } from "react";
import "../styles/main.css";

import { setConnection } from "../store/connection/connectionSlice";
import { useAppDispatch } from "../hooks/reduxHooks";
import { ViteConnect } from "../utils/viteConnect";
import { AppContent } from "./components/AppContent";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const newConnection = new ViteConnect();
      await newConnection.createSession();

      dispatch(setConnection(newConnection));
    })().finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="text-center bg-skin-base min-h-screen overflow-hidden">
      <AppContent isLoading={isLoading} />
    </div>
  );
};

export default App;
