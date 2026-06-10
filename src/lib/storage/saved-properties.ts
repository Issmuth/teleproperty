import AsyncStorage from "@react-native-async-storage/async-storage";

const SAVED_PROPERTIES_KEY = "@teleproperty:saved_properties";

export type SavedProperty = {
  id: string;
  title: string;
  location: string;
  price: string;
  image: string;
  savedAt: string;
};

/**
 * Get all saved properties from storage
 */
export async function getSavedProperties(): Promise<SavedProperty[]> {
  try {
    const data = await AsyncStorage.getItem(SAVED_PROPERTIES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading saved properties:", error);
    return [];
  }
}

/**
 * Check if a property is saved
 */
export async function isPropertySaved(propertyId: string): Promise<boolean> {
  try {
    const saved = await getSavedProperties();
    return saved.some((p) => p.id === propertyId);
  } catch (error) {
    console.error("Error checking saved property:", error);
    return false;
  }
}

/**
 * Save a property
 */
export async function saveProperty(property: Omit<SavedProperty, "savedAt">): Promise<void> {
  try {
    const saved = await getSavedProperties();
    const exists = saved.some((p) => p.id === property.id);
    
    if (!exists) {
      const newProperty: SavedProperty = {
        ...property,
        savedAt: new Date().toISOString(),
      };
      saved.unshift(newProperty);
      await AsyncStorage.setItem(SAVED_PROPERTIES_KEY, JSON.stringify(saved));
    }
  } catch (error) {
    console.error("Error saving property:", error);
    throw error;
  }
}

/**
 * Remove a saved property
 */
export async function removeSavedProperty(propertyId: string): Promise<void> {
  try {
    const saved = await getSavedProperties();
    const filtered = saved.filter((p) => p.id !== propertyId);
    await AsyncStorage.setItem(SAVED_PROPERTIES_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error("Error removing saved property:", error);
    throw error;
  }
}

/**
 * Toggle property saved status
 */
export async function toggleSavedProperty(
  property: Omit<SavedProperty, "savedAt">
): Promise<boolean> {
  try {
    const isSaved = await isPropertySaved(property.id);
    
    if (isSaved) {
      await removeSavedProperty(property.id);
      return false;
    } else {
      await saveProperty(property);
      return true;
    }
  } catch (error) {
    console.error("Error toggling saved property:", error);
    throw error;
  }
}
