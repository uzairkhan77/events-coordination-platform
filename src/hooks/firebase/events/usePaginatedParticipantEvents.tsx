import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  getDocs,
  QueryDocumentSnapshot,
  type DocumentData,
} from "firebase/firestore";
import { db, auth } from "@/services/firebase/config";
import { handleFirebaseError } from "@/lib/handleFirebaseError";
import type { EventData } from "@/types/interface/common.interface";

export const usePaginatedParticipantEvents = (pageSize = 4) => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchNextPage = async () => {
    setLoading(true);
    const user = auth.currentUser;
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const eventsRef = collection(db, "events");
      let q = query(
        eventsRef,
        where("participants", "array-contains", user.uid),
        orderBy("createdAt", "desc"),
        limit(pageSize)
      );

      if (lastDoc) {
        q = query(q, startAfter(lastDoc));
      }

      const snapshot = await getDocs(q);
      const newEvents = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as EventData),
      }));

      setEvents((prev) => [...prev, ...newEvents]);
      const lastVisible = snapshot.docs[snapshot.docs.length - 1] || null;
      setLastDoc(lastVisible);
      setHasMore(snapshot.docs.length === pageSize);
    } catch (error) {
      handleFirebaseError(error, "Failed to fetch participant events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setEvents([]);
    setLastDoc(null);
    fetchNextPage(); // Fetch first page on mount
  }, []);

  return { events, loading, fetchNextPage, hasMore };
};
