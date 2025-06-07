import { Flex, ScrollArea } from "@mantine/core";
import {
	NoWatchlists,
	TopBar,
	WatchlistTableWrapper,
	WatchlistTable,
	WatchlistList,
	AddWatchlistModal,
} from "./components";
import {useEffect, useState} from "react";
import classes from "./my-watchlists.module.css";
import {useDisclosure} from "@mantine/hooks";

export const MyWatchlists = () => {
	const [scrolled, setScrolled] = useState(false);
	const [watchlists] = ["HI"];
	const [addModalOpened, addModalHandlers] = useDisclosure(false);

	useEffect(() => {
		console.log(scrolled)
	}, [scrolled])

	return (
		<>
			<TopBar isScrolled={scrolled} addModalHandlers={addModalHandlers} />
			<ScrollArea
				className={classes.scrollArea}
				onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
			>
				<Flex className={classes.flexArea}>
					{!watchlists.length ? (
						<NoWatchlists />
					) : (
						<WatchlistList>
							<WatchlistTableWrapper watchlistTitle="Tech Portfolio">
								<WatchlistTable />
							</WatchlistTableWrapper>
							<WatchlistTableWrapper watchlistTitle="Tech Portfolio">
								<WatchlistTable />
							</WatchlistTableWrapper>
						</WatchlistList>
					)}
				</Flex>
			</ScrollArea>
			<AddWatchlistModal opened={addModalOpened} addModalHandlers={addModalHandlers} />
		</>
	);
};
