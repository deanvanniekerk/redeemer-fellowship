"use client";

import { PageTitle } from "@/app/admin/components/page-title";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 } from "uuid";
import { Sermon } from "../../schema";

export const CreateSermon: React.FC = () => {
	const router = useRouter();

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const form = useForm<Sermon>({
		resolver: zodResolver(Sermon),
		defaultValues: {
			id: v4(),
			title: "",
			description: "",
			date: new Date(),
			speaker: "",
			tags: [],
			audioUrl: "",
		},
	});

	const onSubmit = async (values: Sermon) => {
		try {
			setIsLoading(true);

			router.push("./sermons");
		} catch (error) {
			console.error("Error signing in", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<PageTitle>New Sermon</PageTitle>
			<div className="rounded-lg border border-solid shadow-sm">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name="title"
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
							name="description"
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
						<Button className="w-full" type="submit" isLoading={isLoading}>
							Sign in
						</Button>
					</form>
				</Form>
			</div>
		</>
	);
};
