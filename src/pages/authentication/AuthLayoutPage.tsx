import React from "react";
import { Outlet } from "react-router-dom";
import "../../index.css";

const AuthLayoutPage = () => {
  return (
    <div className="h-screen w-screen  flex overflow-hidden">
      <div className="bg-neutral-900 p-8 flex flex-col justify-center   w-[64%]">
       
      </div>
      <div className="flex flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayoutPage;
