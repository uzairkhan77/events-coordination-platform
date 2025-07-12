import { Link, NavLink, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { auth } from "@/services/firebase/config";
import { signOut } from "firebase/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await signOut(auth);
      toast.success("Logged out successfully");
      navigate("/sign-in");
    } catch {
      toast.error("Logout failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <nav
      className={cn(
        "w-full px-6 py-3 border-b border-gray-200 bg-white flex items-center justify-between"
      )}
    >
      {/* Logo */}
      <Link to="/" className="text-xl font-bold text-primary">
        Event Coordination
      </Link>

      {/* Center Tabs */}
      <div className="flex gap-6 text-sm font-medium">
        <NavLink
          to="/events"
          className={({ isActive }) =>
            cn(
              "hover:text-primary",
              isActive ? "text-primary underline" : "text-muted-foreground"
            )
          }
        >
          Events
        </NavLink>
        <NavLink
          to="/my-events"
          className={({ isActive }) =>
            cn(
              "hover:text-primary",
              isActive ? "text-primary underline" : "text-muted-foreground"
            )
          }
        >
          My Events
        </NavLink>
      </div>

      {/* Profile Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage src="" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem onClick={() => navigate("/profile/edit")}>
            Edit Profile
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} disabled={isLoading}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default Navbar;
