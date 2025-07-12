import { useState } from "react";
import { handleFirebaseError } from "@/lib/handleFirebaseError";
import { auth } from "@/services/firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";

export const useFirebaseAuth = () => {
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      toast.success("Login successful");
      return userCredential.user;
    } catch (error) {
      handleFirebaseError(error);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};
