import { initializeServerApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { clientConfig } from "./config";

// server app
export const firebaseAppServer = initializeServerApp(clientConfig, {});
export const dbServer = getFirestore(firebaseAppServer);
