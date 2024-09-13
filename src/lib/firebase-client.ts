import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { clientConfig } from "./config";

// client app
export const firebaseAppClient = initializeApp(clientConfig);
export const authClient = getAuth(firebaseAppClient);
export const dbClient = getFirestore(firebaseAppClient);
export const storageClient = getStorage(firebaseAppClient);
