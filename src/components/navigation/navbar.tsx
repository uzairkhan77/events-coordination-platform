import { Link, NavLink, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useFirebaseLogout } from "@/hooks/firebase/auth/useFirebaseLogout";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout, loading } = useFirebaseLogout();

  const handleLogout = async () => {
    await logout();
    navigate("/sign-in");
  };

  return (
    <nav className="w-full border-b border-gray-200 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 py-3 flex items-center justify-between">
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
            <DropdownMenuItem onClick={handleLogout} disabled={loading}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
