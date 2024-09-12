import * as z from "zod";

export type Sermon = z.infer<typeof Sermon>;
export const Sermon = z.object({
	id: z.string().uuid(),
	title: z.string(),
	description: z.string(),
	date: z.date(),
	speaker: z.string(),
	tags: z.array(z.string()),
	audioUrl: z.string().url(),
});
