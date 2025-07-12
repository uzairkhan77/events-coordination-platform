import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "@/services/firebase/config";
import { handleFirebaseError } from "@/lib/handleFirebaseError";
import { useState } from "react";

export const useCreateMessage = (eventId: string) => {
  const [sending, setSending] = useState(false);

  const sendMessage = async (text: string) => {
    const user = auth.currentUser;
    if (!user || !text.trim()) return;

    setSending(true);
    try {
      await addDoc(collection(db, "events", eventId, "messages"), {
        message: text.trim(),
        createdBy: user.uid,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirebaseError(error, "Failed to send message");
    } finally {
      setSending(false);
    }
  };

  return { sendMessage, sending };
};
