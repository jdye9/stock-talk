import { Card } from "@mantine/core";
import { WatchlistWrapperProps } from "./types";
import { Text } from "@mantine/core";

export const WatchlistTableWrapper = ({
	children,
	watchlistTitle,
}: WatchlistWrapperProps) => {
	return (
		<Card shadow="sm" radius="md" withBorder w="80%" padding="xl" m="auto">
			<Text size="xl" mb={10}>
				{watchlistTitle}
			</Text>
			{children}
		</Card>
	);
};
