"use client";

import { PageTitle } from "@/app/admin/components/page-title";
import { Button } from "@/components/ui/button";
import {} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { insertSermon } from "@/lib/firestore";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
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

			console.log({ values });

			await insertSermon(values);

			router.push("/admin/sermons");
		} catch (error) {
			console.error("Error signing in", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<div className="w-full max-w-md mx-auto">
				<PageTitle>New Sermon</PageTitle>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="mt-8 space-y-4"
					>
						<FormField
							control={form.control}
							name="series"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Series</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input {...field} />
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
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="speaker"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Speaker</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="audioUrl"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Audio URL</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex justify-end space-x-4 pt-8">
							<Button
								variant="outline"
								isLoading={isLoading}
								onClick={() => router.push("/admin/sermons")}
								icon={<ChevronLeft className="w-4 h-4" />}
							>
								Cancel
							</Button>
							<Button type="submit" isLoading={isLoading}>
								Create
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</>
	);
};
