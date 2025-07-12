import { handleFirebaseError } from "@/lib/handleFirebaseError";
import { auth } from "@/services/firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";

export const useFirebaseAuth = () => {
  const login = async (email: string, password: string) => {
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
    }
  };

  return { login };
};
