import Navbar from "@/components/navigation/navbar";
import { Outlet } from "react-router-dom";

export const HomeLayout = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};
