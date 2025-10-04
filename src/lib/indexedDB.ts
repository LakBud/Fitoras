// lib/indexedDB.ts
const DB_NAME = "fitorasDB";
const DB_VERSION = 2; // Increment version to trigger upgrade

// Define all your stores here
const OBJECT_STORES = ["exercises", "splits", "calendar", "theme"];

let dbInstance: IDBDatabase | null = null;

export const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (dbInstance) {
      resolve(dbInstance);
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);

    request.onsuccess = () => {
      dbInstance = request.result;
      resolve(dbInstance);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      // Create all object stores at once
      OBJECT_STORES.forEach((storeName) => {
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName);
          console.log(`Created object store: ${storeName}`);
        }
      });
    };

    // Handle blocking events (when database needs upgrade but other tabs are open)
    request.onblocked = () => {
      console.warn("Database upgrade blocked. Please close other tabs with this site open.");
    };
  });
};

export const getFromDB = async <T>(storeName: string, key: string): Promise<T | null> => {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, "readonly");
      const store = transaction.objectStore(storeName);
      const request = store.get(key);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || null);
    });
  } catch (error) {
    console.error(`IndexedDB get error for store "${storeName}":`, error);
    return null;
  }
};

export const saveToDB = async <T>(storeName: string, key: string, data: T): Promise<void> => {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, "readwrite");
      const store = transaction.objectStore(storeName);
      const request = store.put(data, key);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  } catch (error) {
    console.error(`IndexedDB save error for store "${storeName}":`, error);
  }
};

// Optional: Helper to delete the database (useful for development)
export const deleteDB = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (dbInstance) {
      dbInstance.close();
      dbInstance = null;
    }

    const request = indexedDB.deleteDatabase(DB_NAME);

    request.onsuccess = () => {
      console.log("Database deleted successfully");
      resolve();
    };

    request.onerror = () => reject(request.error);

    request.onblocked = () => {
      console.warn("Database deletion blocked. Please close other tabs.");
    };
  });
};
