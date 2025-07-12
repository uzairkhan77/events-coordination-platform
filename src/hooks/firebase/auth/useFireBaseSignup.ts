import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "@/services/firebase/config";
import { handleFirebaseError } from "@/lib/handleFirebaseError";
import toast from "react-hot-toast";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { FirebaseError } from "firebase/app";

export const useFirebaseSignUp = () => {
  const [loading, setLoading] = useState(false);

  const signUp = async (
    email: string,
    password: string,
    displayName?: string
  ) => {
    setLoading(true);
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
      if (
        error instanceof FirebaseError &&
        error.code === "auth/email-already-in-use"
      ) {
        toast.error("The account with this email already exists.");
        return null;
      } else {
        handleFirebaseError(error, "Signup failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return { signUp, loading };
};
