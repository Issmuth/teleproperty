import {
    getSavedProperties,
    isPropertySaved,
    toggleSavedProperty,
    type SavedProperty,
} from "@/lib/storage/saved-properties";
import { useCallback, useEffect, useState } from "react";

export function useSavedProperties() {
  const [savedProperties, setSavedProperties] = useState<SavedProperty[]>([]);
  const [loading, setLoading] = useState(true);

  const loadSavedProperties = useCallback(async () => {
    try {
      setLoading(true);
      const properties = await getSavedProperties();
      setSavedProperties(properties);
    } catch (error) {
      console.error("Error loading saved properties:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSavedProperties();
  }, [loadSavedProperties]);

  const refresh = useCallback(() => {
    return loadSavedProperties();
  }, [loadSavedProperties]);

  return {
    savedProperties,
    loading,
    refresh,
  };
}

export function usePropertySaved(propertyId: string) {
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkSaved = useCallback(async () => {
    try {
      setLoading(true);
      const saved = await isPropertySaved(propertyId);
      setIsSaved(saved);
    } catch (error) {
      console.error("Error checking if property is saved:", error);
    } finally {
      setLoading(false);
    }
  }, [propertyId]);

  useEffect(() => {
    checkSaved();
  }, [checkSaved]);

  const toggleSaved = useCallback(
    async (property: Omit<SavedProperty, "savedAt">) => {
      try {
        const newSavedState = await toggleSavedProperty(property);
        setIsSaved(newSavedState);
        return newSavedState;
      } catch (error) {
        console.error("Error toggling saved property:", error);
        throw error;
      }
    },
    []
  );

  return {
    isSaved,
    loading,
    toggleSaved,
    refresh: checkSaved,
  };
}
