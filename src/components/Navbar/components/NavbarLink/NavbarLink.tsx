import { Tooltip, UnstyledButton } from "@mantine/core";
import { NavbarLinkProps } from "./types";
import classes from "./navbar-link.module.css";

export const NavbarLink = ({
	icon: Icon,
	label,
	active,
	onClick,
}: NavbarLinkProps) => {
	return (
		<Tooltip
			label={label}
			position="right"
			transitionProps={{ duration: 0 }}
			zIndex={1000}
		>
			<UnstyledButton
				onClick={() => {
					onClick();
				}}
				className={classes.link}
				data-active={active || undefined}
			>
				<Icon size={25} stroke={1.5} />
			</UnstyledButton>
		</Tooltip>
	);
};
