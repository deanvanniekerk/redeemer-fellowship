import { formatDate as formatDateDfns, fromUnixTime, parseISO } from "date-fns";
import { z } from "zod";

type Format = "short" | "medium" | "long" | (string & NonNullable<unknown>);

export const formatDate = (date?: Date | string, format: Format = "short") => {
	let parsedDate: Date | null = null;

	if (date instanceof Date) parsedDate = date as Date;

	if (typeof date === "string") {
		if (z.coerce.number().safeParse(date).success)
			parsedDate = fromUnixTime(Number.parseInt(date));
		else parsedDate = parseISO(date);
	}

	if (typeof date === "number") {
		parsedDate = fromUnixTime(date);
	}

	if (!parsedDate) return "";

	// can do this to show the date in the original timezone
	// parsedDate = addMinutes(parsedDate, parsedDate.getTimezoneOffset());

	if (format === "short") return formatDateDfns(parsedDate, "PP");

	if (format === "medium") {
		// only show the year if its not the same year as now
		if (new Date().getFullYear() === parsedDate.getFullYear())
			return formatDateDfns(parsedDate, "LLL do, HH:mm:ss");
		return formatDateDfns(parsedDate, "LLL do, yyyy, HH:mm:ss");
	}

	if (format === "long") return formatDateDfns(parsedDate, "PPpp");

	return formatDateDfns(parsedDate, format);
};
