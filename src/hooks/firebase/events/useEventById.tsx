import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebase/config";
import { handleFirebaseError } from "@/lib/handleFirebaseError";
import type { EventData } from "@/types/interface/common.interface";

export const useEventById = (eventId: string | null) => {
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!eventId) return;

    const fetchEvent = async () => {
      setLoading(true);
      setError(null);

      try {
        const eventRef = doc(db, "events", eventId);
        const snapshot = await getDoc(eventRef);

        if (snapshot.exists()) {
          setEvent({ id: snapshot.id, ...(snapshot.data() as EventData) });
        } else {
          setError("Event not found");
          setEvent(null);
        }
      } catch (err) {
        const fallback = "Failed to load event";
        handleFirebaseError(err, fallback);
        setError(fallback);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  return { event, loading, error };
};
