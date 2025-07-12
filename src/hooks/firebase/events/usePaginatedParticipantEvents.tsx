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
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "@/services/firebase/config";
import { handleFirebaseError } from "@/lib/handleFirebaseError";
import type { EventData } from "@/types/interface/common.interface";

export const usePaginatedParticipantEvents = (pageSize = 4) => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  const fetchNextPage = async () => {
    if (!userId) return;

    setLoading(true);

    try {
      const eventsRef = collection(db, "events");
      let q = query(
        eventsRef,
        where("participants", "array-contains", userId),
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

  const refetch = () => {
    setEvents([]);
    setLastDoc(null);
    setHasMore(true);
    if (userId) fetchNextPage();
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!userId) return;

    setEvents([]);
    setLastDoc(null);
    fetchNextPage();
  }, [userId]);

  return { events, loading, fetchNextPage, hasMore, refetch };
};
