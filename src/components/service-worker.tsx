"use client";

import { firebaseConfig } from "@/lib/firebase/config";
import type React from "react";
import { type PropsWithChildren, useEffect } from "react";

export const RegisterServiceWorker: React.FC<PropsWithChildren> = ({
	children,
}) => {
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
				.then((registration) =>
					console.log(
						"service worker registered - scope is: ",
						registration.scope,
					),
				);
		}
	}, []);

	return <>{children}</>;
};
