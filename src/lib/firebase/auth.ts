import { auth } from "@/lib/firebase/client-app";
import {
	type NextOrObserver,
	type User,
	onAuthStateChanged as _onAuthStateChanged,
	signInWithEmailAndPassword,
} from "firebase/auth";

export function onAuthStateChanged(nextOrObserver: NextOrObserver<User>) {
	return _onAuthStateChanged(auth, nextOrObserver);
}

export async function signIn(email: string, password: string) {
	try {
		await signInWithEmailAndPassword(auth, email, password);
	} catch (error) {
		console.error("Error signing in", error);
	}
}

export async function signOut() {
	try {
		return auth.signOut();
	} catch (error) {
		console.error("Error signing out", error);
	}
}

// this need to be a serializable payload
export type AppUser = Pick<User, "uid">;

export const getAppUser = (user: User | null): AppUser | null => {
	if (!user) return null;
	return {
		uid: user.uid,
	};
};
