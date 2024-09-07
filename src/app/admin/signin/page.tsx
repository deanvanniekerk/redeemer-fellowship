import { getAuthenticatedAppForUser } from "@/lib/firebase/server-app";
import { SigninForm } from "./signin-form";

export default async function Page() {
	const { currentUser } = await getAuthenticatedAppForUser();

	return (
		<div className="flex items-center justify-center min-h-screen">
			<SigninForm initialUser={currentUser} />
		</div>
	);
}
