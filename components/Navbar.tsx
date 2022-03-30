import Link from "next/link";
import React from "react";
import { CogIcon } from "@heroicons/react/outline";

const Navbar = () => {
  return (
    <nav className="flex justify-center bg-white border-b py-4 px-6">
      <div className="grow max-w-7xl flex justify-between items-center">
        <div className="flex items-center gap-x-6">
          <Link href="/">
            <a className="font-bold">Home</a>
          </Link>
        </div>
      </div>
      <div>
        <Link href="/settings">
          <a>
            <CogIcon className="h-6 w-6" />
          </a>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
