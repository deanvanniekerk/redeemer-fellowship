import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import { storageClient } from "@/lib/firebase-client";

export async function uploadSermonAudio(sermonId: string, audio: Blob) {
	const filePath = `sermons/${sermonId}/audio.mp3`;
	const audioRef = ref(storageClient, filePath);

	await uploadBytesResumable(audioRef, audio);

	return await getDownloadURL(audioRef);
}
