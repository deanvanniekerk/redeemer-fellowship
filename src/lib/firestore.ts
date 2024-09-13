import { doc, setDoc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { Sermon } from "../app/admin/(app)/schema";
import { dbClient } from "./firebase-client";

export async function insertSermon(
	sermon: Sermon,
	db = dbClient,
): Promise<void> {
	try {
		const sermonRef = doc(db, "sermons", sermon.id);
		await setDoc(sermonRef, {
			...sermon,
			date: sermon.date.toISOString(), // Convert Date to string for Firestore
		});
		console.log("Sermon successfully written to Firestore");
	} catch (error) {
		console.error("Error writing sermon to Firestore:", error);
		throw error;
	}
}

export async function editSermon(sermon: Sermon, db = dbClient): Promise<void> {
	try {
		const sermonRef = doc(db, "sermons", sermon.id);
		await setDoc(
			sermonRef,
			{
				...sermon,
				date: sermon.date.toISOString(), // Convert Date to string for Firestore
			},
			{ merge: true },
		);
		console.log("Sermon successfully updated in Firestore");
	} catch (error) {
		console.error("Error updating sermon in Firestore:", error);
		throw error;
	}
}

export async function getSermons(db = dbClient): Promise<Sermon[]> {
	try {
		const sermons: Sermon[] = [];

		const sermonsCollection = collection(db, "sermons");

		const querySnapshot = await getDocs(sermonsCollection);

		for (const doc of querySnapshot.docs) {
			const sermonData = doc.data();
			sermons.push(Sermon.parse(sermonData));
		}

		console.log("Successfully retrieved all sermons from Firestore");
		return sermons;
	} catch (error) {
		console.error("Error retrieving sermons from Firestore:", error);
		throw error;
	}
}
