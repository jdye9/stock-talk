import { Button, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import classes from "./top-bar.module.css";
import { IconPlus } from "@tabler/icons-react";

export const TopBar = () => {
	const { colorScheme } = useMantineColorScheme({ keepTransitions: true });
	const theme = useMantineTheme();

	return (
		<div className={classes.topBarContent}>
			<Button
				variant="filled"
				color={
					colorScheme == "light" ? theme.colors.green[8] : theme.colors.green[6]
				}
				rightSection={<IconPlus size={14} />}
			>
				Add Watchlist
			</Button>
		</div>
	);
};
