import { Box } from "@mantine/core";
import classes from "./app-wrapper.module.css";
import { AppWrapperProps } from "./types";

export const AppWrapper = ({ children }: AppWrapperProps) => {
	return <Box className={classes.appWrapper}>{children}</Box>;
};
