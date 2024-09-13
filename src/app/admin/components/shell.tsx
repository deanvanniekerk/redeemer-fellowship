"use client";

import { Button } from "@/components/ui/button";
import {} from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { authClient } from "@/lib/firebase-client";
import type { AppUser } from "@/lib/types";
import { cn } from "@/lib/utils";
import { signOut } from "firebase/auth";
import {
	CircleUser,
	type LucideIcon,
	Menu,
	NotebookPen,
	Podcast,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";
import { UserProvider } from "../providers/user-provider";

type Props = PropsWithChildren<{
	initialUser: AppUser;
}>;

export const Shell: React.FC<Props> = ({ initialUser, children }) => {
	const path = usePathname();

	async function handleSignout() {
		await signOut(authClient);
	}

	return (
		<UserProvider initialUser={initialUser}>
			<div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
				<div className="hidden border-r bg-muted/40 md:block">
					<div className="flex h-full max-h-screen flex-col gap-2">
						<div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
							<Link href="/" className="flex items-center gap-2 font-semibold">
								<span className="">RF Admin</span>
							</Link>
						</div>
						<div className="flex-1">
							<nav className="grid items-start px-2 text-sm font-medium lg:px-4">
								<NavLink
									href="./sermons"
									icon={Podcast}
									title="Sermons"
									isSelected={
										path === "/admin/sermons" ||
										path === "/admin/sermons/create"
									}
								/>
								<NavLink
									href="./bible-studies"
									icon={NotebookPen}
									title="Bible Studies"
									isSelected={path === "/admin/bible-studies"}
								/>
							</nav>
						</div>
					</div>
				</div>
				<div className="flex flex-col">
					<header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
						<Sheet>
							<SheetTrigger asChild>
								<Button
									variant="outline"
									size="icon"
									className="shrink-0 md:hidden"
								>
									<Menu className="h-5 w-5" />
								</Button>
							</SheetTrigger>
							<SheetContent side="left" className="flex flex-col">
								<nav className="grid gap-2 text-lg font-medium">
									<Link
										href="./sermons"
										className="flex items-center gap-2 text-lg font-semibold"
									>
										<span>RF Admin</span>
									</Link>
									<MobileNavLink
										href="./sermons"
										icon={Podcast}
										title="Sermons"
										selected={
											path === "/admin/sermons" ||
											path === "/admin/sermons/create"
										}
									/>
									<MobileNavLink
										href="./bible-studies"
										icon={NotebookPen}
										title="Bible Studies"
										selected={path === "/admin/bible-studies"}
									/>
								</nav>
							</SheetContent>
						</Sheet>
						<div className="w-full flex-1" />
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="secondary"
									size="icon"
									className="rounded-full"
								>
									<CircleUser className="h-5 w-5" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem onClick={() => handleSignout()}>
									Logout
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</header>
					<main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
						{children}
					</main>
				</div>
			</div>
		</UserProvider>
	);
};

const NavLink: React.FC<{
	href: string;
	icon: LucideIcon;
	title: string;
	isSelected: boolean;
}> = ({ href, icon: Icon, title, isSelected }) => (
	<Link
		href={href}
		className={cn(
			"flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
			isSelected ? "bg-muted text-primary" : "text-muted-foreground",
		)}
	>
		<Icon className="h-4 w-4" />
		{title}
	</Link>
);

const MobileNavLink: React.FC<{
	href: string;
	icon: LucideIcon;
	title: string;
	selected: boolean;
}> = ({ href, icon: Icon, title, selected }) => (
	<Link
		href={href}
		className={cn(
			"mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground",
			selected ? "bg-muted text-foreground" : "text-muted-foreground",
		)}
	>
		<Icon className="h-5 w-5" />
		{title}
	</Link>
);
