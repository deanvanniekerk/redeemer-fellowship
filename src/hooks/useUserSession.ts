"use client";

import {
	type AppUser,
	getAppUser,
	onAuthStateChanged,
} from "@/lib/firebase/auth";
import { firebaseConfig } from "@/lib/firebase/config";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useUserSession = (initialUser: AppUser | null) => {
	const router = useRouter();

	// The initialUser comes from the server via a server component
	const [user, setUser] = useState<AppUser | null>(initialUser);

	// Register the service worker that sends auth state back to server
	// The service worker is built with npm run build-service-worker
	useEffect(() => {
		if ("serviceWorker" in navigator) {
			const serializedFirebaseConfig = encodeURIComponent(
				JSON.stringify(firebaseConfig),
			);
			const serviceWorkerUrl = `/auth-service-worker.js?firebaseConfig=${serializedFirebaseConfig}`;

			navigator.serviceWorker
				.register(serviceWorkerUrl)
				.then((registration) => console.log("scope is: ", registration.scope));
		}
	}, []);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged((authUser) => {
			setUser(getAppUser(authUser));
		});
		return () => unsubscribe();
	}, []);

	// useEffect(() => {
	// 	onAuthStateChanged((authUser) => {
	// 		if (user === undefined) return;

	// 		// refresh when user changed to ease testing
	// 		if (user?.email !== authUser?.email) {
	// 			router.refresh();
	// 		}
	// 	});
	// }, [user]);

	return user;
};
