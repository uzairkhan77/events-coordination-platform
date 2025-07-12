import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className={cn("flex h-[100dvh] border border-black w-[100dvw]")}>
      <div
        className={cn(
          "w-full md:w-1/2",
          "hidden md:flex items-center justify-center",
          "bg-foreground"
        )}
      >
        <h1 className="text-white">Events Coordination</h1>
      </div>
      <div
        className={cn(
          "w-full md:w-1/2",
          "flex items-center justify-center",
          "p-5"
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
