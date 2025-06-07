import {
	Box,
	Button,
	Divider,
	useMantineColorScheme,
	useMantineTheme,
} from "@mantine/core";
import classes from "./top-bar.module.css";
import { IconPlus } from "@tabler/icons-react";
import { TopBarProps } from "./types";
import cx from "clsx";
import { useEffect } from "react";

export const TopBar = ({ isScrolled, addModalHandlers }: TopBarProps) => {
	const { colorScheme } = useMantineColorScheme({ keepTransitions: true });
	const theme = useMantineTheme();

	useEffect(() => {
		console.log(isScrolled);
	}, [isScrolled]);

	return (
		<Box
			className={cx(classes.topBarWrapper, { [classes.scrolled]: isScrolled })}
		>
			<Box className={classes.topBarContent}>
				<Button
					variant="filled"
					color={
						colorScheme == "light"
							? theme.colors.green[8]
							: theme.colors.green[6]
					}
					rightSection={<IconPlus size={14} />}
					onClick={() => {addModalHandlers.open()}}
				>
					Add Watchlist
				</Button>
			</Box>
			<Divider h={1} />
		</Box>
	);
};
