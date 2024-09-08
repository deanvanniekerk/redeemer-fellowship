import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "RF Admin",
	description: "TODO",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	// const { currentUser } = await getAuthenticatedAppForUser();

	// console.log("(app) layout", { currentUser });

	// if (!currentUser) redirect("./signin");

	return <>{children}</>;
}
