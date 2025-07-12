import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, auth } from "@/services/firebase/config";
import { handleFirebaseError } from "@/lib/handleFirebaseError";
import type { EventMessage } from "@/types/interface/common.interface";

export const useFetchEventMessages = (eventId: string) => {
  const [messages, setMessages] = useState<EventMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!eventId) return;

    const q = query(
      collection(db, "events", eventId, "messages"),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const msgs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<EventMessage, "id" | "createdAt">),
          createdAt: doc.data().createdAt?.toDate() ?? new Date(),
        }));
        setMessages(msgs);
        setLoading(false);
      },
      (error) => {
        handleFirebaseError(error, "Failed to fetch messages");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [eventId]);

  const sendMessage = async (text: string) => {
    const user = auth.currentUser;
    if (!user || !text.trim()) return;

    try {
      await addDoc(collection(db, "events", eventId, "messages"), {
        message: text,
        createdBy: user.uid,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirebaseError(error, "Failed to send message");
    }
  };

  return { messages, loading, sendMessage };
};
