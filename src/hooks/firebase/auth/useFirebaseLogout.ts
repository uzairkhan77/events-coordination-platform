import { signOut } from "firebase/auth";
import { auth } from "@/services/firebase/config";
import toast from "react-hot-toast";
import { handleFirebaseError } from "@/lib/handleFirebaseError";

export const useFirebaseLogout = () => {
  const logout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out");
    } catch (error) {
      handleFirebaseError(error, "Logout failed");
    }
  };

  return { logout };
};
