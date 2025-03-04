import { Flex } from "@mantine/core";
import { WatchlistListProps } from "./types";

export const WatchlistList = ({ children }: WatchlistListProps) => {
	return (
		<Flex direction={"column"} mt="50px" mb="50px" gap={30}>
			{children}
		</Flex>
	);
};
