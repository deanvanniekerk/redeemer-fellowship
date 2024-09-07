import type React from "react";
import type { PropsWithChildren } from "react";

export const Center: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className="h-full w-full flex justify-center align-middle">
			{children}
		</div>
	);
};
