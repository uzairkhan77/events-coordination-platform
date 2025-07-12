// src/hooks/firebase/users/useUserById.ts
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebase/config";
import type { UserProfile } from "@/types/interface/common.interface";

export const useUserById = (uid: string | undefined) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) return;

    const fetchUser = async () => {
      try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUser(docSnap.data() as UserProfile);
        }
      } catch (error) {
        console.error("Error fetching user by ID:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [uid]);

  return { user, loading };
};
