import { darken, lighten, readableColor, rgba } from "polished";
import { useState, useEffect } from "react";

const DB_NAME = "fitorasDB";
const DB_VERSION = 1;
const STORE_NAME = "theme";
const KEY = "theme_color";

// IndexedDB helper functions
const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
  });
};

const getColorFromIndexedDB = async (): Promise<string | null> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(KEY);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || null);
    });
  } catch (error) {
    console.error("IndexedDB get error:", error);
    return null;
  }
};

const saveColorToIndexedDB = async (color: string): Promise<void> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(color, KEY);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  } catch (error) {
    console.error("IndexedDB save error:", error);
  }
};

/**
 * Returns a theme object based on a base color.
 * If baseColor is undefined, you can optionally pass a fallbackColor.
 * If useLocalStorage is true, it will persist and retrieve the color from IndexedDB.
 */
export function useThemeColor(baseColor?: string, fallbackColor?: string, useLocalStorage = false) {
  const [persistedColor, setPersistedColor] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  // Load persisted color from IndexedDB on mount
  useEffect(() => {
    if (useLocalStorage && !initialized) {
      getColorFromIndexedDB().then((color) => {
        setPersistedColor(color);
        setInitialized(true);
      });
    } else if (!useLocalStorage) {
      setInitialized(true);
    }
  }, [useLocalStorage, initialized]);

  // Use persisted color if available and useLocalStorage is true, otherwise use baseColor, fallbackColor, or default
  const primary = useLocalStorage && persistedColor ? persistedColor : baseColor || fallbackColor || "#be123c";

  // Persist color to IndexedDB when baseColor changes and useLocalStorage is true
  useEffect(() => {
    if (useLocalStorage && baseColor && initialized) {
      saveColorToIndexedDB(baseColor);
      setPersistedColor(baseColor);
    }
  }, [baseColor, useLocalStorage, initialized]);

  const textOnPrimary = readableColor(primary, "#000000", "#ffffff", false);
  const dark = darken(0.1, primary);
  const darker = darken(0.2, primary);
  const light = lighten(0.15, primary);
  const lighter = lighten(0.4, primary);
  const translucent = rgba(primary, 0.1);
  const translucentStrong = rgba(primary, 0.25);

  // Gradient adjustments for very bright colors
  const gradientStart = rgba(darken(0.05, primary), 0.2);
  const gradientEnd = rgba(darken(0.05, primary), 0.6);

  return {
    primary,
    textOnPrimary,
    dark,
    darker,
    light,
    lighter,
    translucent,
    translucentStrong,
    gradientStart,
    gradientEnd,
  };
}
