import { Divider, Flex } from "@mantine/core";
import {
	NoWatchlists,
	TopBar,
	WatchlistTableWrapper,
	WatchlistTable,
	WatchlistList,
} from "./components";
import { useState } from "react";

export const MyWatchlists = () => {
	const [watchlists] = useState([":"]);

	return (
		<Flex direction={"column"} h={"100%"}>
			<TopBar />
			<Divider h={1} />
			{!watchlists.length ? (
				<NoWatchlists />
			) : (
				<WatchlistList>
					<WatchlistTableWrapper watchlistTitle="Tech Portfolio">
						<WatchlistTable />
					</WatchlistTableWrapper>
					<WatchlistTableWrapper watchlistTitle="Meme Stocks">
						<WatchlistTable />
					</WatchlistTableWrapper>
				</WatchlistList>
			)}
		</Flex>
	);
};
