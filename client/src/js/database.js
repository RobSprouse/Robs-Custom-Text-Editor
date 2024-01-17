// COMMENT: imports the openDB method from the idb library
import { openDB } from "idb";

// COMMENT: creates a method to initialize the database
const initdb = async () =>
     openDB("jate", 1, {
          upgrade(db) {
               if (db.objectStoreNames.contains("jate")) {
                    console.log("jate database already exists");
                    return;
               }
               db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
               console.log("jate database created");
          },
     });

// COMMENT: creates a method to save the content to the database
export const putDb = async (content) => {
     const jateDb = await openDB("jate", 1);
     const tx = jateDb.transaction("jate", "readwrite");
     const store = tx.objectStore("jate");
     await store.clear();
     const request = store.add({ content: content });
     const result = await request;
     console.log("Data saved to the database", result);
};

// COMMENT: creates a method to get the content from the database
export const getDb = async () => {
     const jateDb = await openDB("jate", 1);
     const tx = jateDb.transaction("jate", "readonly");
     const store = tx.objectStore("jate");
     const request = store.getAll();
     const result = await request;
     console.log("result.value", result);
     return result[0]?.content;
};

// COMMENT: initializes the database
initdb();
