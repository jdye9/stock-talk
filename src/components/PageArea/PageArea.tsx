import { Box } from "@mantine/core";
import { PageAreaProps } from "./types";

export const PageArea = ({ children }: PageAreaProps) => {
	return (
		<Box h={"100vh"} w={"calc(100vw - 80px)"}>
			{children}
		</Box>
	);
};
