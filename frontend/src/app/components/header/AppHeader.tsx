import React, { useMemo } from "react";
import { LogOut } from "react-feather";

import { shortenAddress } from "../../../utils/string_helper";
import ViteLogo from "../../../assets/ViteLogo";

export const AppHeader: React.FC<{ vbInstance: any }> = ({ vbInstance }) => {
  const account = vbInstance.accounts[0];
  const shortAddress = useMemo(() => shortenAddress(account), [account]);

  return (
    <header className="w-full">
      <div className="flex flex-row justify-between w-full p-3">
        <ViteLogo className="h-8 text-skin-secondary" />

        <div className="flex flex-row justify-end w-full fx px-2 py-0.5 h-7 gap-2">
          <label className="text-skin-primary">{shortAddress}</label>
          <button className="text-skin-secondary hover:text-skin-hover">
            <LogOut onClick={() => vbInstance.killSession()} />
          </button>
        </div>
      </div>
    </header>
  );
};
