import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import type React from "react";

export const Header: React.FC = () => {
	return (
		<header className="sticky top-0 flex h-16 items-center justify-end gap-4 border-b bg-background px-4 md:px-6">
			<nav className="hidden flex-col justify-between text-lg font-medium md:flex md:flex-row md:items-center md:text-sm w-full">
				<Link
					href="/"
					className="flex items-center gap-2 text-lg font-semibold md:text-base"
				>
					Redeemer Fellowship
				</Link>
				<div className="flex gap-6">
					<Link
						href="/admin/signin"
						className="text-muted-foreground transition-colors hover:text-foreground"
					>
						Signin
					</Link>
				</div>
			</nav>
			<Sheet>
				<SheetTrigger asChild>
					<Button variant="outline" size="icon" className="shrink-0 md:hidden">
						<Menu className="h-5 w-5" />
					</Button>
				</SheetTrigger>
				<SheetContent side="right">
					<nav className="grid gap-6 text-lg font-medium">
						<Link href="/" className="hover:text-foreground">
							Home
						</Link>
						{/* <Link
							href="#"
							className="text-muted-foreground hover:text-foreground"
						>
							Orders
						</Link> */}
					</nav>
				</SheetContent>
			</Sheet>
		</header>
	);
};
