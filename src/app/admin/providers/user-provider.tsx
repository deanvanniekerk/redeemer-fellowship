"use client";

import { Spinner } from "@/components/ui/spinner";
import { useUserSession } from "@/hooks/use-user-session";
import type { AppUser } from "@/lib/firebase/auth.js";
import { useRouter } from "next/navigation";
import { type PropsWithChildren, createContext, useEffect } from "react";
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
	const user = useUserSession(initialUser);

	useEffect(() => {
		if (!user) router.push("./signin");
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
