import { FirebaseError } from "firebase/app";
import toast from "react-hot-toast";

export const handleFirebaseError = (
  error: unknown,
  fallbackMessage = "An unknown error occurred"
) => {
  let message = fallbackMessage;

  if (error instanceof FirebaseError) {
    message = error.message;
  }

  toast.error(message);
  throw new Error(message);
};
