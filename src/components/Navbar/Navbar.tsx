import { useState } from "react";
import { Box, Center, Stack } from "@mantine/core";
import classes from "./navbar.module.css";
import { IconChartLine } from "@tabler/icons-react";
import { NavbarLink } from "./components";
import { bottomList, topList } from "./constants";
import { useLocation, useNavigate } from "react-router-dom";
import { selectBottomTabIndex, selectTopTabIndex } from "./utils";

export const Navbar = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const [activeTop, setActiveTop] = useState(
		selectTopTabIndex(location.pathname)
	);
	const [activeBottom, setActiveBottom] = useState(
		selectBottomTabIndex(location.pathname)
	);

	const onNavClick = (top: boolean, index: number, href: string) => {
		if (top) {
			setActiveTop(index);
			setActiveBottom(-1);
			navigate(href);
		} else {
			setActiveTop(-1);
			setActiveBottom(index);
			navigate(href);
		}
	};

	const topLinks = topList.map((link, index) => (
		<NavbarLink
			{...link}
			key={link.label}
			active={index === activeTop}
			onClick={() => onNavClick(true, index, link.href)}
		/>
	));

	const bottomLinks = bottomList.map((link, index) => (
		<NavbarLink
			{...link}
			key={link.label}
			active={index === activeBottom}
			onClick={() => onNavClick(false, index, link.href)}
		/>
	));

	return (
		<nav className={classes.navbar}>
			<Center className={classes.logo}>
				<IconChartLine size={30} />
			</Center>

			<Box className={classes.navbarMain}>
				<Stack justify="center">{topLinks}</Stack>
			</Box>

			<Stack justify="center">{bottomLinks}</Stack>
		</nav>
	);
};
