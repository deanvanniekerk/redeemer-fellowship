import * as z from "zod";

export type Sermon = z.infer<typeof Sermon>;
export const Sermon = z.object({
	id: z.string().uuid(),
	title: z.string().min(1),
	description: z.string().min(1),
	date: z.coerce.date(),
	speaker: z.string().min(1),
	series: z.string().min(1),
	tags: z.array(z.string()),
	audioUrl: z.string().url(),
});
