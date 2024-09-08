const cleanConfig = (value: string | undefined) => {
	if (!value) return "";
	return value.replace('"', "");
};

export const serverConfig = {
	cookieName: cleanConfig(process.env.AUTH_COOKIE_NAME),
	cookieSignatureKeys: [
		cleanConfig(process.env.AUTH_COOKIE_SIGNATURE_KEY_CURRENT),
		cleanConfig(process.env.AUTH_COOKIE_SIGNATURE_KEY_PREVIOUS),
	],
	cookieSerializeOptions: {
		path: "/",
		httpOnly: true,
		secure: cleanConfig(process.env.USE_SECURE_COOKIES) === "true",
		sameSite: "lax" as const,
		maxAge: 12 * 60 * 60 * 24,
	},
	serviceAccount: {
		projectId: cleanConfig(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID),
		clientEmail: cleanConfig(process.env.FIREBASE_ADMIN_CLIENT_EMAIL),
		privateKey: cleanConfig(process.env.FIREBASE_ADMIN_PRIVATE_KEY).replace(
			/\\n/g,
			"\n",
		),
	},
};

export const clientConfig = {
	apiKey: cleanConfig(process.env.NEXT_PUBLIC_FIREBASE_API_KEY),
	authDomain: cleanConfig(process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN),
	projectId: cleanConfig(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID),
	storageBucket: cleanConfig(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET),
	messagingSenderId: cleanConfig(
		process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	),
	appId: cleanConfig(process.env.NEXT_PUBLIC_FIREBASE_APP_ID),
};
