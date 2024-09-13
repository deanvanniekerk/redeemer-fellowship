"use client";

import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/firebase-client";
import type { AppUser } from "@/lib/types";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import {
	type PropsWithChildren,
	createContext,
	useEffect,
	useState,
} from "react";
import type React from "react";

export type UserState = {
	user: AppUser;
};

const defaults: UserState = {
	// mock, not used
	user: {
		uid: "",
	},
};

export const UserContext = createContext<UserState>({
	...defaults,
});

export const UserProvider: React.FC<
	PropsWithChildren<{
		initialUser: AppUser | null;
	}>
> = ({ children, initialUser }) => {
	const router = useRouter();

	// The initialUser comes from the server via a server component
	const [user, setUser] = useState<AppUser | null>(initialUser);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(authClient, (authUser) => {
			setUser(
				authUser
					? {
							uid: authUser?.uid,
						}
					: null,
			);
		});
		return () => unsubscribe();
	}, []);

	useEffect(() => {
		const handleSignedOut = async () => {
			console.log("firebase: signing out");
			await fetch("/api/signout");
			router.push("./signin");
		};

		if (!user) {
			handleSignedOut();
		}
	}, [user]);

	if (!user) return <Spinner />;

	return (
		<UserContext.Provider
			value={{
				user,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
