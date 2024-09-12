import { clientConfig, serverConfig } from "@/lib/config";
import type { Metadata } from "next";
import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
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
	const tokens = await getTokens(cookies(), {
		apiKey: clientConfig.apiKey,
		cookieName: serverConfig.cookieName,
		cookieSignatureKeys: serverConfig.cookieSignatureKeys,
		serviceAccount: serverConfig.serviceAccount,
	});

	if (!tokens) {
		redirect("./signin");
	}

	const user = {
		uid: tokens.decodedToken.uid,
	};

	return <Shell initialUser={user}>{children}</Shell>;
}
