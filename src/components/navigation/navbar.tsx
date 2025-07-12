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
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout, loading } = useFirebaseLogout();

  const handleLogout = async () => {
    await logout();
    navigate("/sign-in");
  };

  return (
    <nav className="w-full border-b py-7 border-gray-200 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
          <span className="text-orange-500">Events</span>
          <span className="text-black">Coordination</span>
        </Link>

        {/* Center Tabs - Desktop */}
        <div className="hidden md:flex gap-6 text-base font-medium">
          <NavLink
            to="/events"
            className={({ isActive }) =>
              cn(
                "hover:text-orange-500 transition-colors duration-200",
                isActive ? "text-orange-500 underline" : "text-gray-600"
              )
            }
          >
            Events
          </NavLink>
          <NavLink
            to="/my-events"
            className={({ isActive }) =>
              cn(
                "hover:text-orange-500 transition-colors duration-200",
                isActive ? "text-orange-500 underline" : "text-gray-600"
              )
            }
          >
            My Events
          </NavLink>
        </div>

        {/* Profile Dropdown - Desktop */}
        <div className="hidden md:block">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem
                onClick={handleLogout}
                disabled={loading}
                className={cn(loading && "opacity-50 cursor-not-allowed")}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button>
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <SheetHeader>
                <SheetTitle className="text-xl">Event Coordination</SheetTitle>
              </SheetHeader>

              <div className="mt-6 space-y-4 text-base font-medium">
                <NavLink
                  to="/events"
                  className={({ isActive }) =>
                    cn(
                      "block hover:text-orange-500",
                      isActive ? "text-orange-500 underline" : "text-gray-600"
                    )
                  }
                >
                  Events
                </NavLink>
                <NavLink
                  to="/my-events"
                  className={({ isActive }) =>
                    cn(
                      "block hover:text-orange-500",
                      isActive ? "text-orange-500 underline" : "text-gray-600"
                    )
                  }
                >
                  My Events
                </NavLink>

                <button
                  onClick={handleLogout}
                  disabled={loading}
                  className={cn(
                    "block text-left w-full hover:text-red-500",
                    loading && "opacity-50 cursor-not-allowed"
                  )}
                >
                  Logout
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
