"use client";

import {
	type AppUser,
	getAppUser,
	onAuthStateChanged,
} from "@/lib/firebase/auth";
import { useEffect, useState } from "react";

export const useUserSession = (initialUser: AppUser | null) => {
	// The initialUser comes from the server via a server component
	const [user, setUser] = useState<AppUser | null>(initialUser);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged((authUser) => {
			setUser(getAppUser(authUser));
		});
		return () => unsubscribe();
	}, []);

	return user;
};
