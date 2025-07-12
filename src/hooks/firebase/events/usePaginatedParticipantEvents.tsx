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
  onSnapshot,
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

  // Real-time listener for first page
  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    const eventsRef = collection(db, "events");
    const q = query(
      eventsRef,
      where("participants", "array-contains", userId),
      orderBy("createdAt", "desc"),
      limit(pageSize)
    );
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const newEvents = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as EventData),
        }));
        setEvents(newEvents);
        const lastVisible = snapshot.docs[snapshot.docs.length - 1] || null;
        setLastDoc(lastVisible);
        setHasMore(snapshot.docs.length === pageSize);
        setLoading(false);
      },
      (error) => {
        handleFirebaseError(error, "Failed to fetch participant events");
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, [userId, pageSize]);

  // Fetch next page (non-real-time)
  const fetchNextPage = async () => {
    if (!userId || !lastDoc) return;
    setLoading(true);
    try {
      const eventsRef = collection(db, "events");
      const q = query(
        eventsRef,
        where("participants", "array-contains", userId),
        orderBy("createdAt", "desc"),
        startAfter(lastDoc),
        limit(pageSize)
      );
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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      }
    });

    return unsubscribe;
  }, []);

  return { events, loading, fetchNextPage, hasMore };
};
