import { cn } from "@/lib/utils";
import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className={cn("flex h-[100dvh]")}>
      <div
        className={cn(
          "w-full md:w-1/2",
          "hidden md:flex items-center justify-center",
          "bg-foreground"
        )}
      >
        <h1>Logo</h1>
      </div>
      <div
        className={cn(
          "w-full md:w-1/2",
          "flex items-center justify-center",
          "p-5"
        )}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
