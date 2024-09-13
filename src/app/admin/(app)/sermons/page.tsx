import { dbServer } from "@/lib/firebase-server";
import { getQueryClient } from "@/lib/query";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getSermonQueryOptions } from "./query";
import { Sermons } from "./sermons";

export default async function Page() {
	const queryClient = getQueryClient();

	void queryClient.prefetchQuery(getSermonQueryOptions(dbServer));

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Sermons />
		</HydrationBoundary>
	);
}
