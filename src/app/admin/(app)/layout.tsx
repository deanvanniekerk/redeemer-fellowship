import { getAuthenticatedAppForUser } from "@/lib/firebase/server-app";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Shell } from "../components/shell";

export const metadata: Metadata = {
	title: "RF Admin",
	description: "TODO",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { currentUser } = await getAuthenticatedAppForUser();

	console.log("(app) layout", { currentUser });

	if (!currentUser) redirect("./signin");

	return <Shell initialUser={currentUser}>{children}</Shell>;
}
