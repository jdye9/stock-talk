import { Flex, Loader, ScrollArea } from "@mantine/core";
import {
	NoWatchlists,
	TopBar,
	WatchlistTableWrapper,
	WatchlistTable,
	WatchlistList,
	AddWatchlistModal,
} from "./components";
import { useState } from "react";
import classes from "./my-watchlists.module.css";
import { useDisclosure } from "@mantine/hooks";
import { useGetWatchlists } from "../../hooks/useWatchlist";
import { Watchlist } from "./types";

export const MyWatchlists = () => {
	const [scrolled, setScrolled] = useState(false);
	const { data: watchlists, isLoading: watchlistsLoading } = useGetWatchlists();
	const [addModalOpened, addModalHandlers] = useDisclosure(false);

	return (
		<>
			<TopBar isScrolled={scrolled} addModalHandlers={addModalHandlers} />
			<ScrollArea
				className={classes.scrollArea}
				onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
			>
				<Flex className={classes.flexArea}>
					{!watchlistsLoading && watchlists ? (
						!watchlists.length ? (
							<NoWatchlists />
						) : (
							watchlists.map((watchlist: Watchlist) => (
								<WatchlistList key={watchlist.id}>
									<WatchlistTableWrapper watchlistTitle={watchlist.name}>
										<WatchlistTable stocks={watchlist.stocks} />
									</WatchlistTableWrapper>
								</WatchlistList>
							))
						)
					) : (
						<Loader size="xl" className={classes.loader} />
					)}
				</Flex>
			</ScrollArea>
			<AddWatchlistModal
				opened={addModalOpened}
				addModalHandlers={addModalHandlers}
			/>
		</>
	);
};
