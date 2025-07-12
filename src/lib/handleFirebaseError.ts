import { FirebaseError } from "firebase/app";
import toast from "react-hot-toast";

export const handleFirebaseError = (
  error: unknown,
  fallbackMessage = "An unknown error occurred"
) => {
  let message = fallbackMessage;

  if (error instanceof FirebaseError) {
    const code = error.code;

    const friendlyMessages: Record<string, string> = {
      "auth/invalid-credential": "Invalid email or password.",
      "auth/user-not-found": "No user found with this email.",
      "auth/wrong-password": "Incorrect password.",
      "auth/email-already-in-use": "This email is already in use.",
      "auth/weak-password": "Password should be at least 6 characters.",
      "auth/too-many-requests":
        "Too many login attempts. Please try again later.",
      "auth/network-request-failed":
        "Network error. Please check your connection.",
    };

    message = friendlyMessages[code] || fallbackMessage;
  }

  toast.error(message);
  throw new Error(message);
};
