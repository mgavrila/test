import React from "react";

import { AppHeader } from "../components/header/AppHeader";
import { AppFooter } from "../components/footer/AppFooter";
import { AppBody } from "../components/body/AppBody";

export const Router: React.FC<{ connection: any }> = ({ connection }) => {
  const { vbInstance } = connection;

  return (
    <div className="flex flex-col items-center h-full">
      <AppHeader vbInstance={vbInstance} />
      <AppBody connection={connection} />
      <AppFooter />
    </div>
  );
};
