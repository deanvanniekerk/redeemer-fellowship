import { getSermons } from "@/lib/firestore";
import { queryOptions } from "@tanstack/react-query";
import type { Firestore } from "firebase/firestore";

export const getSermonQueryOptions = (db?: Firestore) =>
	queryOptions({
		queryKey: ["sermons"],
		queryFn: async () => getSermons(db),
	});
