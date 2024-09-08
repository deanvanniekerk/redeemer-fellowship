"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { onAuthStateChanged, signIn } from "@/lib/firebase/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type SigninSchema = z.infer<typeof SigninSchema>;
const SigninSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1),
});

export const SigninForm: React.FC = () => {
	const router = useRouter();

	const form = useForm<SigninSchema>({
		resolver: zodResolver(SigninSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	useEffect(() => {
		const unsubscribe = onAuthStateChanged((authUser) => {
			console.log({
				authUser,
			});
			if (authUser) router.push("./sermons");
		});
		return () => unsubscribe();
	}, []);

	const onSubmit = async (values: SigninSchema) => {
		try {
			await signIn(values.email, values.password);
			// router.push("./sermons");
		} catch (error) {
			console.error("Error signing in", error);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<Card className="w-full max-w-sm">
					<CardHeader>
						<CardTitle className="text-2xl">
							Redeemer Fellowship Admin
						</CardTitle>
						<CardDescription>
							Please enter your sign-in credentials to access the admin panel.
						</CardDescription>
					</CardHeader>
					<CardContent className="grid gap-4">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder="m@example.com" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input type="password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
					<CardFooter>
						<Button className="w-full" type="submit">
							Sign in
						</Button>
					</CardFooter>
				</Card>
			</form>
		</Form>
	);
};
