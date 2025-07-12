import { signOut } from "firebase/auth";
import { auth } from "@/services/firebase/config";
import toast from "react-hot-toast";
import { handleFirebaseError } from "@/lib/handleFirebaseError";
import { useState } from "react";

export const useFirebaseLogout = () => {
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      toast.success("Logged out");
    } catch (error) {
      handleFirebaseError(error, "Logout failed");
    } finally {
      setLoading(false);
    }
  };

  return { logout, loading };
};
