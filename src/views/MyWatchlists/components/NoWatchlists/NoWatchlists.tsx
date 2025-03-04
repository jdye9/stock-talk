import { Center, Flex, Text } from "@mantine/core";

export const NoWatchlists = () => {
	return (
		<Flex m={"auto"} direction={"column"}>
			<Center>
				<Text c="dimmed" size="lg">
					You have no active Watchlists.
				</Text>
			</Center>
			<Center>
				<Text c="dimmed" size="lg">
					Click the "Add Watchlist" button to get started.
				</Text>
			</Center>
		</Flex>
	);
};
