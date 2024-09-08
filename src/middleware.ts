import { authMiddleware } from "next-firebase-auth-edge";
import type { NextRequest } from "next/server";
import { clientConfig, serverConfig } from "./lib/config";

//https://hackernoon.com/using-firebase-authentication-with-the-latest-nextjs-features
export async function middleware(request: NextRequest) {
	return authMiddleware(request, {
		loginPath: "/api/signin",
		logoutPath: "/api/signout",
		apiKey: clientConfig.apiKey,
		cookieName: serverConfig.cookieName,
		cookieSignatureKeys: serverConfig.cookieSignatureKeys,
		cookieSerializeOptions: serverConfig.cookieSerializeOptions,
		serviceAccount: serverConfig.serviceAccount,
	});
}

export const config = {
	matcher: ["/", "/((?!_next|api|.*\\.).*)", "/api/signin", "/api/signout"],
};
