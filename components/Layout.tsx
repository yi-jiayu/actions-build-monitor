import React from "react";
import Navbar from "./Navbar";

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center p-6">
        <div className="grow max-w-screen-lg grid gap-y-6">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
