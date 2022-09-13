import React from "react";

export const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-40 h-40 border-t-4 border-b-4 border-skin-loading rounded-full animate-spin"></div>
    </div>
  );
};
