import classes from "./app-wrapper.module.css";
import { AppWrapperProps } from "./types";

export const AppWrapper = ({ children }: AppWrapperProps) => {
	return <div className={classes.appWrapper}>{children}</div>;
};
