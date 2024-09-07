import { getAuthenticatedAppForUser } from "@/lib/firebase/server-app";
import { Sermons } from "./sermons";

export default async function Page() {
	const { currentUser } = await getAuthenticatedAppForUser();

	return (
		<>
			<Sermons />
		</>
	);
}
