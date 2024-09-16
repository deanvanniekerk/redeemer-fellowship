"use client";

import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/date";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { PageTitle } from "../../components/page-title";
import type { Sermon } from "../schema";
import { getSermonQueryOptions } from "./query";

export const Sermons: React.FC = () => {
	const router = useRouter();

	const { data: sermons } = useSuspenseQuery(getSermonQueryOptions());

	const columns: ColumnDef<Sermon>[] = useMemo(
		() => [
			{
				header: "Title",
				accessorKey: "title",
			},
			{
				header: "Speaker",
				accessorKey: "speaker",
			},
			{
				header: "Date",
				accessorKey: "date",
				cell: ({ row }) => formatDate(row.original.date, "short"),
			},
		],
		[],
	);

	const table = useReactTable({
		data: sermons,
		columns: columns,
		getCoreRowModel: getCoreRowModel(),
	});

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
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</>
	);
};
