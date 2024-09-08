import { getAuthenticatedAppForUser } from "@/lib/firebase/server-app";
// import { redirect } from "next/navigation";
import { SigninForm } from "./signin-form";

export default async function Page() {
	const { currentUser } = await getAuthenticatedAppForUser();

	console.log("signin page", { currentUser });

	// redirect if already signed in
	// if (currentUser) redirect("./sermons");

	return (
		<div className="flex items-center justify-center min-h-screen">
			<SigninForm />
		</div>
	);
}
