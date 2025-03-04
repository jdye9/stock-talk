import { Box } from "@mantine/core";
import { PageAreaProps } from "./types";
import classes from "./page-area.module.css";

export const PageArea = ({ children }: PageAreaProps) => {
	return (
		<Box pos="absolute" left={80} className={classes.pageArea}>
			{children}
		</Box>
	);
};
