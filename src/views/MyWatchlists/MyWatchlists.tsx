import { Flex, ScrollArea } from "@mantine/core";
import {
	NoWatchlists,
	TopBar,
	WatchlistTableWrapper,
	WatchlistTable,
	WatchlistList,
} from "./components";
import { useEffect, useState } from "react";
import classes from "./my-watchlists.module.css";

export const MyWatchlists = () => {
	const [scrolled, setScrolled] = useState(false);
	const [watchlists] = ["HI"];

	useEffect(() => {
		console.log(scrolled);
	}, [scrolled]);

	return (
		<>
			<TopBar isScrolled={scrolled} />
			<ScrollArea
				onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
				className={classes.pageArea}
			>
				<Flex direction={"column"}>
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
							<WatchlistTableWrapper watchlistTitle="Meme Stocks">
								<WatchlistTable />
							</WatchlistTableWrapper>
						</WatchlistList>
					)}
				</Flex>
			</ScrollArea>
		</>
	);
};
