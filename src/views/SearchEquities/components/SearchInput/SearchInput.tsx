import { Box, Button, Kbd } from "@mantine/core";
import { SearchInputProps } from "./types";
import classes from "./search-input.module.css";

export const SearchInput = ({ spotlight }: SearchInputProps) => {
	const hotkeys = (
		<Box className={classes.keyImage}>
			<Kbd>CTRL</Kbd>
			<span>+</span>
			<Kbd>K</Kbd>
		</Box>
	);
	return (
		<Box className={classes.searchWrapper}>
			<Button
				justify="space-between"
				fullWidth
				rightSection={hotkeys}
				variant="default"
				onClick={() => spotlight.open()}
				size="lg"
			>
				Search Tickers
			</Button>
		</Box>
	);
};
