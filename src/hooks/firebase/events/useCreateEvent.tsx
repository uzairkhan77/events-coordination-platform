// src/hooks/firebase/events/useCreateEvent.ts
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/services/firebase/config";
import toast from "react-hot-toast";
import { handleFirebaseError } from "@/lib/handleFirebaseError";

interface CreateEventInput {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  participants?: string[];
}

export const useCreateEvent = () => {
  const createEvent = async ({
    title,
    description,
    date,
    time,
    location,
    participants = [],
  }: CreateEventInput) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");

      const allParticipants = [...new Set([user.uid, ...participants])];

      await addDoc(collection(db, "events"), {
        title,
        description,
        date,
        time,
        location,
        createdBy: user.uid,
        participants: allParticipants,
        createdAt: serverTimestamp(),
      });

      toast.success("Event created successfully");
    } catch (error) {
      handleFirebaseError(error, "Failed to create event");
    }
  };

  return { createEvent };
};
