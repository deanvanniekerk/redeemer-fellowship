import type { PropsWithChildren } from "react";

export const PageTitle: React.FC<
	PropsWithChildren & { actions?: React.ReactNode }
> = ({ children, actions }) => {
	return (
		<div className="flex items-center justify-between">
			<h1 className="text-lg font-semibold md:text-2xl">{children}</h1>
			{actions && <div className="ml-auto">{actions}</div>}
		</div>
	);
};
