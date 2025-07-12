// src/hooks/firebase/users/useUserSearch.ts
import { useState, useCallback } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  limit,
  orderBy,
} from "firebase/firestore";
import { db } from "@/services/firebase/config";
import { handleFirebaseError } from "@/lib/handleFirebaseError";
import { Timestamp } from "firebase/firestore";

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  createdAt: Timestamp;
}

export const useUserSearch = () => {
  const [searchResults, setSearchResults] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const searchUsers = useCallback(async (searchTerm: string) => {
    setLoading(true);
    setError(null);
    setSearchResults([]);

    const trimmedSearchTerm = searchTerm.trim().toLowerCase();

    if (!trimmedSearchTerm) {
      setLoading(false);
      return;
    }

    try {
      const usersRef = collection(db, "users");
      const q = query(
        usersRef,
        where("email", ">=", trimmedSearchTerm),
        where("email", "<=", trimmedSearchTerm + "\uf8ff"),
        orderBy("email"),
        limit(10)
      );

      const querySnapshot = await getDocs(q);
      const found: UserProfile[] = [];
      querySnapshot.forEach((doc) => {
        found.push({
          uid: doc.id,
          ...doc.data(),
        } as UserProfile);
      });

      setSearchResults(found);
      setLoading(false);
    } catch (err) {
      console.error("Error in useUserSearch hook:", err);
      setError(err as Error);
      setLoading(false);
      handleFirebaseError(err, "Failed to search for users");
    }
  }, []);

  return { searchResults, searchUsers, loading, error };
};
