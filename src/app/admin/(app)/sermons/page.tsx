import { clientConfig, serverConfig } from "@/lib/config";
import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Shell } from "../../components/shell";
import { Sermons } from "./sermons";

export default async function Page() {
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

	return (
		<Shell initialUser={user}>
			<Sermons />
		</Shell>
	);
}
