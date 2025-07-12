import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "@/services/firebase/config";
import { handleFirebaseError } from "@/lib/handleFirebaseError";
import toast from "react-hot-toast";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export const useFirebaseSignUp = () => {
  const signUp = async (
    email: string,
    password: string,
    displayName?: string
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      if (displayName) {
        await updateProfile(user, { displayName });
      }

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: displayName || "",
        createdAt: serverTimestamp(),
      });

      toast.success("Account created successfully");
      return user;
    } catch (error) {
      handleFirebaseError(error, "Signup failed");
    }
  };

  return { signUp };
};
