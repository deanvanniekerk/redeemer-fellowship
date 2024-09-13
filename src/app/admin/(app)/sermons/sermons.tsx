"use client";

import { Button } from "@/components/ui/button";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { PageTitle } from "../../components/page-title";
import { getSermonQueryOptions } from "./query";

export const Sermons: React.FC = () => {
	const router = useRouter();

	const { data } = useSuspenseQuery(getSermonQueryOptions());

	console.log({ sermons: data });

	return (
		<>
			<PageTitle
				actions={
					<Button
						size="icon"
						onClick={() => router.push("/admin/sermons/create")}
					>
						<Plus className="w-4 h-4" />
					</Button>
				}
			>
				Sermons
			</PageTitle>
			<div
				className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
				x-chunk="dashboard-02-chunk-1"
			>
				<div className="flex flex-col items-center gap-1 text-center">
					<h3 className="text-2xl font-bold tracking-tight">
						You have no sermons
					</h3>

					<Button className="mt-4">Add Sermon</Button>
				</div>
			</div>
		</>
	);
};
