import React from "react";
import Navbar from "./Navbar";

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center px-6">
        <div className="grow max-w-7xl grid py-6 gap-y-6">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
